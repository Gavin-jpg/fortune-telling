// functions/api/chat.js
export async function onRequest(context) {
  const { request, env } = context;

  // CORS 预检
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const requestBody = await request.json();

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

  return new Response(responseText, {
    status: upstreamResponse.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}