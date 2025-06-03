// 连接到ecommerce数据库
use ecommerce;

// ==================== 创建权限数据 ====================
print("正在创建权限数据...");

// 定义权限菜单结构
const permissions = [
  // 一级菜单
  {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    pid: 0,
    name: "首页",
    code: "Workplace",
    level: 1,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439012"),
    pid: 0,
    name: "数据大屏",
    code: "Screen",
    level: 1,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439013"),
    pid: 0,
    name: "权限管理",
    code: "Acl",
    level: 1,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439014"),
    pid: 0,
    name: "商品管理",
    code: "Product",
    level: 1,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  // 权限管理子菜单
  {
    _id: ObjectId("507f1f77bcf86cd799439015"),
    pid: ObjectId("507f1f77bcf86cd799439013"),
    name: "用户管理",
    code: "User",
    level: 2,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439016"),
    pid: ObjectId("507f1f77bcf86cd799439013"),
    name: "角色管理",
    code: "Role",
    level: 2,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439017"),
    pid: ObjectId("507f1f77bcf86cd799439013"),
    name: "菜单管理",
    code: "Permission",
    level: 2,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  // 商品管理子菜单
  {
    _id: ObjectId("507f1f77bcf86cd799439018"),
    pid: ObjectId("507f1f77bcf86cd799439014"),
    name: "品牌管理",
    code: "Trademark",
    level: 2,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439019"),
    pid: ObjectId("507f1f77bcf86cd799439014"),
    name: "属性管理",
    code: "Attr",
    level: 2,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943901a"),
    pid: ObjectId("507f1f77bcf86cd799439014"),
    name: "SPU管理",
    code: "Spu",
    level: 2,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943901b"),
    pid: ObjectId("507f1f77bcf86cd799439014"),
    name: "SKU管理",
    code: "Sku",
    level: 2,
    select: false,
    children: [],
    createTime: new Date(),
    updateTime: new Date()
  }
];

// 插入权限数据
db.permissions.insertMany(permissions);
print("权限数据创建完成，共 " + permissions.length + " 条记录");

// ==================== 创建角色数据 ====================
print("正在创建角色数据...");

// 创建角色
const roles = [
  {
    _id: ObjectId("507f1f77bcf86cd79943901c"),
    roleName: "超级管理员",
    remark: "拥有系统所有权限",
    permissions: permissions.map(p => p._id),
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943901d"),
    roleName: "商品管理员",
    remark: "负责商品相关管理",
    permissions: [
      ObjectId("507f1f77bcf86cd799439011"), // 首页
      ObjectId("507f1f77bcf86cd799439014"), // 商品管理
      ObjectId("507f1f77bcf86cd799439018"), // 品牌管理
      ObjectId("507f1f77bcf86cd799439019"), // 属性管理
      ObjectId("507f1f77bcf86cd79943901a"), // SPU管理
      ObjectId("507f1f77bcf86cd79943901b")  // SKU管理
    ],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943901e"),
    roleName: "普通用户",
    remark: "只能查看基本信息",
    permissions: [
      ObjectId("507f1f77bcf86cd799439011"), // 首页
      ObjectId("507f1f77bcf86cd799439012")  // 数据大屏
    ],
    createTime: new Date(),
    updateTime: new Date()
  }
];

// 插入角色数据
db.roles.insertMany(roles);
print("角色数据创建完成，共 " + roles.length + " 条记录");

// ==================== 创建用户数据 ====================
print("正在创建用户数据...");

// 创建用户（密码为123456的bcrypt加密结果）
const users = [
  {
    _id: ObjectId("683f108a259aeb9fedd4e2f5"),
    username: "admin",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 123456
    name: "系统管理员",
    phone: "13800138000",
    roleName: "超级管理员",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    roles: [ObjectId("507f1f77bcf86cd79943901c")],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("683f108a259aeb9fedd4e2f6"),
    username: "product_admin",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 123456
    name: "商品管理员",
    phone: "13900139000",
    roleName: "商品管理员",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    roles: [ObjectId("507f1f77bcf86cd79943901d")],
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    _id: ObjectId("683f108a259aeb9fedd4e2f7"),
    username: "test_user",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 123456
    name: "测试用户",
    phone: "13700137000",
    roleName: "普通用户",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    roles: [ObjectId("507f1f77bcf86cd79943901e")],
    createTime: new Date(),
    updateTime: new Date()
  }
];

// 插入用户数据
db.users.insertMany(users);
print("用户数据创建完成，共 " + users.length + " 条记录");

// ==================== 创建品牌数据 ====================
print("正在创建品牌数据...");

const trademarks = [
  {
    _id: ObjectId("507f1f77bcf86cd79943901f"),
    tmName: "华为",
    logoUrl: "https://img14.360buyimg.com/n0/jfs/t1/187640/6/30456/54291/639c2163E7e5e307d/a3d3f6e179e77c0c.jpg"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439020"),
    tmName: "小米",
    logoUrl: "https://img14.360buyimg.com/n0/jfs/t1/186882/8/33889/10205/63ec8c6dF0e221f0a/1e2e3a74a0efe624.jpg"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439021"),
    tmName: "苹果",
    logoUrl: "https://img14.360buyimg.com/n0/jfs/t1/36193/39/18399/1219/63ec8c6dF9e12a9c4/a5b78579f7a1e216.jpg"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439022"),
    tmName: "三星",
    logoUrl: "https://img14.360buyimg.com/n0/jfs/t1/123456/1/12345/5678/63ec8c6dF1a2b3c4d/e5f6g7h8i9j0k1l2.jpg"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439023"),
    tmName: "OPPO",
    logoUrl: "https://img14.360buyimg.com/n0/jfs/t1/234567/2/23456/6789/63ec8c6dF2b3c4d5e/f6g7h8i9j0k1l2m3.jpg"
  }
];

db.trademarks.insertMany(trademarks);
print("品牌数据创建完成，共 " + trademarks.length + " 条记录");

// ==================== 创建属性数据 ====================
print("正在创建属性数据...");

const attrs = [
  {
    _id: ObjectId("507f1f77bcf86cd799439024"),
    attrName: "屏幕尺寸",
    categoryId: 61,
    categoryLevel: 3,
    attrValueList: [
      {
        _id: ObjectId(),
        valueName: "5.5英寸",
        attrId: ObjectId("507f1f77bcf86cd799439024")
      },
      {
        _id: ObjectId(),
        valueName: "6.1英寸",
        attrId: ObjectId("507f1f77bcf86cd799439024")
      },
      {
        _id: ObjectId(),
        valueName: "6.7英寸",
        attrId: ObjectId("507f1f77bcf86cd799439024")
      },
      {
        _id: ObjectId(),
        valueName: "7.0英寸",
        attrId: ObjectId("507f1f77bcf86cd799439024")
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439025"),
    attrName: "运行内存",
    categoryId: 61,
    categoryLevel: 3,
    attrValueList: [
      {
        _id: ObjectId(),
        valueName: "6GB",
        attrId: ObjectId("507f1f77bcf86cd799439025")
      },
      {
        _id: ObjectId(),
        valueName: "8GB",
        attrId: ObjectId("507f1f77bcf86cd799439025")
      },
      {
        _id: ObjectId(),
        valueName: "12GB",
        attrId: ObjectId("507f1f77bcf86cd799439025")
      },
      {
        _id: ObjectId(),
        valueName: "16GB",
        attrId: ObjectId("507f1f77bcf86cd799439025")
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439026"),
    attrName: "存储容量",
    categoryId: 61,
    categoryLevel: 3,
    attrValueList: [
      {
        _id: ObjectId(),
        valueName: "64GB",
        attrId: ObjectId("507f1f77bcf86cd799439026")
      },
      {
        _id: ObjectId(),
        valueName: "128GB",
        attrId: ObjectId("507f1f77bcf86cd799439026")
      },
      {
        _id: ObjectId(),
        valueName: "256GB",
        attrId: ObjectId("507f1f77bcf86cd799439026")
      },
      {
        _id: ObjectId(),
        valueName: "512GB",
        attrId: ObjectId("507f1f77bcf86cd799439026")
      },
      {
        _id: ObjectId(),
        valueName: "1TB",
        attrId: ObjectId("507f1f77bcf86cd799439026")
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

db.attrs.insertMany(attrs);
print("属性数据创建完成，共 " + attrs.length + " 条记录");

// ==================== 创建SPU数据 ====================
print("正在创建SPU数据...");

const spus = [
  {
    _id: ObjectId("507f1f77bcf86cd799439027"),
    spuName: "华为 Mate 60 Pro",
    description: "华为最新旗舰手机，搭载麒麟9000S处理器，支持5G网络",
    category3Id: 61,
    tmId: ObjectId("507f1f77bcf86cd79943901f"),
    spuImageList: [
      {
        imgName: "华为Mate60Pro正面图",
        imgUrl: "https://img14.360buyimg.com/n0/jfs/t1/187640/6/30456/54291/639c2163E7e5e307d/a3d3f6e179e77c0c.jpg"
      },
      {
        imgName: "华为Mate60Pro背面图",
        imgUrl: "https://img14.360buyimg.com/n0/jfs/t1/186882/8/33889/10205/63ec8c6dF0e221f0a/1e2e3a74a0efe624.jpg"
      }
    ],
    spuSaleAttrList: [
      {
        baseSaleAttrId: "1",
        saleAttrName: "颜色",
        spuSaleAttrValueList: [
          { saleAttrValueName: "曜金黑", isChecked: false },
          { saleAttrValueName: "星河银", isChecked: false },
          { saleAttrValueName: "青山黛", isChecked: false }
        ]
      },
      {
        baseSaleAttrId: "2",
        saleAttrName: "版本",
        spuSaleAttrValueList: [
          { saleAttrValueName: "12GB+256GB", isChecked: false },
          { saleAttrValueName: "12GB+512GB", isChecked: false },
          { saleAttrValueName: "16GB+1TB", isChecked: false }
        ]
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439028"),
    spuName: "小米14 Ultra",
    description: "小米影像旗舰，搭载徕卡光学系统，专业摄影体验",
    category3Id: 61,
    tmId: ObjectId("507f1f77bcf86cd799439020"),
    spuImageList: [
      {
        imgName: "小米14Ultra正面图",
        imgUrl: "https://img14.360buyimg.com/n0/jfs/t1/186882/8/33889/10205/63ec8c6dF0e221f0a/1e2e3a74a0efe624.jpg"
      }
    ],
    spuSaleAttrList: [
      {
        baseSaleAttrId: "1",
        saleAttrName: "颜色",
        spuSaleAttrValueList: [
          { saleAttrValueName: "钛金黑", isChecked: false },
          { saleAttrValueName: "钛金白", isChecked: false }
        ]
      },
      {
        baseSaleAttrId: "2",
        saleAttrName: "版本",
        spuSaleAttrValueList: [
          { saleAttrValueName: "12GB+256GB", isChecked: false },
          { saleAttrValueName: "16GB+512GB", isChecked: false }
        ]
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439029"),
    spuName: "iPhone 15 Pro Max",
    description: "苹果最新旗舰手机，搭载A17 Pro芯片，钛金属机身",
    category3Id: 61,
    tmId: ObjectId("507f1f77bcf86cd799439021"),
    spuImageList: [
      {
        imgName: "iPhone15ProMax正面图",
        imgUrl: "https://img14.360buyimg.com/n0/jfs/t1/36193/39/18399/1219/63ec8c6dF9e12a9c4/a5b78579f7a1e216.jpg"
      }
    ],
    spuSaleAttrList: [
      {
        baseSaleAttrId: "1",
        saleAttrName: "颜色",
        spuSaleAttrValueList: [
          { saleAttrValueName: "原色钛金属", isChecked: false },
          { saleAttrValueName: "蓝色钛金属", isChecked: false },
          { saleAttrValueName: "白色钛金属", isChecked: false },
          { saleAttrValueName: "黑色钛金属", isChecked: false }
        ]
      },
      {
        baseSaleAttrId: "2",
        saleAttrName: "版本",
        spuSaleAttrValueList: [
          { saleAttrValueName: "256GB", isChecked: false },
          { saleAttrValueName: "512GB", isChecked: false },
          { saleAttrValueName: "1TB", isChecked: false }
        ]
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

db.spus.insertMany(spus);
print("SPU数据创建完成，共 " + spus.length + " 条记录");

// ==================== 创建SKU数据 ====================
print("正在创建SKU数据...");

const skus = [
  {
    _id: ObjectId("507f1f77bcf86cd79943902a"),
    skuName: "华为 Mate 60 Pro 曜金黑 12GB+256GB",
    price: 6999,
    weight: 225,
    skuDesc: "华为旗舰手机，搭载麒麟9000S处理器，支持5G网络",
    category3Id: 61,
    skuDefaultImg: "https://img14.360buyimg.com/n0/jfs/t1/187640/6/30456/54291/639c2163E7e5e307d/a3d3f6e179e77c0c.jpg",
    tmId: ObjectId("507f1f77bcf86cd79943901f"),
    spuId: ObjectId("507f1f77bcf86cd799439027"),
    skuAttrValueList: [
      { attrId: "507f1f77bcf86cd799439024", valueId: "6.7英寸" },
      { attrId: "507f1f77bcf86cd799439025", valueId: "12GB" },
      { attrId: "507f1f77bcf86cd799439026", valueId: "256GB" }
    ],
    skuSaleAttrValueList: [
      { saleAttrId: "1", saleAttrValueId: "曜金黑" },
      { saleAttrId: "2", saleAttrValueId: "12GB+256GB" }
    ],
    isSale: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943902b"),
    skuName: "华为 Mate 60 Pro 星河银 12GB+512GB",
    price: 7699,
    weight: 225,
    skuDesc: "华为旗舰手机，搭载麒麟9000S处理器，支持5G网络",
    category3Id: 61,
    skuDefaultImg: "https://img14.360buyimg.com/n0/jfs/t1/186882/8/33889/10205/63ec8c6dF0e221f0a/1e2e3a74a0efe624.jpg",
    tmId: ObjectId("507f1f77bcf86cd79943901f"),
    spuId: ObjectId("507f1f77bcf86cd799439027"),
    skuAttrValueList: [
      { attrId: "507f1f77bcf86cd799439024", valueId: "6.7英寸" },
      { attrId: "507f1f77bcf86cd799439025", valueId: "12GB" },
      { attrId: "507f1f77bcf86cd799439026", valueId: "512GB" }
    ],
    skuSaleAttrValueList: [
      { saleAttrId: "1", saleAttrValueId: "星河银" },
      { saleAttrId: "2", saleAttrValueId: "12GB+512GB" }
    ],
    isSale: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943902c"),
    skuName: "小米14 Ultra 钛金黑 12GB+256GB",
    price: 6499,
    weight: 220,
    skuDesc: "小米影像旗舰，搭载徕卡光学系统，专业摄影体验",
    category3Id: 61,
    skuDefaultImg: "https://img14.360buyimg.com/n0/jfs/t1/186882/8/33889/10205/63ec8c6dF0e221f0a/1e2e3a74a0efe624.jpg",
    tmId: ObjectId("507f1f77bcf86cd799439020"),
    spuId: ObjectId("507f1f77bcf86cd799439028"),
    skuAttrValueList: [
      { attrId: "507f1f77bcf86cd799439024", valueId: "6.7英寸" },
      { attrId: "507f1f77bcf86cd799439025", valueId: "12GB" },
      { attrId: "507f1f77bcf86cd799439026", valueId: "256GB" }
    ],
    skuSaleAttrValueList: [
      { saleAttrId: "1", saleAttrValueId: "钛金黑" },
      { saleAttrId: "2", saleAttrValueId: "12GB+256GB" }
    ],
    isSale: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943902d"),
    skuName: "iPhone 15 Pro Max 原色钛金属 256GB",
    price: 9999,
    weight: 221,
    skuDesc: "苹果最新旗舰手机，搭载A17 Pro芯片，钛金属机身",
    category3Id: 61,
    skuDefaultImg: "https://img14.360buyimg.com/n0/jfs/t1/36193/39/18399/1219/63ec8c6dF9e12a9c4/a5b78579f7a1e216.jpg",
    tmId: ObjectId("507f1f77bcf86cd799439021"),
    spuId: ObjectId("507f1f77bcf86cd799439029"),
    skuAttrValueList: [
      { attrId: "507f1f77bcf86cd799439024", valueId: "6.7英寸" },
      { attrId: "507f1f77bcf86cd799439025", valueId: "8GB" },
      { attrId: "507f1f77bcf86cd799439026", valueId: "256GB" }
    ],
    skuSaleAttrValueList: [
      { saleAttrId: "1", saleAttrValueId: "原色钛金属" },
      { saleAttrId: "2", saleAttrValueId: "256GB" }
    ],
    isSale: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId("507f1f77bcf86cd79943902e"),
    skuName: "iPhone 15 Pro Max 蓝色钛金属 512GB",
    price: 11999,
    weight: 221,
    skuDesc: "苹果最新旗舰手机，搭载A17 Pro芯片，钛金属机身",
    category3Id: 61,
    skuDefaultImg: "https://img14.360buyimg.com/n0/jfs/t1/36193/39/18399/1219/63ec8c6dF9e12a9c4/a5b78579f7a1e216.jpg",
    tmId: ObjectId("507f1f77bcf86cd799439021"),
    spuId: ObjectId("507f1f77bcf86cd799439029"),
    skuAttrValueList: [
      { attrId: "507f1f77bcf86cd799439024", valueId: "6.7英寸" },
      { attrId: "507f1f77bcf86cd799439025", valueId: "8GB" },
      { attrId: "507f1f77bcf86cd799439026", valueId: "512GB" }
    ],
    skuSaleAttrValueList: [
      { saleAttrId: "1", saleAttrValueId: "蓝色钛金属" },
      { saleAttrId: "2", saleAttrValueId: "512GB" }
    ],
    isSale: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

db.skus.insertMany(skus);
print("SKU数据创建完成，共 " + skus.length + " 条记录");

// ==================== 数据创建完成统计 ====================
print("\n=== MongoDB数据创建完成 ===");
print("数据库: ecommerce");
print("集合统计:");
print("- permissions: " + db.permissions.countDocuments() + " 条记录");
print("- roles: " + db.roles.countDocuments() + " 条记录");
print("- users: " + db.users.countDocuments() + " 条记录");
print("- trademarks: " + db.trademarks.countDocuments() + " 条记录");
print("- attrs: " + db.attrs.countDocuments() + " 条记录");
print("- spus: " + db.spus.countDocuments() + " 条记录");
print("- skus: " + db.skus.countDocuments() + " 条记录");
print("\n默认用户账号:");
print("- 管理员: admin / 123456");
print("- 商品管理员: product_admin / 123456");
print("- 测试用户: test_user / 123456");
print("\n数据创建脚本执行完成！");
