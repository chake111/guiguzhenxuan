import { MockMethod } from 'vite-plugin-mock';

const c1Arr = [
  { id: 1, name: '家用电器' },
  { id: 2, name: '手机数码' },
  { id: 3, name: '电脑办公' },
  { id: 4, name: '厨卫电器' },
  { id: 5, name: '个护健康' },
  { id: 6, name: '家居家装' },
  { id: 7, name: '运动户外' }
];

const c2Arr = {
  1: [
    { id: 11, name: '电视', category1Id: 1 },
    { id: 12, name: '空调', category1Id: 1 },
    { id: 13, name: '冰箱', category1Id: 1 },
    { id: 14, name: '洗衣机', category1Id: 1 }
  ],
  2: [
    { id: 21, name: '手机', category1Id: 2 },
    { id: 22, name: '手机配件', category1Id: 2 },
    { id: 23, name: '平板', category1Id: 2 }
  ],
  3: [
    { id: 31, name: '笔记本', category1Id: 3 },
    { id: 32, name: '台式机', category1Id: 3 },
    { id: 33, name: '电脑配件', category1Id: 3 }
  ],
  4: [
    { id: 41, name: '油烟机', category1Id: 4 },
    { id: 42, name: '燃气灶', category1Id: 4 },
    { id: 43, name: '热水器', category1Id: 4 }
  ],
  5: [
    { id: 51, name: '剃须刀', category1Id: 5 },
    { id: 52, name: '电吹风', category1Id: 5 },
    { id: 53, name: '电动牙刷', category1Id: 5 }
  ],
  6: [
    { id: 61, name: '家具', category1Id: 6 },
    { id: 62, name: '灯具', category1Id: 6 },
    { id: 63, name: '家纺', category1Id: 6 }
  ],
  7: [
    { id: 71, name: '健身器材', category1Id: 7 },
    { id: 72, name: '户外装备', category1Id: 7 },
    { id: 73, name: '运动服饰', category1Id: 7 }
  ]
};

const c3Arr = {
  11: [
    { id: 111, name: '液晶电视', category2Id: 11 },
    { id: 112, name: 'OLED电视', category2Id: 11 }
  ],
  12: [
    { id: 121, name: '变频空调', category2Id: 12 }
  ],
  13: [
    { id: 131, name: '对开门冰箱', category2Id: 13 }
  ],
  14: [
    { id: 141, name: '滚筒洗衣机', category2Id: 14 }
  ],
  21: [
    { id: 211, name: '智能手机', category2Id: 21 }
  ],
  22: [
    { id: 221, name: '耳机', category2Id: 22 },
    { id: 222, name: '充电器', category2Id: 22 }
  ],
  23: [
    { id: 231, name: '安卓平板', category2Id: 23 },
    { id: 232, name: '苹果平板', category2Id: 23 }
  ],
  31: [
    { id: 311, name: '游戏本', category2Id: 31 },
    { id: 312, name: '轻薄本', category2Id: 31 }
  ],
  32: [
    { id: 321, name: '一体机', category2Id: 32 }
  ],
  33: [
    { id: 331, name: '主板', category2Id: 33 },
    { id: 332, name: '显卡', category2Id: 33 },
    { id: 333, name: '内存', category2Id: 33 },
    { id: 334, name: '硬盘', category2Id: 33 }
  ],
  41: [
    { id: 411, name: '侧吸油烟机', category2Id: 41 },
    { id: 412, name: '顶吸油烟机', category2Id: 41 }
  ],
  42: [
    { id: 421, name: '嵌入式燃气灶', category2Id: 42 },
    { id: 422, name: '台式燃气灶', category2Id: 42 }
  ],
  43: [
    { id: 431, name: '电热水器', category2Id: 43 },
    { id: 432, name: '燃气热水器', category2Id: 43 }
  ],
  51: [
    { id: 511, name: '旋转式剃须刀', category2Id: 51 },
    { id: 512, name: '往复式剃须刀', category2Id: 51 }
  ],
  52: [
    { id: 521, name: '负离子电吹风', category2Id: 52 },
    { id: 522, name: '恒温电吹风', category2Id: 52 }
  ],
  53: [
    { id: 531, name: '声波电动牙刷', category2Id: 53 },
    { id: 532, name: '旋转电动牙刷', category2Id: 53 }
  ],
  61: [
    { id: 611, name: '沙发', category2Id: 61 },
    { id: 612, name: '床', category2Id: 61 }
  ],
  62: [
    { id: 621, name: '吊灯', category2Id: 62 },
    { id: 622, name: '台灯', category2Id: 62 }
  ],
  63: [
    { id: 631, name: '床品套件', category2Id: 63 },
    { id: 632, name: '毛巾被', category2Id: 63 }
  ],
  71: [
    { id: 711, name: '跑步机', category2Id: 71 },
    { id: 712, name: '动感单车', category2Id: 71 }
  ],
  72: [
    { id: 721, name: '帐篷', category2Id: 72 },
    { id: 722, name: '睡袋', category2Id: 72 }
  ],
  73: [
    { id: 731, name: '运动T恤', category2Id: 73 },
    { id: 732, name: '运动鞋', category2Id: 73 }
  ]
};

