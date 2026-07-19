const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', volunteerController.getVolunteers);
router.post('/deploy', authenticateToken, volunteerController.deployVolunteer);
router.get('/suggestions', authenticateToken, volunteerController.getDeploymentSuggestions);

module.exports = router;
