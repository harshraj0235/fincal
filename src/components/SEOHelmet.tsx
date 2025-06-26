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
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
  articlePublishedTime,
  articleModifiedTime,
  author,
  section,
  tags,
  noIndex,
  noFollow,
  alternateLanguages,
}) => {
  React.useEffect(() => {
    const fullTitle = title.includes('FinanceGurus') ? title : `${title} | FinanceGurus - India's Top Financial Calculators & Tools`;
    document.title = fullTitle;

    // Helper to set or update a meta tag
    const setMeta = (attr: string, value: string, key: string = 'name') => {
      let meta = document.querySelector(`meta[${key}="${attr}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(key, attr);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', value);
    };

    // Standard meta tags
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    // Robots
    if (noIndex || noFollow) {
      setMeta('robots', `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`);
    } else {
      // Remove robots if not needed
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.remove();
    }

    // Canonical
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url.startsWith('http') ? url : `https://financegurus.directory${url}`);
    }

    // Open Graph tags
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', url ? (url.startsWith('http') ? url : `https://financegurus.directory${url}`) : window.location.href, 'property');
    setMeta('og:site_name', 'FinanceGurus', 'property');
    if (image) setMeta('og:image', image, 'property');
    if (articlePublishedTime) setMeta('article:published_time', articlePublishedTime, 'property');
    if (articleModifiedTime) setMeta('article:modified_time', articleModifiedTime, 'property');
    if (author) setMeta('article:author', author, 'property');
    if (section) setMeta('article:section', section, 'property');
    if (tags && tags.length) setMeta('article:tag', tags.join(','), 'property');

    // Twitter Card tags
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);
    setMeta('twitter:site', '@FinanceGurusIN');

    // Alternate language links (hreflang)
    if (alternateLanguages) {
      Object.entries(alternateLanguages).forEach(([lang, href]) => {
        let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', lang);
          document.head.appendChild(link);
        }
        link.setAttribute('href', href);
      });
    }

    // Structured Data (JSON-LD)
    let jsonLdScript: HTMLScriptElement | null = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(structuredData);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

    // Cleanup function: remove alternate links and JSON-LD if component unmounts
    return () => {
      if (alternateLanguages) {
        Object.keys(alternateLanguages).forEach((lang) => {
          const link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
          if (link) link.remove();
        });
      }
      if (structuredData && jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [title, description, keywords, image, url, type, structuredData, articlePublishedTime, articleModifiedTime, author, section, tags, noIndex, noFollow, alternateLanguages]);

  return null;
};

export default SEOHelmet;
