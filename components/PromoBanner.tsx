
import React, { useState } from 'react';

const PromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x text-white py-2 px-4 relative overflow-hidden group">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs md:text-sm font-bold">
        <span className="flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">Limited Offer</span>
          <span>Get Vortex Premium for 50% off this week!</span>
        </span>
        <button className="bg-white text-indigo-600 px-4 py-1 rounded-full hover:bg-slate-100 transition-colors shadow-lg active:scale-95">
          Upgrade Now
        </button>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default PromoBanner;
