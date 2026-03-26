// ========================================
// 静态数据配置 - 便于维护和扩展
// ========================================

const ZODIAC_SIGNS = [
    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
    '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
];

// 星体名称映射
const PLANET_NAMES = {
    sun: '太阳',
    moon: '月亮',
    ascendant: '上升',
    mercury: '水星',
    venus: '金星',
    mars: '火星'
};

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

// 个性化短语模板
const QUOTE_TEMPLATES = [
    '{planet}赋予你{trait}的品格',
    '你的{planet}带来{trait}的力量',
    '{planet}让你展现出{trait}的特质',
    '星盘中的{planet}昭示着你{trait}的本质',
    '{planet}为你点亮{trait}的人生篇章'
];

// 首饰图片映射
const JEWELRY_IMAGE_MAP = {
    "红宝石": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "黄水晶": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&h=400&fit=crop",
    "玛瑙": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    "珍珠": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    "太阳石": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    "橄榄石": "https://images.unsplash.com/photo-1579656381225-b5df4b06b935?w=400&h=400&fit=crop",
    "粉晶": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "黑曜石": "https://images.unsplash.com/photo-1606349976136-8bf895392620?w=400&h=400&fit=crop",
    "紫水晶": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "石榴石": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "海蓝宝": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    "月光石": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    "绿松石": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&h=400&fit=crop",
    "蛋白石": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "琥珀": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "翡翠": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "玫瑰石英": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "黑玛瑙": "https://images.unsplash.com/photo-1606349976136-8bf895392620?w=400&h=400&fit=crop",
    "青金石": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    "天河石": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    "红玉髓": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "虎眼石": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&h=400&fit=crop",
    "碧玺": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "珍珠母": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    "金色石英": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "绿幽灵": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&h=400&fit=crop",
    "黑金砂": "https://images.unsplash.com/photo-1606349976136-8bf895392620?w=400&h=400&fit=crop",
    "黄玉": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "黑电气石": "https://images.unsplash.com/photo-1606349976136-8bf895392620?w=400&h=400&fit=crop",
    "拉长石": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    "紫锂辉": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "珊瑚": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "粉红碧玺": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "粉红蛋白石": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "帝王托帕石": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "蓝纹玛瑙": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    "摩根石": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "烟水晶": "https://images.unsplash.com/photo-1606349976136-8bf895392620?w=400&h=400&fit=crop",
    "欧泊": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "血石": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "红玛瑙": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "红玉髓": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "火欧泊": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    "红碧玺": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "红纹石": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "红发晶": "https://images.unsplash.com/photo-1606349976136-8bf895392620?w=400&h=400&fit=crop",
    "托帕石": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "赤铁矿": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    "锂辉石": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "紫发晶": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "星月石": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    "星月石项链": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    "月光石吊坠": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    "紫水晶手链": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "粉晶项链": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    "黑曜石挂饰": "https://images.unsplash.com/photo-1606349976136-8bf895392620?w=400&h=400&fit=crop"
};

// ========================================
// 工具函数
// ========================================

// 根据月日判断星座
function getZodiacSign(month, day) {
    const zodiacRanges = [
        { name: '摩羯座', startMonth: 12, startDay: 22 },
        { name: '水瓶座', startMonth: 1, startDay: 20 },
        { name: '双鱼座', startMonth: 2, startDay: 19 },
        { name: '白羊座', startMonth: 3, startDay: 21 },
        { name: '金牛座', startMonth: 4, startDay: 20 },
        { name: '双子座', startMonth: 5, startDay: 21 },
        { name: '巨蟹座', startMonth: 6, startDay: 22 },
        { name: '狮子座', startMonth: 7, startDay: 23 },
        { name: '处女座', startMonth: 8, startDay: 23 },
        { name: '天秤座', startMonth: 9, startDay: 23 },
        { name: '天蝎座', startMonth: 10, startDay: 24 },
        { name: '射手座', startMonth: 11, startDay: 23 }
    ];

    for (let i = 0; i < zodiacRanges.length; i++) {
        const range = zodiacRanges[i];
        const nextRange = zodiacRanges[(i + 1) % zodiacRanges.length];

        if ((month === range.startMonth && day >= range.startDay) ||
            (month === ((range.startMonth % 12) + 1) && day < nextRange.startDay)) {
            return range.name;
        }
    }
    return zodiacRanges[0].name;
}

// ========================================
// 星盘计算函数 (使用 Astronomy Engine)
// ========================================

