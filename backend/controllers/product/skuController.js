const Sku = require('../../models/product/sku');
const Spu = require('../../models/product/spu');
const Trademark = require('../../models/product/trademark');

// 获取SKU列表（分页）
exports.getSkuList = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // 计算总数
    const total = await Sku.countDocuments();

    // 查询SKU列表
    const skus = await Sku.find()
      .populate('tmId', 'tmName logoUrl')
      .populate('spuId', 'spuName')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // 格式化返回数据
    const formattedSkus = skus.map(sku => ({
      id: sku._id,
      skuName: sku.skuName,
      price: sku.price,
      weight: sku.weight,
      skuDesc: sku.skuDesc,
      category3Id: sku.category3Id,
      skuDefaultImg: sku.skuDefaultImg,
      tmId: sku.tmId._id,
      tmName: sku.tmId.tmName,
      spuId: sku.spuId._id,
      spuName: sku.spuId.spuName,
      skuAttrValueList: sku.skuAttrValueList,
      skuSaleAttrValueList: sku.skuSaleAttrValueList,
      isSale: sku.isSale,
      createTime: sku.createdAt,
      updateTime: sku.updatedAt
    }));

    res.json({
      code: 200,
      message: '获取SKU列表成功',
      ok: true,
      data: {
        records: formattedSkus,
        total,
        size: limitNum,
        current: pageNum,
        orders: [],
        optimizeCountSql: true,
        hitCount: false,
        countId: null,
        maxLimit: null,
        searchCount: true,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取SKU列表失败',
      ok: false,
      data: null
    });
  }
};

// 上架SKU
exports.onSale = async (req, res) => {
  try {
    const { skuId } = req.params;

    const sku = await Sku.findById(skuId);
    if (!sku) {
      return res.status(404).json({
        code: 404,
        message: 'SKU不存在',
        ok: false,
        data: null
      });
    }

    sku.isSale = 1;
    await sku.save();

    res.json({
      code: 200,
      message: 'SKU上架成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'SKU上架失败',
      ok: false,
      data: null
    });
  }
};

// 下架SKU
exports.cancelSale = async (req, res) => {
  try {
    const { skuId } = req.params;

    const sku = await Sku.findById(skuId);
    if (!sku) {
      return res.status(404).json({
        code: 404,
        message: 'SKU不存在',
        ok: false,
        data: null
      });
    }

    sku.isSale = 0;
    await sku.save();

    res.json({
      code: 200,
      message: 'SKU下架成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'SKU下架失败',
      ok: false,
      data: null
    });
  }
};

// 获取SKU详情
exports.getSkuInfo = async (req, res) => {
  try {
    const { skuId } = req.params;

    const sku = await Sku.findById(skuId)
      .populate('tmId', 'tmName logoUrl')
      .populate('spuId', 'spuName');

    if (!sku) {
      return res.status(404).json({
        code: 404,
        message: 'SKU不存在',
        ok: false,
        data: null
      });
    }

    // 格式化返回数据
    const formattedSku = {
      id: sku._id,
      skuName: sku.skuName,
      price: sku.price,
      weight: sku.weight,
      skuDesc: sku.skuDesc,
      category3Id: sku.category3Id,
      skuDefaultImg: sku.skuDefaultImg,
      tmId: sku.tmId._id,
      tmName: sku.tmId.tmName,
      spuId: sku.spuId._id,
      spuName: sku.spuId.spuName,
      skuAttrValueList: sku.skuAttrValueList,
      skuSaleAttrValueList: sku.skuSaleAttrValueList,
      isSale: sku.isSale,
      createTime: sku.createdAt,
      updateTime: sku.updatedAt
    };

    res.json({
      code: 200,
      message: '获取SKU详情成功',
      ok: true,
      data: formattedSku
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取SKU详情失败',
      ok: false,
      data: null
    });
  }
};

// 保存SKU信息
exports.saveSkuInfo = async (req, res) => {
  try {
    const {
      skuName, price, weight, skuDesc, category3Id, skuDefaultImg,
      tmId, spuId, skuAttrValueList, skuSaleAttrValueList
    } = req.body;

    // 验证必填字段
    if (!skuName || !price || !weight || !category3Id || !skuDefaultImg || !tmId || !spuId) {
      return res.status(400).json({
        code: 400,
        message: 'SKU信息不完整',
        ok: false,
        data: null
      });
    }

    // 验证SPU是否存在
    const spu = await Spu.findById(spuId);
    if (!spu) {
      return res.status(404).json({
        code: 404,
        message: 'SPU不存在',
        ok: false,
        data: null
      });
    }

    // 验证品牌是否存在
    const trademark = await Trademark.findById(tmId);
    if (!trademark) {
      return res.status(404).json({
        code: 404,
        message: '品牌不存在',
        ok: false,
        data: null
      });
    }

    // 创建新SKU
    const newSku = new Sku({
      skuName,
      price,
      weight,
      skuDesc,
      category3Id,
      skuDefaultImg,
      tmId,
      spuId,
      skuAttrValueList: skuAttrValueList || [],
      skuSaleAttrValueList: skuSaleAttrValueList || [],
      isSale: 0 // 默认下架状态
    });

    await newSku.save();

    res.status(201).json({
      code: 200,
      message: '保存SKU成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '保存SKU失败',
      ok: false,
      data: null
    });
  }
};

// 删除SKU
exports.deleteSku = async (req, res) => {
  try {
    const { skuId } = req.params;

    const sku = await Sku.findByIdAndDelete(skuId);
    if (!sku) {
      return res.status(404).json({
        code: 404,
        message: 'SKU不存在',
        ok: false,
        data: null
      });
    }

    res.json({
      code: 200,
      message: '删除SKU成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除SKU失败',
      ok: false,
      data: null
    });
  }
};

// 根据SPU ID查找SKU列表
exports.findBySpuId = async (req, res) => {
  try {
    const { spuId } = req.params;

    // 验证SPU是否存在
    const spu = await Spu.findById(spuId);
    if (!spu) {
      return res.status(404).json({
        code: 404,
        message: 'SPU不存在',
        ok: false,
        data: null
      });
    }

    // 查询SKU列表
    const skus = await Sku.find({ spuId })
      .populate('tmId', 'tmName logoUrl');

    // 格式化返回数据
    const formattedSkus = skus.map(sku => ({
      id: sku._id,
      skuName: sku.skuName,
      price: sku.price,
      weight: sku.weight,
      skuDesc: sku.skuDesc,
      category3Id: sku.category3Id,
      skuDefaultImg: sku.skuDefaultImg,
      tmId: sku.tmId._id,
      tmName: sku.tmId.tmName,
      spuId: sku.spuId,
      skuAttrValueList: sku.skuAttrValueList,
      skuSaleAttrValueList: sku.skuSaleAttrValueList,
      isSale: sku.isSale
    }));

    res.json({
      code: 200,
      message: '获取SKU列表成功',
      ok: true,
      data: formattedSkus
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取SKU列表失败',
      ok: false,
      data: null
    });
  }
};
