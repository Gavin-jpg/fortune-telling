/**
 * API 调用模块
 * 负责与 Cloudflare Pages Functions 通信
 */

// 星体-星座特征词映射表 (12星座 × 6星体)
const TRAIT_MAP = {
    sun: {
        '白羊座': '热情勇敢', '金牛座': '稳重踏实', '双子座': '机智灵动',
        '巨蟹座': '温柔体贴', '狮子座': '自信霸气', '处女座': '追求完美',
        '天秤座': '优雅和谐', '天蝎座': '执着到底', '射手座': '自由奔放',
        '摩羯座': '坚韧不拔', '水瓶座': '独立创新', '双鱼座': '富有同情心'
    },
    moon: {
        '白羊座': '情绪热烈', '金牛座': '情感稳定', '双子座': '思维敏捷',
        '巨蟹座': '情感细腻', '狮子座': '渴望认可', '处女座': '注重细节',
        '天秤座': '寻求平衡', '天蝎座': '情感深沉', '射手座': '乐观向上',
        '摩羯座': '情感克制', '水瓶座': '理性独立', '双鱼座': '梦幻敏感'
    },
    ascendant: {
        '白羊座': '行动迅速', '金牛座': '稳重可靠', '双子座': '善于表达',
        '巨蟹座': '关怀备至', '狮子座': '魅力四射', '处女座': '做事细致',
        '天秤座': '平易近人', '天蝎座': '神秘深沉', '射手座': '开朗大方',
        '摩羯座': '成熟稳重', '水瓶座': '独特个性', '双鱼座': '富有想象力'
    },
    mercury: {
        '白羊座': '思维敏捷', '金牛座': '稳重理性', '双子座': '口才出众',
        '巨蟹座': '情感表达', '狮子座': '自信表达', '处女座': '细致分析',
        '天秤座': '善于沟通', '天蝎座': '深刻洞察', '射手座': '乐观思维',
        '摩羯座': '逻辑清晰', '水瓶座': '创新思维', '双鱼座': '富有想象'
    },
    venus: {
        '白羊座': '直率热情', '金牛座': '享受物质', '双子座': '喜欢交流',
        '巨蟹座': '重视家庭', '狮子座': '浪漫炫耀', '处女座': '注重品质',
        '天秤座': '追求美感', '天蝎座': '情感投入', '射手座': '自由恋爱',
        '摩羯座': '认真负责', '水瓶座': '思想开放', '双鱼座': '浪漫幻想'
    },
    mars: {
        '白羊座': '勇往直前', '金牛座': '稳健行动', '双子座': '灵活应变',
        '巨蟹座': '守护家园', '狮子座': '积极主动', '处女座': '细致规划',
        '天秤座': '协调合作', '天蝎座': '精准出击', '射手座': '冒险精神',
        '摩羯座': '循序渐进', '水瓶座': '创新突破', '双鱼座': '直觉驱动'
    }
};

// 星体-星座-矿石映射表
const STONE_MAP = {
    sun: {
        '白羊座': '红宝石', '金牛座': '黄水晶', '双子座': '玛瑙',
        '巨蟹座': '珍珠', '狮子座': '太阳石', '处女座': '橄榄石',
        '天秤座': '粉晶', '天蝎座': '黑曜石', '射手座': '紫水晶',
        '摩羯座': '石榴石', '水瓶座': '海蓝宝', '双鱼座': '月光石'
    },
    moon: {
        '白羊座': '石榴石', '金牛座': '绿松石', '双子座': '蛋白石',
        '巨蟹座': '月光石', '狮子座': '琥珀', '处女座': '翡翠',
        '天秤座': '玫瑰石英', '天蝎座': '黑玛瑙', '射手座': '青金石',
        '摩羯座': '黑曜石', '水瓶座': '天河石', '双鱼座': '海蓝宝'
    },
    ascendant: {
        '白羊座': '红玉髓', '金牛座': '虎眼石', '双子座': '碧玺',
        '巨蟹座': '珍珠母', '狮子座': '金色石英', '处女座': '绿幽灵',
        '天秤座': '蛋白石', '天蝎座': '黑金砂', '射手座': '黄水晶',
        '摩羯座': '黑电气石', '水瓶座': '拉长石', '双鱼座': '紫锂辉'
    },
    venus: {
        '白羊座': '珊瑚', '金牛座': '粉红碧玺', '双子座': '青金石',
        '巨蟹座': '粉红蛋白石', '狮子座': '帝王托帕石', '处女座': '蓝纹玛瑙',
        '天秤座': '摩根石', '天蝎座': '石榴石', '射手座': '黄玉',
        '摩羯座': '烟水晶', '水瓶座': '欧泊', '双鱼座': '紫水晶'
    },
    mars: {
        '白羊座': '血石', '金牛座': '红玛瑙', '双子座': '红玉髓',
        '巨蟹座': '火欧泊', '狮子座': '红碧玺', '处女座': '红纹石',
        '天秤座': '红发晶', '天蝎座': '石榴石', '射手座': '托帕石',
        '摩羯座': '赤铁矿', '水瓶座': '锂辉石', '双鱼座': '紫发晶'
    }
};

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
 * 获取 API 配置
 */
