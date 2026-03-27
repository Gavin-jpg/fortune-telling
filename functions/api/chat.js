// functions/api/chat.js
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // 获取客户端 IP
  const clientIP = request.headers.get('CF-Connecting-IP') || 
                   request.headers.get('X-Forwarded-For')?.split(',')[0] || 
                   'unknown';

  // 限流检查
  const limitCheck = await checkRateLimit(env, clientIP);
  if (limitCheck.exceeded) {
    return new Response(JSON.stringify({ 
      error: limitCheck.message 
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  const requestBody = await request.json();

  // 检查缓存
  const cacheKey = generateCacheKey(requestBody);
  const cachedResult = await env.CACHE_KV.get(cacheKey, 'json');
  
  if (cachedResult) {
    console.log('缓存命中:', cacheKey);
    return new Response(JSON.stringify(cachedResult), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'HIT'
      }
    });
  }

  // 从环境变量获取 API Key（需要在 Cloudflare Dashboard 设置）
  const apiKey = env.SILICONFLOW_API_KEY;
  if (!apiKey) {
    return new Response('Server configuration error', { status: 500 });
  }

  // 调用 SiliconFlow API
  const upstreamResponse = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  const responseText = await upstreamResponse.text();

  // 异步更新计数器和缓存（不阻塞响应）
  context.waitUntil(Promise.all([
    updateRateLimitCounters(env, clientIP, limitCheck),
    cacheResponse(env, cacheKey, responseText)
  ]));

  return new Response(responseText, {
    status: upstreamResponse.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Cache': 'MISS'
    }
  });
}

// 限流检查函数
async function checkRateLimit(env, clientIP) {
  const now = Date.now();
  const minuteKey = Math.floor(now / 60000); // 每分钟的键
  const todayKey = new Date().toISOString().split('T')[0]; // 今天的日期

  // 从环境变量获取限流配置
  const IP_MINUTE_LIMIT = parseInt(env.IP_MINUTE_LIMIT) || 5;
  const IP_DAILY_LIMIT = parseInt(env.IP_DAILY_LIMIT) || 50;
  const GLOBAL_DAILY_LIMIT = parseInt(env.GLOBAL_DAILY_LIMIT) || 1000;

  // 构建键名
  const ipMinuteKey = `ip:${clientIP}:minute:${minuteKey}`;
  const ipDailyKey = `ip:${clientIP}:daily:${todayKey}`;
  const globalDailyKey = `global:daily:${todayKey}`;

  // 获取当前计数
  const [ipMinute, ipDaily, globalDaily] = await Promise.all([
    env.LIMITS_KV.get(ipMinuteKey, 'json') || 0,
    env.LIMITS_KV.get(ipDailyKey, 'json') || 0,
    env.LIMITS_KV.get(globalDailyKey, 'json') || 0
  ]);

  // 检查限流
  if (ipMinute >= IP_MINUTE_LIMIT) {
    return { exceeded: true, message: '请求过于频繁，请稍后再试' };
  }
  if (ipDaily >= IP_DAILY_LIMIT) {
    return { exceeded: true, message: '您今日已达请求上限' };
  }
  if (globalDaily >= GLOBAL_DAILY_LIMIT) {
    return { exceeded: true, message: '今日总请求已达上限，请明日再来' };
  }

  return { 
    exceeded: false, 
    ipMinuteKey, 
    ipDailyKey, 
    globalDailyKey,
    counts: { ipMinute, ipDaily, globalDaily }
  };
}

// 生成缓存键
function generateCacheKey(requestBody) {
  // 从请求体中提取用户信息
  const messages = requestBody.messages || [];
  const userMessage = messages.find(msg => msg.role === 'user');
  
  if (!userMessage || !userMessage.content) {
    return 'default_key';
  }

  // 从用户消息中提取关键信息（性别、出生日期、出生时间、出生地点）
  const content = userMessage.content;
  
  // 提取关键信息
  const genderMatch = content.match(/性别：(\S+)/);
  const dateMatch = content.match(/出生日期：(\S+)/);
  const timeMatch = content.match(/出生时间：(\S+)/);
  const locationMatch = content.match(/出生地点：(\S+)/);
  
  const gender = genderMatch ? genderMatch[1] : '';
  const birthDate = dateMatch ? dateMatch[1] : '';
  const birthTime = timeMatch ? timeMatch[1] : '';
  const location = locationMatch ? locationMatch[1] : '';
  
  // 生成哈希键
  const keyString = `${gender}${birthDate}${birthTime}${location}`;
  
  // 使用简单的哈希函数生成固定长度的哈希
  let hash = 0;
  for (let i = 0; i < keyString.length; i++) {
    const char = keyString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  
  return `cache:${Math.abs(hash).toString(36)}`;
}

// 异步更新计数器
async function updateRateLimitCounters(env, clientIP, limitCheck) {
  if (limitCheck.exceeded) return;

  const { ipMinuteKey, ipDailyKey, globalDailyKey, counts } = limitCheck;
  const { ipMinute, ipDaily, globalDaily } = counts;

  // 设置过期时间（分钟级计数器1分钟后过期，日级计数器2天后过期）
  const minuteExpiry = Math.floor(Date.now() / 1000) + 120; // 2分钟后过期
  const dailyExpiry = Math.floor(Date.now() / 1000) + 172800; // 2天后过期

  await Promise.all([
    env.LIMITS_KV.put(ipMinuteKey, (ipMinute + 1).toString(), { 
      expirationTtl: 120 
    }),
    env.LIMITS_KV.put(ipDailyKey, (ipDaily + 1).toString(), { 
      expirationTtl: 172800 
    }),
    env.LIMITS_KV.put(globalDailyKey, (globalDaily + 1).toString(), { 
      expirationTtl: 172800 
    })
  ]);
}

// 缓存响应结果
async function cacheResponse(env, cacheKey, responseText) {
  try {
    // 从环境变量获取缓存时间，默认1小时（3600秒）
    const cacheTtl = parseInt(env.CACHE_TTL) || 3600;
    
    // 解析响应内容
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('缓存失败：无法解析响应内容');
      return;
    }
    
    // 存储到缓存
    await env.CACHE_KV.put(cacheKey, JSON.stringify(responseData), {
      expirationTtl: cacheTtl
    });
    
    console.log('缓存写入成功:', cacheKey, 'TTL:', cacheTtl);
  } catch (error) {
    console.error('缓存写入失败:', error);
  }
}