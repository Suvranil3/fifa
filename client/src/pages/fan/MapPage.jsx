import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Target, Info, MapPin } from 'lucide-react';
import StadiumMap from '../../components/fan/StadiumMap';
import { useApp } from '../../contexts/AppContext';

const MapPage = () => {
  const { stadiumData } = useApp();
  const [search, setSearch] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleMarkerClick = (facility) => {
    setSelectedFacility(facility);
  };

  const filteredGates = stadiumData.gates.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFood = stadiumData.foodStalls.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.type.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        type: 'spring', stiffness: 200, damping: 25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-80px)] flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 select-none font-readex relative z-10"
    >
      {/* Map Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
        className="flex-1 h-[55vh] md:h-full relative rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
      >
        <StadiumMap onMarkerClick={handleMarkerClick} />
      </motion.div>

      {/* Side Panel Mission Dashboard */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full md:w-80 lg:w-[380px] glass-premium rounded-3xl p-5 flex flex-col gap-4 overflow-hidden h-[45vh] md:h-full border border-white/10 shadow-2xl relative"
      >
        {/* Search */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="search gates, food, markers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-10 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-gold/50 transition-all text-xs font-light lowercase"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Selected Facility Details */}
        <AnimatePresence mode="wait">
          {selectedFacility ? (
            <motion.div 
              key={selectedFacility.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="glass-premium bg-[#171c42]/80 p-4 border border-accent-gold/40 rounded-2xl shadow-xl relative"
            >
              <button 
                onClick={() => setSelectedFacility(null)}
                className="absolute top-3 right-3 text-[10px] text-gray-500 hover:text-white uppercase font-bold tracking-wide"
              >
                clear
              </button>
              <h3 className="font-bold text-white text-base mb-1 pr-10">{selectedFacility.name || selectedFacility.gate_name}</h3>
              
              {selectedFacility.crowd !== undefined ? (
                <div className="mt-3 space-y-2.5">
                  <div className="flex justify-between text-xs font-light">
                    <span className="text-gray-400">status</span>
                    <span className="text-success font-bold uppercase tracking-wider">open</span>
                  </div>
                  <div className="flex justify-between text-xs font-light">
                    <span className="text-gray-400">crowd capacity</span>
                    <span className="text-white font-bold">{Math.round((selectedFacility.crowd/selectedFacility.cap)*100)}%</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full mt-2 text-xs py-3 flex items-center justify-center gap-2 rounded-xl lowercase"
                  >
                    <Target size={14} /> navigate here
                  </motion.button>
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-gray-400 capitalize mb-3 font-light leading-relaxed">Category: {selectedFacility.type || 'Facility'}</p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2 rounded-xl lowercase"
                  >
                    <Target size={14} /> navigate here
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 rounded-2xl p-4 flex items-start gap-3 text-xs text-gray-400 border border-white/5 font-light"
            >
              <Info className="text-accent-blue shrink-0 mt-0.5" size={15} />
              <p className="leading-relaxed lowercase">select a marker on the map or search to view details and get directions.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lists Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 mt-1 pb-4 scrollbar-hide select-none">
          
          {/* Gates List */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">gates monitoring</h4>
            <div className="space-y-2">
              {filteredGates.slice(0, 4).map(gate => (
                <motion.div 
                  whileHover={{ x: 4, borderColor: 'rgba(212, 175, 55, 0.2)' }}
                  key={gate.id} 
                  onClick={() => setSelectedFacility(gate)} 
                  className="glass-premium p-3.5 rounded-xl cursor-pointer transition-colors border border-white/5 hover:bg-white/5 flex justify-between items-center"
                >
                  <span className="font-bold text-white text-xs lowercase">{gate.name}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${
                    gate.crowd/gate.cap > 0.6 
                      ? 'bg-warning/10 text-warning border-warning/20' 
                      : 'bg-success/10 text-success border-success/20'
                  }`}>
                    {Math.round((gate.crowd/gate.cap)*15)}m wait
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Food List */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">popular food court</h4>
            <div className="space-y-2">
              {filteredFood.slice(0, 3).map(food => (
                <motion.div 
                  whileHover={{ x: 4, borderColor: 'rgba(30, 144, 255, 0.2)' }}
                  key={food.id} 
                  onClick={() => setSelectedFacility(food)} 
                  className="glass-premium p-3.5 rounded-xl cursor-pointer transition-colors border border-white/5 hover:bg-white/5"
                >
                  <div className="font-bold text-white text-xs lowercase">{food.name}</div>
                  <div className="text-[10px] text-gray-400 capitalize truncate mt-1.5 font-light">{food.type}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </motion.div>
    </motion.div>
  );
};

export default MapPage;
