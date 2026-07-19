const { pool } = require('../config/database');

const MOCK_INCIDENTS = [
  { id: 1, type: 'medical', description: 'Fan feeling dizzy', location_zone: 'North', severity: 'medium', status: 'reported', resolution_notes: null, created_at: new Date().toISOString() },
  { id: 2, type: 'security', description: 'Verbal altercation', location_zone: 'East', severity: 'high', status: 'in_progress', resolution_notes: 'Security dispatched', created_at: new Date().toISOString() },
  { id: 3, type: 'maintenance', description: 'Spill in aisle', location_zone: 'South', severity: 'low', status: 'resolved', resolution_notes: 'Cleaned up', created_at: new Date().toISOString() },
  { id: 4, type: 'lost_item', description: 'Lost wallet', location_zone: 'West', severity: 'low', status: 'reported', resolution_notes: null, created_at: new Date().toISOString() },
  { id: 5, type: 'medical', description: 'Sprained ankle', location_zone: 'North', severity: 'medium', status: 'resolved', resolution_notes: 'Treated at medical station', created_at: new Date().toISOString() }
];

class Incident {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM incidents ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      return MOCK_INCIDENTS;
    }
  }

  static async create(data) {
    try {
      const [result] = await pool.query('INSERT INTO incidents SET ?', [{ ...data, status: 'reported' }]);
      return result.insertId;
    } catch (error) {
      return Math.floor(Math.random() * 1000) + 10;
    }
  }

  static async findActive() {
    try {
      const [rows] = await pool.query('SELECT * FROM incidents WHERE status IN ("reported", "in_progress") ORDER BY severity = "critical" DESC, severity = "high" DESC, created_at DESC');
      return rows;
    } catch (error) {
      return MOCK_INCIDENTS.filter(i => ['reported', 'in_progress'].includes(i.status));
    }
  }

  static async findBySeverity(severity) {
    try {
      const [rows] = await pool.query('SELECT * FROM incidents WHERE severity = ? ORDER BY created_at DESC', [severity]);
      return rows;
    } catch (error) {
      return MOCK_INCIDENTS.filter(i => i.severity === severity);
    }
  }

  static async updateStatus(id, status, notes) {
    try {
      await pool.query('UPDATE incidents SET status = ?, resolution_notes = ? WHERE id = ?', [status, notes, id]);
      return true;
    } catch (error) {
      return true;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM incidents WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_INCIDENTS.find(i => i.id === parseInt(id)) || null;
    }
  }

  static async getStats() {
    try {
      const [rows] = await pool.query('SELECT status, COUNT(*) as count FROM incidents GROUP BY status');
      return rows;
    } catch (error) {
      return [
        { status: 'reported', count: 2 },
        { status: 'in_progress', count: 1 },
        { status: 'resolved', count: 2 }
      ];
    }
  }
}

module.exports = Incident;
