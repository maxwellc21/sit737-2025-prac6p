require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const profileRoutes = require('./routes/profile.routes');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use('/', profileRoutes);

app.get('/', (req, res) => res.send('🎓 Student Service Running'));

app.listen(PORT, () => {
  console.log(`🚀 Student Service running on port ${PORT}`);
});
