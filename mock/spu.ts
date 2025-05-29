import { MockMethod } from 'vite-plugin-mock';
import * as spuDataImport from './spuData';

const spuData = spuDataImport;
const spuArr = spuData.spuArr;
const skuArr = [
  {
    id: 1,
    spuId: 1,
    skuName: '海信液晶电视E55 55英寸 黑色',
    price: 2999,
    weight: 15.8,
    skuDefaultImg: 'https://picsum.photos/seed/tv1/200/200',
    skuDesc: '55英寸4K超高清，智能语音控制'
  },
  {
    id: 2,
    spuId: 1,
    skuName: '海信液晶电视E55 55英寸 银色',
    price: 3099,
    weight: 15.8,
    skuDefaultImg: 'https://picsum.photos/seed/tv2/200/200',
    skuDesc: '55英寸4K超高清，智能语音控制'
  },
  {
    id: 3,
    spuId: 2,
    skuName: 'TCL液晶电视Q10 65英寸 黑色',
    price: 3999,
    weight: 22.5,
    skuDefaultImg: 'https://picsum.photos/seed/tv3/200/200',
    skuDesc: '120Hz高刷新率，MEMC运动补偿'
  },
  {
    id: 4,
    spuId: 26,
    skuName: '华为Mate60 Pro 12GB+256GB 黑色',
    price: 6999,
    weight: 0.225,
    skuDefaultImg: 'https://picsum.photos/seed/phone1/200/200',
    skuDesc: '麒麟9000s芯片，超感知影像系统'
  },
  {
    id: 5,
    spuId: 26,
    skuName: '华为Mate60 Pro 12GB+512GB 白色',
    price: 7999,
    weight: 0.225,
    skuDefaultImg: 'https://picsum.photos/seed/phone2/200/200',
    skuDesc: '麒麟9000s芯片，超感知影像系统'
  }
];
const spuImages = spuData.spuImages;
const spuSaleAttrs = spuData.spuSaleAttrs;
const allSaleAttr = spuData.allSaleAttr;

