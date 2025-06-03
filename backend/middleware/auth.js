const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 从请求头获取token
    let token = req.headers.authorization || req.headers.token;

    // 如果token以Bearer开头，去掉Bearer前缀
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    if (!token) {
      return res.status(401).json({
        code: 401,
        message: '未提供认证令牌',
        ok: false
      });
    }

    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');

    // 将解码后的用户信息添加到请求对象中
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: '认证失败',
      ok: false,
      error: error.message
    });
  }
};
