import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const WaterChart = ({ data }) => {
  const chartRef = useRef(null);
  
  const defaultData = {
    labels: ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'],
    datasets: [
      {
        label: 'Actual',
        data: [3000, 3200, 3500, 4000, 4500, 5000, 7000, 9000, 11000, 15000, 18000, 17500, 14000, 10000, 8000, 6000, 4500, null],
        borderColor: '#1e90ff',
        backgroundColor: 'rgba(30, 144, 255, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Predicted',
        data: [3100, 3300, 3600, 3900, 4600, 5200, 6800, 8800, 11500, 14500, 17800, 18200, 14500, 10500, 8200, 6500, 4800, 3500],
        borderColor: '#d4af37',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      }
    ]
  };

  const [chartData, setChartData] = useState(data || defaultData);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const newChartData = { ...chartData };
      const gradient = chart.ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(30, 144, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(30, 144, 255, 0.0)');
      
      newChartData.datasets[0].backgroundColor = gradient;
      setChartData(newChartData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#ffffff' }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' },
        min: 0,
        max: 20000,
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <h3 className="text-white text-lg font-semibold mb-4">Water Consumption</h3>
      <div style={{ height: '300px', width: '100%', position: 'relative' }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WaterChart;
