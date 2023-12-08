const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video');

router.post('/analyze', videoController.analyzeVideo);
router.get('/all', videoController.getAllVideos);
module.exports = router;