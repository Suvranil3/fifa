const geminiService = require('../services/geminiService');
const crowdService = require('../services/crowdService');
const Gate = require('../models/Gate');
const FoodStall = require('../models/FoodStall');
const Transport = require('../models/Transport');
const { formatResponse } = require('../utils/helpers');

const chat = async (req, res, next) => {
  try {
    const { message, history, language = 'en' } = req.body;
    
    // Build context
    const gates = await Gate.findAll();
    const food = await FoodStall.findAll();
    const transport = await Transport.findAll();
    
    const stadiumContext = {
      gates,
      food_stalls: food.slice(0, 3), // limit size
      transport_options: transport,
      medical_stations: ['Near Gate A1', 'Near Gate C3']
    };

    let response = await geminiService.chat(message, history, stadiumContext);
    
    if (language !== 'en' && typeof response === 'string') {
      response = await geminiService.translate(response, language);
    }

    res.json(formatResponse(true, { response, language }, 'Chat response generated'));
  } catch (error) {
    next(error);
  }
};

const translate = async (req, res, next) => {
  try {
    const { text, targetLanguage } = req.body;
    const translated = await geminiService.translate(text, targetLanguage);
    res.json(formatResponse(true, { original: text, translated, targetLanguage }, 'Translation complete'));
  } catch (error) {
    next(error);
  }
};

const predictCrowd = async (req, res, next) => {
  try {
    const data = await crowdService.getCurrentCrowdData();
    const predictions = await geminiService.predictCrowd(data);
    res.json(formatResponse(true, predictions, 'Predictions generated'));
  } catch (error) {
    next(error);
  }
};

const getAccessibilityGuidance = async (req, res, next) => {
  try {
    const { needs, destination } = req.body;
    const guidance = await geminiService.getAccessibilityHelp(needs, destination);
    res.json(formatResponse(true, { guidance }, 'Accessibility guidance generated'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
  translate,
  predictCrowd,
  getAccessibilityGuidance
};
