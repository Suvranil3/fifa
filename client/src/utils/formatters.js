export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatPercentage = (value, total) => {
  if (!total) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

export const getDensityColor = (level) => {
  if (level > 0.8) return '#c41e3a'; // Critical
  if (level > 0.6) return '#f59e0b'; // High
  if (level > 0.4) return '#d4af37'; // Medium
  return '#10b981'; // Low
};

export const getDensityBg = (level) => {
  if (level > 0.8) return 'bg-accent-crimson';
  if (level > 0.6) return 'bg-warning';
  if (level > 0.4) return 'bg-accent-gold';
  return 'bg-success';
};

export const truncateText = (text, max) => {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.substring(0, max) + '...';
};

export const getTimeAgo = (date) => {
  if (!date) return '';
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " seconds ago";
};

export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