/**
 * 将黄道经度转换为星座
 * @param {number} eclipticLongitude - 黄道经度，范围 0-360 度
 * @returns {string} 星座名称
 */
function longitudeToZodiac(eclipticLongitude) {
    // 将经度归一化到 0-360 范围
    const normalizedLon = ((eclipticLongitude % 360) + 360) % 360;

    // 每个星座占 30 度
    const signIndex = Math.floor(normalizedLon / 30);

    return ZODIAC_SIGNS[signIndex];
}

/**
 * 计算太阳星座
 * 使用 Astronomy Engine 计算真实的太阳位置
 */
function calculateSunZodiac(birthDateTime) {
    try {
        // Astronomy Engine 使用 MakeTime 创建时间对象
        const time = Astronomy.MakeTime(birthDateTime);
        
        // 使用 HelioVector 获取天体位置
        const sunVector = Astronomy.HelioVector(Astronomy.Body.Sun, time);
        const ecliptic = Astronomy.Ecliptic(sunVector);
        
        return longitudeToZodiac(ecliptic.elon);
    } catch (error) {
        console.error('计算太阳星座时出错:', error);
        return getZodiacSign(birthDateTime.month, birthDateTime.day);
    }
}

/**
 * 计算上升星座
 * 使用 Astronomy Engine 计算真实的上升星座
 */
function calculateAscendant(birthDateTime, latitude, longitude) {
    try {
        // 创建 Astronomy Engine 时间对象
        const time = Astronomy.MakeTime(birthDateTime);
        
        // 获取恒星时
        const siderealTime = Astronomy.SiderealTime(time);

        // 黄道倾角 (约 23.44 度)
        const obliquity = 23.439;

        // 计算 RAMC (中天赤经)
        const ramc = siderealTime + (longitude / 15);

        // 计算上升点的黄道经度
        const ramcDeg = ramc * 15;
        const tanAsc = Math.sin(Astronomy.DegToRad(ramcDeg)) /
                      (Math.cos(Astronomy.DegToRad(ramcDeg)) *
                       Math.cos(Astronomy.DegToRad(obliquity)) +
                       Math.tan(Astronomy.DegToRad(latitude)) *
                       Math.sin(Astronomy.DegToRad(obliquity)));

        const ascendantEclipticLongitude = Astronomy.RadToDeg(Math.atan(tanAsc));

        return longitudeToZodiac(ascendantEclipticLongitude);
    } catch (error) {
        console.error('计算上升星座时出错:', error);
        // 如果计算失败，使用基于时间的简化方法
        const date = new Date(birthDateTime);
        const localHours = date.getHours();
        const signIndex = Math.floor(localHours / 2) % 12;
        return ZODIAC_SIGNS[signIndex];
    }
}

/**
 * 计算行星位置 (月亮、水星、金星、火星)
 * 使用 Astronomy Engine 计算真实的行星位置
 */
function calculatePlanetZodiac(birthDateTime, planetBody) {
    try {
        const time = Astronomy.MakeTime(birthDateTime);
        let body;

        switch (planetBody) {
            case 'moon':
                body = Astronomy.Body.Moon;
                break;
            case 'mercury':
                body = Astronomy.Body.Mercury;
                break;
            case 'venus':
                body = Astronomy.Body.Venus;
                break;
            case 'mars':
                body = Astronomy.Body.Mars;
                break;
            default:
                throw new Error(`未知的行星类型: ${planetBody}`);
        }

        // 获取天体位置向量
        const planetVector = Astronomy.HelioVector(body, time);
        const ecliptic = Astronomy.Ecliptic(planetVector);

        return longitudeToZodiac(ecliptic.elon);
    } catch (error) {
        console.error(`计算${planetBody}位置时出错:`, error);
        // 如果计算失败，使用基于日期的简化方法
        const date = new Date(birthDateTime);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const seed = month * 31 + day;
        const offsets = { moon: 3, mercury: 5, venus: 7, mars: 11 };
        const offset = offsets[planetBody] || 0;
        const signIndex = (seed + offset) % 12;
        return ZODIAC_SIGNS[signIndex];
    }
}

/**
 * 计算完整的星盘
 * 使用 Astronomy Engine 进行真实的天文计算
 */
