import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Map, Coffee, Truck, AlertTriangle, Package, Users, LogIn, Clock, Info } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import MatchBanner from '../../components/fan/MatchBanner';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const FanDashboard = () => {
  const { stats, loading } = useApp();
  const navigate = useNavigate();

  if (loading || !stats) {
    return <LoadingSpinner type="fullpage" message="Loading Fan Portal..." />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };

  const quickActions = [
    { id: 1, title: 'Chat with AI', desc: 'Get instant help from our AI assistant', icon: <MessageSquare size={24}/>, color: 'gradient-gold', path: '/chat' },
    { id: 2, title: 'Stadium Map', desc: 'Interactive map with real-time info', icon: <Map size={24}/>, color: 'gradient-blue', path: '/map' },
    { id: 3, title: 'Find Food', desc: 'Discover food stalls and restaurants', icon: <Coffee size={24}/>, color: 'gradient-green', path: '/map' },
    { id: 4, title: 'Transportation', desc: 'Find metro, buses, and parking', icon: <Truck size={24}/>, color: 'gradient-crimson', path: '/transport' },
    { id: 5, title: 'Emergency', desc: 'Get emergency assistance immediately', icon: <AlertTriangle size={24}/>, color: 'bg-accent-crimson', path: '/chat' },
    { id: 6, title: 'Lost & Found', desc: 'Report or find lost items easily', icon: <Package size={24}/>, color: 'bg-secondary border border-white/10', path: '/chat' },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 select-none"
    >
      {/* Immersive Match Ticker Banner */}
      <motion.section variants={itemVariants} className="relative z-10">
        <MatchBanner />
      </motion.section>

      {/* Stats Dashboard Grid */}
      <motion.section 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="glass-premium rounded-2xl p-0.5 shadow-xl glass-premium-hover">
          <StatCard title="Total Fans Present" value={stats.totalFans} change="+12%" changeType="up" icon="FiUsers" color="gold" delay={0.05} />
        </motion.div>
        <motion.div variants={itemVariants} className="glass-premium rounded-2xl p-0.5 shadow-xl glass-premium-hover">
          <StatCard title="Open Gates" value={`${stats.activeGates}/${stats.totalGates}`} icon="FiLogIn" color="blue" delay={0.1} />
        </motion.div>
        <motion.div variants={itemVariants} className="glass-premium rounded-2xl p-0.5 shadow-xl glass-premium-hover">
          <StatCard title="Avg Gate Wait" value={`${stats.avgWaitTime} min`} change="-2 min" changeType="up" icon="FiClock" color="green" delay={0.15} />
        </motion.div>
        <motion.div variants={itemVariants} className="glass-premium rounded-2xl p-0.5 shadow-xl glass-premium-hover">
          <StatCard title="Food Stalls Open" value={`${stats.openFoodStalls}/${stats.totalFoodStalls}`} icon="FiCoffee" color="crimson" delay={0.2} />
        </motion.div>
      </motion.section>

      {/* Interactive grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Quick Actions Panel */}
        <motion.section variants={itemVariants} className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest pl-1">quick operations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={action.id}
                onClick={() => navigate(action.path)}
                className="glass-premium p-6 text-left flex items-start gap-4 group transition-all duration-300 border border-white/5 rounded-2xl hover:border-accent-gold/20 shadow-lg"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                  action.color.includes('gradient') ? action.color : action.color + ' text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                }`}>
                  <div className={action.color.includes('gradient') ? 'text-primary' : ''}>
                    {action.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-accent-gold transition-colors lowercase">{action.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-normal font-light lowercase">{action.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Live Announcements Ticker */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-sm font-bold text-accent-blue uppercase tracking-widest pl-1">match announcements</h2>
          <div className="glass-premium rounded-2xl p-0 overflow-hidden shadow-lg border border-white/5">
            <div className="divide-y divide-white/5">
              {[
                { time: '10 mins ago', category: 'Match', text: 'Halftime will begin in 20 minutes.', tag: 'info' },
                { time: '45 mins ago', category: 'Transport', text: 'Express buses to Hoboken added at North Lot.', tag: 'success' },
                { time: '1 hr ago', category: 'Security', text: 'Please have tickets ready at Gate B.', tag: 'warning' }
              ].map((ann, i) => (
                <div key={i} className="p-5 hover:bg-white/5 transition-all duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`status-badge text-[9px] uppercase tracking-wider ${
                      ann.tag === 'info' ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/20' :
                      ann.tag === 'success' ? 'bg-success/15 text-success border border-success/20' :
                      'bg-warning/15 text-warning border border-warning/20'
                    }`}>
                      {ann.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-light lowercase">{ann.time}</span>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed lowercase">{ann.text}</p>
                </div>
              ))}
            </div>
            <button className="w-full p-4 text-xs text-accent-gold hover:bg-white/5 font-semibold transition-all duration-300 border-t border-white/5 uppercase tracking-wider bg-black/10">
              view all announcements
            </button>
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
};

export default FanDashboard;
