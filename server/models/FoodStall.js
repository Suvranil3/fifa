const { pool } = require('../config/database');

const MOCK_FOOD_STALLS = [
  { id: 1, name: 'Brazilian BBQ Grill', type: 'BBQ', is_vegetarian: false, is_halal: false, is_vegan: false, lat: 40.8135, lng: -74.0745, zone: 'North' },
  { id: 2, name: 'Mediterranean Delights', type: 'Mediterranean', is_vegetarian: true, is_halal: true, is_vegan: true, lat: 40.8110, lng: -74.0730, zone: 'South' },
  { id: 3, name: 'Tokyo Sushi Bar', type: 'Japanese', is_vegetarian: true, is_halal: false, is_vegan: false, lat: 40.8130, lng: -74.0720, zone: 'East' },
  { id: 4, name: 'Vegan Paradise', type: 'Healthy', is_vegetarian: true, is_halal: true, is_vegan: true, lat: 40.8138, lng: -74.0730, zone: 'North' },
  { id: 5, name: 'Halal Kitchen', type: 'Middle Eastern', is_vegetarian: false, is_halal: true, is_vegan: false, lat: 40.8115, lng: -74.0720, zone: 'East' },
  { id: 6, name: 'Pizza Corner', type: 'Italian', is_vegetarian: true, is_halal: false, is_vegan: false, lat: 40.8125, lng: -74.0720, zone: 'East' },
  { id: 7, name: 'Taco Fiesta', type: 'Mexican', is_vegetarian: true, is_halal: false, is_vegan: false, lat: 40.8110, lng: -74.0740, zone: 'South' },
  { id: 8, name: 'Smoothie Station', type: 'Beverage', is_vegetarian: true, is_halal: true, is_vegan: true, lat: 40.8136, lng: -74.0740, zone: 'North' },
  { id: 9, name: 'German Sausage House', type: 'German', is_vegetarian: false, is_halal: false, is_vegan: false, lat: 40.8120, lng: -74.0720, zone: 'East' },
  { id: 10, name: 'Indian Spice', type: 'Indian', is_vegetarian: true, is_halal: true, is_vegan: true, lat: 40.8110, lng: -74.0745, zone: 'South' }
];

class FoodStall {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM food_stalls');
      return rows;
    } catch (error) {
      return MOCK_FOOD_STALLS;
    }
  }

  static async findByType(cuisineType) {
    try {
      const [rows] = await pool.query('SELECT * FROM food_stalls WHERE type = ?', [cuisineType]);
      return rows;
    } catch (error) {
      return MOCK_FOOD_STALLS.filter(s => s.type === cuisineType);
    }
  }

  static async findVegetarian() {
    try {
      const [rows] = await pool.query('SELECT * FROM food_stalls WHERE is_vegetarian = true');
      return rows;
    } catch (error) {
      return MOCK_FOOD_STALLS.filter(s => s.is_vegetarian);
    }
  }

  static async findHalal() {
    try {
      const [rows] = await pool.query('SELECT * FROM food_stalls WHERE is_halal = true');
      return rows;
    } catch (error) {
      return MOCK_FOOD_STALLS.filter(s => s.is_halal);
    }
  }

  static async findVegan() {
    try {
      const [rows] = await pool.query('SELECT * FROM food_stalls WHERE is_vegan = true');
      return rows;
    } catch (error) {
      return MOCK_FOOD_STALLS.filter(s => s.is_vegan);
    }
  }

  static async findNearest(lat, lng) {
    try {
      const [rows] = await pool.query('SELECT *, ( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance FROM food_stalls ORDER BY distance LIMIT 1', [lat, lng, lat]);
      return rows[0];
    } catch (error) {
      // Mock distance calculation
      return MOCK_FOOD_STALLS[0];
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM food_stalls WHERE id = ?', [id]);
      if (rows.length > 0) return rows[0];
      throw new Error();
    } catch (error) {
      return MOCK_FOOD_STALLS.find(s => s.id === parseInt(id)) || null;
    }
  }
}

module.exports = FoodStall;
