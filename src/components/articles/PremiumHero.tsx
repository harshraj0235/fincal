import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, Calendar, User } from 'lucide-react';

interface PremiumHeroProps {
  title: string;
  excerpt?: string;
  coverImage: string;
  authorName: string;
  authorImage: string;
  date: string;
  modifiedDate?: string;
  readingTime: number;
  categories: string[];
}

const PremiumHero: React.FC<PremiumHeroProps> = ({
  title,
  excerpt,
  coverImage,
  authorName,
  authorImage,
  date,
  modifiedDate,
  readingTime,
  categories
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-t-2xl overflow-hidden shadow-md border border-gray-100 border-b-0 w-full"
    >
          {/* Featured Image at the very top (edge-to-edge in container) */}
          <div className="w-full aspect-[16/9] overflow-hidden relative bg-gray-100">
            <img 
              src={coverImage} 
              alt={`${title} - MoneyCal India`} 
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-12 pb-0">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <span key={cat} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100">
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.25] mb-6 tracking-tight">
              {title}
            </h1>

            {excerpt && (
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                {excerpt}
              </p>
            )}

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100 pb-6">
              <div className="flex items-center gap-3">
                <img src={authorImage} alt={authorName} className="w-12 h-12 rounded-full object-cover shadow-sm bg-gray-100" />
                <div>
                  <div className="text-sm font-bold text-gray-900">{authorName}</div>
                  <div className="text-xs font-medium text-gray-500">Expert Contributor</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-gray-500">
                <div className="flex flex-col text-[11px] font-semibold">
                  <span className="text-gray-400 uppercase tracking-widest mb-0.5">Published</span>
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </div>
              </div>
            </div>
          </div>
        </motion.div>
  );
};

export default PremiumHero;
