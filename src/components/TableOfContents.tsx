import React, { useState, useEffect } from 'react';
import { List, ChevronRight, X } from 'lucide-react';

/**
 * Table of Contents - Google loves this for long articles
 * Improves navigation, time on page, accessibility.
 * No overlap: not sticky on mobile; explicit close/open toggle.
 */
interface TableOfContentsProps {
  articleTitle: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ articleTitle }) => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const articleHeadings = document.querySelectorAll('.prose h2, .prose h3');
    const headingData = Array.from(articleHeadings).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3
      };
    });
    setHeadings(headingData);
  }, [articleTitle]);

  useEffect(() => {
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
    <div
      className="bg-white rounded-xl shadow-lg border-2 border-neutral-100 overflow-hidden mb-8 lg:sticky lg:top-20"
      style={{ zIndex: 5 }}
    >
      {/* Header - Toggle + explicit Close on mobile */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-neutral-100">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 flex-1 text-left hover:from-indigo-100 hover:to-purple-100 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-expanded={isOpen}
          aria-controls="toc-nav"
        >
          <List className="h-5 w-5 text-indigo-600 flex-shrink-0" />
          <h3 className="text-lg font-black text-neutral-900">Table of Contents</h3>
          <ChevronRight
            className={`h-5 w-5 text-neutral-600 transition-transform flex-shrink-0 ml-auto lg:hidden ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 lg:hidden"
          aria-label="Close table of contents"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* TOC List - Collapsible on mobile (default closed), always visible on desktop */}
      <nav
        id="toc-nav"
        className={`${isOpen ? 'block' : 'hidden'} lg:block p-4 space-y-1 max-h-80 overflow-y-auto`}
      >
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              if (window.innerWidth < 1024) setIsOpen(false);
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






