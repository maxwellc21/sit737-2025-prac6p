const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      fullName: String,
      email: String,
      role: String,
      status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    },
    { collection: 'users' }
  )
);

// Get all users (excluding password)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Approve a pending provider
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.status === 'approved') {
      return res.status(400).json({ error: 'User already approved' });
    }

    if (user.role !== 'provider') {
      return res.status(403).json({ error: 'Only providers can be approved by admin' });
    }

    user.status = 'approved';
    await user.save();

    res.json({ message: 'Provider approved', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve user' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
