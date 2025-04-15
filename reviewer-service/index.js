require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const reviewRoutes = require('./routes/review.routes');

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());

connectDB();
app.use('/', reviewRoutes);

app.get('/', (req, res) => res.send('🧑‍⚖️ Reviewer Service Running'));

app.listen(PORT, () => {
  console.log(`🚀 Reviewer Service running on port ${PORT}`);
});
