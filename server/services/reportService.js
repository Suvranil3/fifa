const geminiService = require('./geminiService');
const crowdService = require('./crowdService');
const { pool } = require('../config/database');

const MOCK_REPORTS = [
  { id: 1, title: 'Post-Match Operations Report', type: 'operational', created_at: new Date().toISOString() },
  { id: 2, title: 'Weekly Sustainability Metrics', type: 'sustainability', created_at: new Date().toISOString() },
  { id: 3, title: 'Crowd Flow Analysis', type: 'crowd', created_at: new Date().toISOString() }
];

class ReportService {
  async generateReport(type, dateRange) {
    let data = {};
    let content = {};
    
    if (type === 'operational') {
      data = await this.getOperationalSummary();
      content = await geminiService.generateReport(data);
    } else if (type === 'sustainability') {
      data = await this.getSustainabilityMetrics();
      content = await geminiService.getSustainabilityInsights(data);
    } else {
      data = await crowdService.getCurrentCrowdData();
      content = await geminiService.generateReport({ crowd: data });
    }

    const report = {
      id: Math.floor(Math.random() * 1000) + 100,
      title: content.title || `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
      type,
      content,
      metrics: data,
      recommendations: content.recommendations || []
    };
    
    return report;
  }

  async getOperationalSummary() {
    return {
      totalAttendance: 78500,
      activeGates: 12,
      avgWaitTime: '15 mins',
      incidentCount: 5,
      volunteerDeployment: 120,
      fanSatisfaction: '4.2/5'
    };
  }

  async getSustainabilityMetrics() {
    return {
      totalWaste: {
        recyclable: '2.5 tons',
        organic: '1.2 tons',
        general: '3.1 tons',
        hazardous: '0.1 tons'
      },
      waterUsage: '150,000 L',
      carbonFootprint: '45.2 CO2e',
      recyclingRate: '42%'
    };
  }

  async getReportById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error('Not found');
    } catch (error) {
      return MOCK_REPORTS.find(r => r.id === parseInt(id)) || MOCK_REPORTS[0];
    }
  }

  async listReports(filters = {}) {
    try {
      let query = 'SELECT * FROM reports';
      if (filters.type) {
        query += ` WHERE type = '${filters.type}'`;
      }
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      if (filters.type) {
        return MOCK_REPORTS.filter(r => r.type === filters.type);
      }
      return MOCK_REPORTS;
    }
  }
}

module.exports = new ReportService();
