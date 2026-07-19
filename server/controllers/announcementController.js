const Announcement = require('../models/Announcement');
const geminiService = require('../services/geminiService');
const { formatResponse } = require('../utils/helpers');

const getAnnouncements = async (req, res, next) => {
  try {
    const { category } = req.query;
    let announcements;
    if (category) {
      announcements = await Announcement.findByCategory(category);
    } else {
      announcements = await Announcement.findAll();
    }
    res.json(formatResponse(true, announcements, 'Announcements retrieved'));
  } catch (error) {
    next(error);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const data = req.body;
    data.is_active = true;
    data.created_at = new Date().toISOString();
    const id = await Announcement.create(data);
    res.status(201).json(formatResponse(true, { id, ...data }, 'Announcement created'));
  } catch (error) {
    next(error);
  }
};

const generateAnnouncement = async (req, res, next) => {
  try {
    const { context, language = 'en', category, priority = 'low', target_audience } = req.body;
    const generated = await geminiService.generateAnnouncement(context, language, category);
    
    // We don't save it automatically, just return the generated content for review
    res.json(formatResponse(true, {
      ...generated,
      priority,
      target_audience,
      category
    }, 'Announcement generated'));
  } catch (error) {
    next(error);
  }
};

const generateMultilingual = async (req, res, next) => {
  try {
    const { context, category, priority } = req.body;
    const languages = ['en', 'es', 'fr', 'ar', 'pt'];
    
    const promises = languages.map(lang => 
      geminiService.generateAnnouncement(context, lang, category)
    );
    
    const results = await Promise.all(promises);
    res.json(formatResponse(true, results, 'Multilingual announcements generated'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
  generateAnnouncement,
  generateMultilingual
};
