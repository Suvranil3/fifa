import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, CheckCircle, Clock } from 'lucide-react';
import VolunteerPanel from '../../components/organizer/VolunteerPanel';

const VolunteersPage = () => {
  const zones = [
    { name: 'North Corridor', count: 12, required: 15, volunteers: ['Maria S.', 'Ahmed H.', 'Tom W.', '+9 others'] },
    { name: 'South Corridor', count: 18, required: 15, volunteers: ['Fatima A.', 'Carlos R.', 'Lisa W.', '+15 others'] },
    { name: 'East Corridor', count: 8, required: 12, volunteers: ['James C.', 'Sophie M.', 'Priya S.', '+5 others'] },
    { name: 'West Corridor', count: 10, required: 10, volunteers: ['David O.', 'Roberto S.', 'Ana G.', '+7 others'] },
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
          <div className="h-12 w-12 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center text-success shadow-lg">
            <Users size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">volunteer staffing panel</h1>
            <p className="text-xs text-gray-400 mt-1 font-light lowercase">deploy, track, and manage crowd safety and translations coordinators.</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', value: '60', color: 'text-white', icon: Users },
          { label: 'Deployed', value: '42', color: 'text-success', icon: CheckCircle },
          { label: 'Available', value: '15', color: 'text-accent-blue', icon: Clock },
          { label: 'Off Duty', value: '3', color: 'text-gray-500', icon: Shield }
        ].map((stat, i) => (
          <motion.div 
            whileHover={{ y: -2 }}
            key={i} 
            className="glass-premium p-4.5 rounded-2xl text-center border border-white/5 shadow-md flex flex-col justify-between"
          >
            <h4 className="text-gray-400 text-xs font-light lowercase tracking-wider mb-2">{stat.label}</h4>
            <span className={`text-2xl font-extrabold ${stat.color} tracking-tight`}>{stat.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Coverage Areas */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-sm font-bold text-accent-gold uppercase tracking-widest pl-1">corridor coverage status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {zones.map((zone, i) => {
            const pct = zone.count / zone.required;
            const statusColor = pct >= 1 ? 'bg-success/15 text-success border-success/30' : pct >= 0.7 ? 'bg-warning/15 text-warning border-warning/30' : 'bg-accent-crimson/15 text-accent-crimson border-accent-crimson/30';
            
            return (
              <motion.div 
                whileHover={{ y: -3 }}
                key={i} 
                className="glass-premium p-5 rounded-2xl border border-white/5 shadow-lg relative flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                  <h4 className="text-white font-bold text-xs lowercase">{zone.name}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                    {zone.count}/{zone.required}
                  </span>
                </div>
                <div className="space-y-2 mt-2">
                  {zone.volunteers.map((v, j) => (
                    <p key={j} className="text-xs text-gray-400 font-light lowercase">{v}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Volunteer Deployment interactive panel */}
      <motion.div variants={itemVariants}>
        <VolunteerPanel />
      </motion.div>
    </motion.div>
  );
};

export default VolunteersPage;
