const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'stadium_ai',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
    connection.release();
    return true;
  } catch (error) {
    console.warn('Warning: Failed to connect to the database. Falling back to mock data mode.', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};
