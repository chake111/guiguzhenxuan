const Attr = require('../../models/product/attr');

// 模拟分类数据
const categories = {
  category1: [
    { id: 1, name: '家用电器' },
    { id: 2, name: '手机数码' },
    { id: 3, name: '电脑办公' },
    { id: 4, name: '家居家装' }
  ],
  category2: {
    1: [{ id: 11, name: '电视', category1Id: 1 }, { id: 12, name: '空调', category1Id: 1 }, { id: 13, name: '洗衣机', category1Id: 1 }],
    2: [{ id: 21, name: '手机通讯', category1Id: 2 }, { id: 22, name: '手机配件', category1Id: 2 }],
    3: [{ id: 31, name: '电脑整机', category1Id: 3 }, { id: 32, name: '电脑配件', category1Id: 3 }],
    4: [{ id: 41, name: '厨房卫浴', category1Id: 4 }, { id: 42, name: '灯饰照明', category1Id: 4 }]
  },
  category3: {
    11: [{ id: 111, name: '曲面电视', category2Id: 11 }, { id: 112, name: '超薄电视', category2Id: 11 }],
    12: [{ id: 121, name: '壁挂式空调', category2Id: 12 }, { id: 122, name: '柜式空调', category2Id: 12 }],
    13: [{ id: 131, name: '滚筒洗衣机', category2Id: 13 }, { id: 132, name: '波轮洗衣机', category2Id: 13 }],
    21: [{ id: 211, name: '智能手机', category2Id: 21 }, { id: 212, name: '功能手机', category2Id: 21 }],
    22: [{ id: 221, name: '手机壳', category2Id: 22 }, { id: 222, name: '手机贴膜', category2Id: 22 }],
    31: [{ id: 311, name: '笔记本', category2Id: 31 }, { id: 312, name: '台式机', category2Id: 31 }],
    32: [{ id: 321, name: '显示器', category2Id: 32 }, { id: 322, name: '主板', category2Id: 32 }],
    41: [{ id: 411, name: '马桶', category2Id: 41 }, { id: 412, name: '水槽', category2Id: 41 }],
    42: [{ id: 421, name: '吸顶灯', category2Id: 42 }, { id: 422, name: '台灯', category2Id: 42 }]
  }
};

// 获取一级分类
exports.getCategory1 = async (req, res) => {
  try {
    res.json({
      code: 200,
      message: '获取一级分类成功',
      ok: true,
      data: categories.category1
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取一级分类失败',
      ok: false,
      data: null
    });
  }
};

// 获取二级分类
exports.getCategory2 = async (req, res) => {
  try {
    const { category1Id } = req.params;
    const category2List = categories.category2[category1Id] || [];

    res.json({
      code: 200,
      message: '获取二级分类成功',
      ok: true,
      data: category2List
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取二级分类失败',
      ok: false,
      data: null
    });
  }
};

// 获取三级分类
exports.getCategory3 = async (req, res) => {
  try {
    const { category2Id } = req.params;
    const category3List = categories.category3[category2Id] || [];

    res.json({
      code: 200,
      message: '获取三级分类成功',
      ok: true,
      data: category3List
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取三级分类失败',
      ok: false,
      data: null
    });
  }
};

// 获取属性列表
exports.getAttrList = async (req, res) => {
  try {
    const { category1Id, category2Id, category3Id } = req.params;

    const attrs = await Attr.find({
      categoryId: category3Id,
      categoryLevel: 3
    });

    res.json({
      code: 200,
      message: '获取属性列表成功',
      ok: true,
      data: attrs
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取属性列表失败',
      ok: false,
      data: null
    });
  }
};

// 添加或更新属性
exports.saveAttrInfo = async (req, res) => {
  try {
    const { id, attrName, categoryId, categoryLevel, attrValueList } = req.body;

    if (!attrName || !categoryId || !categoryLevel || !attrValueList || attrValueList.length === 0) {
      return res.status(400).json({
        code: 400,
        message: '属性信息不完整',
        ok: false,
        data: null
      });
    }

    // 过滤掉空的属性值
    const filteredAttrValueList = attrValueList.filter(value => value.valueName && value.valueName.trim());

    if (id) {
      // 更新属性
      const attr = await Attr.findById(id);
      if (!attr) {
        return res.status(404).json({
          code: 404,
          message: '属性不存在',
          ok: false,
          data: null
        });
      }

      attr.attrName = attrName;
      attr.attrValueList = filteredAttrValueList;

      await attr.save();

      res.json({
        code: 200,
        message: '更新属性成功',
        ok: true,
        data: null
      });
    } else {
      // 添加属性
      const newAttr = new Attr({
        attrName,
        categoryId,
        categoryLevel,
        attrValueList: filteredAttrValueList
      });

      await newAttr.save();

      res.status(201).json({
        code: 200,
        message: '添加属性成功',
        ok: true,
        data: null
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '保存属性失败',
      ok: false,
      data: null
    });
  }
};

// 删除属性
exports.deleteAttr = async (req, res) => {
  try {
    const { attrId } = req.params;

    const attr = await Attr.findByIdAndDelete(attrId);
    if (!attr) {
      return res.status(404).json({
        code: 404,
        message: '属性不存在',
        ok: false,
        data: null
      });
    }

    res.json({
      code: 200,
      message: '删除属性成功',
      ok: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '删除属性失败',
      ok: false,
      data: null
    });
  }
};
