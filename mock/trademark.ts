let trademarkList = [
  // 家用电器
  { id: 10, tmName: '美的', logoUrl: 'https://logo.clearbit.com/midea.com' },
  { id: 11, tmName: '格力', logoUrl: 'https://logo.clearbit.com/gree.com.cn' },
  { id: 12, tmName: '海尔', logoUrl: 'https://logo.clearbit.com/haier.com' },
  { id: 18, tmName: '西门子', logoUrl: 'https://logo.clearbit.com/siemens.com' },
  { id: 21, tmName: '海信', logoUrl: 'https://logo.clearbit.com/hisense.com' },
  { id: 22, tmName: 'TCL', logoUrl: 'https://logo.clearbit.com/tcl.com' },
  { id: 26, tmName: '创维', logoUrl: 'https://logo.clearbit.com/skyworth.com' },
  { id: 27, tmName: '长虹', logoUrl: 'https://logo.clearbit.com/changhong.com' },
  // 手机数码
  { id: 1, tmName: '华为', logoUrl: 'https://logo.clearbit.com/huawei.com' },
  { id: 2, tmName: '小米', logoUrl: 'https://logo.clearbit.com/mi.com' },
  { id: 3, tmName: 'OPPO', logoUrl: 'https://logo.clearbit.com/oppo.com' },
  { id: 4, tmName: 'vivo', logoUrl: 'https://logo.clearbit.com/vivo.com' },
  { id: 5, tmName: '一加', logoUrl: 'https://logo.clearbit.com/oneplus.com' },
  { id: 13, tmName: '索尼', logoUrl: 'https://logo.clearbit.com/sony.com' },
  { id: 14, tmName: '三星', logoUrl: 'https://logo.clearbit.com/samsung.com' },
  { id: 17, tmName: '苹果', logoUrl: 'https://logo.clearbit.com/apple.com' },
  // 电脑办公
  { id: 9, tmName: '联想', logoUrl: 'https://logo.clearbit.com/lenovo.com' },
  { id: 15, tmName: '戴尔', logoUrl: 'https://logo.clearbit.com/dell.com' },
  { id: 16, tmName: '惠普', logoUrl: 'https://logo.clearbit.com/hp.com' },
  { id: 29, tmName: '华硕', logoUrl: 'https://logo.clearbit.com/asus.com' },
  { id: 30, tmName: '技嘉', logoUrl: 'https://logo.clearbit.com/gigabyte.com' },
  { id: 31, tmName: '微星', logoUrl: 'https://logo.clearbit.com/msi.com' },
  { id: 32, tmName: '影驰', logoUrl: 'https://logo.clearbit.com/galaxytech.com' },
  { id: 33, tmName: '金士顿', logoUrl: 'https://logo.clearbit.com/kingston.com' },
  { id: 34, tmName: '西部数据', logoUrl: 'https://logo.clearbit.com/westerndigital.com' },
  { id: 35, tmName: '希捷', logoUrl: 'https://logo.clearbit.com/seagate.com' },
  { id: 37, tmName: '七彩虹', logoUrl: 'https://logo.clearbit.com/colorful.cn' },
  // 家居家装
  { id: 50, tmName: '全友家居', logoUrl: 'https://logo.clearbit.com/quanyou.com.cn' },
  { id: 51, tmName: '顾家家居', logoUrl: 'https://logo.clearbit.com/kukahome.com' },
  { id: 52, tmName: '慕思', logoUrl: 'https://logo.clearbit.com/derucci.com' },
  { id: 53, tmName: '雷士照明', logoUrl: 'https://logo.clearbit.com/nvc-lighting.com.cn' },
  { id: 54, tmName: '欧普照明', logoUrl: 'https://logo.clearbit.com/opple.com' },
  // 运动户外
  { id: 60, tmName: '李宁', logoUrl: 'https://logo.clearbit.com/lining.com' },
  { id: 61, tmName: '安踏', logoUrl: 'https://logo.clearbit.com/anta.com' },
  { id: 62, tmName: '特步', logoUrl: 'https://logo.clearbit.com/xtep.com' },
  { id: 63, tmName: '迪卡侬', logoUrl: 'https://logo.clearbit.com/decathlon.com' },
  { id: 64, tmName: '舒华', logoUrl: 'https://logo.clearbit.com/shuhua.com' },
  // 个护健康
  { id: 70, tmName: '飞科', logoUrl: 'https://logo.clearbit.com/flyco.com' },
  { id: 71, tmName: '松下', logoUrl: 'https://logo.clearbit.com/panasonic.com' },
  { id: 72, tmName: '博朗', logoUrl: 'https://logo.clearbit.com/braun.com' },
  { id: 73, tmName: '欧乐B', logoUrl: 'https://logo.clearbit.com/oralb.com' },
  { id: 74, tmName: '小熊', logoUrl: 'https://logo.clearbit.com/bear.com.cn' },
];

