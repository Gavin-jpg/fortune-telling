// ========================================
// 级联选择器模块
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
        console.log('使用 city-data.js 完整数据');
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