function calculateNatalChart(name, birthDate, birthTime, timezone, province, city, district) {
    // 解析出生日期和时间
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hours, minutes] = birthTime.split(':').map(Number);

    // 调整为 UTC 时间
    const utcHours = hours - (timezone - 8);

    // 创建 Date 对象（Astronomy Engine 的 MakeTime 接受 Date 对象）
    const birthDateTime = new Date(year, month - 1, day, utcHours, minutes, 0);

    // 获取出生地经纬度
    const locationData = CITY_DATA[province];
    const latitude = locationData ? locationData.lat : 39.9042;
    const longitude = locationData ? locationData.lng : 116.4074;

    // 计算各星体星座
    const sunZodiac = calculateSunZodiac(birthDateTime);
    const ascendantZodiac = calculateAscendant(birthDateTime, latitude, longitude);
    const moonZodiac = calculatePlanetZodiac(birthDateTime, 'moon');
    const mercuryZodiac = calculatePlanetZodiac(birthDateTime, 'mercury');
    const venusZodiac = calculatePlanetZodiac(birthDateTime, 'venus');
    const marsZodiac = calculatePlanetZodiac(birthDateTime, 'mars');

    return {
        name,
        location: `${province}${city}${district}`,
        planets: {
            sun: sunZodiac,
            moon: moonZodiac,
            ascendant: ascendantZodiac,
            mercury: mercuryZodiac,
            venus: venusZodiac,
            mars: marsZodiac
        }
    };
}

// ========================================
// 级联选择器逻辑 (来自 cascader-demo.html)
// ========================================

let cityCascaderData = [];
let cascaderOverlay = null;
let selectedPath = {
    province: null,
    city: null,
    district: null
};

// 准备级联数据
function prepareCascaderData() {
    if (typeof CITY_DATA !== 'undefined') {
        cityCascaderData = Object.keys(CITY_DATA).map(provinceName => {
            const province = CITY_DATA[provinceName];
            const cities = province.cities;
            const cityChildren = [];

            for (const cityName in cities) {
                const districts = cities[cityName];
                const districtChildren = districts.map(districtName => ({
                    label: districtName,
                    value: districtName
                }));

                cityChildren.push({
                    label: cityName,
                    value: cityName,
                    children: districtChildren
                });
            }

            return {
                label: provinceName,
                value: provinceName,
                children: cityChildren
            };
        });
    } else {
        console.error('city-data.js 未加载，使用备用数据');
        // 备用模拟数据
        cityCascaderData = [
            {
                label: '北京市',
                value: '110000',
                children: [
                    {
                        label: '北京市',
                        value: '110100',
                        children: [
                            { label: '东城区', value: '110101' },
                            { label: '西城区', value: '110102' },
                            { label: '朝阳区', value: '110105' }
                        ]
                    }
                ]
            }
        ];
    }
}

// 创建级联选择器弹窗
function createCascaderOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'cascader-overlay';
    overlay.id = 'cascaderOverlay';

    const panel = document.createElement('div');
    panel.className = 'cascader-panel';

    // 标题栏
    const header = document.createElement('div');
    header.className = 'cascader-header';

    const title = document.createElement('h3');
    title.textContent = '选择出生地点';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cascader-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // 选项容器
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'cascader-options';
    optionsContainer.id = 'cascaderOptions';

    // 确认按钮
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'cascader-confirm';
    confirmBtn.textContent = '确定';
    confirmBtn.addEventListener('click', confirmCascaderSelection);

    panel.appendChild(header);
    panel.appendChild(optionsContainer);
    panel.appendChild(confirmBtn);
    overlay.appendChild(panel);

    document.body.appendChild(overlay);
    cascaderOverlay = overlay;

    // 点击遮罩关闭
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('show');
        }
    });

    // 初始化第一级选项
    renderLevelOptions(0, cityCascaderData);

    // 初始化输入框点击事件
    createCascaderInput();
}

// 创建输入框
function createCascaderInput() {
    const input = document.getElementById('cityInput');
    if (input) {
        input.addEventListener('click', () => {
            if (cascaderOverlay) {
                cascaderOverlay.classList.add('show');
            }
        });
    }
}

