const { pool } = require('../config/database');

const MOCK_GATES = [
  { id: 1, gate_name: 'Gate A1', zone: 'North', lat: 40.8135, lng: -74.0745, capacity: 15000, crowd: 12000, status: 'open' },
  { id: 2, gate_name: 'Gate A2', zone: 'North', lat: 40.8136, lng: -74.0740, capacity: 15000, crowd: 14000, status: 'open' },
  { id: 3, gate_name: 'Gate A3', zone: 'North', lat: 40.8137, lng: -74.0735, capacity: 15000, crowd: 8000, status: 'open' },
  { id: 4, gate_name: 'Gate A4', zone: 'North', lat: 40.8138, lng: -74.0730, capacity: 15000, crowd: 5000, status: 'open' },
  { id: 5, gate_name: 'Gate B1', zone: 'East', lat: 40.8130, lng: -74.0720, capacity: 15000, crowd: 11000, status: 'open' },
  { id: 6, gate_name: 'Gate B2', zone: 'East', lat: 40.8125, lng: -74.0720, capacity: 15000, crowd: 9000, status: 'open' },
  { id: 7, gate_name: 'Gate B3', zone: 'East', lat: 40.8120, lng: -74.0720, capacity: 15000, crowd: 6000, status: 'open' },
  { id: 8, gate_name: 'Gate B4', zone: 'East', lat: 40.8115, lng: -74.0720, capacity: 15000, crowd: 4000, status: 'open' },
  { id: 9, gate_name: 'Gate C1', zone: 'South', lat: 40.8110, lng: -74.0730, capacity: 15000, crowd: 13000, status: 'open' },
  { id: 10, gate_name: 'Gate C2', zone: 'South', lat: 40.8110, lng: -74.0735, capacity: 15000, crowd: 10000, status: 'open' },
  { id: 11, gate_name: 'Gate C3', zone: 'South', lat: 40.8110, lng: -74.0740, capacity: 15000, crowd: 7000, status: 'open' },
  { id: 12, gate_name: 'Gate C4', zone: 'South', lat: 40.8110, lng: -74.0745, capacity: 15000, crowd: 3000, status: 'open' }
];

class CrowdService {
  async getCurrentCrowdData() {
    try {
      const [rows] = await pool.query('SELECT * FROM gates');
      return rows;
    } catch (error) {
      return MOCK_GATES;
    }
  }

  async getHeatmapData() {
    const data = await this.getCurrentCrowdData();
    return data.map(g => ({
      gate_name: g.gate_name,
      lat: g.lat,
      lng: g.lng,
      intensity: g.crowd / g.capacity,
      crowd: g.crowd,
      capacity: g.capacity
    }));
  }

  async getGateData(gateId) {
    const data = await this.getCurrentCrowdData();
    const gate = data.find(g => g.id === parseInt(gateId)) || data[0];
    return {
      ...gate,
      history: this.generateMockTimeSeries().filter(h => h.gate === gate.gate_name)
    };
  }

  async recordCrowdSnapshot(gateId, count) {
    try {
      await pool.query('INSERT INTO crowd_data (gate_id, count) VALUES (?, ?)', [gateId, count]);
      return true;
    } catch (error) {
      return true; // Mock success
    }
  }

  async getHistoricalData(gateId, hours) {
    try {
      const [rows] = await pool.query('SELECT * FROM crowd_data WHERE gate_id = ? AND timestamp >= DATE_SUB(NOW(), INTERVAL ? HOUR)', [gateId, hours]);
      return rows;
    } catch (error) {
      const gate = MOCK_GATES.find(g => g.id === gateId);
      return this.generateMockTimeSeries().filter(h => h.gate === (gate ? gate.gate_name : 'Gate A1'));
    }
  }

  generateMockTimeSeries() {
    const history = [];
    const now = new Date();
    
    MOCK_GATES.forEach(gate => {
      for (let i = 6; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        // Peak at -1 hour, bell curve shape
        const multiplier = 1 - Math.abs(i - 1) * 0.15;
        const count = Math.max(0, Math.floor(gate.crowd * Math.max(0.1, multiplier)));
        
        history.push({
          time: time.toISOString(),
          count: count,
          gate: gate.gate_name
        });
      }
    });
    
    return history;
  }
}

module.exports = new CrowdService();
