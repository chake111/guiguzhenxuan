const Trademark = require('../../models/product/trademark');

// 获取品牌列表（分页）
exports.getTrademarks = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // 计算总数
    const total = await Trademark.countDocuments();

    // 查询品牌
    const trademarks = await Trademark.find()
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      code: 200,
      data: {
        records: trademarks,
        total,
        size: limitNum,
        current: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取品牌列表失败',
      data: null
    });
  }
};

// 添加品牌
exports.addTrademark = async (req, res) => {
  try {
    const { tmName, logoUrl } = req.body;

    // 验证必填字段
    if (!tmName || !tmName.trim()) {
      return res.status(400).json({
        code: 400,
        data: { message: '品牌名称不能为空' }
      });
    }

    // 检查品牌名是否已存在
    const existingTrademark = await Trademark.findOne({ tmName });
    if (existingTrademark) {
      return res.status(400).json({
        code: 400,
        data: { message: '品牌名称已存在' }
      });
    }

    // 创建新品牌
    const newTrademark = new Trademark({
      tmName,
      logoUrl: logoUrl || `https://picsum.photos/seed/trademark${Math.floor(Math.random() * 100000)}/100/100`
    });

    await newTrademark.save();

    res.status(201).json({
      code: 200,
      data: newTrademark
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '添加品牌失败',
      data: null
    });
  }
};

// 更新品牌
exports.updateTrademark = async (req, res) => {
  try {
    const { id, tmName, logoUrl } = req.body;

    // 验证必填字段
    if (!tmName || !tmName.trim()) {
      return res.status(400).json({
        code: 400,
        data: { message: '品牌名称不能为空' }
      });
    }

    if (!logoUrl || !logoUrl.trim()) {
      return res.status(400).json({
        code: 400,
        data: { message: '品牌LOGO不能为空' }
      });
    }

    // 查找并更新品牌
    const trademark = await Trademark.findById(id);
    if (!trademark) {
      return res.status(404).json({
        code: 404,
        data: { message: '品牌不存在' }
      });
    }

    trademark.tmName = tmName;
    trademark.logoUrl = logoUrl;

    await trademark.save();

    res.json({
      code: 200,
      data: trademark
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '更新品牌失败',
      data: null
    });
  }
};

// 删除品牌
exports.deleteTrademark = async (req, res) => {
  try {
    const id = req.params.id;

    // 查找并删除品牌
    const trademark = await Trademark.findByIdAndDelete(id);
    if (!trademark) {
      return res.status(404).json({
        code: 404,
        data: { message: '品牌不存在' }
      });
    }

    res.json({
      code: 200,
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除品牌失败',
      data: null
    });
  }
};

// 获取所有品牌（不分页）
exports.getAllTrademarks = async (req, res) => {
  try {
    const trademarks = await Trademark.find();

    res.json({
      code: 200,
      data: trademarks
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取品牌列表失败',
      data: null
    });
  }
};
