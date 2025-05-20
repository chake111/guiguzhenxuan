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
  }
] as MockMethod[];
