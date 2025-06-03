const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/acl/user');

async function fixPasswords() {
  try {
    // 连接数据库
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // 生成正确的密码哈希
    const hashedPassword = await bcrypt.hash('123456', 10);
    console.log('Generated hash:', hashedPassword);

    // 更新所有用户的密码
    const result = await User.updateMany(
      {},
      {
        password: hashedPassword,
        updateTime: new Date()
      }
    );

    console.log(`Updated ${result.modifiedCount} users`);

    // 验证密码是否正确
    const testUser = await User.findOne({ username: 'admin' });
    const isValid = await testUser.comparePassword('123456');
    console.log('Password validation test:', isValid);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixPasswords();
