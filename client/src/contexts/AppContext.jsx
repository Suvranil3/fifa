import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [stadiumData, setStadiumData] = useState({
    gates: [],
    foodStalls: [],
    transport: [],
    medicalStations: []
  });
  const [currentMatch, setCurrentMatch] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock data
    const loadData = () => {
      // Mock gates
      const mockGates = [
        { id: 'A1', name: 'Gate A1', region: 'North', crowd: 12400, cap: 15000, lat: 40.8138, lng: -74.0755, accessible: true },
        { id: 'A2', name: 'Gate A2', region: 'North', crowd: 8900, cap: 15000, lat: 40.8142, lng: -74.0748, accessible: false },
        { id: 'A3', name: 'Gate A3', region: 'North', crowd: 11200, cap: 15000, lat: 40.8145, lng: -74.0740, accessible: false },
        { id: 'A4', name: 'Gate A4', region: 'North', crowd: 6500, cap: 15000, lat: 40.8142, lng: -74.0732, accessible: true },
        { id: 'B1', name: 'Gate B1', region: 'East', crowd: 14200, cap: 15000, lat: 40.8135, lng: -74.0725, accessible: false },
        { id: 'B2', name: 'Gate B2', region: 'East', crowd: 9800, cap: 15000, lat: 40.8128, lng: -74.0722, accessible: false },
        { id: 'B3', name: 'Gate B3', region: 'East', crowd: 7300, cap: 15000, lat: 40.8120, lng: -74.0725, accessible: true },
        { id: 'B4', name: 'Gate B4', region: 'East', crowd: 13100, cap: 15000, lat: 40.8115, lng: -74.0730, accessible: false },
        { id: 'C1', name: 'Gate C1', region: 'South', crowd: 5600, cap: 15000, lat: 40.8112, lng: -74.0738, accessible: false },
        { id: 'C2', name: 'Gate C2', region: 'South', crowd: 10500, cap: 15000, lat: 40.8110, lng: -74.0745, accessible: false },
        { id: 'C3', name: 'Gate C3', region: 'South', crowd: 8200, cap: 15000, lat: 40.8112, lng: -74.0752, accessible: true },
        { id: 'C4', name: 'Gate C4', region: 'South', crowd: 11800, cap: 15000, lat: 40.8118, lng: -74.0758, accessible: false },
      ];

      // Mock food stalls
      const mockFood = [
        { id: 'f1', name: 'Brazilian BBQ Grill', region: 'North', type: 'grilled', lat: 40.8140, lng: -74.0748 },
        { id: 'f2', name: 'Mediterranean Delights', region: 'North', type: 'mediterranean, vegetarian options', lat: 40.8138, lng: -74.0742 },
        { id: 'f3', name: 'Tokyo Sushi Bar', region: 'East', type: 'japanese', lat: 40.8130, lng: -74.0726 },
        { id: 'f4', name: 'Vegan Paradise', region: 'East', type: 'vegan, vegetarian', lat: 40.8125, lng: -74.0728 },
        { id: 'f5', name: 'Halal Kitchen', region: 'South', type: 'halal', lat: 40.8114, lng: -74.0745 },
        { id: 'f6', name: 'Pizza Corner', region: 'South', type: 'italian', lat: 40.8112, lng: -74.0750 },
        { id: 'f7', name: 'Taco Fiesta', region: 'West', type: 'mexican', lat: 40.8122, lng: -74.0760 },
        { id: 'f8', name: 'Smoothie Station', region: 'North', type: 'beverages', lat: 40.8144, lng: -74.0738 },
        { id: 'f9', name: 'German Sausage House', region: 'West', type: 'german', lat: 40.8130, lng: -74.0762 },
        { id: 'f10', name: 'Indian Spice', region: 'South', type: 'indian, vegetarian, halal', lat: 40.8116, lng: -74.0748 },
      ];

      // Mock medical
      const mockMedical = [
        { id: 'm1', name: 'Medical Station Alpha', location: 'Near Gate A1', lat: 40.8136, lng: -74.0752 },
        { id: 'm2', name: 'Medical Station Beta', location: 'Near Gate C3', lat: 40.8114, lng: -74.0750 },
        { id: 'm3', name: 'VIP Medical Center', location: 'VIP Area', lat: 40.8128, lng: -74.0742 },
      ];

      // Mock transport
      const mockTransport = [
        { id: 't1', name: 'Meadowlands Station', type: 'metro', lat: 40.8148, lng: -74.0768, waitTime: 5, status: 'active' },
        { id: 't2', name: 'Secaucus Junction', type: 'metro', lat: 40.8180, lng: -74.0640, waitTime: 12, status: 'active' },
        { id: 't3', name: 'Hoboken Terminal', type: 'metro', lat: 40.7360, lng: -74.0280, waitTime: 25, status: 'delayed' },
        { id: 't4', name: 'NJ Transit Route 160', type: 'bus', lat: 40.8145, lng: -74.0770, waitTime: 8, status: 'active' },
        { id: 't5', name: 'Stadium Express', type: 'bus', lat: 40.8150, lng: -74.0730, waitTime: 3, status: 'active' },
        { id: 't6', name: 'North Lot Shuttle', type: 'shuttle', lat: 40.8155, lng: -74.0755, waitTime: 2, status: 'active' },
        { id: 't7', name: 'South Lot Shuttle', type: 'shuttle', lat: 40.8100, lng: -74.0745, waitTime: 4, status: 'active' },
        { id: 't8', name: 'West Lot Parking', type: 'parking', lat: 40.8125, lng: -74.0775, waitTime: 0, status: 'active' },
      ];

      setStadiumData({ gates: mockGates, foodStalls: mockFood, transport: mockTransport, medicalStations: mockMedical });
      
      setCurrentMatch({
        homeTeam: 'Argentina',
        awayTeam: 'Spain',
        homeScore: 2,
        awayScore: 1,
        minute: 67,
        stadium: 'MetLife Stadium',
        date: '2026-07-19',
        status: 'LIVE'
      });

      setStats({
        totalFans: 45230,
        activeGates: 10,
        totalGates: 12,
        avgWaitTime: 8,
        openFoodStalls: 8,
        totalFoodStalls: 10,
        activeIncidents: 3,
        deployedVolunteers: 42,
        totalVolunteers: 60,
        fanSatisfaction: 92
      });

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ stadiumData, currentMatch, stats, loading }}>
      {children}
    </AppContext.Provider>
  );
};
