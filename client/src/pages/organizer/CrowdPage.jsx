import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle, Play, ShieldAlert, Cpu, Activity } from 'lucide-react';
import CrowdHeatmap from '../../components/organizer/CrowdHeatmap';
import CrowdChart from '../../components/charts/CrowdChart';

const CrowdPage = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictions, setPredictions] = useState(null);

  const gates = [
    { id: 'A1', current: 12400, cap: 15000, status: 'warning' },
    { id: 'A2', current: 5000, cap: 10000, status: 'good' },
    { id: 'A3', current: 8000, cap: 10000, status: 'warning' },
    { id: 'B1', current: 14200, cap: 15000, status: 'critical' },
    { id: 'B2', current: 6000, cap: 8000, status: 'good' },
    { id: 'B3', current: 3000, cap: 8000, status: 'good' },
    { id: 'B4', current: 13100, cap: 15000, status: 'warning' },
    { id: 'C1', current: 5600, cap: 12000, status: 'good' },
    { id: 'C2', current: 4000, cap: 12000, status: 'good' },
    { id: 'C3', current: 9000, cap: 10000, status: 'critical' },
    { id: 'C4', current: 9500, cap: 10000, status: 'critical' },
    { id: 'VIP', current: 3200, cap: 5000, status: 'warning' },
  ];

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setPredictions([
        { time: '30min forecast', predicted: 48500, change: '+7.2%', risk: 'medium', action: 'Open restricted gates A2 and C1 to route flow' },
        { time: '60min forecast', predicted: 52000, change: '+15.0%', risk: 'high', action: 'Deploy additional volunteers to Eastern corridor gates' },
        { time: '90min forecast', predicted: 44000, change: '-2.7%', risk: 'low', action: 'Post-match exit flow detected, prepare transport links' }
      ]);
      setIsPredicting(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    if (status === 'critical') return 'bg-accent-crimson';
    if (status === 'warning') return 'bg-warning';
    return 'bg-success';
  };

  const getGlowStyle = (status) => {
    if (status === 'critical') return 'neon-glow-crimson';
    if (status === 'warning') return 'neon-glow-gold';
    return 'neon-glow-green';
  };

  const hasCritical = gates.some(g => g.status === 'critical');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
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
          <div className="h-12 w-12 rounded-2xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue shadow-lg">
            <Activity size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">crowd density manager</h1>
            <p className="text-xs text-gray-400 mt-1 font-light lowercase">real-time crowd heatmap tracking and gate corridor density charts.</p>
          </div>
        </div>
      </motion.div>

      {/* Critical Alert */}
      {hasCritical && (
        <motion.div 
          variants={itemVariants}
          className="bg-accent-crimson/15 border border-accent-crimson/40 text-white p-5 rounded-2xl flex items-start gap-4 shadow-lg neon-glow-crimson"
        >
          <ShieldAlert className="text-accent-crimson mt-0.5 shrink-0 animate-pulse" size={20} />
          <div>
            <h4 className="font-bold text-accent-crimson text-sm uppercase tracking-wider">critical density notification</h4>
            <p className="text-xs mt-1 text-gray-300 font-light lowercase">gates b1, c3, and c4 are operating above 90% capacity. immediate AI flow redirection recommended.</p>
          </div>
        </motion.div>
      )}

      {/* Heatmap Section */}
      <motion.div variants={itemVariants}>
        <CrowdHeatmap />
      </motion.div>

      {/* Gate Grid */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-sm font-bold text-accent-gold uppercase tracking-widest pl-1">corridor gate status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gates.map(g => {
            const pct = (g.current / g.cap) * 100;
            return (
              <motion.div 
                whileHover={{ y: -3 }}
                key={g.id} 
                className={`glass-premium p-4 rounded-xl cursor-pointer border border-white/5 shadow-md flex flex-col justify-between ${getGlowStyle(g.status)}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-bold text-xs tracking-wider">{g.id}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(g.status)} relative flex`}>
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${getStatusColor(g.status)}`} />
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-light text-gray-400">
                  <span>current flow</span>
                  <span className="text-white font-medium">{g.current.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className={`h-full ${getStatusColor(g.status)}`} style={{ width: `${pct}%` }}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div variants={itemVariants} className="glass-premium rounded-3xl p-5 border border-white/5 shadow-xl h-[400px]">
        <CrowdChart height={400} />
      </motion.div>

      {/* AI Crowd Predictions */}
      <motion.div variants={itemVariants} className="glass-premium p-6 border border-white/10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.015] text-[150px] pointer-events-none">⚡</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent-gold/10 border border-accent-gold/30 rounded-xl text-accent-gold shadow-lg">
              <Cpu size={22} />
            </div>
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider">AI crowd forecasting</h3>
              <p className="text-[10px] text-gray-500 font-light mt-0.5 lowercase">predict flow bottlenecks and zone capacities using gemini telemetry.</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePredict}
            disabled={isPredicting}
            className="btn-primary px-6 py-3 text-xs flex items-center gap-2 rounded-xl uppercase tracking-wider"
          >
            {isPredicting ? (
              <span className="animate-spin inline-block h-3.5 w-3.5 border-2 border-primary/20 border-t-primary rounded-full"></span>
            ) : (
              <>
                <Zap size={14} /> <span>Generate Prediction</span>
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {isPredicting ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-premium border border-white/5 p-5 rounded-2xl animate-pulse h-32"></div>
              ))}
            </motion.div>
          ) : predictions ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {predictions.map((p, i) => (
                <motion.div 
                  whileHover={{ y: -3 }}
                  key={i} 
                  className="glass-premium border border-white/5 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-bold text-xs lowercase">{p.time}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      p.risk === 'high' ? 'bg-accent-crimson/15 text-accent-crimson border border-accent-crimson/20' : 
                      p.risk === 'medium' ? 'bg-warning/15 text-warning border border-warning/20' : 
                      'bg-success/15 text-success border border-success/20'
                    }`}>{p.risk} risk</span>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-2xl font-extrabold text-accent-gold">{p.predicted.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 font-light mb-1">{p.change}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed lowercase mt-2 border-t border-white/5 pt-3">{p.action}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 italic text-xs font-light pl-1 lowercase"
            >
              click generate to forecast crowd flow for the next 90 minutes.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CrowdPage;
