import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Activity, Trash, AlertTriangle, Download, Share, RefreshCw, Sparkles } from 'lucide-react';
import CrowdChart from '../../components/charts/CrowdChart';
import WasteChart from '../../components/charts/WasteChart';

const ReportsPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const types = [
    { id: 'operational', label: 'Operational Report', icon: FileText, desc: 'Comprehensive operational telemetry analysis' },
    { id: 'crowd', label: 'Crowd Analysis', icon: Activity, desc: 'Crowd flow, corridor velocity and density logs' },
    { id: 'sustainability', label: 'Sustainability Report', icon: Trash, desc: 'Environmental impact, waste and water logs' },
    { id: 'incident', label: 'Incident Report', icon: AlertTriangle, desc: 'Incident logs, safety response times and ratings' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedReport(null);
    setTimeout(() => {
      setGeneratedReport({
        type: selectedType,
        title: types.find(t => t.id === selectedType).label,
        date: new Date().toLocaleDateString(),
        content: `stadiumAI engine has compiled all logs, telemetry and sensor feeds for the ${selectedType} domain.`
      });
      setIsGenerating(false);
    }, 2000);
  };

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
          <div className="h-12 w-12 rounded-2xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue shadow-lg">
            <FileText size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">automated telemetry reporting</h1>
            <p className="text-xs text-gray-400 mt-1 font-light lowercase">compile logs, sensor streams, and operational metrics into AI insights.</p>
          </div>
        </div>
      </motion.div>

      {/* Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {types.map(t => {
          const Icon = t.icon;
          const isSelected = selectedType === t.id;
          return (
            <motion.div 
              whileHover={{ y: -3 }}
              key={t.id} 
              onClick={() => setSelectedType(t.id)}
              className={`glass-premium p-5 cursor-pointer rounded-2xl border transition-all duration-300 shadow-md ${
                isSelected ? 'border-accent-gold/50 neon-glow-gold' : 'border-white/5'
              }`}
            >
              <div className={`p-3 rounded-xl inline-block mb-3.5 ${
                isSelected ? 'bg-accent-gold/20 text-accent-gold' : 'bg-white/5 text-white'
              }`}>
                <Icon size={22} />
              </div>
              <h4 className="text-white font-bold text-xs lowercase tracking-wide mb-1.5">{t.label}</h4>
              <p className="text-[10px] text-gray-400 font-light lowercase leading-relaxed">{t.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Generate button */}
      <AnimatePresence>
        {selectedType && !generatedReport && !isGenerating && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex justify-center mt-6"
          >
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGenerate}
              className="btn-primary px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider w-full max-w-md shadow-lg"
            >
              Generate {types.find(t => t.id === selectedType).label}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-premium p-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/5 shadow-2xl"
          >
            <RefreshCw size={36} className="animate-spin text-accent-gold" />
            <p className="text-white text-xs font-light lowercase">AI compiler is analyzing historical sensor data and generating insights...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report view */}
      <AnimatePresence>
        {generatedReport && !isGenerating && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-premium p-6 md:p-8 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.01] text-[180px] pointer-events-none">✨</div>
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4 pb-6 border-b border-white/5">
              <div>
                <span className="px-2.5 py-0.5 bg-accent-gold/15 text-accent-gold text-[9px] font-bold rounded-md uppercase tracking-wider mb-2.5 inline-block border border-accent-gold/20 flex items-center gap-1 w-fit">
                  <Sparkles size={10} /> {generatedReport.type} analysis
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase">{generatedReport.title}</h2>
                <p className="text-xs text-gray-500 font-light mt-1 lowercase">compiled telemetry stamp: {generatedReport.date}</p>
              </div>
              <div className="flex gap-2.5 w-full md:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4.5 py-2.5 border border-white/10 text-xs text-white rounded-xl hover:bg-white/5 font-bold transition-all lowercase"
                >
                  <Download size={14} /> <span>PDF</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4.5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 font-bold transition-all lowercase"
                >
                  <Share size={14} /> <span>Share</span>
                </motion.button>
              </div>
            </div>

            <div className="space-y-6 text-gray-200 leading-relaxed text-sm font-light">
              <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider">Executive Summary</h3>
              <p className="lowercase leading-relaxed text-gray-300">{generatedReport.content} MetLife stadium flow operations executed within normal limits. overall bottleneck latency reduced by 12% compared to standard stadium benchmarks.</p>
              
              <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider mt-8 mb-4">Visual Data Telemetry</h3>
              <div className="h-[300px] mb-8 bg-[#131842]/30 rounded-2xl overflow-hidden border border-white/5">
                {generatedReport.type === 'sustainability' ? <WasteChart /> : <CrowdChart height={300} />}
              </div>

              <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider">AI Tactical Recommendations</h3>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-400 lowercase font-light">
                <li>optimize corridor staffing models during peak match ingress.</li>
                <li>deploy additional food concessions to East corridor to mitigate queue times.</li>
                <li>evaluate flow procedures at corridor C3 bottleneck zones.</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReportsPage;
