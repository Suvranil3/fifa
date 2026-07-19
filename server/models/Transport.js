const { pool } = require('../config/database');

const MOCK_TRANSPORT = [
  { id: 1, name: 'Meadowlands Station', type: 'metro', is_accessible: true, lat: 40.8130, lng: -74.0720, zone: 'East' },
  { id: 2, name: 'Secaucus Junction', type: 'metro', is_accessible: true, lat: 40.7610, lng: -74.0750, zone: 'Offsite' },
  { id: 3, name: 'Hoboken Terminal', type: 'metro', is_accessible: true, lat: 40.7350, lng: -74.0270, zone: 'Offsite' },
  { id: 4, name: 'NJ Transit Route 160', type: 'bus', is_accessible: true, lat: 40.8135, lng: -74.0745, zone: 'North' },
  { id: 5, name: 'Stadium Express', type: 'bus', is_accessible: true, lat: 40.8110, lng: -74.0730, zone: 'South' },
  { id: 6, name: 'North Lot Shuttle', type: 'shuttle', is_accessible: true, lat: 40.8140, lng: -74.0735, zone: 'North' },
  { id: 7, name: 'South Lot Shuttle', type: 'shuttle', is_accessible: false, lat: 40.8105, lng: -74.0740, zone: 'South' },
  { id: 8, name: 'West Lot Parking', type: 'parking', is_accessible: true, lat: 40.8125, lng: -74.0760, zone: 'West' }
];

class Transport {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM transport');
      return rows;
    } catch (error) {
      return MOCK_TRANSPORT;
    }
  }

  static async findByType(type) {
    try {
      const [rows] = await pool.query('SELECT * FROM transport WHERE type = ?', [type]);
      return rows;
    } catch (error) {
      return MOCK_TRANSPORT.filter(t => t.type === type);
    }
  }

  static async findNearest(lat, lng) {
    try {
      const [rows] = await pool.query('SELECT *, ( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance FROM transport ORDER BY distance LIMIT 1', [lat, lng, lat]);
      return rows[0];
    } catch (error) {
      return MOCK_TRANSPORT[0];
    }
  }

  static async findAccessible() {
    try {
      const [rows] = await pool.query('SELECT * FROM transport WHERE is_accessible = true');
      return rows;
    } catch (error) {
      return MOCK_TRANSPORT.filter(t => t.is_accessible);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM transport WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_TRANSPORT.find(t => t.id === parseInt(id)) || null;
    }
  }
}

module.exports = Transport;
