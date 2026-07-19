import React from 'react';
import { useApp } from '../../contexts/AppContext';

const MatchBanner = () => {
  const { currentMatch } = useApp();

  if (!currentMatch) return null;

  return (
    <div className="w-full glass-card relative overflow-hidden animate-slide-up mb-6 border border-white/10">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-accent-crimson to-accent-blue"></div>
      
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Status */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-xs font-bold tracking-wider text-success">{currentMatch.status}</span>
        </div>

        {/* Stadium Info */}
        <div className="absolute top-4 right-4 text-xs text-gray-400 font-medium">
          {currentMatch.stadium} • {new Date(currentMatch.date).toLocaleDateString()}
        </div>

        {/* Match Center */}
        <div className="w-full flex items-center justify-center gap-8 md:gap-16 mt-4 md:mt-0">
          
          {/* Home Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <span className="text-5xl drop-shadow-lg">🇧🇷</span>
            <h2 className="text-xl md:text-3xl font-bold text-white uppercase tracking-wide">{currentMatch.homeTeam}</h2>
          </div>

          {/* Score & Minute */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="text-4xl md:text-6xl font-black text-gradient-gold drop-shadow-xl font-mono">
              {currentMatch.homeScore} - {currentMatch.awayScore}
            </div>
            <div className="mt-2 flex items-center gap-2 bg-black/50 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-crimson animate-pulse"></span>
              <span className="text-accent-gold font-bold">{currentMatch.minute}'</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <span className="text-5xl drop-shadow-lg">🇩🇪</span>
            <h2 className="text-xl md:text-3xl font-bold text-white uppercase tracking-wide">{currentMatch.awayTeam}</h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MatchBanner;