// 明确声明spuArr的类型，确保包含category3Id属性
interface SpuItem {
  id: number;
  spuName: string;
  description: string;
  category3Id: number;
  tmId: number;
  spuSaleAttrList: any;
  spuImageList: any;
}
const typedSpuArr: SpuItem[] = ([] as SpuItem[]).concat(...spuArr);


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
        // 此处未使用 records，直接移除无用变量声明
      }
      if (!category3Id) {
        return { code: 400, message: '参数错误', ok: false, data: null };
      }
      // 补充saleAttrList和spuImageList
      const records = typedSpuArr
        .filter(item => Number(item.category3Id) === category3Id)
        .map(item => ({
          ...item,
          spuSaleAttrList: spuSaleAttrs[item.id] || [],
          spuImageList: spuImages[item.id] || []
        }));
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
  },
  // 获取SPU图片列表
  {
    url: /\/admin\/product\/spuImageList\d+/,
    method: 'get',
    response: ({ url }) => {
      const spuId = url.match(/spuImageList(\d+)/)?.[1];
      // spuId为字符串，需转为数字
      return {
        code: 200,
        data: spuImages[Number(spuId)] || []
      };
    }
  },
  // 获取SPU已有销售属性
  {
    url: /\/admin\/product\/spuSaleAttrList\d+/,
    method: 'get',
    response: ({ url }) => {
      const spuId = url.match(/spuSaleAttrList(\d+)/)?.[1];
      // spuId为字符串，需转为数字
      return {
        code: 200,
        data: spuSaleAttrs[Number(spuId)] || []
      };
    }
  },
  // 获取全部销售属性
  {
    url: '/admin/product/baseSaleAttrList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: allSaleAttr
      };
    }
  },
  // 图片上传接口
  {
    url: '/admin/product/fileUpLoad',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          name: 'mock图片.jpg',
          url: `https://picsum.photos/seed/mockupload${Math.floor(Math.random() * 10000)}/200/200`
        }
      }
    }
  },
  // 新增SPU接口
  {
    url: '/admin/product/saveSpuInfo',
    method: 'post',
    response: ({ body }) => {
      if (
        !body ||
        typeof body.spuName !== 'string' ||
        !body.spuName.trim() ||
        !body.category3Id ||
        !body.tmId
      ) {
        return {
          code: 400,
          message: '参数不完整',
          ok: false,
          data: null
        };
      }
      // 校验spuSaleAttrList必须为非空数组且每项合法
      if (
        !Array.isArray(body.spuSaleAttrList) ||
        body.spuSaleAttrList.length === 0 ||
        body.spuSaleAttrList.some(
          (attr: any) =>
            !attr.baseSaleAttrId ||
            !attr.saleAttrName ||
            !Array.isArray(attr.spuSaleAttrValueList) ||
            attr.spuSaleAttrValueList.length === 0 ||
            attr.spuSaleAttrValueList.some(
              (val: any) =>
                !val.saleAttrValueName ||
                typeof val.saleAttrValueName !== 'string' ||
                !val.saleAttrValueName.trim()
            )
        )
      ) {
        return {
          code: 400,
          message: 'SPU销售属性及属性值不能为空且必须合法',
          ok: false,
          data: null
        };
      }
      // 生成新id
      const maxId = typedSpuArr.length > 0 ? Math.max(...typedSpuArr.map(item => item.id)) : 0;
      const newId = maxId + 1;
      if (typedSpuArr.some(item => item.id === newId)) {
        return {
          code: 409,
          message: 'ID冲突',
          ok: false,
          data: null
        };
      }
      const newSpu = {
        ...body,
        id: newId,
      };
      typedSpuArr.push(newSpu);
      // 同步图片和销售属性
      if (body.spuImageList) {
        spuImages[newId] = body.spuImageList;
      }
      if (body.spuSaleAttrList) {
        spuSaleAttrs[newId] = body.spuSaleAttrList;
      }
      return {
        code: 200,
        message: '新增成功',
        ok: true,
        data: null
      };
    }
  },
  // 更新SPU接口
  {
    url: '/admin/product/updateSpuInfo',
    method: 'post',
    response: ({ body }) => {
      if (!body || !body.id) {
        return {
          code: 400,
          message: '缺少ID',
          ok: false,
          data: null
        };
      }
      // 校验spuSaleAttrList必须为非空数组且每项合法
      if (
        !Array.isArray(body.spuSaleAttrList) ||
        body.spuSaleAttrList.length === 0 ||
        body.spuSaleAttrList.some(
          (attr: any) =>
            !attr.baseSaleAttrId ||
            !attr.saleAttrName ||
            !Array.isArray(attr.spuSaleAttrValueList) ||
            attr.spuSaleAttrValueList.length === 0 ||
            attr.spuSaleAttrValueList.some(
              (val: any) =>
                !val.saleAttrValueName ||
                typeof val.saleAttrValueName !== 'string' ||
                !val.saleAttrValueName.trim()
            )
        )
      ) {
        return {
          code: 400,
          message: 'SPU销售属性及属性值不能为空且必须合法',
          ok: false,
          data: null
        };
      }
      const idx = typedSpuArr.findIndex(item => item.id === body.id);
      if (idx !== -1) {
        typedSpuArr[idx] = {
          ...typedSpuArr[idx],
          ...body,
        };
        // 同步更新图片和销售属性
        if (body.spuImageList) {
          spuImages[body.id] = body.spuImageList;
        }
        if (body.spuSaleAttrList) {
          spuSaleAttrs[body.id] = body.spuSaleAttrList;
        }
        return {
          code: 200,
          message: '更新成功',
          ok: true,
          data: null
        };
      } else {
        return {
          code: 404,
          message: '未找到对应SPU',
          ok: false,
          data: null
        };
      }
    }
  },
  // 新增SKU接口
  {
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    response: ({ body }) => {
      if (
        !body ||
        typeof body.skuName !== 'string' ||
        !body.skuName.trim() ||
        !body.category3Id ||
        !body.spuId ||
        !body.tmId ||
        body.price === undefined || body.price === null ||
        body.weight === undefined || body.weight === null ||
        typeof body.skuDesc !== 'string' ||
        !body.skuDesc.trim() ||
        !Array.isArray(body.skuAttrValueList) ||
        !Array.isArray(body.skuSaleAttrValueList) ||
        typeof body.skuDefaultImg !== 'string'
      ) {
        return {
          code: 400,
          message: '参数不完整',
          ok: false,
          data: null
        };
      }
      const maxId = spuData.skuArr && spuData.skuArr.length > 0 ? Math.max(...spuData.skuArr.map(item => item.id)) : 0;
      const newId = maxId + 1;
      if (spuData.skuArr && spuData.skuArr.some(item => item.id === newId)) {
        return {
          code: 409,
          message: 'ID冲突',
          ok: false,
          data: null
        };
      }
      const newSku = {
        ...body,
        id: newId,
      };
      if (!spuData.skuArr) {
        spuData.skuArr = [];
      }
      spuData.skuArr.push(newSku);
      return {
        code: 200,
        message: '新增成功',
        ok: true,
        data: null
      };
    }
  },
  //获取SKU列表
  {
    url: '/admin/product/findBySpuId/:spuId',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        ok: true,
        data: skuArr
      };
    }
  },
] as MockMethod[];

