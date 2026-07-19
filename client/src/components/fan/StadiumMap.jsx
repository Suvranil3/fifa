import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../contexts/AppContext';
import { STADIUM_CENTER, STADIUM_ZOOM } from '../../utils/constants';
import { getDensityColor } from '../../utils/formatters';

// Fix Leaflet icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom Icon Generator
const createCustomIcon = (emoji, bgClass = 'bg-[#131842]', borderColor = 'border-white/20') => {
  return L.divIcon({
    html: `<div class="w-8 h-8 rounded-full ${bgClass} border-2 ${borderColor} flex items-center justify-center text-lg shadow-lg shadow-black/50 backdrop-blur-md">${emoji}</div>`,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const StadiumMap = ({ onMarkerClick }) => {
  const { stadiumData } = useApp();
  const [filters, setFilters] = useState({ gates: true, food: true, medical: true, transport: true });

  const getGateDensityColor = (crowd, cap) => {
    const ratio = crowd / cap;
    if (ratio > 0.8) return 'bg-accent-crimson border-accent-crimson';
    if (ratio > 0.6) return 'bg-warning border-warning';
    if (ratio > 0.4) return 'bg-accent-gold border-accent-gold';
    return 'bg-success border-success';
  };

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[400] glass-card p-2 flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300 p-1">
          <input type="checkbox" checked={filters.gates} onChange={(e) => setFilters({...filters, gates: e.target.checked})} className="accent-accent-gold" />
          🚪 Gates
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300 p-1">
          <input type="checkbox" checked={filters.food} onChange={(e) => setFilters({...filters, food: e.target.checked})} className="accent-accent-gold" />
          🍔 Food
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300 p-1">
          <input type="checkbox" checked={filters.medical} onChange={(e) => setFilters({...filters, medical: e.target.checked})} className="accent-accent-gold" />
          🏥 Medical
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300 p-1">
          <input type="checkbox" checked={filters.transport} onChange={(e) => setFilters({...filters, transport: e.target.checked})} className="accent-accent-gold" />
          🚇 Transport
        </label>
      </div>

      <MapContainer 
        center={STADIUM_CENTER} 
        zoom={STADIUM_ZOOM} 
        className="w-full h-full"
        zoomControl={false}
      >
        <MapController center={STADIUM_CENTER} zoom={STADIUM_ZOOM} />
        
        {/* Dark theme tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Gates */}
        {filters.gates && stadiumData.gates.map((gate) => (
          <React.Fragment key={gate.id}>
            <Circle
              center={[gate.lat, gate.lng]}
              radius={(gate.crowd / gate.cap) * 20}
              pathOptions={{ 
                color: getDensityColor(gate.crowd / gate.cap),
                fillColor: getDensityColor(gate.crowd / gate.cap),
                fillOpacity: 0.3
              }}
            />
            <Marker 
              position={[gate.lat, gate.lng]}
              icon={createCustomIcon('🚪', getGateDensityColor(gate.crowd, gate.cap))}
              eventHandlers={{ click: () => onMarkerClick?.(gate) }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-white text-base border-b border-white/10 pb-1 mb-2">{gate.name}</h3>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>Status: <span className="text-success font-semibold">Open</span></p>
                    <p>Wait Time: <span className="font-semibold text-accent-gold">{Math.round((gate.crowd/gate.cap)*15)} min</span></p>
                    <p>Capacity: {Math.round((gate.crowd/gate.cap)*100)}%</p>
                    {gate.accessible && <p className="text-accent-blue mt-1 font-semibold">♿ Wheelchair Accessible</p>}
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* Food Stalls */}
        {filters.food && stadiumData.foodStalls.map((food) => (
          <Marker 
            key={food.id}
            position={[food.lat, food.lng]}
            icon={createCustomIcon('🍔', 'bg-[#131842]', 'border-accent-gold')}
            eventHandlers={{ click: () => onMarkerClick?.(food) }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-white text-base border-b border-white/10 pb-1 mb-2">{food.name}</h3>
                <p className="text-sm text-gray-300 capitalize">{food.type}</p>
                <p className="text-xs text-success mt-1">Open Now</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Medical */}
        {filters.medical && stadiumData.medicalStations.map((med) => (
          <Marker 
            key={med.id}
            position={[med.lat, med.lng]}
            icon={createCustomIcon('🏥', 'bg-accent-crimson/20', 'border-accent-crimson')}
            eventHandlers={{ click: () => onMarkerClick?.(med) }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-white text-base border-b border-white/10 pb-1 mb-2">{med.name}</h3>
                <p className="text-sm text-gray-300">{med.location}</p>
                <p className="text-xs font-semibold text-accent-crimson mt-1">Emergency Available</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Transport */}
        {filters.transport && stadiumData.transport.map((trans) => {
          let emoji = '🚇';
          if (trans.type === 'bus' || trans.type === 'shuttle') emoji = '🚌';
          if (trans.type === 'parking') emoji = '🅿️';
          
          return (
            <Marker 
              key={trans.id}
              position={[trans.lat, trans.lng]}
              icon={createCustomIcon(emoji, 'bg-[#131842]', 'border-accent-blue')}
              eventHandlers={{ click: () => onMarkerClick?.(trans) }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-white text-base border-b border-white/10 pb-1 mb-2">{trans.name}</h3>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p className="capitalize">Type: {trans.type}</p>
                    <p>Status: <span className={trans.status === 'active' ? 'text-success' : 'text-warning'}>{trans.status}</span></p>
                    {trans.waitTime > 0 ? (
                      <p>Next in: <span className="font-bold text-accent-gold">{trans.waitTime} mins</span></p>
                    ) : (
                      <p className="text-success">Available</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}

      </MapContainer>
    </div>
  );
};

export default StadiumMap;
