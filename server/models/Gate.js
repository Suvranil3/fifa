const { pool } = require('../config/database');

const MOCK_GATES = [
  { id: 1, name: 'Gate A1', zone: 'North', capacity: 15000, current_crowd: 12000, status: 'open', is_accessible: true },
  { id: 2, name: 'Gate A2', zone: 'North', capacity: 15000, current_crowd: 14000, status: 'open', is_accessible: false },
  { id: 3, name: 'Gate B1', zone: 'East', capacity: 15000, current_crowd: 8000, status: 'open', is_accessible: true },
  { id: 4, name: 'Gate C1', zone: 'South', capacity: 15000, current_crowd: 5000, status: 'open', is_accessible: true }
];

class Gate {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM gates');
      return rows;
    } catch (error) {
      return MOCK_GATES;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM gates WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_GATES.find(g => g.id === parseInt(id)) || null;
    }
  }

  static async updateCrowd(id, count) {
    try {
      await pool.query('UPDATE gates SET current_crowd = ? WHERE id = ?', [count, id]);
      return true;
    } catch (error) {
      return true;
    }
  }

  static async getByStatus(status) {
    try {
      const [rows] = await pool.query('SELECT * FROM gates WHERE status = ?', [status]);
      return rows;
    } catch (error) {
      return MOCK_GATES.filter(g => g.status === status);
    }
  }

  static async findLeastCrowded() {
    try {
      const [rows] = await pool.query('SELECT * FROM gates ORDER BY (current_crowd / capacity) ASC LIMIT 1');
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return [...MOCK_GATES].sort((a, b) => (a.current_crowd/a.capacity) - (b.current_crowd/b.capacity))[0];
    }
  }

  static async getAccessibleGates() {
    try {
      const [rows] = await pool.query('SELECT * FROM gates WHERE is_accessible = true');
      return rows;
    } catch (error) {
      return MOCK_GATES.filter(g => g.is_accessible);
    }
  }
}

module.exports = Gate;
