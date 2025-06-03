const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 导入路由
const userRoutes = require('./routes/acl/userRoutes');
const roleRoutes = require('./routes/acl/roleRoutes');
const permissionRoutes = require('./routes/acl/permissionRoutes');
const trademarkRoutes = require('./routes/product/trademarkRoutes');
const attrRoutes = require('./routes/product/attrRoutes');
const spuRoutes = require('./routes/product/spuRoutes');
const skuRoutes = require('./routes/product/skuRoutes');

// 导入中间件
const errorMiddleware = require('./middleware/error');

const app = express();

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 路由
app.use('/admin/acl/index', userRoutes);
// 使用不同的路由处理器或者移除这一行
// app.use('/admin/acl/user', userRoutes);
app.use('/admin/acl/user', userRoutes); // 如果需要保留，应该使用不同的路由处理器
app.use('/admin/acl/role', roleRoutes);
app.use('/admin/acl/permission', permissionRoutes);
app.use('/admin/product/baseTrademark', trademarkRoutes);
app.use('/admin/product', attrRoutes);
app.use('/admin/product', spuRoutes);
app.use('/admin/product', skuRoutes);

// 错误处理中间件
app.use(errorMiddleware);

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
