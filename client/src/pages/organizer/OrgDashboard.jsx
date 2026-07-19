import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, AlertTriangle, Clock, 
  TrendingUp, FileText, Mic, MapPin, 
  Activity, ShieldAlert, Radio, HelpCircle 
} from 'lucide-react';
import CrowdChart from '../../components/charts/CrowdChart';
import GateFlowChart from '../../components/charts/GateFlowChart';

const StatCard = ({ title, value, change, icon: Icon, color, delay = 0 }) => {
  const getGlowColor = (col) => {
    switch (col) {
      case 'gold': return 'neon-glow-gold';
      case 'blue': return 'neon-glow-cyan';
      case 'crimson': return 'neon-glow-crimson';
      case 'green': return 'neon-glow-green';
      default: return '';
    }
  };

  const getIconColor = (col) => {
    switch (col) {
      case 'gold': return 'text-accent-gold';
      case 'blue': return 'text-accent-blue';
      case 'crimson': return 'text-accent-crimson';
      case 'green': return 'text-success';
      default: return 'text-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, delay: delay / 1000 }}
      className={`glass-premium p-6 flex flex-col justify-between rounded-2xl border border-white/5 shadow-xl glass-premium-hover ${getGlowColor(color)}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${getIconColor(color)}`}>
          <Icon size={22} />
        </div>
        {change && (
          <span className={`text-xs font-bold tracking-wider px-2 py-0.5 rounded-full ${change.includes('-') ? 'bg-accent-crimson/15 text-accent-crimson' : 'bg-success/15 text-success'}`}>
            {change}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-gray-400 text-xs font-light lowercase tracking-wider">{title}</h4>
        <h3 className="text-white text-3xl font-extrabold mt-1 tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
};

const OrgDashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
            <Radio size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">operations command center</h1>
            <p className="text-xs text-gray-400 mt-1 font-light lowercase font-sans">real-time match telemetry, crowd density simulators, and tactical deployments.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs bg-black/35 px-4.5 py-2.5 rounded-full border border-white/5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="font-bold text-white uppercase tracking-widest">telemetry online</span>
        </div>
      </motion.div>

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Total Attendance" value="45,230" change="+12%" icon={Users} color="gold" delay={50} />
        <StatCard title="Active Gates" value="10 / 12" change={null} icon={Target} color="blue" delay={100} />
        <StatCard title="Active Incidents" value="3" change="-25%" icon={AlertTriangle} color="crimson" delay={150} />
        <StatCard title="Deployed Volunteers" value="42 / 60" change="+5" icon={Users} color="green" delay={200} />
        <StatCard title="Avg Wait Time" value="8 min" change="+5%" icon={Clock} color="blue" delay={250} />
        <StatCard title="Fan Satisfaction" value="92%" change="+3%" icon={TrendingUp} color="gold" delay={300} />
      </div>

      {/* Grid Row 1: Charts & Incidents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Main Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-premium rounded-3xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.015] text-[150px] pointer-events-none">📈</div>
          <CrowdChart height={350} />
        </motion.div>

        {/* Recent Incidents Panel */}
        <motion.div variants={itemVariants} className="glass-premium rounded-3xl p-5 border border-white/5 shadow-xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">tactical incidents</h3>
            <span className="text-[10px] text-accent-blue hover:underline cursor-pointer uppercase font-bold tracking-wider">view map</span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 scrollbar-hide">
            {[
              { type: 'Medical', desc: 'Heat exhaustion near Gate B2', zone: 'East', time: '10m ago', sev: 'medium' },
              { type: 'Security', desc: 'Unauthorized access attempt', zone: 'VIP', time: '15m ago', sev: 'high' },
              { type: 'Maintenance', desc: 'Spill reported in concourse', zone: 'North', time: '32m ago', sev: 'low' },
              { type: 'Crowd', desc: 'Bottleneck forming at Gate C1', zone: 'South', time: '1h ago', sev: 'medium' },
              { type: 'Medical', desc: 'Minor injury report', zone: 'West', time: '2h ago', sev: 'low' }
            ].map((inc, i) => (
              <div key={i} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 border border-white/5 hover:border-white/10">
                <div className={`p-2 rounded-xl mt-0.5 shadow-md ${
                  inc.sev === 'high' ? 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30 animate-pulse' : 
                  inc.sev === 'medium' ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30' : 
                  'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
                }`}>
                  <ShieldAlert size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-white text-xs font-bold lowercase">{inc.type}</p>
                    <span className="text-[9px] text-gray-500 font-light lowercase">{inc.time}</span>
                  </div>
                  <p className="text-gray-400 text-xs truncate mt-1 font-light lowercase leading-relaxed">{inc.desc}</p>
                  <p className="text-accent-gold text-[10px] mt-1 font-medium lowercase tracking-wider">{inc.zone} Corridor</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Grid Row 2: Secondary flow chart & announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Flow telemetry */}
        <motion.div variants={itemVariants} className="glass-premium rounded-3xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.015] text-[150px] pointer-events-none">📊</div>
          <GateFlowChart height={300} />
        </motion.div>

        {/* Announcements list */}
        <motion.div variants={itemVariants} className="glass-premium rounded-3xl p-5 border border-white/5 shadow-xl">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">active briefings</h3>
            <span className="text-[10px] text-accent-blue hover:underline cursor-pointer uppercase font-bold tracking-wider">create new</span>
          </div>
          <div className="space-y-3.5 overflow-y-auto h-[250px] pr-1 scrollbar-hide">
            {[
              { title: 'Welcome to StadiumAI command', cat: 'general', pri: 'low' },
              { title: 'Please have ticket scanners ready at gate B', cat: 'info', pri: 'medium' },
              { title: 'Gate C2 currently closed due to crowd surge', cat: 'safety', pri: 'high' }
            ].map((ann, i) => (
              <div key={i} className="glass-premium bg-[#131842]/40 border border-white/5 rounded-xl p-4 transition-all hover:bg-white/5">
                <div className="flex justify-between items-start mb-2.5">
                  <h4 className="text-white text-xs font-bold leading-normal pr-4 lowercase">{ann.title}</h4>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    ann.pri === 'high' ? 'bg-accent-crimson/15 text-accent-crimson border border-accent-crimson/30 animate-pulse' : 
                    ann.pri === 'medium' ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30' : 
                    'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                    {ann.pri}
                  </span>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">{ann.cat}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Command Operations Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Generate Report', icon: FileText },
          { label: 'Create Announcement', icon: Mic },
          { label: 'Deploy Volunteers', icon: Users },
          { label: 'View Crowd Map', icon: MapPin }
        ].map((action, i) => (
          <motion.button 
            whileHover={{ scale: 1.03, borderColor: 'rgba(212, 175, 55, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            key={i} 
            className="glass-premium p-5 flex flex-col items-center justify-center text-center gap-3.5 rounded-2xl border border-white/5 hover:bg-white/5 shadow-xl transition-all duration-300"
          >
            <action.icon className="text-accent-gold" size={24} />
            <span className="text-white text-xs font-bold tracking-wide uppercase">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default OrgDashboard;
