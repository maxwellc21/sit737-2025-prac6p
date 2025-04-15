require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 5009;

app.use(cors());
app.use(express.json());

connectDB();
app.use('/', adminRoutes);

app.get('/', (req, res) => res.send('🛡️ Admin Service Running'));

app.listen(PORT, () => {
  console.log(`🚀 Admin Service running on port ${PORT}`);
});
