import React, { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

/**
 * Reusable section for 2000+ word tool guides. SEO-friendly long-form content for each calculator/tool.
 * Use for quality content that helps pages rank on Google.
 */
interface ToolGuideSectionProps {
  title?: string;
  /** HTML string or React node - full guide content (2000+ words recommended) */
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

const ToolGuideSection: React.FC<ToolGuideSectionProps> = ({
  title = 'Complete Guide & FAQs',
  children,
  defaultExpanded = false,
  className = '',
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
      aria-labelledby="tool-guide-heading"
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-colors text-left"
        aria-expanded={expanded}
        id="tool-guide-heading"
      >
        <span className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900">
          <BookOpen className="w-5 h-5 text-blue-600" />
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="px-6 py-5 sm:px-8 sm:py-6 border-t border-gray-100">
          <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            {children}
          </div>
        </div>
      )}
    </section>
  );
};

export default ToolGuideSection;
