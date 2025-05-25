import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/dashboard/overview',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          overview: [
            { label: '今日销售额', value: '￥12,345' },
            { label: '订单量', value: '128' },
            { label: '客单价', value: '￥96.45' },
            { label: '转化率', value: '3.2%' }
          ],
          monitor: {
            lowStock: 5,
            abnormalOrder: 2,
            delayDelivery: 1
          },
          tasks: [
            { type: '紧急', desc: '1条售后纠纷待处理' },
            { type: '常规', desc: '3条商品审核待处理' },
            { type: '长期任务', desc: '促销活动预热中' }
          ],
          messages: [
            { content: '【系统】平台运费规则已更新' },
            { content: '【报表】昨日销售日报已生成' }
          ]
        }
      }
    }
  }
] as MockMethod[];
