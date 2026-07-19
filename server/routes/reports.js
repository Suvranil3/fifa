const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', reportController.getReports);
router.post('/generate', authenticateToken, reportController.generateReport);
router.get('/:id', reportController.getReportById);

module.exports = router;
