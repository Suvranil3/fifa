import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Search, Moon, CloudSun, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Navbar = ({ title, onMenuToggle }) => {
  const { currentMatch, stats } = useApp();
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const notifications = [
    { id: 1, title: 'Gate Alert', text: 'Gate B1 is experiencing high traffic. Recommend Gate B3.', type: 'warning' },
    { id: 2, title: 'Transport Update', text: 'Extra Express Shuttle buses deployed at North lot.', type: 'info' },
    { id: 3, title: 'Match Event', text: 'Goal! Brazil 2 - 1 Germany (67\')', type: 'success' },
  ];

  return (
    <header className="h-20 shrink-0 flex items-center justify-between px-6 lg:px-8 relative z-30 select-none">
      {/* Floating Glass Navbar container */}
      <div className="w-full h-16 glass-premium rounded-2xl flex items-center justify-between px-4 lg:px-6 shadow-2xl border border-white/10">
        
        {/* Left side */}
        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onMenuToggle}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 lg:hidden transition-colors"
          >
            <Menu size={20} />
          </motion.button>
          <div className="flex flex-col">
            <span className="text-[10px] text-accent-gold uppercase font-bold tracking-widest leading-none mb-1">stadium control hub</span>
            <h1 className="text-sm lg:text-base font-bold text-white tracking-wide uppercase leading-none">{title}</h1>
          </div>
        </div>

        {/* Center - Live Match Ticker */}
        {currentMatch && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="bg-black/40 px-5 py-2 flex items-center gap-4 text-xs rounded-full border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-crimson opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-crimson"></span>
              </span>
              <span className="font-bold text-white tracking-wider">LIVE FEED</span>
              <span className="text-gray-600">|</span>
              <span className="font-semibold text-gray-200 tracking-wide">
                {currentMatch.homeTeam} <span className="text-accent-gold font-extrabold">{currentMatch.homeScore}</span> - {currentMatch.awayScore} {currentMatch.awayTeam}
              </span>
              <span className="text-gray-600">|</span>
              <span className="text-accent-gold font-bold px-2 py-0.5 bg-accent-gold/10 rounded-md pulse-glow-amber">{currentMatch.minute}'</span>
            </div>
          </motion.div>
        )}

        {/* Right side utilities */}
        <div className="flex items-center gap-2 lg:gap-4">
          
          {/* Telemetry Clock & Weather Info (EA Sports look) */}
          <div className="hidden xl:flex items-center gap-4 bg-black/30 px-4 py-2 rounded-xl border border-white/5 text-[11px] text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-accent-gold" />
              {time}
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <CloudSun size={12} className="text-accent-blue" />
              metlife stadium 🌤️ 22°c
            </span>
          </div>

          {/* Search bar */}
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="search telemetry..." 
              className="input-dark py-2 pl-9 pr-4 rounded-full text-xs w-40 lg:w-48 bg-white/5 border border-white/10 focus:border-accent-gold/50 transition-all font-light"
            />
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Theme toggler */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Moon size={18} />
          </motion.button>
          
          {/* Notification bell */}
          <div className="relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 relative transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-crimson shadow-[0_0_10px_rgba(196,30,58,0.7)]"></span>
            </motion.button>

            {/* Notifications overlay card */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 glass-premium rounded-2xl p-4 shadow-2xl border border-white/10 z-50 overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">telemetry alerts</h3>
                    <button onClick={() => setNotificationsOpen(false)} className="text-[10px] text-gray-500 hover:text-white transition-colors">dismiss</button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border-l-2 border-accent-gold">
                        <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${notif.type === 'warning' ? 'bg-warning' : 'bg-success'}`} />
                          {notif.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 leading-normal lowercase">{notif.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User profile bubble */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-9 w-9 rounded-full bg-gradient-gold text-primary font-bold text-xs flex items-center justify-center border border-white/20 shadow-md cursor-pointer ml-1 select-none"
          >
            F1
          </motion.div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