function getApiConfig() {
    // 使用相对路径调用 Pages Functions
    const API_URL = '/api/chat';
    
    return {
        API_URL: API_URL
    };
}

/**
 * 调用 Cloudflare Pages Functions 获取星盘分析
 */
async function callSiliconFlowAPI(chartData) {
    try {
        // 获取配置
        const config = getApiConfig();
        let apiUrl = config.API_URL;

        if (!apiUrl || apiUrl === 'https://your-app.pages.dev') {
            console.warn('未配置 API_URL，使用本地模拟数据');
            console.warn('请在 api-client.js 中设置实际的 API_URL');
            return generateMockAnalysis(chartData.planets);
        }

        const prompt = generatePrompt(chartData);

        // 构建 OpenAI 聊天格式的请求
        const requestBody = {
            model: "deepseek-ai/DeepSeek-V3",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        };

        // 调用 Pages Functions
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API 错误响应:', errorText);
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('=== API 响应原始内容 ===');
        console.log(responseText);
        console.log('==========================');
        
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (jsonError) {
            console.error('=== 响应 JSON 解析错误 ===');
            console.error('原始响应:', responseText);
            console.error('JSON 解析错误:', jsonError);
            console.error('============================');
            throw new Error('API 返回的 JSON 格式错误');
        }

        // 解析 OpenAI 格式的响应
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('=== API 响应格式错误 ===');
            console.error('返回的数据结构:', data);
            console.error('期望的字段: data.choices[0].message');
            console.error('实际缺少的字段:', {
                hasChoices: !!data.choices,
                hasChoices0: !!(data.choices && data.choices[0]),
                hasMessage: !!(data.choices && data.choices[0] && data.choices[0].message)
            });
            console.error('========================');
            throw new Error('API 返回数据格式错误');
        }

        const content = data.choices[0].message.content;
        
        // 清理和修复可能的 JSON 格式问题
        let cleanedContent = content.trim();
        
        // 修复 "水 星" 中的空格问题
        cleanedContent = cleanedContent.replace(/"水 星"/g, '"水星"');
        
        // 尝试直接解析完整的响应
        try {
            return JSON.parse(cleanedContent);
        } catch (parseError) {
            console.warn('直接解析失败，尝试提取 JSON:', parseError);
            
            // 如果直接解析失败，尝试提取 JSON 部分
            const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            } else {
                console.error('API 返回内容:', cleanedContent);
                throw new Error('无法解析 API 返回的 JSON');
            }
        }
    } catch (error) {
        console.error('=== API 调用失败详情 ===');
        console.error('错误位置: callSiliconFlowAPI 函数');
        console.error('错误类型:', error.name);
        console.error('错误消息:', error.message);
        console.error('错误堆栈:', error.stack);
        console.error('传入的 chartData:', chartData);
        
        // 如果是网络错误，显示更多信息
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('网络连接错误，请检查网络或 API 地址');
        }
        
        // 如果是 JSON 解析错误，显示响应内容
        if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
            console.error('JSON 解析错误，检查大模型返回格式');
        }
        
        console.error('========================');
        
        // 如果 API 调用失败，使用本地模拟数据
        return generateMockAnalysis(chartData.planets);
    }
}

/**
 * 生成模拟分析数据（当 API 调用失败时使用）
 */
function generateMockAnalysis(planets) {
    const { sun, moon, ascendant, venus, mars, mercury } = planets;

    return {
        tags: {
            "太阳": TRAIT_MAP.sun[sun],
            "月亮": TRAIT_MAP.moon[moon],
            "上升": TRAIT_MAP.ascendant[ascendant],
            "金星": TRAIT_MAP.venus[venus],
            "火星": TRAIT_MAP.mars[mars],
            "水星": TRAIT_MAP.mercury[mercury]
        },
        analysis: {
            "整体性格特征": `太阳${sun}赋予你${TRAIT_MAP.sun[sun]}的核心性格`,
            "事业发展": `适合在需要${TRAIT_MAP.sun[sun]}的领域发展`,
            "爱情婚姻": `金星${venus}让你在爱情中${TRAIT_MAP.venus[venus]}`,
            "财富潜质": `火星${mars}的行动力带来${TRAIT_MAP.sun[sun]}的财运`,
            "天赋潜能": `水星${mercury}赋予你${TRAIT_MAP.mercury[mercury]}的智慧`
        },
        summary: "星盘昭示无限可能",
        dailyAdvice: "今日宜保持好心情",
        jewelry: {
            name: STONE_MAP.sun[sun],
            meaning: `增强${TRAIT_MAP.sun[sun]}的能量`,
            imageHint: STONE_MAP.sun[sun]
        }
    };
}

/**
 * 导出模块
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        callSiliconFlowAPI,
        generatePrompt,
        getApiConfig
    };
}
