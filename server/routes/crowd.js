const express = require('express');
const router = express.Router();
const crowdController = require('../controllers/crowdController');

router.get('/', crowdController.getCrowdData);
router.get('/heatmap', crowdController.getHeatmap);
router.get('/predictions', crowdController.getPredictions);
router.get('/gate/:id', crowdController.getGateData);

module.exports = router;
