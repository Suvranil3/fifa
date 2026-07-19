import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const GateFlowChart = ({ gates, height = 400 }) => {
  const mockGates = gates || [
    { name: 'A1', current: 12400, capacity: 15000 },
    { name: 'A2', current: 5000, capacity: 10000 },
    { name: 'A3', current: 8000, capacity: 10000 },
    { name: 'B1', current: 14200, capacity: 15000 },
    { name: 'B2', current: 6000, capacity: 8000 },
    { name: 'B3', current: 3000, capacity: 8000 },
    { name: 'B4', current: 13100, capacity: 15000 },
    { name: 'C1', current: 5600, capacity: 12000 },
    { name: 'C2', current: 4000, capacity: 12000 },
    { name: 'C3', current: 9000, capacity: 10000 },
    { name: 'C4', current: 9500, capacity: 10000 },
    { name: 'VIP', current: 3200, capacity: 5000 },
  ];

  const labels = mockGates.map(g => g.name);
  const currentData = mockGates.map(g => g.current);
  const maxCapacities = mockGates.map(g => g.capacity);
  
  const getColors = () => {
    return mockGates.map(g => {
      const pct = g.current / g.capacity;
      if (pct < 0.5) return '#10b981'; // green
      if (pct < 0.75) return '#f59e0b'; // yellow
      if (pct < 0.9) return '#f97316'; // orange
      return '#ef4444'; // red
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Current Crowd',
        data: currentData,
        backgroundColor: getColors(),
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const gate = mockGates[context.dataIndex];
            const pct = ((gate.current / gate.capacity) * 100).toFixed(1);
            return `${gate.current} / ${gate.capacity} (${pct}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#94a3b8',
        },
        max: Math.max(...maxCapacities),
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ffffff',
        }
      }
    }
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <h3 className="text-white text-lg font-semibold mb-4">Gate Capacity</h3>
      <div style={{ height: `${height}px`, width: '100%', position: 'relative' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GateFlowChart;
