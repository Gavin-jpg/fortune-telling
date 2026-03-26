/**
 * API 调用模块
 * 负责与 Cloudflare Pages Functions 通信
 */

/**
 * 生成星盘分析提示词
 */
function generatePrompt(chartData) {
    const { name, gender, birthDate, birthTime, location, planets } = chartData;
    const { sun, moon, ascendant, venus, mars, mercury } = planets;

    return `请扮演一位资深占星师，根据以下用户信息提供详细的星盘解读。

【用户信息】
姓名：${name}
性别：${gender}
出生日期：${birthDate}
出生时间：${birthTime}
出生地点：${location}

【星盘计算结果】
太阳：${sun}
月亮：${moon}
上升：${ascendant}
金星：${venus}
火星：${mars}
水星：${mercury}

请按以下 JSON 格式输出，不要包含其他文字：
{
  "tags": {
    "太阳": "3-5字特征标签",
    "月亮": "3-5字特征标签",
    "上升": "3-5字特征标签",
    "金星": "3-5字特征标签",
    "火星": "3-5字特征标签",
    "水星": "3-5字特征标签"
  },
  "analysis": {
    "整体性格特征": "描述内容",
    "事业发展": "描述内容",
    "爱情婚姻": "描述内容",
    "财富潜质": "描述内容",
    "天赋潜能": "描述内容"
  },
  "summary": "生成15字左右的趣味总结，可以结合当下网络热梗或流行语，幽默风趣，但要符合星座特征",
  "dailyAdvice": "生成15字左右的今日建议，类似'今日不宜运动'、'适合表白'、'宜宅家追剧'、'忌暴饮暴食'等",
  "jewelry": {
    "name": "首饰名称",
    "meaning": "十五字左右的寓意",
    "imageHint": "用于展示图片的关键词（如\"月光石吊坠\"）"
  }
}
注意：
1. 每个星座标签必须是3-5个字，生动贴切。
2. 整体分析每点50字以内，五个维度共计约250字。
3. summary 控制在15-20字，要有活人感，像朋友聊天一样自然，可用网络热梗（如"摆烂"、"躺平"、"emo"、"yyds"、"破防"等），语气要接地气，不要太官方。
4. dailyAdvice 15字左右，简洁实用，使用"宜/忌/适合/不宜"等格式。
5. jewelry.meaning 约15字。
6. 所有内容需基于提供的星盘信息进行个性化解读。`;
}

/**
 * 从 .env 文件读取配置
 */
async function loadEnvConfig() {
    try {
        const envResponse = await fetch('.env');
        if (envResponse.ok) {
            const envContent = await envResponse.text();
            const lines = envContent.split('\n');
            const config = {};
            
            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine && !trimmedLine.startsWith('#')) {
                    const [key, ...valueParts] = trimmedLine.split('=');
                    if (key && valueParts.length > 0) {
                        config[key] = valueParts.join('=').trim();
                    }
                }
            }
            
            console.log('从 .env 文件读取配置成功:', Object.keys(config));
            return config;
        }
    } catch (error) {
        console.warn('无法读取 .env 文件:', error);
    }
    return {};
}

/**
 * 调用 Cloudflare Pages Functions 获取星盘分析
 */
async function callSiliconFlowAPI(chartData) {
    try {
        // 从 .env 文件读取 Pages Functions URL
        const config = await loadEnvConfig();
        let apiUrl = config.API_URL;

        if (!apiUrl || apiUrl === 'https://your-app.pages.dev') {
            console.warn('未配置 API_URL，使用本地模拟数据');
            console.warn('请在 .env 文件中设置 API_URL');
            return generateMockAnalysis(chartData.planets);
        }

        const prompt = generatePrompt(chartData);

        // 调用 Pages Functions
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API 错误响应:', errorText);
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();

        if (!data.result || !data.result.content) {
            throw new Error('API 返回数据格式错误');
        }

        const content = data.result.content;

        // 解析 JSON 响应
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('无法解析 API 返回的 JSON');
        }
    } catch (error) {
        console.error('API 调用失败:', error);
        // 如果 API 调用失败，使用本地模拟数据
        return generateMockAnalysis(chartData.planets);
    }
}

/**
 * 导出模块
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        callSiliconFlowAPI,
        generatePrompt,
        loadEnvConfig
    };
}