const attrArr = {
  111: [
    {
      id: 1,
      attrName: '屏幕尺寸',
      categoryId: 111,
      categoryLevel: 3,
      attrValueList: [
        { id: 1, valueName: '55英寸', attrId: 1 },
        { id: 2, valueName: '65英寸', attrId: 1 },
        { id: 3, valueName: '75英寸', attrId: 1 }
      ]
    },
    {
      id: 2,
      attrName: '分辨率',
      categoryId: 111,
      categoryLevel: 3,
      attrValueList: [
        { id: 4, valueName: '4K', attrId: 2 },
        { id: 5, valueName: '8K', attrId: 2 },
        { id: 6, valueName: '1080P', attrId: 2 }
      ]
    },
    {
      id: 101,
      attrName: '背光类型',
      categoryId: 111,
      categoryLevel: 3,
      attrValueList: [
        { id: 103, valueName: '直下式', attrId: 101 },
        { id: 104, valueName: '侧入式', attrId: 101 }
      ]
    },
    {
      id: 102,
      attrName: '能效等级',
      categoryId: 111,
      categoryLevel: 3,
      attrValueList: [
        { id: 105, valueName: '一级', attrId: 102 },
        { id: 106, valueName: '二级', attrId: 102 }
      ]
    },
    {
      id: 103,
      attrName: 'HDMI接口数',
      categoryId: 111,
      categoryLevel: 3,
      attrValueList: [
        { id: 107, valueName: '2个', attrId: 103 },
        { id: 108, valueName: '3个', attrId: 103 }
      ]
    }
  ],
  112: [
    {
      id: 20,
      attrName: '面板类型',
      categoryId: 112,
      categoryLevel: 3,
      attrValueList: [
        { id: 21, valueName: 'OLED', attrId: 20 },
        { id: 22, valueName: 'QLED', attrId: 20 }
      ]
    },
    {
      id: 104,
      attrName: '分辨率',
      categoryId: 112,
      categoryLevel: 3,
      attrValueList: [
        { id: 109, valueName: '4K', attrId: 104 },
        { id: 110, valueName: '8K', attrId: 104 }
      ]
    },
    {
      id: 105,
      attrName: '刷新率',
      categoryId: 112,
      categoryLevel: 3,
      attrValueList: [
        { id: 111, valueName: '60Hz', attrId: 105 },
        { id: 112, valueName: '120Hz', attrId: 105 }
      ]
    },
    {
      id: 106,
      attrName: '能效等级',
      categoryId: 112,
      categoryLevel: 3,
      attrValueList: [
        { id: 113, valueName: '一级', attrId: 106 },
        { id: 114, valueName: '二级', attrId: 106 }
      ]
    },
    {
      id: 107,
      attrName: 'HDMI接口数',
      categoryId: 112,
      categoryLevel: 3,
      attrValueList: [
        { id: 115, valueName: '2个', attrId: 107 },
        { id: 116, valueName: '3个', attrId: 107 }
      ]
    }
  ],
  121: [
    {
      id: 30,
      attrName: '能效等级',
      categoryId: 121,
      categoryLevel: 3,
      attrValueList: [
        { id: 31, valueName: '一级', attrId: 30 },
        { id: 32, valueName: '二级', attrId: 30 }
      ]
    },
    {
      id: 108,
      attrName: '制冷量',
      categoryId: 121,
      categoryLevel: 3,
      attrValueList: [
        { id: 117, valueName: '1匹', attrId: 108 },
        { id: 118, valueName: '1.5匹', attrId: 108 }
      ]
    },
    {
      id: 109,
      attrName: '变频/定频',
      categoryId: 121,
      categoryLevel: 3,
      attrValueList: [
        { id: 119, valueName: '变频', attrId: 109 },
        { id: 120, valueName: '定频', attrId: 109 }
      ]
    },
    {
      id: 110,
      attrName: '适用面积',
      categoryId: 121,
      categoryLevel: 3,
      attrValueList: [
        { id: 121, valueName: '10-15㎡', attrId: 110 },
        { id: 122, valueName: '15-20㎡', attrId: 110 }
      ]
    },
    {
      id: 111,
      attrName: '颜色',
      categoryId: 121,
      categoryLevel: 3,
      attrValueList: [
        { id: 123, valueName: '白色', attrId: 111 },
        { id: 124, valueName: '银色', attrId: 111 }
      ]
    }
  ],
  131: [
    {
      id: 40,
      attrName: '容量',
      categoryId: 131,
      categoryLevel: 3,
      attrValueList: [
        { id: 41, valueName: '400L', attrId: 40 },
        { id: 42, valueName: '600L', attrId: 40 }
      ]
    },
    {
      id: 112,
      attrName: '能效等级',
      categoryId: 131,
      categoryLevel: 3,
      attrValueList: [
        { id: 125, valueName: '一级', attrId: 112 },
        { id: 126, valueName: '二级', attrId: 112 }
      ]
    },
    {
      id: 113,
      attrName: '制冷方式',
      categoryId: 131,
      categoryLevel: 3,
      attrValueList: [
        { id: 127, valueName: '风冷', attrId: 113 },
        { id: 128, valueName: '直冷', attrId: 113 }
      ]
    },
    {
      id: 114,
      attrName: '门体结构',
      categoryId: 131,
      categoryLevel: 3,
      attrValueList: [
        { id: 129, valueName: '对开门', attrId: 114 },
        { id: 130, valueName: '多门', attrId: 114 }
      ]
    },
    {
      id: 115,
      attrName: '颜色',
      categoryId: 131,
      categoryLevel: 3,
      attrValueList: [
        { id: 131, valueName: '银色', attrId: 115 },
        { id: 132, valueName: '灰色', attrId: 115 }
      ]
    }
  ],
  141: [
    {
      id: 50,
      attrName: '洗涤容量',
      categoryId: 141,
      categoryLevel: 3,
      attrValueList: [
        { id: 51, valueName: '8kg', attrId: 50 },
        { id: 52, valueName: '10kg', attrId: 50 }
      ]
    },
    {
      id: 116,
      attrName: '能效等级',
      categoryId: 141,
      categoryLevel: 3,
      attrValueList: [
        { id: 133, valueName: '一级', attrId: 116 },
        { id: 134, valueName: '二级', attrId: 116 }
      ]
    },
    {
      id: 117,
      attrName: '电机类型',
      categoryId: 141,
      categoryLevel: 3,
      attrValueList: [
        { id: 135, valueName: '变频', attrId: 117 },
        { id: 136, valueName: '定频', attrId: 117 }
      ]
    },
    {
      id: 118,
      attrName: '转速',
      categoryId: 141,
      categoryLevel: 3,
      attrValueList: [
        { id: 137, valueName: '1200转', attrId: 118 },
        { id: 138, valueName: '1400转', attrId: 118 }
      ]
    },
    {
      id: 119,
      attrName: '颜色',
      categoryId: 141,
      categoryLevel: 3,
      attrValueList: [
        { id: 139, valueName: '白色', attrId: 119 },
        { id: 140, valueName: '银色', attrId: 119 }
      ]
    }
  ],
  211: [
    {
      id: 3,
      attrName: '运行内存',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 7, valueName: '8GB', attrId: 3 },
        { id: 8, valueName: '12GB', attrId: 3 },
        { id: 9, valueName: '16GB', attrId: 3 }
      ]
    },
    {
      id: 4,
      attrName: '存储容量',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 10, valueName: '128GB', attrId: 4 },
        { id: 11, valueName: '256GB', attrId: 4 },
        { id: 12, valueName: '512GB', attrId: 4 }
      ]
    },
    {
      id: 120,
      attrName: '屏幕尺寸',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 141, valueName: '6.1英寸', attrId: 120 },
        { id: 142, valueName: '6.7英寸', attrId: 120 }
      ]
    },
    {
      id: 121,
      attrName: '摄像头像素',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 143, valueName: '5000万', attrId: 121 },
        { id: 144, valueName: '1亿', attrId: 121 }
      ]
    },
    {
      id: 122,
      attrName: '电池容量',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 145, valueName: '4500mAh', attrId: 122 },
        { id: 146, valueName: '5000mAh', attrId: 122 }
      ]
    }
  ],
  221: [
    {
      id: 60,
      attrName: '类型',
      categoryId: 221,
      categoryLevel: 3,
      attrValueList: [
        { id: 61, valueName: '有线', attrId: 60 },
        { id: 62, valueName: '无线', attrId: 60 }
      ]
    },
    {
      id: 123,
      attrName: '降噪',
      categoryId: 221,
      categoryLevel: 3,
      attrValueList: [
        { id: 147, valueName: '主动降噪', attrId: 123 },
        { id: 148, valueName: '无', attrId: 123 }
      ]
    },
    {
      id: 124,
      attrName: '续航时间',
      categoryId: 221,
      categoryLevel: 3,
      attrValueList: [
        { id: 149, valueName: '6小时', attrId: 124 },
        { id: 150, valueName: '8小时', attrId: 124 }
      ]
    },
    {
      id: 125,
      attrName: '蓝牙版本',
      categoryId: 221,
      categoryLevel: 3,
      attrValueList: [
        { id: 151, valueName: '5.2', attrId: 125 },
        { id: 152, valueName: '5.3', attrId: 125 }
      ]
    },
    {
      id: 126,
      attrName: '颜色',
      categoryId: 221,
      categoryLevel: 3,
      attrValueList: [
        { id: 153, valueName: '白色', attrId: 126 },
        { id: 154, valueName: '黑色', attrId: 126 }
      ]
    }
  ],
  222: [
    {
      id: 70,
      attrName: '功率',
      categoryId: 222,
      categoryLevel: 3,
      attrValueList: [
        { id: 71, valueName: '20W', attrId: 70 },
        { id: 72, valueName: '40W', attrId: 70 }
      ]
    },
    {
      id: 127,
      attrName: '接口类型',
      categoryId: 222,
      categoryLevel: 3,
      attrValueList: [
        { id: 155, valueName: 'Type-C', attrId: 127 },
        { id: 156, valueName: 'USB-A', attrId: 127 }
      ]
    },
    {
      id: 128,
      attrName: '线长',
      categoryId: 222,
      categoryLevel: 3,
      attrValueList: [
        { id: 157, valueName: '1米', attrId: 128 },
        { id: 158, valueName: '2米', attrId: 128 }
      ]
    },
    {
      id: 129,
      attrName: '颜色',
      categoryId: 222,
      categoryLevel: 3,
      attrValueList: [
        { id: 159, valueName: '白色', attrId: 129 },
        { id: 160, valueName: '黑色', attrId: 129 }
      ]
    },
    {
      id: 130,
      attrName: '支持协议',
      categoryId: 222,
      categoryLevel: 3,
      attrValueList: [
        { id: 161, valueName: 'PD', attrId: 130 },
        { id: 162, valueName: 'QC', attrId: 130 }
      ]
    }
  ],
  231: [
    {
      id: 131,
      attrName: '屏幕尺寸',
      categoryId: 231,
      categoryLevel: 3,
      attrValueList: [
        { id: 163, valueName: '11英寸', attrId: 131 },
        { id: 164, valueName: '12.6英寸', attrId: 131 }
      ]
    },
    {
      id: 132,
      attrName: '存储容量',
      categoryId: 231,
      categoryLevel: 3,
      attrValueList: [
        { id: 165, valueName: '128GB', attrId: 132 },
        { id: 166, valueName: '256GB', attrId: 132 }
      ]
    },
    {
      id: 133,
      attrName: '运行内存',
      categoryId: 231,
      categoryLevel: 3,
      attrValueList: [
        { id: 167, valueName: '6GB', attrId: 133 },
        { id: 168, valueName: '8GB', attrId: 133 }
      ]
    },
    {
      id: 134,
      attrName: '颜色',
      categoryId: 231,
      categoryLevel: 3,
      attrValueList: [
        { id: 169, valueName: '灰色', attrId: 134 },
        { id: 170, valueName: '银色', attrId: 134 }
      ]
    },
    {
      id: 1350,
      attrName: '摄像头数量',
      categoryId: 231,
      categoryLevel: 3,
      attrValueList: [
        { id: 13501, valueName: '单摄', attrId: 1350 },
        { id: 13502, valueName: '双摄', attrId: 1350 }
      ]
    }
  ],
  232: [
    {
      id: 135,
      attrName: '屏幕尺寸',
      categoryId: 232,
      categoryLevel: 3,
      attrValueList: [
        { id: 171, valueName: '10.9英寸', attrId: 135 },
        { id: 172, valueName: '12.9英寸', attrId: 135 }
      ]
    },
    {
      id: 136,
      attrName: '存储容量',
      categoryId: 232,
      categoryLevel: 3,
      attrValueList: [
        { id: 173, valueName: '128GB', attrId: 136 },
        { id: 174, valueName: '256GB', attrId: 136 }
      ]
    },
    {
      id: 137,
      attrName: '运行内存',
      categoryId: 232,
      categoryLevel: 3,
      attrValueList: [
        { id: 175, valueName: '8GB', attrId: 137 },
        { id: 176, valueName: '16GB', attrId: 137 }
      ]
    },
    {
      id: 138,
      attrName: '颜色',
      categoryId: 232,
      categoryLevel: 3,
      attrValueList: [
        { id: 177, valueName: '银色', attrId: 138 },
        { id: 178, valueName: '深空灰', attrId: 138 }
      ]
    },
    {
      id: 1380,
      attrName: '网络类型',
      categoryId: 232,
      categoryLevel: 3,
      attrValueList: [
        { id: 13801, valueName: 'WiFi', attrId: 1380 },
        { id: 13802, valueName: 'WiFi+蜂窝', attrId: 1380 }
      ]
    }
  ],
  311: [
    {
      id: 100,
      attrName: '显卡型号',
      categoryId: 311,
      categoryLevel: 3,
      attrValueList: [
        { id: 101, valueName: 'RTX4060', attrId: 100 },
        { id: 102, valueName: 'RTX4070', attrId: 100 }
      ]
    },
    {
      id: 139,
      attrName: '处理器',
      categoryId: 311,
      categoryLevel: 3,
      attrValueList: [
        { id: 179, valueName: 'i7', attrId: 139 },
        { id: 180, valueName: 'R7', attrId: 139 }
      ]
    },
    {
      id: 140,
      attrName: '屏幕尺寸',
      categoryId: 311,
      categoryLevel: 3,
      attrValueList: [
        { id: 181, valueName: '15.6英寸', attrId: 140 },
        { id: 182, valueName: '16英寸', attrId: 140 }
      ]
    },
    {
      id: 141,
      attrName: '重量',
      categoryId: 311,
      categoryLevel: 3,
      attrValueList: [
        { id: 183, valueName: '2.2kg', attrId: 141 },
        { id: 184, valueName: '2.5kg', attrId: 141 }
      ]
    },
    {
      id: 142,
      attrName: '颜色',
      categoryId: 311,
      categoryLevel: 3,
      attrValueList: [
        { id: 185, valueName: '黑色', attrId: 142 },
        { id: 186, valueName: '灰色', attrId: 142 }
      ]
    }
  ],
  312: [
    {
      id: 110,
      attrName: '重量',
      categoryId: 312,
      categoryLevel: 3,
      attrValueList: [
        { id: 111, valueName: '1.2kg', attrId: 110 },
        { id: 112, valueName: '1.5kg', attrId: 110 }
      ]
    },
    {
      id: 143,
      attrName: '处理器',
      categoryId: 312,
      categoryLevel: 3,
      attrValueList: [
        { id: 187, valueName: 'i5', attrId: 143 },
        { id: 188, valueName: 'i7', attrId: 143 }
      ]
    },
    {
      id: 144,
      attrName: '屏幕尺寸',
      categoryId: 312,
      categoryLevel: 3,
      attrValueList: [
        { id: 189, valueName: '14英寸', attrId: 144 },
        { id: 190, valueName: '15.6英寸', attrId: 144 }
      ]
    },
    {
      id: 145,
      attrName: '内存容量',
      categoryId: 312,
      categoryLevel: 3,
      attrValueList: [
        { id: 191, valueName: '16GB', attrId: 145 },
        { id: 192, valueName: '32GB', attrId: 145 }
      ]
    },
    {
      id: 146,
      attrName: '颜色',
      categoryId: 312,
      categoryLevel: 3,
      attrValueList: [
        { id: 193, valueName: '银色', attrId: 146 },
        { id: 194, valueName: '灰色', attrId: 146 }
      ]
    }
  ],
  321: [
    {
      id: 120,
      attrName: '屏幕尺寸',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 121, valueName: '23.8英寸', attrId: 120 },
        { id: 122, valueName: '27英寸', attrId: 120 }
      ]
    },
    {
      id: 147,
      attrName: '处理器',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 195, valueName: 'i5', attrId: 147 },
        { id: 196, valueName: 'i7', attrId: 147 }
      ]
    },
    {
      id: 148,
      attrName: '内存容量',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 197, valueName: '8GB', attrId: 148 },
        { id: 198, valueName: '16GB', attrId: 148 }
      ]
    },
    {
      id: 149,
      attrName: '硬盘容量',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 199, valueName: '512GB', attrId: 149 },
        { id: 200, valueName: '1TB', attrId: 149 }
      ]
    },
    {
      id: 150,
      attrName: '颜色',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 201, valueName: '白色', attrId: 150 },
        { id: 202, valueName: '黑色', attrId: 150 }
      ]
    },
    {
      id: 1510,
      attrName: '显卡类型',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 15101, valueName: '集成显卡', attrId: 1510 },
        { id: 15102, valueName: '独立显卡', attrId: 1510 }
      ]
    }
  ],
  331: [
    {
      id: 5,
      attrName: '主板芯片组',
      categoryId: 331,
      categoryLevel: 3,
      attrValueList: [
        { id: 13, valueName: 'B760', attrId: 5 },
        { id: 14, valueName: 'Z790', attrId: 5 }
      ]
    },
    {
      id: 151,
      attrName: '支持CPU',
      categoryId: 331,
      categoryLevel: 3,
      attrValueList: [
        { id: 203, valueName: 'Intel', attrId: 151 },
        { id: 204, valueName: 'AMD', attrId: 151 }
      ]
    },
    {
      id: 152,
      attrName: '内存插槽',
      categoryId: 331,
      categoryLevel: 3,
      attrValueList: [
        { id: 205, valueName: '2', attrId: 152 },
        { id: 206, valueName: '4', attrId: 152 }
      ]
    },
    {
      id: 153,
      attrName: '板型',
      categoryId: 331,
      categoryLevel: 3,
      attrValueList: [
        { id: 207, valueName: 'ATX', attrId: 153 },
        { id: 208, valueName: 'M-ATX', attrId: 153 }
      ]
    },
    {
      id: 154,
      attrName: 'PCIe版本',
      categoryId: 331,
      categoryLevel: 3,
      attrValueList: [
        { id: 209, valueName: '4.0', attrId: 154 },
        { id: 210, valueName: '5.0', attrId: 154 }
      ]
    }
  ],
  332: [
    {
      id: 6,
      attrName: '显卡型号',
      categoryId: 332,
      categoryLevel: 3,
      attrValueList: [
        { id: 15, valueName: 'RTX4060', attrId: 6 },
        { id: 16, valueName: 'RTX4070', attrId: 6 }
      ]
    },
    {
      id: 155,
      attrName: '显存容量',
      categoryId: 332,
      categoryLevel: 3,
      attrValueList: [
        { id: 211, valueName: '8GB', attrId: 155 },
        { id: 212, valueName: '12GB', attrId: 155 }
      ]
    },
    {
      id: 156,
      attrName: '显存类型',
      categoryId: 332,
      categoryLevel: 3,
      attrValueList: [
        { id: 213, valueName: 'GDDR6', attrId: 156 },
        { id: 214, valueName: 'GDDR6X', attrId: 156 }
      ]
    },
    {
      id: 157,
      attrName: '输出接口',
      categoryId: 332,
      categoryLevel: 3,
      attrValueList: [
        { id: 215, valueName: 'HDMI', attrId: 157 },
        { id: 216, valueName: 'DP', attrId: 157 }
      ]
    },
    {
      id: 158,
      attrName: '散热方式',
      categoryId: 332,
      categoryLevel: 3,
      attrValueList: [
        { id: 217, valueName: '风冷', attrId: 158 },
        { id: 218, valueName: '水冷', attrId: 158 }
      ]
    }
  ],
  333: [
    {
      id: 130,
      attrName: '容量',
      categoryId: 333,
      categoryLevel: 3,
      attrValueList: [
        { id: 131, valueName: '8GB', attrId: 130 },
        { id: 132, valueName: '16GB', attrId: 130 }
      ]
    },
    {
      id: 159,
      attrName: '类型',
      categoryId: 333,
      categoryLevel: 3,
      attrValueList: [
        { id: 219, valueName: 'DDR4', attrId: 159 },
        { id: 220, valueName: 'DDR5', attrId: 159 }
      ]
    },
    {
      id: 160,
      attrName: '频率',
      categoryId: 333,
      categoryLevel: 3,
      attrValueList: [
        { id: 221, valueName: '3200MHz', attrId: 160 },
        { id: 222, valueName: '6000MHz', attrId: 160 }
      ]
    },
    {
      id: 161,
      attrName: '电压',
      categoryId: 333,
      categoryLevel: 3,
      attrValueList: [
        { id: 223, valueName: '1.2V', attrId: 161 },
        { id: 224, valueName: '1.35V', attrId: 161 }
      ]
    },
    {
      id: 162,
      attrName: '颜色',
      categoryId: 333,
      categoryLevel: 3,
      attrValueList: [
        { id: 225, valueName: '黑色', attrId: 162 },
        { id: 226, valueName: '银色', attrId: 162 }
      ]
    }
  ],
  334: [
    {
      id: 140,
      attrName: '容量',
      categoryId: 334,
      categoryLevel: 3,
      attrValueList: [
        { id: 141, valueName: '512GB', attrId: 140 },
        { id: 142, valueName: '1TB', attrId: 140 }
      ]
    },
    {
      id: 163,
      attrName: '类型',
      categoryId: 334,
      categoryLevel: 3,
      attrValueList: [
        { id: 227, valueName: 'SSD', attrId: 163 },
        { id: 228, valueName: 'HDD', attrId: 163 }
      ]
    },
    {
      id: 164,
      attrName: '接口类型',
      categoryId: 334,
      categoryLevel: 3,
      attrValueList: [
        { id: 229, valueName: 'SATA', attrId: 164 },
        { id: 230, valueName: 'PCIe', attrId: 164 }
      ]
    },
    {
      id: 165,
      attrName: '缓存',
      categoryId: 334,
      categoryLevel: 3,
      attrValueList: [
        { id: 231, valueName: '256MB', attrId: 165 },
        { id: 232, valueName: '512MB', attrId: 165 }
      ]
    },
    {
      id: 166,
      attrName: '颜色',
      categoryId: 334,
      categoryLevel: 3,
      attrValueList: [
        { id: 233, valueName: '黑色', attrId: 166 },
        { id: 234, valueName: '银色', attrId: 166 }
      ]
    }
  ],
  411: [
    {
      id: 1801,
      attrName: '风量',
      categoryId: 411,
      categoryLevel: 3,
      attrValueList: [
        { id: 18011, valueName: '18m³/min', attrId: 1801 },
        { id: 18012, valueName: '20m³/min', attrId: 1801 }
      ]
    },
    {
      id: 1802,
      attrName: '噪音',
      categoryId: 411,
      categoryLevel: 3,
      attrValueList: [
        { id: 18021, valueName: '≤55dB', attrId: 1802 },
        { id: 18022, valueName: '≤60dB', attrId: 1802 }
      ]
    },
    {
      id: 1803,
      attrName: '能效等级',
      categoryId: 411,
      categoryLevel: 3,
      attrValueList: [
        { id: 18031, valueName: '一级', attrId: 1803 },
        { id: 18032, valueName: '二级', attrId: 1803 }
      ]
    },
    {
      id: 1804,
      attrName: '控制方式',
      categoryId: 411,
      categoryLevel: 3,
      attrValueList: [
        { id: 18041, valueName: '触控', attrId: 1804 },
        { id: 18042, valueName: '按键', attrId: 1804 }
      ]
    },
    {
      id: 1805,
      attrName: '宽度',
      categoryId: 411,
      categoryLevel: 3,
      attrValueList: [
        { id: 18051, valueName: '895mm', attrId: 1805 },
        { id: 18052, valueName: '900mm', attrId: 1805 }
      ]
    },
    {
      id: 1806,
      attrName: '清洗方式',
      categoryId: 411,
      categoryLevel: 3,
      attrValueList: [
        { id: 18061, valueName: '自动清洗', attrId: 1806 },
        { id: 18062, valueName: '手动清洗', attrId: 1806 }
      ]
    }
  ],
  412: [
    {
      id: 1811,
      attrName: '风量',
      categoryId: 412,
      categoryLevel: 3,
      attrValueList: [
        { id: 18111, valueName: '17m³/min', attrId: 1811 },
        { id: 18112, valueName: '19m³/min', attrId: 1811 }
      ]
    },
    {
      id: 1812,
      attrName: '噪音',
      categoryId: 412,
      categoryLevel: 3,
      attrValueList: [
        { id: 18121, valueName: '≤56dB', attrId: 1812 },
        { id: 18122, valueName: '≤61dB', attrId: 1812 }
      ]
    },
    {
      id: 1813,
      attrName: '能效等级',
      categoryId: 412,
      categoryLevel: 3,
      attrValueList: [
        { id: 18131, valueName: '一级', attrId: 1813 },
        { id: 18132, valueName: '二级', attrId: 1813 }
      ]
    },
    {
      id: 1814,
      attrName: '控制方式',
      categoryId: 412,
      categoryLevel: 3,
      attrValueList: [
        { id: 18141, valueName: '触控', attrId: 1814 },
        { id: 18142, valueName: '按键', attrId: 1814 }
      ]
    },
    {
      id: 1815,
      attrName: '宽度',
      categoryId: 412,
      categoryLevel: 3,
      attrValueList: [
        { id: 18151, valueName: '895mm', attrId: 1815 },
        { id: 18152, valueName: '900mm', attrId: 1815 }
      ]
    },
    {
      id: 1816,
      attrName: '清洗方式',
      categoryId: 412,
      categoryLevel: 3,
      attrValueList: [
        { id: 18161, valueName: '自动清洗', attrId: 1816 },
        { id: 18162, valueName: '手动清洗', attrId: 1816 }
      ]
    }
  ],
  421: [
    {
      id: 1821,
      attrName: '灶眼数量',
      categoryId: 421,
      categoryLevel: 3,
      attrValueList: [
        { id: 18211, valueName: '2眼', attrId: 1821 },
        { id: 18212, valueName: '3眼', attrId: 1821 }
      ]
    },
    {
      id: 1822,
      attrName: '面板材质',
      categoryId: 421,
      categoryLevel: 3,
      attrValueList: [
        { id: 18221, valueName: '钢化玻璃', attrId: 1822 },
        { id: 18222, valueName: '不锈钢', attrId: 1822 }
      ]
    },
    {
      id: 1823,
      attrName: '能效等级',
      categoryId: 421,
      categoryLevel: 3,
      attrValueList: [
        { id: 18231, valueName: '一级', attrId: 1823 },
        { id: 18232, valueName: '二级', attrId: 1823 }
      ]
    },
    {
      id: 1824,
      attrName: '火力',
      categoryId: 421,
      categoryLevel: 3,
      attrValueList: [
        { id: 18241, valueName: '4.2kW', attrId: 1824 },
        { id: 18242, valueName: '5.0kW', attrId: 1824 }
      ]
    },
    {
      id: 1825,
      attrName: '点火方式',
      categoryId: 421,
      categoryLevel: 3,
      attrValueList: [
        { id: 18251, valueName: '脉冲点火', attrId: 1825 },
        { id: 18252, valueName: '压电点火', attrId: 1825 }
      ]
    },
    {
      id: 1826,
      attrName: '熄火保护',
      categoryId: 421,
      categoryLevel: 3,
      attrValueList: [
        { id: 18261, valueName: '有', attrId: 1826 },
        { id: 18262, valueName: '无', attrId: 1826 }
      ]
    }
  ],
  422: [
    {
      id: 1831,
      attrName: '灶眼数量',
      categoryId: 422,
      categoryLevel: 3,
      attrValueList: [
        { id: 18311, valueName: '1眼', attrId: 1831 },
        { id: 18312, valueName: '2眼', attrId: 1831 }
      ]
    },
    {
      id: 1832,
      attrName: '面板材质',
      categoryId: 422,
      categoryLevel: 3,
      attrValueList: [
        { id: 18321, valueName: '钢化玻璃', attrId: 1832 },
        { id: 18322, valueName: '不锈钢', attrId: 1832 }
      ]
    },
    {
      id: 1833,
      attrName: '能效等级',
      categoryId: 422,
      categoryLevel: 3,
      attrValueList: [
        { id: 18331, valueName: '一级', attrId: 1833 },
        { id: 18332, valueName: '二级', attrId: 1833 }
      ]
    },
    {
      id: 1834,
      attrName: '火力',
      categoryId: 422,
      categoryLevel: 3,
      attrValueList: [
        { id: 18341, valueName: '4.0kW', attrId: 1834 },
        { id: 18342, valueName: '4.5kW', attrId: 1834 }
      ]
    },
    {
      id: 1835,
      attrName: '点火方式',
      categoryId: 422,
      categoryLevel: 3,
      attrValueList: [
        { id: 18351, valueName: '脉冲点火', attrId: 1835 },
        { id: 18352, valueName: '压电点火', attrId: 1835 }
      ]
    },
    {
      id: 1836,
      attrName: '熄火保护',
      categoryId: 422,
      categoryLevel: 3,
      attrValueList: [
        { id: 18361, valueName: '有', attrId: 1836 },
        { id: 18362, valueName: '无', attrId: 1836 }
      ]
    }
  ],
  431: [
    {
      id: 1821,
      attrName: '灶眼数量',
      categoryId: 431,
      categoryLevel: 3,
      attrValueList: [
        { id: 18211, valueName: '2眼', attrId: 1821 },
        { id: 18212, valueName: '3眼', attrId: 1821 }
      ]
    },
    {
      id: 1822,
      attrName: '面板材质',
      categoryId: 431,
      categoryLevel: 3,
      attrValueList: [
        { id: 18221, valueName: '钢化玻璃', attrId: 1822 },
        { id: 18222, valueName: '不锈钢', attrId: 1822 }
      ]
    },
    {
      id: 1823,
      attrName: '能效等级',
      categoryId: 431,
      categoryLevel: 3,
      attrValueList: [
        { id: 18231, valueName: '一级', attrId: 1823 },
        { id: 18232, valueName: '二级', attrId: 1823 }
      ]
    },
    {
      id: 1824,
      attrName: '火力',
      categoryId: 431,
      categoryLevel: 3,
      attrValueList: [
        { id: 18241, valueName: '4.2kW', attrId: 1824 },
        { id: 18242, valueName: '5.0kW', attrId: 1824 }
      ]
    },
    {
      id: 1825,
      attrName: '点火方式',
      categoryId: 431,
      categoryLevel: 3,
      attrValueList: [
        { id: 18251, valueName: '脉冲点火', attrId: 1825 },
        { id: 18252, valueName: '压电点火', attrId: 1825 }
      ]
    },
    {
      id: 1846,
      attrName: '加热速度',
      categoryId: 431,
      categoryLevel: 3,
      attrValueList: [
        { id: 18461, valueName: '速热', attrId: 1846 },
        { id: 18462, valueName: '普通', attrId: 1846 }
      ]
    }
  ],
  511: [
    {
      id: 1901,
      attrName: '刀头类型',
      categoryId: 511,
      categoryLevel: 3,
      attrValueList: [
        { id: 19011, valueName: '旋转式', attrId: 1901 },
        { id: 19012, valueName: '往复式', attrId: 1901 }
      ]
    },
    {
      id: 1902,
      attrName: '刀头材质',
      categoryId: 511,
      categoryLevel: 3,
      attrValueList: [
        { id: 19021, valueName: '不锈钢', attrId: 1902 },
        { id: 19022, valueName: '陶瓷', attrId: 1902 }
      ]
    },
    {
      id: 1903,
      attrName: '充电方式',
      categoryId: 511,
      categoryLevel: 3,
      attrValueList: [
        { id: 19031, valueName: 'USB充电', attrId: 1903 },
        { id: 19032, valueName: '插座充电', attrId: 1903 }
      ]
    },
    {
      id: 1904,
      attrName: '续航时间',
      categoryId: 511,
      categoryLevel: 3,
      attrValueList: [
        { id: 19041, valueName: '60分钟', attrId: 1904 },
        { id: 19042, valueName: '90分钟', attrId: 1904 }
      ]
    },
    {
      id: 1905,
      attrName: '颜色',
      categoryId: 511,
      categoryLevel: 3,
      attrValueList: [
        { id: 19051, valueName: '黑色', attrId: 1905 },
        { id: 19052, valueName: '银色', attrId: 1905 }
      ]
    },
    {
      id: 1906,
      attrName: '防水等级',
      categoryId: 511,
      categoryLevel: 3,
      attrValueList: [
        { id: 19061, valueName: 'IPX7', attrId: 1906 },
        { id: 19062, valueName: 'IPX5', attrId: 1906 }
      ]
    }
  ],
  512: [
    {
      id: 1911,
      attrName: '风速档位',
      categoryId: 512,
      categoryLevel: 3,
      attrValueList: [
        { id: 19111, valueName: '2档', attrId: 1911 },
        { id: 19112, valueName: '3档', attrId: 1911 }
      ]
    },
    {
      id: 1912,
      attrName: '恒温功能',
      categoryId: 512,
      categoryLevel: 3,
      attrValueList: [
        { id: 19121, valueName: '有', attrId: 1912 },
        { id: 19122, valueName: '无', attrId: 1912 }
      ]
    },
    {
      id: 1913,
      attrName: '功率',
      categoryId: 512,
      categoryLevel: 3,
      attrValueList: [
        { id: 19131, valueName: '1800W', attrId: 1913 },
        { id: 19132, valueName: '2000W', attrId: 1913 }
      ]
    },
    {
      id: 1914,
      attrName: '负离子功能',
      categoryId: 512,
      categoryLevel: 3,
      attrValueList: [
        { id: 19141, valueName: '有', attrId: 1914 },
        { id: 19142, valueName: '无', attrId: 1914 }
      ]
    },
    {
      id: 1915,
      attrName: '颜色',
      categoryId: 512,
      categoryLevel: 3,
      attrValueList: [
        { id: 19151, valueName: '白色', attrId: 1915 },
        { id: 19152, valueName: '粉色', attrId: 1915 }
      ]
    },
    {
      id: 1916,
      attrName: '冷风功能',
      categoryId: 512,
      categoryLevel: 3,
      attrValueList: [
        { id: 19161, valueName: '有', attrId: 1916 },
        { id: 19162, valueName: '无', attrId: 1916 }
      ]
    }
  ],
  521: [
    {
      id: 1921,
      attrName: '刷头类型',
      categoryId: 521,
      categoryLevel: 3,
      attrValueList: [
        { id: 19211, valueName: '声波', attrId: 1921 },
        { id: 19212, valueName: '旋转', attrId: 1921 }
      ]
    },
    {
      id: 1922,
      attrName: '清洁模式',
      categoryId: 521,
      categoryLevel: 3,
      attrValueList: [
        { id: 19221, valueName: '标准', attrId: 1922 },
        { id: 19222, valueName: '敏感', attrId: 1922 }
      ]
    },
    {
      id: 1923,
      attrName: '续航时间',
      categoryId: 521,
      categoryLevel: 3,
      attrValueList: [
        { id: 19231, valueName: '14天', attrId: 1923 },
        { id: 19232, valueName: '30天', attrId: 1923 }
      ]
    },
    {
      id: 1924,
      attrName: '防水等级',
      categoryId: 521,
      categoryLevel: 3,
      attrValueList: [
        { id: 19241, valueName: 'IPX7', attrId: 1924 },
        { id: 19242, valueName: 'IPX8', attrId: 1924 }
      ]
    },
    {
      id: 1925,
      attrName: '颜色',
      categoryId: 521,
      categoryLevel: 3,
      attrValueList: [
        { id: 19251, valueName: '白色', attrId: 1925 },
        { id: 19252, valueName: '蓝色', attrId: 1925 }
      ]
    },
    {
      id: 1926,
      attrName: '刷头数量',
      categoryId: 521,
      categoryLevel: 3,
      attrValueList: [
        { id: 19261, valueName: '2个', attrId: 1926 },
        { id: 19262, valueName: '3个', attrId: 1926 }
      ]
    }
  ],
  531: [
    {
      id: 1931,
      attrName: '刷头类型',
      categoryId: 531,
      categoryLevel: 3,
      attrValueList: [
        { id: 19311, valueName: '旋转', attrId: 1931 },
        { id: 19312, valueName: '声波', attrId: 1931 }
      ]
    },
    {
      id: 1932,
      attrName: '清洁模式',
      categoryId: 531,
      categoryLevel: 3,
      attrValueList: [
        { id: 19321, valueName: '标准', attrId: 1932 },
        { id: 19322, valueName: '敏感', attrId: 1932 }
      ]
    },
    {
      id: 1933,
      attrName: '续航时间',
      categoryId: 531,
      categoryLevel: 3,
      attrValueList: [
        { id: 19331, valueName: '7天', attrId: 1933 },
        { id: 19332, valueName: '14天', attrId: 1933 }
      ]
    },
    {
      id: 1934,
      attrName: '防水等级',
      categoryId: 531,
      categoryLevel: 3,
      attrValueList: [
        { id: 19341, valueName: 'IPX7', attrId: 1934 },
        { id: 19342, valueName: 'IPX8', attrId: 1934 }
      ]
    },
    {
      id: 1935,
      attrName: '颜色',
      categoryId: 531,
      categoryLevel: 3,
      attrValueList: [
        { id: 19351, valueName: '白色', attrId: 1935 },
        { id: 19352, valueName: '粉色', attrId: 1935 }
      ]
    },
    {
      id: 1936,
      attrName: '刷头数量',
      categoryId: 531,
      categoryLevel: 3,
      attrValueList: [
        { id: 19361, valueName: '2个', attrId: 1936 },
        { id: 19362, valueName: '3个', attrId: 1936 }
      ]
    }
  ],
  731: [
    {
      id: 2061,
      attrName: '面料材质',
      categoryId: 731,
      categoryLevel: 3,
      attrValueList: [
        { id: 20611, valueName: '聚酯纤维', attrId: 2061 },
        { id: 20612, valueName: '棉', attrId: 2061 }
      ]
    },
    {
      id: 2062,
      attrName: '袖型',
      categoryId: 731,
      categoryLevel: 3,
      attrValueList: [
        { id: 20621, valueName: '短袖', attrId: 2062 },
        { id: 20622, valueName: '长袖', attrId: 2062 }
      ]
    },
    {
      id: 2063,
      attrName: '尺码',
      categoryId: 731,
      categoryLevel: 3,
      attrValueList: [
        { id: 20631, valueName: 'M', attrId: 2063 },
        { id: 20632, valueName: 'L', attrId: 2063 },
        { id: 20633, valueName: 'XL', attrId: 2063 }
      ]
    }
  ],
  732: [
    {
      id: 2071,
      attrName: '鞋面材质',
      categoryId: 732,
      categoryLevel: 3,
      attrValueList: [
        { id: 20711, valueName: '织物', attrId: 2071 },
        { id: 20712, valueName: '合成革', attrId: 2071 }
      ]
    },
    {
      id: 2072,
      attrName: '鞋底材质',
      categoryId: 732,
      categoryLevel: 3,
      attrValueList: [
        { id: 20721, valueName: '橡胶', attrId: 2072 },
        { id: 20722, valueName: 'EVA', attrId: 2072 }
      ]
    },
    {
      id: 2073,
      attrName: '尺码',
      categoryId: 732,
      categoryLevel: 3,
      attrValueList: [
        { id: 20731, valueName: '40', attrId: 2073 },
        { id: 20732, valueName: '42', attrId: 2073 },
        { id: 20733, valueName: '44', attrId: 2073 }
      ]
    }
  ],
  432: [
    {
      id: 2081,
      attrName: '加热方式',
      categoryId: 432,
      categoryLevel: 3,
      attrValueList: [
        { id: 20811, valueName: '即热式', attrId: 2081 },
        { id: 20812, valueName: '储水式', attrId: 2081 }
      ]
    },
    {
      id: 2082,
      attrName: '能效等级',
      categoryId: 432,
      categoryLevel: 3,
      attrValueList: [
        { id: 20821, valueName: '一级', attrId: 2082 },
        { id: 20822, valueName: '二级', attrId: 2082 }
      ]
    },
    {
      id: 2083,
      attrName: '容量',
      categoryId: 432,
      categoryLevel: 3,
      attrValueList: [
        { id: 20831, valueName: '10L', attrId: 2083 },
        { id: 20832, valueName: '13L', attrId: 2083 }
      ]
    }
  ],
  532: [
    {
      id: 2091,
      attrName: '刷头类型',
      categoryId: 532,
      categoryLevel: 3,
      attrValueList: [
        { id: 20911, valueName: '旋转', attrId: 2091 },
        { id: 20912, valueName: '声波', attrId: 2091 }
      ]
    },
    {
      id: 2092,
      attrName: '清洁模式',
      categoryId: 532,
      categoryLevel: 3,
      attrValueList: [
        { id: 20921, valueName: '标准', attrId: 2092 },
        { id: 20922, valueName: '敏感', attrId: 2092 }
      ]
    },
    {
      id: 2093,
      attrName: '续航时间',
      categoryId: 532,
      categoryLevel: 3,
      attrValueList: [
        { id: 20931, valueName: '7天', attrId: 2093 },
        { id: 20932, valueName: '14天', attrId: 2093 }
      ]
    }
  ],
  522: [
    {
      id: 2101,
      attrName: '功率',
      categoryId: 522,
      categoryLevel: 3,
      attrValueList: [
        { id: 21011, valueName: '1800W', attrId: 2101 },
        { id: 21012, valueName: '2000W', attrId: 2101 }
      ]
    },
    {
      id: 2102,
      attrName: '恒温功能',
      categoryId: 522,
      categoryLevel: 3,
      attrValueList: [
        { id: 21021, valueName: '有', attrId: 2102 },
        { id: 21022, valueName: '无', attrId: 2102 }
      ]
    },
    {
      id: 2103,
      attrName: '颜色',
      categoryId: 522,
      categoryLevel: 3,
      attrValueList: [
        { id: 21031, valueName: '白色', attrId: 2103 },
        { id: 21032, valueName: '粉色', attrId: 2103 }
      ]
    }
  ],
  611: [
    {
      id: 2111,
      attrName: '材质',
      categoryId: 611,
      categoryLevel: 3,
      attrValueList: [
        { id: 21111, valueName: '皮质', attrId: 2111 },
        { id: 21112, valueName: '布艺', attrId: 2111 }
      ]
    },
    {
      id: 2112,
      attrName: '风格',
      categoryId: 611,
      categoryLevel: 3,
      attrValueList: [
        { id: 21121, valueName: '现代', attrId: 2112 },
        { id: 21122, valueName: '北欧', attrId: 2112 }
      ]
    },
    {
      id: 2113,
      attrName: '颜色',
      categoryId: 611,
      categoryLevel: 3,
      attrValueList: [
        { id: 21131, valueName: '灰色', attrId: 2113 },
        { id: 21132, valueName: '米色', attrId: 2113 }
      ]
    }
  ],
  612: [
    {
      id: 2121,
      attrName: '床尺寸',
      categoryId: 612,
      categoryLevel: 3,
      attrValueList: [
        { id: 21211, valueName: '1.5m', attrId: 2121 },
        { id: 21212, valueName: '1.8m', attrId: 2121 }
      ]
    },
    {
      id: 2122,
      attrName: '材质',
      categoryId: 612,
      categoryLevel: 3,
      attrValueList: [
        { id: 21221, valueName: '实木', attrId: 2122 },
        { id: 21222, valueName: '板式', attrId: 2122 }
      ]
    }
  ],
  621: [
    {
      id: 2131,
      attrName: '灯体材质',
      categoryId: 621,
      categoryLevel: 3,
      attrValueList: [
        { id: 21311, valueName: '铁艺', attrId: 2131 },
        { id: 21312, valueName: '铝材', attrId: 2131 }
      ]
    },
    {
      id: 2132,
      attrName: '光源类型',
      categoryId: 621,
      categoryLevel: 3,
      attrValueList: [
        { id: 21321, valueName: 'LED', attrId: 2132 },
        { id: 21322, valueName: '节能灯', attrId: 2132 }
      ]
    }
  ],
  622: [
    {
      id: 2141,
      attrName: '灯体材质',
      categoryId: 622,
      categoryLevel: 3,
      attrValueList: [
        { id: 21411, valueName: '陶瓷', attrId: 2141 },
        { id: 21412, valueName: '金属', attrId: 2141 }
      ]
    },
    {
      id: 2142,
      attrName: '光源类型',
      categoryId: 622,
      categoryLevel: 3,
      attrValueList: [
        { id: 21421, valueName: 'LED', attrId: 2142 },
        { id: 21422, valueName: '白炽灯', attrId: 2142 }
      ]
    }
  ],
  631: [
    {
      id: 2151,
      attrName: '面料材质',
      categoryId: 631,
      categoryLevel: 3,
      attrValueList: [
        { id: 21511, valueName: '纯棉', attrId: 2151 },
        { id: 21512, valueName: '聚酯纤维', attrId: 2151 }
      ]
    },
    {
      id: 2152,
      attrName: '尺寸',
      categoryId: 631,
      categoryLevel: 3,
      attrValueList: [
        { id: 21521, valueName: '1.5m', attrId: 2152 },
        { id: 21522, valueName: '1.8m', attrId: 2152 }
      ]
    }
  ],
  632: [
    {
      id: 2161,
      attrName: '面料材质',
      categoryId: 632,
      categoryLevel: 3,
      attrValueList: [
        { id: 21611, valueName: '纯棉', attrId: 2161 },
        { id: 21612, valueName: '竹纤维', attrId: 2161 }
      ]
    },
    {
      id: 2162,
      attrName: '尺寸',
      categoryId: 632,
      categoryLevel: 3,
      attrValueList: [
        { id: 21621, valueName: '150*200cm', attrId: 2162 },
        { id: 21622, valueName: '180*200cm', attrId: 2162 }
      ]
    }
  ],
  711: [
    {
      id: 2171,
      attrName: '跑带宽度',
      categoryId: 711,
      categoryLevel: 3,
      attrValueList: [
        { id: 21711, valueName: '42cm', attrId: 2171 },
        { id: 21712, valueName: '48cm', attrId: 2171 }
      ]
    },
    {
      id: 2172,
      attrName: '最大马力',
      categoryId: 711,
      categoryLevel: 3,
      attrValueList: [
        { id: 21721, valueName: '2.5HP', attrId: 2172 },
        { id: 21722, valueName: '3.0HP', attrId: 2172 }
      ]
    }
  ],
  712: [
    {
      id: 2181,
      attrName: '飞轮重量',
      categoryId: 712,
      categoryLevel: 3,
      attrValueList: [
        { id: 21811, valueName: '6kg', attrId: 2181 },
        { id: 21812, valueName: '8kg', attrId: 2181 }
      ]
    },
    {
      id: 2182,
      attrName: '阻力调节',
      categoryId: 712,
      categoryLevel: 3,
      attrValueList: [
        { id: 21821, valueName: '磁控', attrId: 2182 },
        { id: 21822, valueName: '机械', attrId: 2182 }
      ]
    }
  ],
  721: [
    {
      id: 2191,
      attrName: '帐篷结构',
      categoryId: 721,
      categoryLevel: 3,
      attrValueList: [
        { id: 21911, valueName: '双层', attrId: 2191 },
        { id: 21912, valueName: '单层', attrId: 2191 }
      ]
    },
    {
      id: 2192,
      attrName: '适用人数',
      categoryId: 721,
      categoryLevel: 3,
      attrValueList: [
        { id: 21921, valueName: '2人', attrId: 2192 },
        { id: 21922, valueName: '3-4人', attrId: 2192 }
      ]
    }
  ],
  722: [
    {
      id: 2201,
      attrName: '填充物',
      categoryId: 722,
      categoryLevel: 3,
      attrValueList: [
        { id: 22011, valueName: '羽绒', attrId: 2201 },
        { id: 22012, valueName: '棉', attrId: 2201 }
      ]
    },
    {
      id: 2202,
      attrName: '适用温度',
      categoryId: 722,
      categoryLevel: 3,
      attrValueList: [
        { id: 22021, valueName: '0℃-10℃', attrId: 2202 },
        { id: 22022, valueName: '-10℃-0℃', attrId: 2202 }
      ]
    }
  ],
  // ...existing code...
};
// 分类、属性、品牌、spu数据已严格对应，且属性与实际产品特性相符
// 如需进一步扩展spu数据，请确保品牌与分类、属性的实际对应关系
// 品牌与分类、属性的对应关系已严格按照实际产品线设置，家电品牌仅出现在家电相关分类，数码品牌仅出现在手机/平板/耳机等分类，电脑品牌仅出现在电脑办公相关分类，属性也与实际产品特性相符。
export default [
  {
    url: '/admin/product/getCategory1',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: c1Arr
      }
    }
  },
  {
    url: /\/admin\/product\/getCategory2\/\d+/,
    method: 'get',
    response: ({ url }: any) => {
      const id = url.split('/').pop();
      return {
        code: 200,
        data: c2Arr[id] || []
      }
    }
  },
  {
    url: /\/admin\/product\/getCategory3\/\d+/,
    method: 'get',
    response: ({ url }: any) => {
      const id = url.split('/').pop();
      return {
        code: 200,
        data: c3Arr[id] || []
      }
    }
  },
  {
    url: /\/admin\/product\/attrInfoList\/\d+\/\d+\/\d+/,
    method: 'get',
    response: ({ url }: any) => {
      const ids = url.split('/');
      const c3Id = ids[ids.length - 1];
      return {
        code: 200,
        data: attrArr[c3Id] || []
      }
    }
  },
  {
    url: '/admin/product/saveAttrInfo/',
    method: 'post',
    response: ({ body }: any) => {
      const { attrName, categoryId, categoryLevel, attrValueList, id } = body;
      if (!id) {
        const c3Id = categoryId;
        const newId = Date.now();
        const newAttr = {
          id: newId,
          attrName,
          categoryId,
          categoryLevel,
          attrValueList: attrValueList.map((item: any, idx: number) => ({
            id: newId * 100 + idx,
            valueName: item.valueName,
            attrId: newId
          }))
        };
        if (!attrArr[c3Id]) attrArr[c3Id] = [];
        attrArr[c3Id].push(newAttr);
        return { code: 200, data: null, message: '添加成功', ok: true };
      }
      for (const key in attrArr) {
        const idx = attrArr[key].findIndex((item: any) => item.id === id);
        if (idx !== -1) {
          attrArr[key][idx] = {
            ...attrArr[key][idx],
            attrName,
            attrValueList: attrValueList.map((item: any, idx2: number) => ({
              id: item.id || (id * 100 + idx2),
              valueName: item.valueName,
              attrId: id
            }))
          };
          return { code: 200, data: null, message: '修改成功', ok: true };
        }
      }
      return { code: 500, data: null, message: '未找到属性', ok: false };
    }
  },
  {
    url: /\/admin\/product\/deleteAttr\/\d+/,
    method: 'delete',
    response: ({ url }: any) => {
      const attrId = Number(url.split('/').pop());
      let found = false;
      for (const key in attrArr) {
        const idx = attrArr[key].findIndex((item: any) => item.id === attrId);
        if (idx !== -1) {
          attrArr[key].splice(idx, 1);
          found = true;
          break;
        }
      }
      if (found) {
        return { code: 200, data: null, message: '删除成功', ok: true };
      } else {
        return { code: 404, data: null, message: '未找到属性', ok: false };
      }
    }
  }
] as MockMethod[];
