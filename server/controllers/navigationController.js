const Gate = require('../models/Gate');
const FoodStall = require('../models/FoodStall');
const Transport = require('../models/Transport');
const { formatResponse } = require('../utils/helpers');

const getGates = async (req, res, next) => {
  try {
    const gates = await Gate.findAll();
    res.json(formatResponse(true, gates, 'Gates retrieved'));
  } catch (error) {
    next(error);
  }
};

const findFood = async (req, res, next) => {
  try {
    const { type, vegetarian, halal, vegan } = req.query;
    let stalls = await FoodStall.findAll();

    if (type) stalls = stalls.filter(s => s.type.toLowerCase() === type.toLowerCase());
    if (vegetarian === 'true') stalls = stalls.filter(s => s.is_vegetarian);
    if (halal === 'true') stalls = stalls.filter(s => s.is_halal);
    if (vegan === 'true') stalls = stalls.filter(s => s.is_vegan);

    res.json(formatResponse(true, stalls, 'Food stalls retrieved'));
  } catch (error) {
    next(error);
  }
};

const findMedical = async (req, res, next) => {
  try {
    const medicalStations = [
      { id: 1, name: 'North Medical', lat: 40.8135, lng: -74.0745, gate: 'A1' },
      { id: 2, name: 'South Medical', lat: 40.8110, lng: -74.0740, gate: 'C3' },
      { id: 3, name: 'VIP Medical', lat: 40.8125, lng: -74.0760, gate: 'West' }
    ];
    res.json(formatResponse(true, medicalStations, 'Medical stations retrieved'));
  } catch (error) {
    next(error);
  }
};

const findSeat = async (req, res, next) => {
  try {
    const { seatId } = req.params;
    // Basic mock implementation for finding a seat
    const gatePrefix = seatId.charAt(0).toUpperCase();
    const mockDirections = {
      seat: seatId,
      section: gatePrefix,
      row: seatId.substring(1, 2) || '1',
      gate: `${gatePrefix}1`,
      directions: [
        `Enter through Gate ${gatePrefix}1`,
        'Take stairs to Level 2',
        `Section ${gatePrefix}, Row ${seatId.substring(1, 2) || '1'}, Seat ${seatId.substring(2) || '1'}`
      ]
    };
    res.json(formatResponse(true, mockDirections, 'Seat directions generated'));
  } catch (error) {
    next(error);
  }
};

const findNearestFacility = async (req, res, next) => {
  try {
    const { type } = req.query; // washroom/food/medical/exit
    // Mock response
    res.json(formatResponse(true, {
      type,
      name: `Nearest ${type}`,
      distance: '50m',
      directions: 'Head straight and take the first right.'
    }, 'Nearest facility found'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGates,
  findFood,
  findMedical,
  findSeat,
  findNearestFacility
};
