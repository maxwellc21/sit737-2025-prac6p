// ✅ Load .env variables FIRST
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

// Import local modules
const authRoutes = require('./routes/auth.routes');
const connectDB = require('./config/db');

// ✅ Load Google Strategy AFTER .env is loaded
require('./services/google.strategy');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Auth Service Running');
});

// Health check endpoint for Kubernetes probes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});
