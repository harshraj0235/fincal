import React from 'react';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  alternateLanguages?: { [key: string]: string };
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  keywords
}) => {
  // Temporary fallback - just update document title and meta tags directly
  React.useEffect(() => {
    const fullTitle = title.includes('FinanceGurus') ? title : `${title} | FinanceGurus - India's Top Financial Calculators & Tools`;
    document.title = fullTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);

  // Return null since we're handling meta tags directly
  return null;
};

export default SEOHelmet;
