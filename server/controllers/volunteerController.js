const Volunteer = require('../models/Volunteer');
const Incident = require('../models/Incident');
const crowdService = require('../services/crowdService');
const geminiService = require('../services/geminiService');
const { formatResponse } = require('../utils/helpers');

const getVolunteers = async (req, res, next) => {
  try {
    const { status, zone } = req.query;
    let volunteers = await Volunteer.findAll();

    if (status) volunteers = volunteers.filter(v => v.status === status);
    if (zone) volunteers = volunteers.filter(v => v.zone === zone);

    res.json(formatResponse(true, volunteers, 'Volunteers retrieved'));
  } catch (error) {
    next(error);
  }
};

const deployVolunteer = async (req, res, next) => {
  try {
    const { volunteerId, zone } = req.body;
    await Volunteer.deploy(volunteerId, zone);
    res.json(formatResponse(true, { volunteerId, zone, status: 'deployed' }, 'Volunteer deployed'));
  } catch (error) {
    next(error);
  }
};

const getDeploymentSuggestions = async (req, res, next) => {
  try {
    const crowdData = await crowdService.getCurrentCrowdData();
    const incidents = await Incident.findActive();
    const volunteers = await Volunteer.findAll();
    
    const suggestions = await geminiService.getVolunteerSuggestions(crowdData, incidents, volunteers);
    res.json(formatResponse(true, suggestions, 'Deployment suggestions generated'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVolunteers,
  deployVolunteer,
  getDeploymentSuggestions
};