// 家居家装品牌与分类对应：全友家居、顾家家居、慕思（家具/床），雷士照明、欧普照明（灯具）
// 运动户外品牌与分类对应：李宁、安踏、特步（运动服饰/鞋），迪卡侬、舒华（健身器材/户外装备）
// 个护健康品牌与分类对应：飞科、松下、博朗（剃须刀/电吹风），欧乐B、小熊（电动牙刷/小家电）

export default [
  {
    url: /\/admin\/product\/baseTrademark\/\d+\/\d+/,
    method: 'get',
    response: ({ url }) => {
      const match = url.match(/baseTrademark\/(\d+)\/(\d+)/);
      const pageNo = Number(match?.[1] || 1);
      const limit = Number(match?.[2] || 3);
      const total = trademarkList.length;
      const start = (pageNo - 1) * limit;
      const end = start + limit;
      const records = trademarkList.slice(start, end).map(item => ({ ...item }));
      return { code: 200, data: { total, records } }
    }
  },
  {
    url: '/admin/product/baseTrademark/save',
    method: 'post',
    response: ({ body }) => {
      const { tmName, logoUrl } = body;
      if (!tmName || !tmName.trim()) {
        return { code: 400, data: { message: '品牌名称不能为空' } };
      }
      let finalLogoUrl = logoUrl && logoUrl.startsWith('data:image') ? logoUrl
        : `https://picsum.photos/seed/trademark${Math.floor(Math.random() * 100000)}/100/100`;
      const id = trademarkList.length ? trademarkList[trademarkList.length - 1].id + 1 : 1;
      const newTrademark = { id, tmName, logoUrl: finalLogoUrl };
      trademarkList.push(newTrademark);
      return { code: 200, data: newTrademark };
    }
  },
  {
    url: '/admin/product/baseTrademark/update',
    method: 'put',
    response: ({ body }) => {
      const { id, tmName, logoUrl } = body;
      if (!tmName || !tmName.trim()) {
        return { code: 400, data: { message: '品牌名称不能为空' } };
      }
      if (!logoUrl || !logoUrl.trim()) {
        return { code: 400, data: { message: '品牌LOGO不能为空' } };
      }
      const idx = trademarkList.findIndex(item => item.id === id);
      if (idx > -1) {
        trademarkList[idx] = { id, tmName, logoUrl };
        return { code: 200, data: trademarkList[idx] };
      }
      return { code: 404, data: { message: '品牌不存在' } };
    }
  },
  {
    url: /\/admin\/product\/baseTrademark\/remove\/\d+$/,
    method: 'delete',
    response: ({ url }) => {
      const id = Number(url.split('/').pop());
      const idx = trademarkList.findIndex(item => item.id === id);
      if (idx > -1) {
        trademarkList.splice(idx, 1);
        return { code: 200, data: { id } };
      }
      return { code: 404, data: { message: '品牌不存在' } };
    }
  }
]
