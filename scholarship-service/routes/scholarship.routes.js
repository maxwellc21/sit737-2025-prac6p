const express = require('express');
const {
  createScholarship,
  getAllScholarships,
  searchScholarships,
  updateScholarship,
  deleteScholarship
} = require('../controllers/scholarship.controller');
const verifyToken = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');

const router = express.Router();

// Public
router.get('/', getAllScholarships);
router.get('/search', searchScholarships);

// Protected
router.post('/', verifyToken, requireRole(['provider', 'admin']), createScholarship);
router.put('/:id', verifyToken, requireRole(['provider', 'admin']), updateScholarship);
router.delete('/:id', verifyToken, requireRole(['provider', 'admin']), deleteScholarship);

module.exports = router;
