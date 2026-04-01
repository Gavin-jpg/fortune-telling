// functions/api/zodiac.js
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 获取查询参数
    const url = new URL(request.url);
    const planet = url.searchParams.get('planet'); // 星体：太阳星座、月亮星座、上升星座、金星星座、火星星座、水星星座
    const zodiac = url.searchParams.get('zodiac'); // 星座：白羊座、金牛座等

    // 验证参数
    if (!planet || !zodiac) {
      return new Response(JSON.stringify({
        error: '缺少查询参数：planet 和 zodiac 都是必需的'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 查询D1数据库，根据planet和zodiac组合查询
    const result = await env.DB.prepare(
      'SELECT * FROM planet_zodiac_interpretations WHERE planet = ? AND zodiac = ?'
    ).bind(planet, zodiac).first();

    if (!result) {
      return new Response(JSON.stringify({
        error: '未找到对应的星体+星座组合数据',
        planet: planet,
        zodiac: zodiac
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('数据库查询错误:', error);
    return new Response(JSON.stringify({
      error: '数据库查询失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}