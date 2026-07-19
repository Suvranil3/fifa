const express = require('express');
const router = express.Router();
const navigationController = require('../controllers/navigationController');

router.get('/gates', navigationController.getGates);
router.get('/food', navigationController.findFood);
router.get('/medical', navigationController.findMedical);
router.get('/seat/:seatId', navigationController.findSeat);
router.get('/nearest', navigationController.findNearestFacility);

module.exports = router;
