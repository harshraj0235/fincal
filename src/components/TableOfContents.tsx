import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

/**
 * Table of Contents - Google loves this for long articles
 * Improves navigation, time on page, accessibility
 */
interface TableOfContentsProps {
  articleTitle: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ articleTitle }) => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract all headings from article
    const articleHeadings = document.querySelectorAll('.prose h2, .prose h3');
    const headingData = Array.from(articleHeadings).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id; // Add ID for anchor links
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
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      
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
    <div className="bg-white rounded-xl shadow-lg border-2 border-neutral-100 overflow-hidden sticky top-20 mb-8">
      {/* Header - Mobile Collapsible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors lg:cursor-default"
      >
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-black text-neutral-900">Table of Contents</h3>
        </div>
        <ChevronRight 
          className={`h-5 w-5 text-neutral-600 transition-transform lg:hidden ${isOpen ? 'rotate-90' : ''}`} 
        />
      </button>

      {/* TOC List - Always visible on desktop, collapsible on mobile */}
      <nav className={`${isOpen ? 'block' : 'hidden'} lg:block p-4 space-y-1 max-h-96 overflow-y-auto`}>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`block py-2 px-3 rounded-lg text-sm transition-all ${
              heading.level === 3 ? 'ml-4' : ''
            } ${
              activeId === heading.id
                ? 'bg-indigo-100 text-indigo-700 font-bold border-l-4 border-indigo-600'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 border-l-4 border-transparent'
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;






