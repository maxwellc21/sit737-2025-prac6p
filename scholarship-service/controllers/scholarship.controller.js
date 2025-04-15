const Scholarship = require('../models/Scholarship');

// Create new scholarship
exports.createScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.create({
      ...req.body,
      providerId: req.user.id
    });
    res.status(201).json(scholarship);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create scholarship' });
  }
};

// Get all scholarships
exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scholarships' });
  }
};

// Filter by eligibility
exports.searchScholarships = async (req, res) => {
  try {
    const filters = req.query;
    const results = await Scholarship.find({ 'eligibility.gpa': { $lte: filters.gpa || 4.0 } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};

// Update scholarship
exports.updateScholarship = async (req, res) => {
  try {
    const updated = await Scholarship.findOneAndUpdate(
      { _id: req.params.id, providerId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(403).json({ error: 'Not allowed' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

// Delete scholarship
exports.deleteScholarship = async (req, res) => {
  try {
    const deleted = await Scholarship.findOneAndDelete({
      _id: req.params.id,
      providerId: req.user.id
    });
    if (!deleted) return res.status(403).json({ error: 'Not allowed' });
    res.json({ message: 'Scholarship deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};
