import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const LandingPage = () => {
  const { stats } = useApp();
  const navigate = useNavigate();

  // Helper values with fallback defaults
  const activeAttendance = stats?.totalFans ? `+${(stats.totalFans / 1000).toFixed(0)}k` : '+45k';
  const gatesMonitored = stats?.activeGates ? `+${stats.activeGates}` : '+10';
  const volunteersDeployed = stats?.deployedVolunteers ? `+${stats.deployedVolunteers}` : '+42';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black select-none font-readex">
      {/* Immersive FIFA Hero Background with subtle zoom scale-up animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[15s] ease-out scale-105 animate-pulse-gentle"
        style={{ 
          backgroundImage: "url('/fifa_stadium_hero.jpg')",
          animationName: 'kenburns',
          animationDuration: '30s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear'
        }}
      />
      
      {/* Dark tint overlay for typography legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-0" />

      {/* Floating Pill Navbar */}
      <nav className="absolute z-20 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4">
        {/* Left Logo Pill */}
        <div className="flex items-center gap-3 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3 border border-white/5 shadow-xl">
          <svg 
            viewBox="0 0 256 256" 
            className="h-8 w-8" 
            fill="#ffffff"
            aria-hidden="true"
          >
            <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" fill="#ffffff" />
          </svg>
          <span className="text-white text-base font-normal tracking-tight">stadium.ai</span>
        </div>

        {/* Center Nav Pill (Desktop Only) */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2 border border-white/5 shadow-xl">
          <Link to="/dashboard" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            fan portal
          </Link>
          <Link to="/map" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            live map
          </Link>
          <Link to="/chat" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            ai assistant
          </Link>
          <Link to="/organizer" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
            organizer
          </Link>
        </div>

        {/* Right Action Button */}
        <button 
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors cursor-pointer shadow-xl"
        >
          enter portal
        </button>
      </nav>

      {/* Foreground Content Wrapper */}
      <div className="relative h-full w-full z-10 pointer-events-none">
        
        {/* Giant Staggered FIFA World Cup Headlines */}
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[16%] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          fifa
        </h1>
        <h1 className="hero-title absolute text-white font-medium text-[12vw] md:text-[11vw] right-4 md:right-10 top-[36%] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          world cup
        </h1>
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[56%] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          stadium.ai
        </h1>

        {/* Description Paragraph */}
        <p className="absolute left-6 md:left-10 top-[46%] max-w-[280px] text-[15px] leading-snug text-white/90 font-light pointer-events-auto lowercase drop-shadow-md">
          welcome to metlife stadium. experience next-generation, genai-powered operations and fan flow for the world's greatest tournament.
        </p>

        {/* Stat Block - Top Right */}
        <div className="absolute right-6 md:right-24 top-[14%] flex flex-col items-end">
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
            <span className="text-4xl md:text-5xl font-medium tracking-tight text-white drop-shadow-md">{activeAttendance}</span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right font-light lowercase">
            match attendance
          </p>
        </div>

        {/* Stat Block - Bottom Left */}
        <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24 flex flex-col items-start">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-medium tracking-tight text-white drop-shadow-md">{gatesMonitored}</span>
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 font-light lowercase">
            gates active and monitored
          </p>
        </div>

        {/* Stat Block - Bottom Right */}
        <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20 flex flex-col items-end">
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
            <span className="text-4xl md:text-5xl font-medium tracking-tight text-white drop-shadow-md">{volunteersDeployed}</span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right font-light lowercase">
            volunteers deployed
          </p>
        </div>

      </div>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
};

export default LandingPage;
