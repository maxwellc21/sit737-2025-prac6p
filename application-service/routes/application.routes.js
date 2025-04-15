const express = require('express');
const { submitApplication, getMyApplications, getAllApplications } = require('../controllers/application.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, submitApplication);
router.get('/me', verifyToken, getMyApplications);
router.get('/', verifyToken, getAllApplications); // For admin/reviewer

module.exports = router;
