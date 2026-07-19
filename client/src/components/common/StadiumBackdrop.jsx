import React, { useEffect, useState } from 'react';

const StadiumBackdrop = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to viewport size for gradient shifting
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#040614]">
      {/* Slow rotating/pulsating blurred circle light beams representing stadium night light flares */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[160px] -top-40 -left-40 mix-blend-screen animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute w-[800px] h-[800px] rounded-full bg-accent-blue/5 blur-[200px] -bottom-80 -right-80 mix-blend-screen animate-pulse"
        style={{ animationDuration: '12s' }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-accent-crimson/3 blur-[140px] top-[40%] left-[60%] mix-blend-screen animate-pulse"
        style={{ animationDuration: '10s' }}
      />

      {/* Mouse reactive gradient glow representing custom modern telemetry HUD */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-accent-gold/2 to-accent-blue/3 blur-[100px] mix-blend-screen transition-all duration-700 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Repeating fine grid lines (stadium night pitch grid) */}
      <div className="absolute inset-0 bg-pitch opacity-60" />

      {/* Stadium fog/glow overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      
      {/* Film grain noise texture overlay for maximum luxury visual styling */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
};

export default StadiumBackdrop;
