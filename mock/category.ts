import { MockMethod } from 'vite-plugin-mock';

const c1Arr = [
  { id: 1, name: '家用电器' },
  { id: 2, name: '手机数码' },
  { id: 3, name: '电脑办公' }
];

const c2Arr = {
  1: [
    { id: 11, name: '电视', category1Id: 1 },
    { id: 12, name: '空调', category1Id: 1 }
  ],
  2: [
    { id: 21, name: '手机', category1Id: 2 },
    { id: 22, name: '配件', category1Id: 2 }
  ],
  3: [
    { id: 31, name: '笔记本', category1Id: 3 },
    { id: 32, name: '台式机', category1Id: 3 }
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
  21: [
    { id: 211, name: '智能手机', category2Id: 21 }
  ],
  22: [
    { id: 221, name: '耳机', category2Id: 22 }
  ],
  31: [
    { id: 311, name: '游戏本', category2Id: 31 }
  ],
  32: [
    { id: 321, name: '一体机', category2Id: 32 }
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
      id: 3,
      attrName: '刷新率',
      categoryId: 111,
      categoryLevel: 3,
      attrValueList: [
        { id: 7, valueName: '60Hz', attrId: 3 },
        { id: 8, valueName: '120Hz', attrId: 3 }
      ]
    }
  ],
  112: [
    {
      id: 4,
      attrName: '面板类型',
      categoryId: 112,
      categoryLevel: 3,
      attrValueList: [
        { id: 9, valueName: 'OLED', attrId: 4 },
        { id: 10, valueName: 'QLED', attrId: 4 },
        { id: 11, valueName: 'MiniLED', attrId: 4 }
      ]
    },
    {
      id: 5,
      attrName: '厚度',
      categoryId: 112,
      categoryLevel: 3,
      attrValueList: [
        { id: 12, valueName: '薄', attrId: 5 },
        { id: 13, valueName: '超薄', attrId: 5 }
      ]
    }
  ],
  121: [
    {
      id: 6,
      attrName: '能效等级',
      categoryId: 121,
      categoryLevel: 3,
      attrValueList: [
        { id: 14, valueName: '一级', attrId: 6 },
        { id: 15, valueName: '二级', attrId: 6 },
        { id: 16, valueName: '三级', attrId: 6 }
      ]
    },
    {
      id: 7,
      attrName: '制冷量',
      categoryId: 121,
      categoryLevel: 3,
      attrValueList: [
        { id: 17, valueName: '1匹', attrId: 7 },
        { id: 18, valueName: '1.5匹', attrId: 7 },
        { id: 19, valueName: '2匹', attrId: 7 }
      ]
    }
  ],
  211: [
    {
      id: 8,
      attrName: '运行内存',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 20, valueName: '8GB', attrId: 8 },
        { id: 21, valueName: '12GB', attrId: 8 },
        { id: 22, valueName: '16GB', attrId: 8 }
      ]
    },
    {
      id: 9,
      attrName: '存储容量',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 23, valueName: '128GB', attrId: 9 },
        { id: 24, valueName: '256GB', attrId: 9 },
        { id: 25, valueName: '512GB', attrId: 9 }
      ]
    },
    {
      id: 10,
      attrName: '颜色',
      categoryId: 211,
      categoryLevel: 3,
      attrValueList: [
        { id: 26, valueName: '黑色', attrId: 10 },
        { id: 27, valueName: '白色', attrId: 10 },
        { id: 28, valueName: '蓝色', attrId: 10 }
      ]
    }
  ],
  221: [
    {
      id: 11,
      attrName: '类型',
      categoryId: 221,
      categoryLevel: 3,
      attrValueList: [
        { id: 29, valueName: '有线', attrId: 11 },
        { id: 30, valueName: '无线', attrId: 11 }
      ]
    },
    {
      id: 12,
      attrName: '接口类型',
      categoryId: 221,
      categoryLevel: 3,
      attrValueList: [
        { id: 31, valueName: 'Type-C', attrId: 12 },
        { id: 32, valueName: 'Lightning', attrId: 12 },
        { id: 33, valueName: '3.5mm', attrId: 12 }
      ]
    }
  ],
  311: [
    {
      id: 13,
      attrName: '显卡型号',
      categoryId: 311,
      categoryLevel: 3,
      attrValueList: [
        { id: 34, valueName: 'RTX4060', attrId: 13 },
        { id: 35, valueName: 'RTX4070', attrId: 13 },
        { id: 36, valueName: 'RTX4080', attrId: 13 }
      ]
    },
    {
      id: 14,
      attrName: '内存容量',
      categoryId: 311,
      categoryLevel: 3,
      attrValueList: [
        { id: 37, valueName: '16GB', attrId: 14 },
        { id: 38, valueName: '32GB', attrId: 14 }
      ]
    }
  ],
  321: [
    {
      id: 15,
      attrName: '处理器',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 39, valueName: 'i5', attrId: 15 },
        { id: 40, valueName: 'i7', attrId: 15 },
        { id: 41, valueName: 'i9', attrId: 15 }
      ]
    },
    {
      id: 16,
      attrName: '硬盘容量',
      categoryId: 321,
      categoryLevel: 3,
      attrValueList: [
        { id: 42, valueName: '512GB', attrId: 16 },
        { id: 43, valueName: '1TB', attrId: 16 }
      ]
    }
  ]
};

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
  }
] as MockMethod[];
