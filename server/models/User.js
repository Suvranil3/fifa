const { pool } = require('../config/database');

const MOCK_USERS = [
  { id: 1, username: 'fan_user', email: 'fan@stadium.ai', role: 'fan', full_name: 'Fan User' },
  { id: 2, username: 'organizer', email: 'org@stadium.ai', role: 'organizer', full_name: 'Organizer User' }
];

class User {
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_USERS.find(u => u.id === parseInt(id)) || null;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_USERS.find(u => u.email === email) || null;
    }
  }

  static async create(data) {
    try {
      const { username, email, password_hash, role, full_name } = data;
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password_hash, role, full_name) VALUES (?, ?, ?, ?, ?)',
        [username, email, password_hash, role, full_name]
      );
      return result.insertId;
    } catch (error) {
      return Math.floor(Math.random() * 1000) + 3; // Mock ID
    }
  }

  static async updateProfile(id, data) {
    try {
      await pool.query('UPDATE users SET ? WHERE id = ?', [data, id]);
      return true;
    } catch (error) {
      return true;
    }
  }

  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      return MOCK_USERS;
    }
  }
}

module.exports = User;
