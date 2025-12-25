
import React, { useState, useMemo } from 'react';
import { EmailMessage } from '../types';
import { summarizeEmail } from '../services/geminiService';

interface InboxProps {
  messages: EmailMessage[];
  isLoading: boolean;
  onRefresh: () => void;
  onDelete?: (ids: string[]) => void;
  onMarkAsRead?: (ids: string[]) => void;
}

const Inbox: React.FC<InboxProps> = ({ 
  messages, 
  isLoading, 
  onRefresh, 
  onDelete, 
  onMarkAsRead 
}) => {
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const unreadCount = useMemo(() => 
    messages.filter(m => !m.isRead).length, 
  [messages]);

  const toggleSelectAll = () => {
    if (selectedIds.size === messages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(messages.map(m => m.id)));
    }
  };

  const toggleSelectOne = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBulkDelete = () => {
    if (onDelete) onDelete(Array.from(selectedIds));
    setSelectedIds(new Set());
    if (selectedMessage && selectedIds.has(selectedMessage.id)) {
      setSelectedMessage(null);
    }
  };

  const handleBulkMarkRead = () => {
    if (onMarkAsRead) onMarkAsRead(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const handleSummarize = async (msg: EmailMessage) => {
    if (msg.aiSummary) return;
    setSummarizingId(msg.id);
    const summary = await summarizeEmail(msg.content);
    msg.aiSummary = summary;
    setSummarizingId(null);
  };

  const selectMessage = (msg: EmailMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead && onMarkAsRead) {
      onMarkAsRead([msg.id]);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center shadow-xl">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 border-r-2 mb-4"></div>
        <p className="text-slate-400 font-medium">Scanning for incoming vortex data...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
      {/* Message List Area */}
      <div className={`lg:col-span-5 flex flex-col space-y-3 ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              Inbox
            </h3>
            {unreadCount > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ring-4 ring-indigo-600/10">
                {unreadCount} NEW
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onRefresh}
              className="text-slate-500 hover:text-white transition-colors p-2 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600"
              title="Refresh"
            >
              <i className="fas fa-sync-alt text-xs"></i>
            </button>
          </div>
        </div>

        {/* Bulk Selection Bar */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
              checked={messages.length > 0 && selectedIds.size === messages.length}
              onChange={toggleSelectAll}
            />
            <span className="text-xs font-medium text-slate-400">
              {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'Select all'}
            </span>
          </div>
          
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
              <button 
                onClick={handleBulkMarkRead}
                className="text-[10px] uppercase tracking-wider font-bold text-slate-300 hover:text-indigo-400 px-2 py-1"
              >
                Read
              </button>
              <button 
                onClick={handleBulkDelete}
                className="text-[10px] uppercase tracking-wider font-bold text-red-400 hover:text-red-300 px-2 py-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* List */}
        <div className="flex-grow overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-600">
              <i className="fas fa-satellite-dish text-4xl mb-4 opacity-20"></i>
              <p>The vortex is empty. Send an email to see it here.</p>
            </div>
          ) : (
            messages.map(msg => (
              <div 
                key={msg.id}
                onClick={() => selectMessage(msg)}
                className={`group relative p-4 rounded-xl cursor-pointer transition-all border flex items-start gap-4 ${
                  selectedMessage?.id === msg.id 
                    ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                    : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
                } ${!msg.isRead ? 'border-l-4 border-l-indigo-500' : ''}`}
              >
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-900 opacity-0 group-hover:opacity-100 checked:opacity-100 transition-opacity"
                  checked={selectedIds.has(msg.id)}
                  onChange={(e) => toggleSelectOne(e as any, msg.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <span className={`text-sm truncate ${!msg.isRead ? 'text-indigo-300 font-bold' : 'text-slate-400 font-medium'}`}>
                      {msg.from.split('@')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap pt-0.5">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h4 className={`text-sm mb-1 truncate ${!msg.isRead ? 'text-white font-bold' : 'text-slate-300 font-medium'}`}>
                    {msg.subject}
                  </h4>
                  <p className="text-xs text-slate-500 truncate line-clamp-1">{msg.content}</p>
                </div>

                {selectedMessage?.id === msg.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Content View */}
      <div className={`lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col shadow-2xl ${!selectedMessage ? 'hidden lg:flex items-center justify-center text-slate-600' : 'flex'}`}>
        {!selectedMessage ? (
          <div className="text-center space-y-6 max-w-xs animate-pulse">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <i className="fas fa-envelope-open text-3xl opacity-30"></i>
            </div>
            <p className="text-lg font-medium text-slate-500">Pick a transmission to view its details</p>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-slate-800 bg-slate-900/40 rounded-t-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedMessage(null)}
                    className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <div>
                    <h2 className="text-2xl font-black text-white leading-tight mb-1">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500">From</span>
                      <span className="text-indigo-400 font-mono font-medium">{selectedMessage.from}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium mb-1">
                    {selectedMessage.timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                    {selectedMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Enhanced Action Bar */}
              <div className="flex gap-2">
                <button className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg border border-slate-700 transition-all">
                  <i className="fas fa-reply"></i>
                  Reply
                </button>
                <button className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg border border-slate-700 transition-all">
                  <i className="fas fa-forward"></i>
                  Forward
                </button>
                <button 
                  onClick={() => handleBulkDelete()}
                  className="w-10 h-10 flex items-center justify-center bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg border border-red-900/30 transition-all ml-auto"
                  title="Delete message"
                >
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* AI Insight Bar */}
              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600/10 to-transparent border-l-4 border-indigo-500 rounded-r-xl p-5">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                   <i className="fas fa-brain text-5xl"></i>
                </div>
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-2 text-indigo-300 text-[10px] font-black uppercase tracking-tighter">
                    <i className="fas fa-wand-magic-sparkles"></i>
                    Vortex Intelligence
                  </div>
                  {!selectedMessage.aiSummary && (
                    <button 
                      onClick={() => handleSummarize(selectedMessage)}
                      disabled={summarizingId === selectedMessage.id}
                      className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      {summarizingId === selectedMessage.id ? 'Thinking...' : 'Analyze Content'}
                    </button>
                  )}
                </div>
                {selectedMessage.aiSummary ? (
                  <p className="text-sm text-slate-200 leading-relaxed italic relative z-10">
                    "{selectedMessage.aiSummary}"
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 italic relative z-10">
                    Unlock instant insights for this message with our AI analyzer.
                  </p>
                )}
              </div>

              <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-800">
                <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap leading-loose font-medium text-sm">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-900/60 text-center text-[10px] text-slate-600 border-t border-slate-800 italic">
              * This message will be automatically purged when the vortex collapses.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;
