import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs Navigation - Google loves this
 * Improves SEO, user navigation, site structure clarity
 */
interface BreadcrumbsProps {
  category: string;
  categoryName: string;
  articleTitle: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, categoryName, articleTitle }) => {
  return (
    <nav 
      className="flex items-center gap-2 text-sm text-neutral-600 mb-4 overflow-x-auto pb-2"
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {/* Home */}
      <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <Link 
          to="/" 
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors whitespace-nowrap"
          itemProp="item"
        >
          <Home className="h-4 w-4" />
          <span itemProp="name">Home</span>
        </Link>
        <meta itemProp="position" content="1" />
      </span>

      <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-400" />

      {/* News */}
      <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <Link 
          to="/news" 
          className="hover:text-indigo-600 transition-colors whitespace-nowrap"
          itemProp="item"
        >
          <span itemProp="name">News</span>
        </Link>
        <meta itemProp="position" content="2" />
      </span>

      <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-400" />

      {/* Category */}
      <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <Link 
          to={`/news/${category}`}
          className="hover:text-indigo-600 transition-colors whitespace-nowrap font-medium"
          itemProp="item"
        >
          <span itemProp="name">{categoryName}</span>
        </Link>
        <meta itemProp="position" content="3" />
      </span>

      <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-400" />

      {/* Current Article */}
      <span 
        itemProp="itemListElement" 
        itemScope 
        itemType="https://schema.org/ListItem"
        className="text-neutral-900 font-medium truncate"
      >
        <span itemProp="name">{articleTitle}</span>
        <meta itemProp="position" content="4" />
      </span>
    </nav>
  );
};

export default Breadcrumbs;

