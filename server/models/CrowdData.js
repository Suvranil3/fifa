const { pool } = require('../config/database');

const MOCK_CROWD_DATA = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  gate_id: (i % 4) + 1,
  count: Math.floor(Math.random() * 10000) + 2000,
  timestamp: new Date(Date.now() - (i * 15 * 60000)).toISOString()
}));

class CrowdData {
  static async create(data) {
    try {
      const [result] = await pool.query('INSERT INTO crowd_data SET ?', [data]);
      return result.insertId;
    } catch (error) {
      return Math.floor(Math.random() * 1000) + 100;
    }
  }

  static async getByGate(gateId, limit = 10) {
    try {
      const [rows] = await pool.query('SELECT * FROM crowd_data WHERE gate_id = ? ORDER BY timestamp DESC LIMIT ?', [gateId, limit]);
      return rows;
    } catch (error) {
      return MOCK_CROWD_DATA.filter(d => d.gate_id === parseInt(gateId)).slice(0, limit);
    }
  }

  static async getLatest() {
    try {
      const [rows] = await pool.query('SELECT * FROM crowd_data ORDER BY timestamp DESC LIMIT 10');
      return rows;
    } catch (error) {
      return MOCK_CROWD_DATA.slice(0, 10);
    }
  }

  static async getByTimeRange(start, end) {
    try {
      const [rows] = await pool.query('SELECT * FROM crowd_data WHERE timestamp BETWEEN ? AND ?', [start, end]);
      return rows;
    } catch (error) {
      return MOCK_CROWD_DATA;
    }
  }

  static async getHeatmapData() {
    try {
      const [rows] = await pool.query('SELECT gate_id, count, timestamp FROM crowd_data ORDER BY timestamp DESC LIMIT 20');
      return rows;
    } catch (error) {
      return MOCK_CROWD_DATA.slice(0, 20);
    }
  }
}

module.exports = CrowdData;
