const reportService = require('../services/reportService');
const { formatResponse } = require('../utils/helpers');

const getReports = async (req, res, next) => {
  try {
    const { type } = req.query;
    const reports = await reportService.listReports({ type });
    res.json(formatResponse(true, reports, 'Reports retrieved'));
  } catch (error) {
    next(error);
  }
};

const generateReport = async (req, res, next) => {
  try {
    const { type } = req.body;
    if (!['operational', 'sustainability', 'crowd'].includes(type)) {
      return res.status(400).json(formatResponse(false, null, 'Invalid report type'));
    }
    
    const report = await reportService.generateReport(type);
    res.status(201).json(formatResponse(true, report, 'Report generated'));
  } catch (error) {
    next(error);
  }
};

const getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await reportService.getReportById(id);
    if (!report) {
      return res.status(404).json(formatResponse(false, null, 'Report not found'));
    }
    res.json(formatResponse(true, report, 'Report retrieved'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReports,
  generateReport,
  getReportById
};
