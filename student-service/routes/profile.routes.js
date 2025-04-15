const express = require('express');
const router = express.Router();
const { getProfile, upsertProfile } = require('../controllers/profile.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, upsertProfile);

module.exports = router;
