import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';

const StatCard = ({ title, value, change, changeType, icon, color = 'gold', delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const IconComponent = Icons[icon] || Icons.FiActivity;

  // Extract numeric part for animation if it's a number/string like "45230"
  const isNumeric = !isNaN(parseFloat(value)) && isFinite(value.toString().replace(/,/g, ''));
  const targetValue = isNumeric ? parseFloat(value.toString().replace(/,/g, '')) : null;

  useEffect(() => {
    if (!isNumeric) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp = null;
    const duration = 1500; // 1.5 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.floor(ease * targetValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValue);
      }
    };

    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, isNumeric, targetValue, delay]);

  const formatDisplay = (val) => {
    if (typeof value === 'string' && value.includes('/')) return value; // e.g., "10/12"
    if (typeof value === 'string' && value.includes('min')) return value; // e.g., "8 min"
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const colorStyles = {
    gold: { gradient: 'gradient-gold', text: 'text-accent-gold', shadow: 'hover:shadow-accent-gold/20 hover:border-accent-gold/50' },
    crimson: { gradient: 'gradient-crimson', text: 'text-accent-crimson', shadow: 'hover:shadow-accent-crimson/20 hover:border-accent-crimson/50' },
    blue: { gradient: 'gradient-blue', text: 'text-accent-blue', shadow: 'hover:shadow-accent-blue/20 hover:border-accent-blue/50' },
    green: { gradient: 'gradient-green', text: 'text-success', shadow: 'hover:shadow-success/20 hover:border-success/50' }
  };

  const style = colorStyles[color] || colorStyles.gold;

  return (
    <div 
      className={`glass-card p-6 transition-all duration-300 transform animate-slide-up hover:-translate-y-1 ${style.shadow}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">
            {isNumeric ? formatDisplay(displayValue) : displayValue}
          </h3>
        </div>
        <div className={`h-12 w-12 rounded-full ${style.gradient} flex items-center justify-center shrink-0`}>
          <IconComponent className="text-primary text-xl" />
        </div>
      </div>
      
      {change && (
        <div className="flex items-center gap-1.5">
          {changeType === 'up' ? (
            <FiTrendingUp className="text-success" />
          ) : (
            <FiTrendingDown className="text-accent-crimson" />
          )}
          <span className={`text-sm font-medium ${changeType === 'up' ? 'text-success' : 'text-accent-crimson'}`}>
            {change}
          </span>
          <span className="text-gray-500 text-sm ml-1">vs last hr</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
