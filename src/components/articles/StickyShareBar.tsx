import React from 'react';
import { 
  Share2, Facebook, Twitter, Link as LinkIcon, 
  MessageSquare, Heart, Bookmark 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StickyShareBarProps {
  url: string;
  title: string;
}

const StickyShareBar: React.FC<StickyShareBarProps> = ({ url, title }) => {
  const shareLinks = [
    { icon: Facebook, plat: 'facebook', color: 'hover:text-blue-600 hover:bg-blue-50' },
    { icon: Twitter, plat: 'twitter', color: 'hover:text-sky-500 hover:bg-sky-50' },
    { icon: MessageSquare, plat: 'whatsapp', color: 'hover:text-emerald-600 hover:bg-emerald-50' },
    { icon: LinkIcon, plat: 'copy', color: 'hover:text-slate-900 hover:bg-slate-100' },
  ];

  const handleShare = (plat: string) => {
    let shareUrl = '';
    if (plat === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    else if (plat === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    else if (plat === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
    else if (plat === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
      return;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener');
  };

  return (
    <div className="flex flex-col gap-4">
      {shareLinks.map((s, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare(s.plat)}
          className={`w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-all shadow-sm ${s.color}`}
          title={`Share on ${s.plat}`}
        >
          <s.icon className="w-5 h-5" />
        </motion.button>
      ))}
      
      <div className="h-px w-8 bg-slate-200 mx-auto my-2" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shadow-sm"
      >
        <Heart className="w-5 h-5" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
      >
        <Bookmark className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default StickyShareBar;
