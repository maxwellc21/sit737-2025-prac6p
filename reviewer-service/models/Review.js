const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerId: { type: String, required: true },
  applicationId: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  comments: String,
  status: {
    type: String,
    enum: ['under review', 'shortlisted', 'rejected'],
    default: 'under review'
  }
}, { timestamps: true });

reviewSchema.index({ reviewerId: 1, applicationId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
