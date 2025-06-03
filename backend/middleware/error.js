const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';

  res.status(statusCode).json({
    code: statusCode,
    message,
    ok: false,
    data: null
  });
};

module.exports = errorMiddleware;
