import React, { useState } from 'react';
import { Printer, Type, Bookmark, BookmarkCheck } from 'lucide-react';

/**
 * Article Toolbar - Font size, Print, Bookmark
 * Professional news website reading enhancement tools
 */
interface ArticleToolbarProps {
  articleTitle: string;
}

export const ArticleToolbar: React.FC<ArticleToolbarProps> = ({ articleTitle }) => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [bookmarked, setBookmarked] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    const root = document.documentElement;
    
    // Apply font size to entire article body
    if (size === 'small') {
      root.style.setProperty('--article-font-size', '14px');
      root.style.setProperty('--article-line-height', '1.6');
    } else if (size === 'medium') {
      root.style.setProperty('--article-font-size', '16px');
      root.style.setProperty('--article-line-height', '1.7');
    } else {
      root.style.setProperty('--article-font-size', '18px');
      root.style.setProperty('--article-line-height', '1.8');
    }
    
    // Also apply to prose elements directly
    const article = document.querySelector('.prose');
    if (article) {
      article.style.fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
      article.style.lineHeight = size === 'small' ? '1.6' : size === 'large' ? '1.8' : '1.7';
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Store in localStorage for persistence
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
    if (!bookmarked) {
      bookmarks.push({ title: articleTitle, url: window.location.pathname, date: new Date().toISOString() });
      localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks));
    } else {
      const filtered = bookmarks.filter((b: any) => b.url !== window.location.pathname);
      localStorage.setItem('newsBookmarks', JSON.stringify(filtered));
    }
  };

  // Check if already bookmarked on mount
  React.useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
    const isBookmarked = bookmarks.some((b: any) => b.url === window.location.pathname);
    setBookmarked(isBookmarked);
  }, []);

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-neutral-600" />
            <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => handleFontSize('small')}
                className={`px-3 py-1.5 rounded-md font-bold text-xs transition-all ${
                  fontSize === 'small' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                aria-label="Small font"
              >
                A
              </button>
              <button
                onClick={() => handleFontSize('medium')}
                className={`px-3 py-1.5 rounded-md font-bold text-sm transition-all ${
                  fontSize === 'medium' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                aria-label="Medium font"
              >
                A
              </button>
              <button
                onClick={() => handleFontSize('large')}
                className={`px-3 py-1.5 rounded-md font-bold text-base transition-all ${
                  fontSize === 'large' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                aria-label="Large font"
              >
                A
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                bookmarked
                  ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-2 border-transparent'
              }`}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
              <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg hover:bg-neutral-200 active:scale-95 transition-all font-semibold text-neutral-700 border-2 border-transparent hover:border-neutral-300"
              aria-label="Print article"
            >
              <Printer className="h-5 w-5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleToolbar;

