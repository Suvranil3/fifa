const { pool } = require('../config/database');

const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: 'Welcome', content: 'Welcome to MetLife Stadium!', category: 'general', priority: 'low', is_active: true, created_at: new Date().toISOString() },
  { id: 2, title: 'Gate C Crowded', content: 'Gate C is experiencing heavy traffic.', category: 'traffic', priority: 'medium', is_active: true, created_at: new Date().toISOString() },
  { id: 3, title: 'Emergency Exit', content: 'Please follow signs to emergency exits.', category: 'emergency', priority: 'high', is_active: false, created_at: new Date().toISOString() },
  { id: 4, title: 'Half time show', content: 'Half time show starts in 15 minutes.', category: 'event', priority: 'low', is_active: true, created_at: new Date().toISOString() },
  { id: 5, title: 'Lost Child', content: 'Looking for a lost child near Gate A.', category: 'emergency', priority: 'high', is_active: true, created_at: new Date().toISOString() },
  { id: 6, title: 'Food Discount', content: '20% off at all food stalls for the next hour.', category: 'promotion', priority: 'low', is_active: true, created_at: new Date().toISOString() },
  { id: 7, title: 'Weather Update', content: 'Heavy rain expected, please take cover.', category: 'weather', priority: 'medium', is_active: true, created_at: new Date().toISOString() },
  { id: 8, title: 'Transport Delay', content: 'NJ Transit Route 160 is delayed by 10 mins.', category: 'transport', priority: 'medium', is_active: true, created_at: new Date().toISOString() }
];

class Announcement {
  static async findAll(limit = 50) {
    try {
      const [rows] = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC LIMIT ?', [limit]);
      return rows;
    } catch (error) {
      return MOCK_ANNOUNCEMENTS.slice(0, limit);
    }
  }

  static async create(data) {
    try {
      const [result] = await pool.query('INSERT INTO announcements SET ?', [data]);
      return result.insertId;
    } catch (error) {
      return Math.floor(Math.random() * 1000) + 10;
    }
  }

  static async findActive() {
    try {
      const [rows] = await pool.query('SELECT * FROM announcements WHERE is_active = true ORDER BY priority DESC, created_at DESC');
      return rows;
    } catch (error) {
      return MOCK_ANNOUNCEMENTS.filter(a => a.is_active);
    }
  }

  static async findByCategory(category) {
    try {
      const [rows] = await pool.query('SELECT * FROM announcements WHERE category = ? ORDER BY created_at DESC', [category]);
      return rows;
    } catch (error) {
      return MOCK_ANNOUNCEMENTS.filter(a => a.category === category);
    }
  }

  static async deactivate(id) {
    try {
      await pool.query('UPDATE announcements SET is_active = false WHERE id = ?', [id]);
      return true;
    } catch (error) {
      return true;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM announcements WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_ANNOUNCEMENTS.find(a => a.id === parseInt(id)) || null;
    }
  }
}

module.exports = Announcement;
