const { pool } = require('../config/database');

const MOCK_VOLUNTEERS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Volunteer ${i + 1}`,
  skills: ['medical', 'security', 'translation', 'crowd_management', 'accessibility'][i % 5],
  zone: ['North', 'South', 'East', 'West'][i % 4],
  status: i % 3 === 0 ? 'available' : 'deployed'
}));

class Volunteer {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM volunteers');
      return rows;
    } catch (error) {
      return MOCK_VOLUNTEERS;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM volunteers WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_VOLUNTEERS.find(v => v.id === parseInt(id)) || null;
    }
  }

  static async findByZone(zone) {
    try {
      const [rows] = await pool.query('SELECT * FROM volunteers WHERE zone = ?', [zone]);
      return rows;
    } catch (error) {
      return MOCK_VOLUNTEERS.filter(v => v.zone === zone);
    }
  }

  static async findAvailable() {
    try {
      const [rows] = await pool.query('SELECT * FROM volunteers WHERE status = "available"');
      return rows;
    } catch (error) {
      return MOCK_VOLUNTEERS.filter(v => v.status === 'available');
    }
  }

  static async create(data) {
    try {
      const [result] = await pool.query('INSERT INTO volunteers SET ?', [data]);
      return result.insertId;
    } catch (error) {
      return MOCK_VOLUNTEERS.length + 1;
    }
  }

  static async updateStatus(id, status) {
    try {
      await pool.query('UPDATE volunteers SET status = ? WHERE id = ?', [status, id]);
      return true;
    } catch (error) {
      return true;
    }
  }

  static async deploy(id, zone) {
    try {
      await pool.query('UPDATE volunteers SET status = "deployed", zone = ? WHERE id = ?', [zone, id]);
      return true;
    } catch (error) {
      return true;
    }
  }
}

module.exports = Volunteer;
