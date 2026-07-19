const Incident = require('../models/Incident');
const geminiService = require('../services/geminiService');
const { formatResponse } = require('../utils/helpers');

const getIncidents = async (req, res, next) => {
  try {
    const { severity, status } = req.query;
    let incidents = await Incident.findAll();
    
    if (severity) incidents = incidents.filter(i => i.severity === severity);
    if (status) incidents = incidents.filter(i => i.status === status);
    
    res.json(formatResponse(true, incidents, 'Incidents retrieved'));
  } catch (error) {
    next(error);
  }
};

const createIncident = async (req, res, next) => {
  try {
    const { type, description, location_zone, severity } = req.body;
    const data = { type, description, location_zone, severity, created_at: new Date().toISOString() };
    const id = await Incident.create(data);
    res.status(201).json(formatResponse(true, { id, ...data, status: 'reported' }, 'Incident created'));
  } catch (error) {
    next(error);
  }
};

const updateIncident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, resolution_notes } = req.body;
    await Incident.updateStatus(id, status, resolution_notes);
    res.json(formatResponse(true, { id, status, resolution_notes }, 'Incident updated'));
  } catch (error) {
    next(error);
  }
};

const getMedicalStations = async (req, res, next) => {
  try {
    const stations = [
      { id: 1, name: 'North Medical Center', location: 'Gate A1', zone: 'North', is_open: true },
      { id: 2, name: 'South First Aid', location: 'Gate C3', zone: 'South', is_open: true },
      { id: 3, name: 'Mobile Unit 1', location: 'Roaming', zone: 'East', is_open: true }
    ];
    res.json(formatResponse(true, stations, 'Medical stations retrieved'));
  } catch (error) {
    next(error);
  }
};

const reportLostFound = async (req, res, next) => {
  try {
    const { description, location_zone } = req.body;
    const data = { type: 'lost_item', description, location_zone, severity: 'low', created_at: new Date().toISOString() };
    const id = await Incident.create(data);
    res.status(201).json(formatResponse(true, { id, ...data, status: 'reported' }, 'Lost item reported'));
  } catch (error) {
    next(error);
  }
};

const getIncidentSummary = async (req, res, next) => {
  try {
    const activeIncidents = await Incident.findActive();
    const summary = await geminiService.summarizeIncidents(activeIncidents);
    res.json(formatResponse(true, summary, 'Incident summary generated'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIncidents,
  createIncident,
  updateIncident,
  getMedicalStations,
  reportLostFound,
  getIncidentSummary
};
