import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, TrendingUp, ChevronRight, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrendingSidebarProps {
  trendingItems: Array<{
    id: string;
    slug: string;
    title: string;
    category: string;
    image?: string;
  }>;
  relatedTools?: Array<{
    id: string;
    name: string;
    url: string;
    icon?: React.ReactNode;
  }>;
}

const TrendingSidebar: React.FC<TrendingSidebarProps> = ({ trendingItems, relatedTools }) => {
  return (
    <div className="space-y-8 min-w-[300px]">
      {/* Trending Now Section */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100">
        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500/20" />
          Trending Now
        </h3>
        <div className="space-y-8">
          {trendingItems.map((item, idx) => (
            <Link key={item.id} to={`/blog/${item.slug}`} className="flex items-start group relative">
              <span className="text-4xl font-black text-slate-100 absolute -left-4 -top-2 group-hover:text-blue-50 transition-colors">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10 pl-6">
                <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                  {item.title}
                </h4>
                <div className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">
                  {item.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Tools Section */}
      {relatedTools && relatedTools.length > 0 && (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
          
          <h3 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10">
            <Calculator className="w-5 h-5 text-blue-400" />
            Impact Tools
          </h3>
          
          <div className="space-y-4 relative z-10">
            {relatedTools.map((tool) => (
              <Link 
                key={tool.id} 
                to={tool.url}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/tool"
              >
                <span className="text-sm font-bold text-slate-300 group-hover/tool:text-white transition-colors">
                  {tool.name}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover/tool:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>

          <button className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-900/40 active:scale-95">
            View All Tools
          </button>
        </div>
      )}

      {/* Newsletter / CTA */}
      <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
        <h4 className="text-lg font-black text-slate-900 mb-2">Beat the AI SGE</h4>
        <p className="text-xs text-slate-500 font-medium mb-6">
          Get human-verified financial intelligence delivered to your inbox.
        </p>
        <div className="flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-black transition-all">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;
