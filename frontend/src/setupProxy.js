const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://118.67.133.19:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
  app.use(
    createProxyMiddleware('/signaling/socket.io', {
      target: 'http://118.67.128.116:3001',
      changeOrigin: true,
      ws: false,
    }),
  );
};
