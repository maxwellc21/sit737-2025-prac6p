const Review = require('../models/Review');

// Submit a review
exports.submitReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      reviewerId: req.user.id
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: 'Review submission failed', details: err.message });
  }
};

// Get all reviews by this reviewer
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewerId: req.user.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Get all reviews (admin or analytics)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all reviews' });
  }
};
