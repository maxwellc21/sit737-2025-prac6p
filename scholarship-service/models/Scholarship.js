const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  providerId: { type: String, required: true }, // ID of provider/admin
  eligibility: {
    gpa: Number,
    major: String,
    location: String,
    financialNeed: Boolean
  },
  amount: Number,
  deadline: Date
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
