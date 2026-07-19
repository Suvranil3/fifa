import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Megaphone, Sparkles, AlertOctagon, HelpCircle } from 'lucide-react';
import AnnouncementGenerator from '../../components/organizer/AnnouncementGenerator';

const AnnouncementsPage = () => {
  const history = [
    { title: 'Welcome to StadiumAI briefing', content: 'Welcome everyone to MetLife Stadium. Please ensure you have your digital tickets ready for scan.', cat: 'general', pri: 'low', lang: 'English', ai: true, active: true, time: '2h ago' },
    { title: 'Gate C2 currently restricted', content: 'Gate C2 is undergoing maintenance. Please use gates C1 or C3 corridor routes.', cat: 'safety', pri: 'high', lang: 'EN, ES', ai: false, active: true, time: '1h ago' },
    { title: 'Water Stations Refilled', content: 'All hydration stations in the South concourse have been refilled.', cat: 'info', pri: 'low', lang: 'English', ai: true, active: false, time: '3h ago' },
    { title: 'Lost Item Claim', content: 'A lost backpack has been turned in near Gate A1. Report to security claim hub.', cat: 'emergency', pri: 'critical', lang: 'EN, FR, ES', ai: true, active: false, time: '4h ago' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 select-none font-readex relative z-10"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-premium p-6 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shadow-lg">
            <Megaphone size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">multilingual broadcasting</h1>
            <p className="text-xs text-gray-400 mt-1 font-light lowercase">broadcast announcements and emergency alerts in multiple languages using gemini AI.</p>
          </div>
        </div>
      </motion.div>

      {/* Generator module */}
      <motion.div variants={itemVariants}>
        <AnnouncementGenerator />
      </motion.div>

      <hr className="border-white/5 my-8" />

      {/* History */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-sm font-bold text-accent-gold uppercase tracking-widest pl-1">broadcast history log</h3>
          
          <div className="relative select-none">
            <Filter size={13} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <select className="bg-[#131842]/80 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-accent-gold/50 appearance-none font-light select-none">
              <option>All Categories</option>
              <option>Safety</option>
              <option>Info</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {history.map((item, i) => (
            <motion.div 
              whileHover={{ x: 3 }}
              key={i} 
              className={`glass-premium p-5 border-l-4 rounded-2xl shadow-md ${
                item.active 
                  ? (item.pri === 'critical' ? 'border-l-accent-crimson neon-glow-crimson' : 'border-l-success') 
                  : 'border-l-gray-600 opacity-60'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <h4 className="text-white font-bold text-sm lowercase">{item.title}</h4>
                    <span className="text-[10px] text-gray-500 font-light lowercase">{item.time}</span>
                  </div>
                  <p className="text-gray-300 text-xs font-light leading-relaxed mb-4 lowercase">{item.content}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-300 font-bold uppercase tracking-wider">{item.cat}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-bold border ${
                      item.pri === 'critical' ? 'bg-accent-crimson/15 text-accent-crimson border-accent-crimson/20' : 
                      item.pri === 'high' ? 'bg-warning/15 text-warning border-warning/20' : 
                      'bg-white/5 text-gray-400 border-white/10'
                    }`}>
                      {item.pri}
                    </span>
                    <span className="px-2.5 py-0.5 bg-accent-blue/15 text-accent-blue border border-accent-blue/20 rounded text-[9px] font-bold uppercase tracking-wider">{item.lang}</span>
                    {item.ai && (
                      <span className="px-2.5 py-0.5 bg-accent-gold/15 text-accent-gold border border-accent-gold/20 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={9} /> AI Generated
                      </span>
                    )}
                  </div>
                </div>
                {item.active && (
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4.5 py-2.5 border border-white/10 text-xs text-white rounded-xl hover:bg-white/5 transition-colors whitespace-nowrap lowercase font-bold"
                  >
                    Deactivate
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnnouncementsPage;
