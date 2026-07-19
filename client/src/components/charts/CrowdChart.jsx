import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const mockData = {
  labels: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'],
  datasets: [
    {
      label: 'Gate A1',
      data: [4000, 4800, 5600, 6800, 8200, 9500, 10800, 11500, 12000, 12200, 12300, 12350, 12400],
      borderColor: '#d4af37', // Gold
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Gate B1',
      data: [5000, 5800, 6900, 8200, 9700, 11200, 12500, 13400, 13900, 14100, 14150, 14180, 14200],
      borderColor: '#1e90ff', // Blue
      backgroundColor: 'rgba(30, 144, 255, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Gate C1',
      data: [2000, 2400, 2800, 3300, 3900, 4400, 4900, 5200, 5400, 5500, 5550, 5580, 5600],
      borderColor: '#c41e3a', // Crimson
      backgroundColor: 'rgba(196, 30, 58, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Gate B4',
      data: [6000, 6900, 7800, 8900, 10000, 11100, 12000, 12600, 12900, 13000, 13050, 13080, 13100],
      borderColor: '#10b981', // Green
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
      fill: true,
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#ffffff',
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255,255,255,0.05)',
      },
      ticks: {
        color: '#94a3b8',
      }
    },
    y: {
      grid: {
        color: 'rgba(255,255,255,0.05)',
      },
      ticks: {
        color: '#94a3b8',
      },
      min: 0,
      max: 15000,
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
};

const CrowdChart = ({ data, height = 300 }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(data || mockData);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const newChartData = { ...chartData };
      newChartData.datasets = newChartData.datasets.map(dataset => {
        const gradient = chart.ctx.createLinearGradient(0, 0, 0, height);
        const baseColor = dataset.borderColor;
        const colorMap = {
            '#d4af37': '212, 175, 55',
            '#1e90ff': '30, 144, 255',
            '#c41e3a': '196, 30, 58',
            '#10b981': '16, 185, 129'
        };
        const rgb = colorMap[baseColor] || '255, 255, 255';
        gradient.addColorStop(0, `rgba(${rgb}, 0.5)`);
        gradient.addColorStop(1, `rgba(${rgb}, 0.0)`);
        
        return {
          ...dataset,
          backgroundColor: gradient,
        };
      });
      setChartData(newChartData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <h3 className="text-white text-lg font-semibold mb-4">Crowd Trends</h3>
      <div style={{ height: `${height}px`, width: '100%', position: 'relative' }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CrowdChart;
