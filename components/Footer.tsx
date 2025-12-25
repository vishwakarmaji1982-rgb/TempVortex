
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 py-12 bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <i className="fas fa-bolt text-indigo-500"></i>
              <span className="text-xl font-bold text-white">TempVortex</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Smart disposable email service for the modern web. Built with React and Gemini AI.
            </p>
          </div>
          
          <div className="flex gap-8 md:gap-16">
            <div className="space-y-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-4 opacity-50">Content</h5>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Vortex Insights</Link></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">API References</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-4 opacity-50">Legal</h5>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">DMCA</a></li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs font-medium">
          © {new Date().getFullYear()} TempVortex. All rights reserved. 
          <br />
          Empowering digital privacy through intelligent vortex technology.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
