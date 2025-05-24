import { MockMethod } from 'vite-plugin-mock';

let mockSpuList = [
  {
    id: 11,
    spuName: "测试SPU1",
    description: "描述1",
    category3Id: 101,
    tmId: 1,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 12,
    spuName: "测试SPU2",
    description: "描述2",
    category3Id: 101,
    tmId: 2,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 13,
    spuName: "测试SPU3",
    description: "描述3",
    category3Id: 102,
    tmId: 1,
    spuSaleAttrList: null,
    spuImageList: null,
  }
];

export default [
  {
    url: /\/admin\/product\d+\/\d+\/\?category3Id=\d+/,
    method: 'get',
    response: (opt: any) => {
      const match = opt.url.match(/product(\d+)\/(\d+)\/\?category3Id=(\d+)/);
      const page = Number(match?.[1] || 1);
      const limit = Number(match?.[2] || 10);
      const category3Id = match?.[3];
      const filtered = mockSpuList.filter(item => String(item.category3Id) === category3Id);
      const total = filtered.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      return {
        code: 200,
        message: "success",
        ok: true,
        data: {
          records: filtered.slice(start, end),
          total,
          size: limit,
          current: page,
          searchCount: true,
          pages: Math.ceil(total / limit),
        }
      };
    }
  },
  {
    url: '/admin/product/saveSpuInfo',
    method: 'post',
    response: ({ body }) => {
      const newId = mockSpuList.length ? Math.max(...mockSpuList.map(item => Number(item.id) || 0)) + 1 : 1;
      const newSpu = { ...body, id: newId };
      mockSpuList.push(newSpu);
      return {
        code: 200,
        message: "新增SPU成功(mock)",
        ok: true,
        data: newSpu
      };
    }
  }
] as MockMethod[];
