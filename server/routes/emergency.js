const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.get('/incidents', emergencyController.getIncidents);
router.post('/incidents', emergencyController.createIncident);
router.put('/incidents/:id', emergencyController.updateIncident);
router.get('/medical-stations', emergencyController.getMedicalStations);
router.post('/lost-found', emergencyController.reportLostFound);
router.get('/summary', emergencyController.getIncidentSummary);

module.exports = router;
