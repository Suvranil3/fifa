import React from 'react';

const LoadingSpinner = ({ type = 'spinner', message = 'Loading...', count = 3 }) => {
  if (type === 'skeleton') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className="skeleton h-24 rounded-2xl w-full"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    );
  }

  if (type === 'fullpage') {
    return (
      <div className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-accent-gold rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">⚽</div>
        </div>
        <h2 className="text-2xl font-bold text-gradient-gold mb-2">StadiumAI</h2>
        <p className="text-gray-400 animate-pulse">{message}</p>
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-white/10 border-t-accent-gold rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
