import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, MessageSquare, Map, Truck, Grid, 
  Activity, Users, Mic, FileText, Globe, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { NAV_ITEMS_FAN, NAV_ITEMS_ORGANIZER } from '../../utils/constants';

const getIcon = (iconName) => {
  const icons = {
    FiHome: <Home size={20} />,
    FiMessageSquare: <MessageSquare size={20} />,
    FiMap: <Map size={20} />,
    FiTruck: <Truck size={20} />,
    FiGrid: <Grid size={20} />,
    FiActivity: <Activity size={20} />,
    FiUsers: <Users size={20} />,
    FiMic: <Mic size={20} />,
    FiFileText: <FileText size={20} />,
    FiGlobe: <Globe size={20} />
  };
  return icons[iconName] || <Home size={20} />;
};

const Sidebar = ({ isOpen, onToggle, isOrganizerMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = isOrganizerMode ? NAV_ITEMS_ORGANIZER : NAV_ITEMS_FAN;
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMode = () => {
    if (isOrganizerMode) {
      navigate('/');
    } else {
      navigate('/organizer');
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Floating Glassmorphism Sidebar */}
      <motion.aside 
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          glass-premium rounded-r-3xl border-l-0
          flex flex-col overflow-hidden h-[96vh] my-[2vh] ml-[2vh] border border-white/10
          ${isOpen ? 'w-[260px]' : 'w-0 lg:w-[84px]'}
        `}
      >
        {/* Logo area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <div className={`flex items-center gap-3 overflow-hidden ${!isOpen && 'lg:justify-center lg:w-full'}`}>
            <motion.span 
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="text-2xl drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            >
              ⚽
            </motion.span>
            {isOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-lg text-gradient-gold tracking-wider select-none"
              >
                stadium.ai
              </motion.span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 select-none">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative block"
              >
                <motion.div
                  className={`
                    flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative z-10
                    ${isActive 
                      ? 'text-accent-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.35)]' 
                      : 'text-gray-400 hover:text-white'}
                  `}
                >
                  {/* Active background glow pill */}
                  {isActive && (
                    <motion.div 
                      layoutId="activePill"
                      className="absolute inset-0 bg-accent-gold/10 border-l-2 border-accent-gold rounded-xl -z-10 shadow-[inset_0_1px_2px_rgba(212,175,55,0.15)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background pill */}
                  {hoveredItem === item.path && !isActive && (
                    <motion.div 
                      layoutId="hoverPill"
                      className="absolute inset-0 bg-white/5 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon wrapper */}
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-xl shrink-0"
                  >
                    {getIcon(item.icon)}
                  </motion.div>

                  {/* Label */}
                  {isOpen && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-medium tracking-wide lowercase"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.div>

                {/* collapsed icon tooltip */}
                {!isOpen && hoveredItem === item.path && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 5 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-20 top-1/2 -translate-y-1/2 glass-premium px-3 py-1.5 rounded-lg text-xs font-medium text-white pointer-events-none z-50 whitespace-nowrap shadow-xl border border-white/10"
                  >
                    {item.label}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-white/5 space-y-4 bg-black/20">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleMode}
            className={`w-full flex items-center justify-center p-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300
              ${isOrganizerMode 
                ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30 shadow-[0_0_15px_rgba(30,144,255,0.15)] hover:bg-accent-blue/20' 
                : 'bg-accent-gold/10 text-accent-gold border border-accent-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:bg-accent-gold/20'}
            `}
          >
            {isOpen ? (isOrganizerMode ? 'switch to fan' : 'switch to organizer') : (isOrganizerMode ? 'fan' : 'org')}
          </motion.button>
          
          {/* Pulsating match badge */}
          <div className={`glass-premium bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center shadow-md
            ${!isOpen && 'lg:hidden'}`}>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">live match ticker</span>
            <span className="font-bold text-white text-xs whitespace-nowrap flex items-center gap-2">
              🇧🇷 2 <span className="animate-pulse text-accent-gold">•</span> 1 🇩🇪
            </span>
          </div>

          {/* Toggle expand button */}
          <button 
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
