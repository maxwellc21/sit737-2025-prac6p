require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const scholarshipRoutes = require('./routes/scholarship.routes');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/', scholarshipRoutes);

app.get('/', (req, res) => res.send('🎓 Scholarship Service Running'));

app.listen(PORT, () => {
  console.log(`🚀 Scholarship Service running on port ${PORT}`);
});
