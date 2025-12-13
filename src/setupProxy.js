const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pa-man-api.vercel.app',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
    })
  );
};