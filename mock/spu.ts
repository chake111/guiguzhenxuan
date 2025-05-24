import { MockMethod } from 'vite-plugin-mock';

const spuArr = [
  {
    id: 1,
    spuName: '小米液晶电视A55',
    description: '55英寸4K超高清智能液晶电视',
    category3Id: 111,
    tmId: 1,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 6,
    spuName: '海信液晶电视E55',
    description: '55英寸超薄全面屏液晶电视',
    category3Id: 111,
    tmId: 2,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 2,
    spuName: '索尼OLED电视X90J',
    description: '65英寸OLED自发光电视',
    category3Id: 112,
    tmId: 2,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 3,
    spuName: '格力变频空调KFR-35GW',
    description: '1.5匹变频冷暖空调',
    category3Id: 121,
    tmId: 3,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 4,
    spuName: '华为Mate50',
    description: '骁龙8+旗舰芯片，超清影像',
    category3Id: 211,
    tmId: 4,
    spuSaleAttrList: null,
    spuImageList: null,
  },
  {
    id: 5,
    spuName: '联想拯救者Y9000P',
    description: 'RTX4060显卡，16GB内存',
    category3Id: 311,
    tmId: 5,
    spuSaleAttrList: null,
    spuImageList: null,
  }
];

export default [
  {
    url: '/admin/product/:page/:limit',
    method: 'get',
    response: ({ query, params, url }: any) => {
      let page = 1;
      let limit = 10;
      let category3Id: number | undefined;
      if (params && params.page && params.limit) {
        page = Number(params.page);
        limit = Number(params.limit);
      } else {
        const match = url.match(/\/admin\/product\/(\d+)\/(\d+)\?category3Id=(\d+)/);
        if (match) {
          page = Number(match[1]);
          limit = Number(match[2]);
          category3Id = Number(match[3]);
        }
      }
      if (!category3Id && query && query.category3Id) {
        category3Id = Number(query.category3Id);
      }
      if (!category3Id) {
        // fallback: try to parse from url
        const match = url.match(/category3Id=(\d+)/);
        if (match) {
          category3Id = Number(match[1]);
        }
      }
      if (!category3Id) {
        return { code: 400, message: '参数错误', ok: false, data: null };
      }
      const records = spuArr.filter(item => Number(item.category3Id) === category3Id);
      const total = records.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const pageRecords = records.slice(start, end);
      return {
        code: 200,
        message: '获取成功',
        ok: true,
        data: {
          records: pageRecords,
          total,
          size: limit,
          current: page,
          searchCount: true,
          pages: Math.ceil(total / limit)
        }
      }
    }
  }
] as MockMethod[];
