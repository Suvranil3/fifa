const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const aiRateLimiter = require('../middleware/rateLimiter');

router.post('/chat', aiRateLimiter, aiController.chat);
router.post('/translate', aiRateLimiter, aiController.translate);
router.post('/crowd-predict', aiController.predictCrowd);
router.post('/accessibility', aiController.getAccessibilityGuidance);

module.exports = router;
