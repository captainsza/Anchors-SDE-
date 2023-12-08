const express = require('express');
const router = express.Router();
const callbackController = require('../controllers/callback');

router.post('/request', callbackController.requestCallback);

module.exports = router;