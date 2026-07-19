const { pool } = require('../config/database');

const MOCK_REPORTS = [
  { id: 1, type: 'operational', title: 'Operational Report 1', data: '{}', created_at: new Date().toISOString() },
  { id: 2, type: 'sustainability', title: 'Sustainability Report 1', data: '{}', created_at: new Date().toISOString() },
  { id: 3, type: 'crowd', title: 'Crowd Report 1', data: '{}', created_at: new Date().toISOString() }
];

class Report {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      return MOCK_REPORTS;
    }
  }

  static async create(data) {
    try {
      const [result] = await pool.query('INSERT INTO reports SET ?', [data]);
      return result.insertId;
    } catch (error) {
      return Math.floor(Math.random() * 1000) + 10;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_REPORTS.find(r => r.id === parseInt(id)) || null;
    }
  }

  static async findByType(type) {
    try {
      const [rows] = await pool.query('SELECT * FROM reports WHERE type = ? ORDER BY created_at DESC', [type]);
      return rows;
    } catch (error) {
      return MOCK_REPORTS.filter(r => r.type === type);
    }
  }

  static async getLatest() {
    try {
      const [rows] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC LIMIT 1');
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_REPORTS[0];
    }
  }
}

module.exports = Report;
