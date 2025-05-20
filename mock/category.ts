import { MockMethod } from 'vite-plugin-mock';

const c1Arr = [
  { id: 1, name: '家用电器' },
  { id: 2, name: '手机数码' },
  { id: 3, name: '电脑办公' }
];

export default [
  {
    url: '/admin/product/getCategory1/',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: c1Arr
      }
    }
  }
] as MockMethod[];
