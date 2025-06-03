const Spu = require('../../models/product/spu');
const Trademark = require('../../models/product/trademark');
const Sku = require('../../models/product/sku');

// 基础销售属性列表
const baseSaleAttrList = [
  { id: 1, name: '颜色' },
  { id: 2, name: '版本' },
  { id: 3, name: '尺寸' },
  { id: 4, name: '规格' },
  { id: 5, name: '套装' }
];

// 获取SPU列表（分页）
exports.getSpuList = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const { category3Id } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // 验证参数
    if (!category3Id) {
      return res.status(400).json({
        code: 400,
        message: '缺少必要参数',
        ok: false,
        data: null
      });
    }

    // 计算总数
    const total = await Spu.countDocuments({ category3Id });

    // 查询SPU列表
    const spus = await Spu.find({ category3Id })
      .populate('tmId', 'tmName logoUrl')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // 格式化返回数据
    const formattedSpus = spus.map(spu => ({
      id: spu._id,
      spuName: spu.spuName,
      description: spu.description,
      category3Id: spu.category3Id,
      tmId: spu.tmId._id,
      tmName: spu.tmId.tmName,
      createTime: spu.createdAt,
      updateTime: spu.updatedAt,
      spuImageList: spu.spuImageList,
      spuSaleAttrList: spu.spuSaleAttrList
    }));

    res.json({
      code: 200,
      message: '获取SPU列表成功',
      ok: true,
      data: {
        records: formattedSpus,
        total,
        size: limitNum,
        current: pageNum,
        searchCount: true,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取SPU列表失败',
      ok: false,
      data: null
    });
  }
};

// 获取SPU图片列表
exports.getSpuImageList = async (req, res) => {
  try {
    const { spuId } = req.params;

    const spu = await Spu.findById(spuId);
    if (!spu) {
      return res.status(404).json({
        code: 404,
        message: 'SPU不存在',
        ok: false,
        data: null
      });
    }

    // 格式化图片列表
    const imageList = spu.spuImageList.map(img => ({
      id: img._id,
      spuId,
      imgName: img.imgName,
      imgUrl: img.imgUrl,
      name: img.imgName,
      url: img.imgUrl
    }));

    res.json({
      code: 200,
      message: '获取SPU图片列表成功',
      ok: true,
      data: imageList
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取SPU图片列表失败',
      ok: false,
      data: null
    });
  }
};

// 获取SPU销售属性列表
exports.getSpuSaleAttrList = async (req, res) => {
  try {
    const { spuId } = req.params;

    const spu = await Spu.findById(spuId);
    if (!spu) {
      return res.status(404).json({
        code: 404,
        message: 'SPU不存在',
        ok: false,
        data: null
      });
    }

    res.json({
      code: 200,
      message: '获取SPU销售属性列表成功',
      ok: true,
      data: spu.spuSaleAttrList
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取SPU销售属性列表失败',
      ok: false,
      data: null
    });
  }
};

// 获取基础销售属性列表
exports.getBaseSaleAttrList = async (req, res) => {
  try {
    res.json({
      code: 200,
      message: '获取基础销售属性列表成功',
      ok: true,
      data: baseSaleAttrList
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取基础销售属性列表失败',
      ok: false,
      data: null
    });
  }
};

// 保存SPU信息
exports.saveSpuInfo = async (req, res) => {
  try {
    const { spuName, description, category3Id, tmId, spuImageList, spuSaleAttrList } = req.body;

    // 验证必填字段
    if (!spuName || !category3Id || !tmId) {
      return res.status(400).json({
        code: 400,
        message: 'SPU信息不完整',
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

    // 创建新SPU
    const newSpu = new Spu({
      spuName,
      description,
      category3Id,
      tmId,
      spuImageList: spuImageList || [],
      spuSaleAttrList: spuSaleAttrList || []
    });

    await newSpu.save();

    res.status(201).json({
      code: 200,
      message: '保存SPU成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '保存SPU失败',
      ok: false,
      data: null
    });
  }
};

// 更新SPU信息
exports.updateSpuInfo = async (req, res) => {
  try {
    const { id, spuName, description, category3Id, tmId, spuImageList, spuSaleAttrList } = req.body;

    // 验证必填字段
    if (!id || !spuName || !category3Id || !tmId) {
      return res.status(400).json({
        code: 400,
        message: 'SPU信息不完整',
        ok: false,
        data: null
      });
    }

    // 验证SPU是否存在
    const spu = await Spu.findById(id);
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

    // 更新SPU
    spu.spuName = spuName;
    spu.description = description;
    spu.category3Id = category3Id;
    spu.tmId = tmId;
    spu.spuImageList = spuImageList || [];
    spu.spuSaleAttrList = spuSaleAttrList || [];

    await spu.save();

    res.json({
      code: 200,
      message: '更新SPU成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '更新SPU失败',
      ok: false,
      data: null
    });
  }
};

// 删除SPU
exports.deleteSpu = async (req, res) => {
  try {
    const { spuId } = req.params;

    // 检查SPU是否存在
    const spu = await Spu.findById(spuId);
    if (!spu) {
      return res.status(404).json({
        code: 404,
        message: 'SPU不存在',
        ok: false,
        data: null
      });
    }

    // 检查是否有关联的SKU
    const skuCount = await Sku.countDocuments({ spuId });
    if (skuCount > 0) {
      return res.status(400).json({
        code: 400,
        message: '该SPU下有关联的SKU，无法删除',
        ok: false,
        data: null
      });
    }

    // 删除SPU
    await Spu.findByIdAndDelete(spuId);

    res.json({
      code: 200,
      message: '删除SPU成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除SPU失败',
      ok: false,
      data: null
    });
  }
};
