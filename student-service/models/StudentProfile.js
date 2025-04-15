const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: String,
  email: String,
  dateOfBirth: String,
  institution: String,
  gpa: Number,
  phone: String,
  address: String,
  documents: [String]
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
