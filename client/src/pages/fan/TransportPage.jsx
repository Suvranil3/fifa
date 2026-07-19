import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, MapPin, Clock, ArrowRight, Activity, Shield } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const TransportPage = () => {
  const { stadiumData } = useApp();
  const navigate = useNavigate();
  const [showAiRec, setShowAiRec] = useState(false);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'metro': return '🚇';
      case 'bus': return '🚌';
      case 'shuttle': return '🚐';
      case 'parking': return '🅿️';
      default: return '🚗';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-success/15 text-success border-success/30';
      case 'delayed': return 'bg-warning/15 text-warning border-warning/30';
      case 'closed': return 'bg-accent-crimson/15 text-accent-crimson border-accent-crimson/30';
      default: return 'bg-gray-500/15 text-gray-400';
    }
  };

  const metroOptions = stadiumData.transport.filter(t => t.type === 'metro');
  const busOptions = stadiumData.transport.filter(t => t.type === 'bus' || t.type === 'shuttle');
  const parkOptions = stadiumData.transport.filter(t => t.type === 'parking');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 280, damping: 24 }
    }
  };

  const TransportCard = ({ option }) => (
    <motion.div 
      whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.2)' }}
      className="glass-premium p-5 flex flex-col justify-between rounded-2xl border border-white/5 shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl filter drop-shadow-md select-none">{getTypeIcon(option.type)}</div>
            <div>
              <h3 className="font-bold text-white text-base tracking-wide lowercase">{option.name}</h3>
              <p className="text-[10px] text-gray-400 capitalize font-light mt-0.5">{option.type}</p>
            </div>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getStatusColor(option.status)}`}>
            {option.status}
          </span>
        </div>

        {/* ETA Progress Bar representation */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[10px] text-gray-500 font-light">
            <span>capacity flow</span>
            <span>{option.status === 'delayed' ? '85%' : '45%'}</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: option.status === 'delayed' ? '85%' : '45%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${option.status === 'delayed' ? 'bg-warning' : 'bg-success'}`}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-300 text-xs font-light">
          <Clock size={13} className={option.waitTime > 10 ? 'text-warning animate-pulse' : 'text-success'} />
          {option.waitTime === 0 ? 'Available Now' : `Next in ${option.waitTime} mins`}
        </div>
        <button 
          onClick={() => navigate('/map')}
          className="text-accent-blue text-xs hover:text-white transition-colors flex items-center gap-1 font-semibold group lowercase"
        >
          <span>view map</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 select-none font-readex relative z-10"
    >
      
      {/* Header telemetry area */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-premium p-6 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue shadow-lg">
            <Activity size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">telemetry transit hub</h1>
            <p className="text-xs text-gray-400 mt-1 font-light lowercase">real-time routing and eta status boards across metlife stadium corridors.</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAiRec(!showAiRec)}
          className="btn-primary flex items-center gap-2 shrink-0 py-3 px-5 rounded-xl text-xs uppercase tracking-wider"
        >
          <MessageSquare size={14} /> ask ai routing
        </motion.button>
      </motion.div>

      {/* AI Recommendation Box */}
      <AnimatePresence>
        {showAiRec && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="glass-premium bg-gradient-to-r from-[#171c42] to-[#12285a] p-6 border-accent-gold/40 rounded-3xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 p-4 opacity-[0.03] text-[120px] pointer-events-none">⚽</div>
            <h3 className="font-bold text-accent-gold text-sm mb-2 flex items-center gap-2 uppercase tracking-wider">
              <span className="animate-pulse">✨</span> ai recommended route analysis
            </h3>
            <p className="text-xs text-gray-200 mb-4 leading-relaxed font-light lowercase">
              stadium crowd densities show taking the **stadium express bus** (gate c4 west gate corner) is the optimal path. avoids the metro queues at meadowlands line corridors.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/chat')} 
              className="text-xs text-white bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl transition-colors border border-white/10 lowercase"
            >
              ask assistant for details
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories container */}
      <div className="space-y-8">
        
        <motion.section variants={itemVariants}>
          <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
            <span>🚇</span> metro transit links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {metroOptions.map(opt => <TransportCard key={opt.id} option={opt} />)}
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
            <span>🚌</span> express buses & shuttles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {busOptions.map(opt => <TransportCard key={opt.id} option={opt} />)}
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
            <span>🅿️</span> parking zones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {parkOptions.map(opt => <TransportCard key={opt.id} option={opt} />)}
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
};

export default TransportPage;
