
import React, { useState } from 'react';
import { MOCK_BLOG_POSTS } from '../constants';
import { generateNewBlogPost } from '../services/geminiService';

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_BLOG_POSTS);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddAIContent = async () => {
    setIsGenerating(true);
    try {
      const newPostData = await generateNewBlogPost();
      const newPost = {
        id: `blog-${Date.now()}`,
        title: newPostData.title,
        excerpt: newPostData.excerpt,
        author: 'AI Researcher',
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '3 min',
        category: 'Insights'
      };
      setPosts([newPost, ...posts]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white mb-2">Vortex Insights</h2>
          <p className="text-slate-400 max-w-xl">Deep dives into privacy, security, and the future of anonymous communication.</p>
        </div>
        <button 
          onClick={handleAddAIContent}
          disabled={isGenerating}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
        >
          <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'} text-indigo-400`}></i>
          {isGenerating ? 'Generating Post...' : 'AI Add Post'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article 
            key={post.id}
            className="group flex flex-col bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div className="h-48 bg-slate-800 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
               <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {post.category}
                  </span>
               </div>
               <div className="flex items-center justify-center h-full opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <i className="fas fa-newspaper text-8xl"></i>
               </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-bold">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300">By {post.author}</span>
                <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
