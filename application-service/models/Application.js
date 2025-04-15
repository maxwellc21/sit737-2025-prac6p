const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const applicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  studentId: { type: String, required: true },
  scholarshipId: { type: String, required: true },
  personalStatement: String,
  experience: String,
  documents: [String], // URLs
  status: {
    type: String,
    enum: ['submitted', 'under review', 'awarded', 'rejected'],
    default: 'submitted'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
