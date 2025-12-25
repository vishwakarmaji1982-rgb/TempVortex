
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
            <i className="fas fa-bolt text-white text-xl"></i>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">TempVortex</span>
        </Link>

        <nav className="flex items-center gap-4 md:gap-8">
          <Link 
            to="/" 
            className={`font-medium text-sm transition-colors hover:text-indigo-400 ${location.pathname === '/' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Email
          </Link>
          <Link 
            to="/blog" 
            className={`font-medium text-sm transition-colors hover:text-indigo-400 ${location.pathname === '/blog' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Blog
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden lg:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700 text-xs font-bold"
          >
            <i className="fab fa-github"></i>
            <span>Docs</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
