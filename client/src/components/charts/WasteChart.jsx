import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const WasteChart = ({ data }) => {
  const chartData = data || {
    labels: ['Recyclable', 'Organic', 'General', 'Hazardous'],
    datasets: [
      {
        data: [2400, 1800, 3200, 150],
        backgroundColor: [
          '#10b981', // green
          '#f59e0b', // yellow
          '#6b7280', // gray
          '#ef4444', // red
        ],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` ${context.label}: ${context.raw} kg`;
          }
        }
      }
    }
  };

  const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card p-6 h-full flex flex-col relative">
      <h3 className="text-white text-lg font-semibold mb-4">Waste Distribution</h3>
      <div className="relative flex-grow min-h-[250px]">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-2xl font-bold text-white">{total.toLocaleString()}</span>
          <span className="text-sm text-secondary">kg Total</span>
        </div>
      </div>
    </div>
  );
};

export default WasteChart;
