import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Table of Contents - Google loves this for long articles
 * Improves navigation, time on page, accessibility
 */
interface TableOfContentsProps {
  articleTitle: string;
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ articleTitle, className }) => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true); // Open by default so users see it, but can close it on any device

  useEffect(() => {
    // Extract all headings from article; use existing id if present (slugified from BlogPost), else assign one
    const articleHeadings = document.querySelectorAll('.prose h2, .prose h3');
    const headingData = Array.from(articleHeadings).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) heading.id = id;
      return {
        id,
        text: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3
      };
    });

    setHeadings(headingData);
  }, [articleTitle]);

  useEffect(() => {
    // Track active section on scroll
    const handleScroll = () => {
      const headingElements = headings.map((h: { id: string }) => document.getElementById(h.id)).filter(Boolean);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.getBoundingClientRect().top < 150) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className={`bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden sticky top-24 mb-6 group ${className || ''}`}>
      {/* Header - News Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100 hover:bg-slate-100 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">Table of Contents</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {isOpen ? 'Minimize' : 'Expand'}
          </span>
          <ChevronRight
            className={`h-4 w-4 text-slate-400 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {/* TOC Content - High Performance rendering */}
      <nav className={`${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} transition-all duration-500 overflow-hidden`}>
        <div className="p-6 relative">
          {/* Vertical progress line */}
          <div className="absolute left-7 top-8 bottom-8 w-px bg-slate-100"></div>

          <div className="space-y-4 relative z-10">
            {headings.map((heading: { id: string; text: string; level: number }) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex items-center gap-4 py-1 group/item transition-all ${heading.level === 3 ? 'ml-6' : ''
                  }`}
              >
                {/* Visual indicator dot */}
                <div className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${activeId === heading.id
                  ? 'bg-blue-600 border-blue-600 scale-125 shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                  : 'bg-white border-slate-200 group-hover/item:border-blue-400 group-hover/item:scale-110'
                  }`}></div>

                <span className={`text-sm tracking-tight transition-colors duration-300 ${activeId === heading.id
                  ? 'text-blue-600 font-extrabold'
                  : 'text-slate-500 font-bold group-hover/item:text-slate-900'
                  }`}>
                  {heading.text}
                </span>

                {activeId === heading.id && (
                  <div className="h-px flex-1 bg-blue-100 opacity-50"></div>
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TableOfContents;






