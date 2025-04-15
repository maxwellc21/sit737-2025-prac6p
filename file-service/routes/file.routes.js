const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware');
const verifyToken = require('../middlewares/auth.middleware');
const { uploadFile } = require('../controllers/file.controller');

router.post('/upload', verifyToken, upload.single('file'), uploadFile);

module.exports = router;