// 渲染级联选项
function renderLevelOptions(level, data) {
    const container = document.getElementById('cascaderOptions');
    if (!container) return;

    // 清除当前级别之后的选项
    while (container.children.length > level + 1) {
        container.removeChild(container.lastChild);
    }

    // 检查当前级别是否已存在
    let levelContainer = container.children[level];
    if (!levelContainer) {
        levelContainer = document.createElement('div');
        levelContainer.className = 'cascader-column';
        container.appendChild(levelContainer);
    }

    levelContainer.innerHTML = '';

    data.forEach(item => {
        const option = document.createElement('div');
        option.className = 'cascader-item';
        option.textContent = item.label;
        option.dataset.level = level;
        option.dataset.value = item.value;
        option.dataset.label = item.label;

        option.addEventListener('click', () => {
            // 移除同级其他选项的选中状态
            Array.from(levelContainer.children).forEach(child => {
                child.classList.remove('selected');
            });

            // 设置选中状态
            option.classList.add('selected');

            // 更新选中路径
            if (level === 0) {
                selectedPath.province = { value: item.value, label: item.label };
                selectedPath.city = null;
                selectedPath.district = null;
            } else if (level === 1) {
                selectedPath.city = { value: item.value, label: item.label };
                selectedPath.district = null;
            } else if (level === 2) {
                selectedPath.district = { value: item.value, label: item.label };
            }

            // 如果有子级，渲染下一级
            if (item.children && item.children.length > 0) {
                renderLevelOptions(level + 1, item.children);
            }
        });

        levelContainer.appendChild(option);
    });
}

// 确认选择
function confirmCascaderSelection() {
    if (selectedPath.province && selectedPath.city && selectedPath.district) {
        const input = document.getElementById('cityInput');
        if (input) {
            input.value = `${selectedPath.province.label} ${selectedPath.city.label} ${selectedPath.district.label}`;
        }

        if (cascaderOverlay) {
            cascaderOverlay.classList.remove('show');
        }
    } else {
        alert('请完整选择省市区');
    }
}

// ========================================
// API 调用相关
// ========================================

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

// ========================================
// UI 更新函数
// ========================================

/**
 * 显示结果
 */
function displayChart(chart, analysisResult) {
    // 显示用户信息
    document.getElementById('resultName').textContent = chart.name + ' 的星盘';
    document.getElementById('resultLocation').textContent = '出生地: ' + chart.location;

    // 显示个性化短语（来自大模型）
    document.getElementById('personalQuote').textContent = analysisResult.summary;

    // 显示今日建议
    document.getElementById('dailyAdvice').textContent = analysisResult.dailyAdvice || '今日宜保持好心情';

    // 显示首饰推荐
    const jewelry = analysisResult.jewelry;
    const jewelryImage = JEWELRY_IMAGE_MAP[jewelry.name] || JEWELRY_IMAGE_MAP[jewelry.imageHint] || JEWELRY_IMAGE_MAP['星月石项链'];

    document.querySelector('.jewelry-card .jewelry-name').textContent = '✨ ' + jewelry.name;
    document.querySelector('.jewelry-card .jewelry-meaning').textContent = jewelry.meaning;
    document.querySelector('.jewelry-card .jewelry-image').src = jewelryImage;

    // 显示各星体信息（使用大模型返回的标签）
    const planets = ['sun', 'moon', 'ascendant', 'venus', 'mars', 'mercury'];
    const planetNamesCN = {
        'sun': '太阳',
        'moon': '月亮',
        'ascendant': '上升',
        'venus': '金星',
        'mars': '火星',
        'mercury': '水星'
    };

    planets.forEach(planet => {
        const zodiac = chart.planets[planet];
        const planetName = PLANET_NAMES[planet];
        const tag = analysisResult.tags[planetNamesCN[planet]] || TRAIT_MAP[planet][zodiac];

        // 组合显示为"太阳射手"、"月亮双鱼"等格式
        const zodiacName = `${planetName}${zodiac.substring(0, 2)}`;

        document.getElementById(planet + 'ZodiacName').textContent = zodiacName;
        document.getElementById(planet + 'Trait').textContent = tag;
    });

    // 显示详细分析（来自大模型）
    document.getElementById('analysisPersonality').textContent = analysisResult.analysis['整体性格特征'];
    document.getElementById('analysisCareer').textContent = analysisResult.analysis['事业发展'];
    document.getElementById('analysisMarriage').textContent = analysisResult.analysis['爱情婚姻'];
    document.getElementById('analysisWealth').textContent = analysisResult.analysis['财富潜质'];
    document.getElementById('analysisTalent').textContent = analysisResult.analysis['天赋潜能'];
}

// ========================================
// 主流程控制
// ========================================

// 保存当前的表单数据
let currentFormData = null;

/**
 * 计算星盘主函数
 */
