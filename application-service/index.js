require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const appRoutes = require('./routes/application.routes');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

connectDB();
app.use('/', appRoutes);

app.get('/', (req, res) => res.send('📄 Application Service Running'));

app.listen(PORT, () => {
  console.log(`🚀 Application Service running on port ${PORT}`);
});
