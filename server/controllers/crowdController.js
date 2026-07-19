const crowdService = require('../services/crowdService');
const geminiService = require('../services/geminiService');
const { formatResponse } = require('../utils/helpers');

const getCrowdData = async (req, res, next) => {
  try {
    const data = await crowdService.getCurrentCrowdData();
    res.json(formatResponse(true, data, 'Crowd data retrieved'));
  } catch (error) {
    next(error);
  }
};

const getHeatmap = async (req, res, next) => {
  try {
    const data = await crowdService.getHeatmapData();
    res.json(formatResponse(true, data, 'Heatmap data retrieved'));
  } catch (error) {
    next(error);
  }
};

const getPredictions = async (req, res, next) => {
  try {
    const data = await crowdService.getCurrentCrowdData();
    const predictions = await geminiService.predictCrowd(data);
    res.json(formatResponse(true, predictions, 'Crowd predictions generated'));
  } catch (error) {
    next(error);
  }
};

const getGateData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await crowdService.getGateData(id);
    if (!data) {
      return res.status(404).json(formatResponse(false, null, 'Gate not found'));
    }
    res.json(formatResponse(true, data, 'Gate data retrieved'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCrowdData,
  getHeatmap,
  getPredictions,
  getGateData
};
