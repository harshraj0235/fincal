import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * AutoBreadcrumbs — Automatically generates breadcrumb trail from URL path.
 * Renders both visible breadcrumbs and JSON-LD structured data for Google.
 * Used site-wide via Layout.tsx.
 */

// Mapping of URL slugs to human-readable labels
const SLUG_LABELS: Record<string, string> = {
  'calculators': 'Calculators',
  'tools': 'Tools',
  'blog': 'Blog',
  'news': 'News',
  'learn': 'Learn Finance',
  'ipo': 'IPO',
  'gold-rate': 'Gold Rate',
  'silver-rate': 'Silver Rate',
  'government-schemes': 'Government Schemes',
  'schemes-finder': 'Government Schemes',
  'discover': 'Discover',
  'crypto': 'Crypto',
  'stock-market': 'Stock Market',
  'finance-tools': 'Finance Tools',
  'tax-tools': 'Tax Tools',
  'gst-tools': 'GST Tools',
  'loan-tools': 'Loan Tools',
  'insurance-tools': 'Insurance Tools',
  'bank-tools': 'Bank Tools',
  'excel-tools': 'Excel Tools',
  'corporate-finance': 'Corporate Finance',
  'astro-finance': 'Astro Finance',
  'about': 'About Us',
  'contact': 'Contact Us',
  'privacy-policy': 'Privacy Policy',
  'terms': 'Terms of Service',
  'disclaimer': 'Disclaimer',
  'editorial-policy': 'Editorial Policy',
  'sitemap': 'Sitemap',
  'gk': 'GK Quiz',
};

function slugToLabel(slug: string): string {
  if (SLUG_LABELS[slug]) return SLUG_LABELS[slug];
  // Convert "emi-calculator" → "EMI Calculator"
  return slug
    .split('-')
    .map(word => {
      // Keep common acronyms uppercase
      const upper = word.toUpperCase();
      if (['EMI', 'SIP', 'PPF', 'FD', 'RD', 'NPS', 'HRA', 'TDS', 'GST', 'IPO', 'CAGR', 'XIRR', 'NRI', 'AI', 'GK'].includes(upper)) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export const AutoBreadcrumbs: React.FC = () => {
  const location = useLocation();

  const crumbs = useMemo((): BreadcrumbItem[] => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0 || segments[0] === 'ask') return []; // Don't show breadcrumbs on home or chat pages

    const items: BreadcrumbItem[] = [];
    let path = '';
    for (const seg of segments) {
      path += `/${seg}`;
      items.push({ label: slugToLabel(seg), href: path });
    }
    return items;
  }, [location.pathname]);

  // Don't render on home page
  if (crumbs.length === 0) return null;

  // JSON-LD structured data for Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moneycal.in/' },
      ...crumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.label,
        item: `https://moneycal.in${crumb.href}`,
      })),
    ],
  };

  return (
    <>
      {/* JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visible breadcrumb bar */}
      <nav className="breadcrumb-bar" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="breadcrumb-list">
            <li>
              <Link to="/" aria-label="Home">
                <Home className="w-3.5 h-3.5" />
              </Link>
            </li>
            {crumbs.map((crumb, index) => (
              <li key={crumb.href}>
                <span className="breadcrumb-separator" aria-hidden="true">
                  <ChevronRight className="w-3 h-3" />
                </span>
                {index === crumbs.length - 1 ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.href}>{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

/**
 * Legacy Breadcrumbs component — kept for backward compatibility with
 * existing pages that pass explicit category/articleTitle props.
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
          to="/news" reloadDocument 
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
