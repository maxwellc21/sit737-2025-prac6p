const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  provider: { type: String, default: 'local' },
  role: {
    type: String,
    enum: ['student', 'provider', 'reviewer', 'admin'],
    default: 'student'
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'approved'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
