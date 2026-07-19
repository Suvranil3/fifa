import React, { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const CrowdHeatmap = ({ data }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mockZones = data || [
    { id: 'north', name: 'North', current: 12400, capacity: 15000 },
    { id: 'south', name: 'South', current: 5600, capacity: 15000 },
    { id: 'east', name: 'East', current: 14200, capacity: 15000 },
    { id: 'west', name: 'West', current: 11300, capacity: 15000 },
    { id: 'vip', name: 'VIP Center', current: 3200, capacity: 5000 },
  ];

  const totalCurrent = mockZones.reduce((acc, z) => acc + z.current, 0);
  const totalCapacity = mockZones.reduce((acc, z) => acc + z.capacity, 0);
  const totalPct = ((totalCurrent / totalCapacity) * 100).toFixed(1);

  const getColorClass = (pct) => {
    if (pct < 40) return 'bg-[#10b981]';
    if (pct < 70) return 'bg-[#f59e0b]';
    if (pct < 90) return 'bg-[#f97316]';
    return 'bg-[#ef4444] animate-pulse';
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="glass-card p-6 w-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-semibold">Live Crowd Heatmap</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-secondary">Last updated: Just now</span>
          <button 
            onClick={handleRefresh}
            className="text-secondary hover:text-white transition-colors"
          >
            <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-3xl mx-auto my-8 aspect-[2/1] rounded-[100px] border-4 border-white/10 bg-[#131842]/50 p-4 grid grid-cols-3 grid-rows-3 gap-2 overflow-hidden shadow-[0_0_50px_rgba(30,144,255,0.1)]">
        {/* Field/VIP Center */}
        <div className="col-start-2 row-start-2 relative rounded-[40px] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-2 group transition-all hover:bg-white/10 z-10">
          <span className="text-white font-bold text-sm">VIP Center</span>
          <span className="text-xs text-secondary">{mockZones[4].current}/{mockZones[4].capacity}</span>
          <div className="w-full h-1 bg-white/20 mt-1 rounded overflow-hidden">
            <div className={`h-full ${getColorClass((mockZones[4].current/mockZones[4].capacity)*100)}`} style={{width: `${(mockZones[4].current/mockZones[4].capacity)*100}%`}}></div>
          </div>
        </div>

        {/* North Zone */}
        <div className="col-start-2 row-start-1 flex flex-col items-center justify-end pb-2 group transition-all hover:bg-white/5 rounded-t-[100px]">
          <span className="text-white font-bold text-sm">North</span>
          <span className="text-xs text-secondary">{mockZones[0].current}/{mockZones[0].capacity}</span>
          <div className="w-3/4 h-1 bg-white/20 mt-1 rounded overflow-hidden">
            <div className={`h-full ${getColorClass((mockZones[0].current/mockZones[0].capacity)*100)}`} style={{width: `${(mockZones[0].current/mockZones[0].capacity)*100}%`}}></div>
          </div>
        </div>

        {/* South Zone */}
        <div className="col-start-2 row-start-3 flex flex-col items-center justify-start pt-2 group transition-all hover:bg-white/5 rounded-b-[100px]">
          <span className="text-white font-bold text-sm">South</span>
          <span className="text-xs text-secondary">{mockZones[1].current}/{mockZones[1].capacity}</span>
          <div className="w-3/4 h-1 bg-white/20 mt-1 rounded overflow-hidden">
            <div className={`h-full ${getColorClass((mockZones[1].current/mockZones[1].capacity)*100)}`} style={{width: `${(mockZones[1].current/mockZones[1].capacity)*100}%`}}></div>
          </div>
        </div>

        {/* East Zone */}
        <div className="col-start-3 row-start-1 row-span-3 flex flex-col items-center justify-center pl-4 group transition-all hover:bg-white/5 rounded-r-[100px]">
          <span className="text-white font-bold text-sm">East</span>
          <span className="text-xs text-secondary">{mockZones[2].current}/{mockZones[2].capacity}</span>
          <div className="w-2/3 h-1 bg-white/20 mt-1 rounded overflow-hidden">
            <div className={`h-full ${getColorClass((mockZones[2].current/mockZones[2].capacity)*100)}`} style={{width: `${(mockZones[2].current/mockZones[2].capacity)*100}%`}}></div>
          </div>
        </div>

        {/* West Zone */}
        <div className="col-start-1 row-start-1 row-span-3 flex flex-col items-center justify-center pr-4 group transition-all hover:bg-white/5 rounded-l-[100px]">
          <span className="text-white font-bold text-sm">West</span>
          <span className="text-xs text-secondary">{mockZones[3].current}/{mockZones[3].capacity}</span>
          <div className="w-2/3 h-1 bg-white/20 mt-1 rounded overflow-hidden">
            <div className={`h-full ${getColorClass((mockZones[3].current/mockZones[3].capacity)*100)}`} style={{width: `${(mockZones[3].current/mockZones[3].capacity)*100}%`}}></div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white font-medium">Total Capacity</span>
          <span className="text-white font-medium">{totalCurrent.toLocaleString()} / {totalCapacity.toLocaleString()} ({totalPct}%)</span>
        </div>
        <div className="w-full h-3 bg-[#131842] rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full ${totalPct > 90 ? 'bg-[#ef4444]' : 'bg-[#d4af37]'} transition-all duration-1000`} 
            style={{ width: `${totalPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrowdHeatmap;
