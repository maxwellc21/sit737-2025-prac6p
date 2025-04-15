const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

const services = {
  '/api/auth': process.env.AUTH_SERVICE_URL,
  '/api/student': process.env.STUDENT_SERVICE_URL,
  '/api/scholarships': process.env.SCHOLARSHIP_SERVICE_URL,
  '/api/applications': process.env.APPLICATION_SERVICE_URL,
  '/api/reviews': process.env.REVIEWER_SERVICE_URL,
  '/api/files': process.env.FILE_SERVICE_URL,
  '/api/admin': process.env.ADMIN_SERVICE_URL,
};

// ✅ Register proxy for each path
Object.entries(services).forEach(([route, target]) => {
  router.use(route, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${route}`]: '' },
    onProxyReq: (proxyReq, req) => {
      console.log(`➡️  ${req.method} ${req.originalUrl} → ${target}`);
    },
    onError(err, req, res) {
      console.error('❌ Proxy error:', err.message);
      res.status(500).json({ error: 'Proxy error', details: err.message });
    }
  }));
});

module.exports = router;
