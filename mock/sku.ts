import type { MockMethod } from 'vite-plugin-mock';
import * as spuDataImport from './spuData';

const spuData = spuDataImport;
const skuArr = spuData.skuArr;

// SKU相关的mock接口
export default [
  // 获取SKU列表（分页）
  {
    url: /\/admin\/product\/list\/(\d+)\/(\d+)$/,
    method: 'get',
    response: ({ url }: { url: string; }) => {
      const matches = url.match(/\/admin\/product\/list\/(\d+)\/(\d+)$/);
      if (!matches) {
        return {
          code: 400,
          message: 'URL格式错误',
          ok: false,
          data: null
        };
      }

      const page = parseInt(matches[1], 10);
      const limit = parseInt(matches[2], 10);

      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return {
          code: 400,
          message: '页码和每页数量必须是正整数',
          ok: false,
          data: null
        };
      }

      // 使用现有的skuArr数据
      const allSkus = skuArr || [];
      const total = allSkus.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const records = allSkus.slice(startIndex, endIndex);

      return {
        code: 200,
        message: '获取SKU列表成功',
        ok: true,
        data: {
          records,
          total,
          size: limit,
          current: page,
          orders: [],
          optimizeCountSql: true,
          hitCount: false,
          countId: null,
          maxLimit: null,
          searchCount: true,
          pages: Math.ceil(total / limit)
        }
      };
    }
  },

  // 上架SKU
  {
    url: /\/admin\/product\/onSale\/(\d+)$/,
    method: 'get',
    response: ({ url }: { url: string; }) => {
      const matches = url.match(/\/admin\/product\/onSale\/(\d+)$/);
      if (!matches) {
        return {
          code: 400,
          message: 'SKU ID格式错误',
          ok: false,
          data: null
        };
      }

      const skuId = parseInt(matches[1], 10);
      const sku = skuArr.find(item => item.id === skuId);

      if (!sku) {
        return {
          code: 404,
          message: '未找到对应的SKU',
          ok: false,
          data: null
        };
      }

      // 模拟上架操作
      sku.isSale = 1;

      return {
        code: 200,
        message: 'SKU上架成功',
        ok: true,
        data: null
      };
    }
  },

  // 下架SKU
  {
    url: /\/admin\/product\/cancelSale\/(\d+)$/,
    method: 'get',
    response: ({ url }: { url: string; }) => {
      const matches = url.match(/\/admin\/product\/cancelSale\/(\d+)$/);
      if (!matches) {
        return {
          code: 400,
          message: 'SKU ID格式错误',
          ok: false,
          data: null
        };
      }

      const skuId = parseInt(matches[1], 10);
      const sku = skuArr.find(item => item.id === skuId);

      if (!sku) {
        return {
          code: 404,
          message: '未找到对应的SKU',
          ok: false,
          data: null
        };
      }

      // 模拟下架操作
      sku.isSale = 0;

      return {
        code: 200,
        message: 'SKU下架成功',
        ok: true,
        data: null
      };
    }
  },

  // 获取SKU详情
  {
    url: /\/admin\/product\/getSkuInfo\/(\d+)$/,
    method: 'get',
    response: ({ url }: { url: string; }) => {
      const matches = url.match(/\/admin\/product\/getSkuInfo\/(\d+)$/);
      if (!matches) {
        return {
          code: 400,
          message: 'SKU ID格式错误',
          ok: false,
          data: null
        };
      }

      const skuId = parseInt(matches[1], 10);
      const sku = skuArr.find(item => item.id === skuId);

      if (!sku) {
        return {
          code: 404,
          message: '未找到对应的SKU',
          ok: false,
          data: null
        };
      }

      return {
        code: 200,
        message: '获取SKU详情成功',
        ok: true,
        data: sku
      };
    }
  },

  // 删除SKU
  {
    url: /\/admin\/product\/deleteSku\/(\d+)$/,
    method: 'delete',
    response: ({ url }: { url: string; }) => {
      const matches = url.match(/\/admin\/product\/deleteSku\/(\d+)$/);
      if (!matches) {
        return {
          code: 400,
          message: 'SKU ID格式错误',
          ok: false,
          data: null
        };
      }

      const skuId = parseInt(matches[1], 10);
      const skuIndex = skuArr.findIndex(item => item.id === skuId);

      if (skuIndex === -1) {
        return {
          code: 404,
          message: '未找到对应的SKU',
          ok: false,
          data: null
        };
      }

      // 删除SKU
      skuArr.splice(skuIndex, 1);

      return {
        code: 200,
        message: 'SKU删除成功',
        ok: true,
        data: null
      };
    }
  }
] as unknown as MockMethod[];
