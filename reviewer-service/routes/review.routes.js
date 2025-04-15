const express = require('express');
const router = express.Router();
const { submitReview, getMyReviews, getAllReviews } = require('../controllers/review.controller');
const verifyToken = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');

router.post('/', verifyToken, requireRole(['provider', 'admin']), submitReview);
router.get('/me', verifyToken, requireRole(['reviewer']), getMyReviews);
router.get('/', verifyToken, requireRole(['admin']), getAllReviews);

module.exports = router;
