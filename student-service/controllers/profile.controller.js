const StudentProfile = require('../models/StudentProfile');

// GET profile by user ID
exports.getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE or UPDATE profile
exports.upsertProfile = async (req, res) => {
  try {
    const data = req.body;
    const updated = await StudentProfile.findOneAndUpdate(
      { userId: req.user.id },
      { ...data, userId: req.user.id, email: req.user.email },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
};
