let trademarkList = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  tmName: `品牌${Math.floor(Math.random() * 10000)}`,
  logoUrl: `https://picsum.photos/seed/trademark${Math.floor(Math.random() * 100000)}/100/100`
}));

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
