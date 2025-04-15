const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const { generateToken } = require('../services/jwt.service');

const router = express.Router();

// Email domain check for provider
function isAllowedEmail(email, role) {
  const domain = email.split('@')[1];
  const allowed = ['org.gov.pg', 'institution.edu.pg'];
  if (['provider'].includes(role)) return allowed.includes(domain);
  return true;
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (['admin', 'reviewer'].includes(role)) {
      return res.status(403).json({ error: 'Unauthorized role. Contact admin.' });
    }

    if (!isAllowedEmail(email, role)) {
      return res.status(403).json({ error: 'Email domain not allowed for this role' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const status = role === 'provider' ? 'pending' : 'approved';
    const user = await User.create({ fullName, email, password: hashed, role, status });

    res.status(201).json({ message: 'Registration successful', status: user.status });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.status === 'pending') {
    return res.status(403).json({ error: 'Account pending approval' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
});

// Google login for students
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  });

module.exports = router;
