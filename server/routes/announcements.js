const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', announcementController.getAnnouncements);
router.post('/', authenticateToken, announcementController.createAnnouncement);
router.post('/generate', authenticateToken, announcementController.generateAnnouncement);
router.post('/multilingual', authenticateToken, announcementController.generateMultilingual);

module.exports = router;
