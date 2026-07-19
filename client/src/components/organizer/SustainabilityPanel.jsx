import React, { useState } from 'react';
import { FiTrash2, FiRefreshCw, FiDroplet, FiWind, FiZap } from 'react-icons/fi';
import WasteChart from '../charts/WasteChart';
import WaterChart from '../charts/WaterChart';

const SustainabilityPanel = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState(null);

  const metrics = [
    { label: 'Total Waste', value: '7,550', unit: 'kg', icon: FiTrash2, target: '7,000 kg', pct: 107, color: '#ef4444' }, // Over target
    { label: 'Recycling Rate', value: '45', unit: '%', icon: FiRefreshCw, target: '50%', pct: 90, color: '#f59e0b' }, // Under target (yellow)
    { label: 'Water Usage', value: '125k', unit: 'L', icon: FiDroplet, target: '130k L', pct: 96, color: '#10b981' }, // Good
    { label: 'Carbon Footprint', value: '8.2', unit: 'tons', icon: FiWind, target: '10 tons', pct: 82, color: '#10b981' }, // Good
  ];

  const generateInsights = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setInsights([
        "Increase recycling bins by 20% in the North zone.",
        "Install water refill stations near high-crowd gates B1 and B4.",
        "Switch to biodegradable food packaging to reduce general waste by 15%.",
        "Deploy waste sorting volunteers during halftime.",
        "Current carbon footprint is 18% below target - excellent performance."
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-secondary text-sm">{m.label}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{m.value} <span className="text-sm text-secondary font-normal">{m.unit}</span></h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10" style={{ color: m.color }}>
                <m.icon size={20} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-secondary">Target: {m.target}</span>
                <span style={{ color: m.color }}>{m.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#131842] rounded-full overflow-hidden">
                <div className="h-full transition-all" style={{ width: `${Math.min(m.pct, 100)}%`, backgroundColor: m.color }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WasteChart />
        <WaterChart />
      </div>

      {/* AI Insights Section */}
      <div className="glass-card p-6 border-l-4 border-l-[#d4af37]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#d4af37]/20 rounded-lg">
              <FiZap className="text-[#d4af37] text-xl" />
            </div>
            <h3 className="text-white text-lg font-semibold">AI Sustainability Insights</h3>
          </div>
          <button 
            onClick={generateInsights}
            disabled={isGenerating}
            className="btn-primary px-4 py-2 text-sm flex items-center space-x-2"
          >
            {isGenerating ? <span className="animate-spin inline-block h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span> : <span>Generate Insights</span>}
          </button>
        </div>

        {isGenerating ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-5/6"></div>
            <div className="h-4 bg-white/10 rounded w-2/3"></div>
          </div>
        ) : insights ? (
          <ul className="space-y-3">
            {insights.map((insight, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-white">
                <span className="text-[#d4af37] mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-secondary italic text-sm">Click generate to analyze current sustainability metrics and get actionable recommendations.</p>
        )}
      </div>
    </div>
  );
};

export default SustainabilityPanel;
