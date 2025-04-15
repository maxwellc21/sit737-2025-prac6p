// admin.routes.js (updated)
const express = require('express');
const router = express.Router();

const {
  getUsers,
  approveUser,
  deleteUser
} = require('../controllers/admin.controller');

const verifyToken = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');

// ✅ Get all users (Admin only)
router.get('/users', verifyToken, requireRole(['admin']), getUsers);

// ✅ Approve provider by ID (Admin only)
router.put('/users/:id/approve', verifyToken, requireRole(['admin']), approveUser);

// ✅ Delete a user by ID (Admin only)
router.delete('/users/:id', verifyToken, requireRole(['admin']), deleteUser);

module.exports = router;