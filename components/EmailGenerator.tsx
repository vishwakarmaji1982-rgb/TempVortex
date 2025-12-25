
import React, { useState } from 'react';
import { UserEmail } from '../types';
import { AVAILABLE_DOMAINS } from '../constants';

interface EmailGeneratorProps {
  email: UserEmail;
  onGenerate: (custom?: string) => void;
}

const EmailGenerator: React.FC<EmailGeneratorProps> = ({ email, onGenerate }) => {
  const [copied, setCopied] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customPrefix, setCustomPrefix] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrefix.trim()) {
      onGenerate(customPrefix.trim());
      setShowCustom(false);
      setCustomPrefix('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-slate-800 p-1 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center shadow-2xl border border-slate-700">
        <div className="flex-grow flex items-center px-6 py-4 overflow-hidden">
          <span className="text-xl md:text-2xl font-mono text-indigo-300 truncate selection:bg-indigo-500/30">
            {email.address}
          </span>
        </div>
        <div className="flex items-center gap-1 p-2">
          <button 
            onClick={copyToClipboard}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button 
            onClick={() => onGenerate()}
            className="flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition-all"
            title="Refresh Email"
          >
            <i className="fas fa-redo-alt"></i>
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4 text-sm font-medium">
        <button 
          onClick={() => setShowCustom(!showCustom)}
          className="text-slate-400 hover:text-indigo-400 transition-colors"
        >
          {showCustom ? 'Cancel' : 'Customize Email'}
        </button>
      </div>

      {showCustom && (
        <form onSubmit={handleCustomSubmit} className="bg-slate-800/50 p-6 rounded-2xl border border-dashed border-slate-600 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Your custom name..." 
              className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
              value={customPrefix}
              onChange={(e) => setCustomPrefix(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Set Email
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-3 text-left">
            * Use only letters, numbers, and periods. Available on multiple premium domains.
          </p>
        </form>
      )}
    </div>
  );
};

export default EmailGenerator;
