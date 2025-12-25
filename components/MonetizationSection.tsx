
import React, { useState, useEffect } from 'react';
import { generateMonetizationTips } from '../services/geminiService';

const MonetizationSection: React.FC = () => {
  const [tips, setTips] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      const result = await generateMonetizationTips();
      setTips(result);
      setLoading(false);
    };
    fetchTips();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Turn Traffic into Revenue</h2>
        <p className="text-xl text-slate-400">Thinking of launching your own Temp Mail service? Here is the business blueprint.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-rectangle-ad text-green-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold">Ad Networks</h3>
          <p className="text-sm text-slate-400">High traffic makes these sites perfect for Google AdSense or Carbon Ads. Users stay on the page while waiting for codes.</p>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-crown text-purple-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold">Premium Tier</h3>
          <p className="text-sm text-slate-400">Offer custom domains, permanent storage, or ad-free experiences for a monthly subscription fee.</p>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-code text-blue-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold">API Access</h3>
          <p className="text-sm text-slate-400">Charge developers for automated email generation for their testing environments or QA workflows.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 md:p-12 rounded-3xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-robot text-9xl"></i>
        </div>
        
        <h3 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center gap-3">
          <i className="fas fa-lightbulb"></i>
          AI-Generated Business Strategy
        </h3>
        
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
            {tips.split('\n').map((line, i) => (
              <p key={i} className="mb-4">{line}</p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 text-center text-slate-500 text-sm">
        <p>Pro Tip: Use a "Freemium" model. 90% features for free, 10% exclusive power features behind a paywall.</p>
      </div>
    </div>
  );
};

export default MonetizationSection;
