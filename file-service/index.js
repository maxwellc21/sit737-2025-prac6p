require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const fileRoutes = require('./routes/file.routes');

const app = express();
const PORT = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', fileRoutes);

app.get('/', (req, res) => res.send('📂 File Service Running'));

app.listen(PORT, () => {
  console.log(`🚀 File Service running on port ${PORT}`);
});
