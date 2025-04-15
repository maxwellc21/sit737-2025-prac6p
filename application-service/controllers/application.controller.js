const Application = require('../models/Application');

// Submit application
exports.submitApplication = async (req, res) => {
  try {
    const app = await Application.create({
      ...req.body,
      studentId: req.user.id
    });
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit application', details: err.message });
  }
};

// Get applications by student
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.user.id });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching applications' });
  }
};

// Get all applications (admin/reviewer)
exports.getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching applications' });
  }
};
