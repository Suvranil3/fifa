import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplet, Trash2, Leaf } from 'lucide-react';
import SustainabilityPanel from '../../components/organizer/SustainabilityPanel';

const SustainabilityPage = () => {
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
          <div className="h-12 w-12 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center text-success shadow-lg">
            <Leaf size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">sustainability center</h1>
            <p className="text-xs text-gray-400 mt-1 font-light lowercase font-sans">track waste diversion, greywater recycling feeds, and carbon offsetting telemetry.</p>
          </div>
        </div>
      </motion.div>

      {/* Main Panel */}
      <motion.div variants={itemVariants}>
        <SustainabilityPanel />
      </motion.div>

      <hr className="border-white/5 my-8" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -3 }}
          className="glass-premium p-6 border-l-4 border-l-success rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
            <Wind className="text-success" size={20} />
            <h4 className="text-white font-bold text-xs lowercase">carbon offsetting</h4>
          </div>
          <p className="text-3xl font-extrabold text-white">2.4 <span className="text-xs font-light text-gray-400">tons</span></p>
          <p className="text-[10px] text-success mt-2 font-medium lowercase tracking-wide">+12% vs last match</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -3 }}
          className="glass-premium p-6 border-l-4 border-l-accent-blue rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
            <Droplet className="text-accent-blue" size={20} />
            <h4 className="text-white font-bold text-xs lowercase">water recycled</h4>
          </div>
          <p className="text-3xl font-extrabold text-white">45k <span className="text-xs font-light text-gray-400">liters</span></p>
          <p className="text-[10px] text-accent-blue mt-2 font-medium lowercase tracking-wide">15% of total venue load</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -3 }}
          className="glass-premium p-6 border-l-4 border-l-accent-gold rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
            <Trash2 className="text-accent-gold" size={20} />
            <h4 className="text-white font-bold text-xs lowercase">compost & recycling</h4>
          </div>
          <p className="text-3xl font-extrabold text-white">4.2 <span className="text-xs font-light text-gray-400">tons</span></p>
          <p className="text-[10px] text-gray-400 mt-2 font-light lowercase">diverted from local landfills</p>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default SustainabilityPage;
