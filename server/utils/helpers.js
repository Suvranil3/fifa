const formatResponse = (success, data, message = '') => {
  return { success, data, message };
};

const calculateDensityLevel = (count, capacity) => {
  if (!capacity) return 'low';
  const percentage = (count / capacity) * 100;
  if (percentage >= 90) return 'critical';
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

const formatTimestamp = (date) => {
  return new Date(date).toISOString();
};

const generateMockId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const sanitizeHtml = (str) => {
  if (!str) return str;
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

module.exports = {
  formatResponse,
  calculateDensityLevel,
  formatTimestamp,
  generateMockId,
  sanitizeHtml
};
