// ✅ Load .env variables FIRST
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const proxyRoutes = require('./routes/proxy.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS before proxy
app.use(cors());

// ✅ Mount proxy routes BEFORE any body parsing
app.use('/', proxyRoutes);

// ✅ Error fallback (optional)
app.use((req, res) => {
  console.warn(`⚠️ Unmatched route: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚪 API Gateway running on port ${PORT}`);
});
