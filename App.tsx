
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import EmailGenerator from './components/EmailGenerator';
import Inbox from './components/Inbox';
import BlogSection from './components/BlogSection';
import Features from './components/Features';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';
import { UserEmail, EmailMessage } from './types';
import { AVAILABLE_DOMAINS, MOCK_EMAILS, MOCK_BLOG_POSTS } from './constants';

const App: React.FC = () => {
  const [currentEmail, setCurrentEmail] = useState<UserEmail | null>(null);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateEmail = (customPrefix?: string) => {
    const prefix = customPrefix || Math.random().toString(36).substring(2, 10);
    const domain = AVAILABLE_DOMAINS[Math.floor(Math.random() * AVAILABLE_DOMAINS.length)];
    setCurrentEmail({
      address: `${prefix}@${domain}`,
      domain,
      createdAt: new Date()
    });
    setMessages([]);
    setIsLoading(true);
    setTimeout(() => {
      setMessages(MOCK_EMAILS.map(m => ({ ...m, id: Math.random().toString(36).substr(2, 9), timestamp: new Date() })));
      setIsLoading(false);
    }, 1500);
  };

  const deleteMessages = (ids: string[]) => {
    setMessages(prev => prev.filter(m => !ids.includes(m.id)));
  };

  const markMessagesAsRead = (ids: string[]) => {
    setMessages(prev => prev.map(m => 
      ids.includes(m.id) ? { ...m, isRead: true } : m
    ));
  };

  useEffect(() => {
    generateEmail();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col text-slate-200">
        <PromoBanner />
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-16">
                <section className="text-center max-w-4xl mx-auto py-12">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
                    Privacy Without Limits.
                  </h1>
                  <p className="text-xl text-slate-400 mb-8 font-medium">
                    Instant, disposable, AI-filtered inbox. Your digital fortress against spam.
                  </p>
                  
                  {currentEmail && (
                    <EmailGenerator 
                      email={currentEmail} 
                      onGenerate={generateEmail} 
                    />
                  )}
                </section>

                <section id="inbox-section">
                  <Inbox 
                    messages={messages} 
                    isLoading={isLoading} 
                    onRefresh={() => setIsLoading(true)} 
                    onDelete={deleteMessages}
                    onMarkAsRead={markMessagesAsRead}
                  />
                </section>

                <div className="border-y border-slate-800/50 py-16">
                   <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-black text-white">Latest from Vortex</h2>
                      <Link to="/blog" className="text-indigo-400 font-bold hover:underline">View All Posts</Link>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {MOCK_BLOG_POSTS.slice(0, 3).map(post => (
                        <div key={post.id} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                           <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{post.category}</span>
                           <h3 className="text-lg font-bold text-white mt-2 mb-3 leading-tight">{post.title}</h3>
                           <Link to="/blog" className="text-xs text-slate-500 hover:text-white transition-colors">Read Article &rarr;</Link>
                        </div>
                      ))}
                   </div>
                </div>

                <Features />
              </div>
            } />
            <Route path="/blog" element={<BlogSection />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