async function calculateChart() {
    const name = document.getElementById('name').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthDate = document.getElementById('birthdate').value;
    const birthTime = document.getElementById('birthtime').value;
    const timezone = 8; // 固定为UTC+8

    // 获取级联选择器选中的值
    const cityInputValue = document.getElementById('cityInput').value;
    if (!cityInputValue || cityInputValue === '请选择省/市/区') {
        alert('请选择出生地点');
        return;
    }

    const parts = cityInputValue.split(' ');
    if (parts.length !== 3) {
        alert('请完整选择省市区');
        return;
    }

    const province = parts[0];
    const city = parts[1];
    const district = parts[2];

    // 验证表单
    if (!name || !birthDate || !birthTime) {
        alert('请填写完整信息');
        return;
    }

    // 保存表单数据
    currentFormData = {
        name,
        gender,
        birthDate,
        birthTime,
        province,
        city,
        district,
        cityInputValue
    };

    // 显示加载动画
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('loading').classList.add('show');

    try {
        // 计算星盘
        const chart = calculateNatalChart(name, birthDate, birthTime, timezone, province, city, district);

        // 调用 SiliconFlow API 获取分析结果
        const chartWithGender = {
            ...chart,
            gender: gender === 'male' ? '男' : '女',
            birthDate: birthDate,
            birthTime: birthTime
        };
        const analysisResult = await callSiliconFlowAPI(chartWithGender);

        // 显示结果
        displayChart(chart, analysisResult);

        // 切换显示
        document.getElementById('loading').classList.remove('show');
        document.getElementById('resultSection').classList.add('show');
    } catch (error) {
        console.error('计算失败:', error);
        alert('计算失败，请重试');
        document.getElementById('loading').classList.remove('show');
        document.getElementById('formSection').style.display = 'block';
    }
}

/**
 * 再算一次 - 使用当前数据重新调用模型
 */
async function recalculate() {
    if (!currentFormData) {
        alert('没有可用的数据，请重新填写');
        return;
    }

    const { name, gender, birthDate, birthTime, province, city, district } = currentFormData;
    const timezone = 8; // 固定为UTC+8

    // 显示加载动画
    document.getElementById('loading').classList.add('show');

    try {
        // 计算星盘
        const chart = calculateNatalChart(name, birthDate, birthTime, timezone, province, city, district);

        // 调用 SiliconFlow API 获取分析结果
        const chartWithGender = {
            ...chart,
            gender: gender === 'male' ? '男' : '女',
            birthDate: birthDate,
            birthTime: birthTime
        };
        const analysisResult = await callSiliconFlowAPI(chartWithGender);

        // 显示结果
        displayChart(chart, analysisResult);

        // 切换显示
        document.getElementById('loading').classList.remove('show');
        document.getElementById('resultSection').classList.add('show');
    } catch (error) {
        console.error('计算失败:', error);
        alert('计算失败，请重试');
        document.getElementById('loading').classList.remove('show');
    }
}

/**
 * 重置表单 - 保留上一次填写的内容，返回填写页
 */
function resetForm() {
    // 不清空表单，保留用户之前填写的信息
    // currentFormData 也不清空，方便后续使用

    // 切换显示
    document.getElementById('resultSection').classList.remove('show');
    document.getElementById('formSection').style.display = 'block';
}

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // 测试 Astronomy Engine 是否加载成功
    if (typeof Astronomy === 'undefined') {
        console.error('Astronomy Engine 未加载成功！');
        alert('Astronomy Engine 加载失败，将使用简化算法');
    } else {
        console.log('Astronomy Engine 加载成功', Astronomy);
        // 测试 API
        try {
            const testTime = new Date();
            const time = Astronomy.MakeTime(testTime);
            console.log('MakeTime 测试成功:', time);
        } catch (e) {
            console.error('Astronomy API 测试失败:', e);
        }
    }

    // 准备级联数据
    prepareCascaderData();

    // 创建级联选择器
    createCascaderOverlay();

    // 初始化 Flatpickr 日期选择器
    flatpickr("#birthdate", {
        locale: "zh",
        dateFormat: "Y-m-d",
        defaultDate: "2000-01-01",
        maxDate: new Date(),
        yearRange: [1900, new Date().getFullYear()],
        disableMobile: true,
        theme: "dark"
    });

    // 初始化 Flatpickr 时间选择器
    flatpickr("#birthtime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultDate: new Date(),
        disableMobile: true,
        theme: "dark",
        clickOpens: true
    });
});
