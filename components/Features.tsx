
import React from 'react';

const Features: React.FC = () => {
  const items = [
    {
      icon: 'fa-shield-halved',
      title: 'Anti-Spam Shield',
      desc: 'Our advanced filtering blocks tracker pixels and promotional garbage before it even hits your view.'
    },
    {
      icon: 'fa-user-secret',
      title: 'Full Anonymity',
      desc: 'No personal data required. We don\'t track your IP or store logs about which services you sign up for.'
    },
    {
      icon: 'fa-bolt-lightning',
      title: 'Real-time Push',
      desc: 'Emails appear instantly using websocket technology. No more constant refreshing to wait for codes.'
    },
    {
      icon: 'fa-wand-magic-sparkles',
      title: 'AI Smart Actions',
      desc: 'Powered by Gemini to automatically summarize terms of service and detect phishing links.'
    }
  ];

  return (
    <section className="py-12 border-t border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <i className={`fas ${item.icon} text-indigo-500 text-xl`}></i>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
