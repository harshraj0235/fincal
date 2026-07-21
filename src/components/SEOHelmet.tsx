import React from 'react';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
  type?: string;
  structuredData?: object | object[];
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  alternateLanguages?: { [key: string]: string };
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqData?: Array<{ question: string; answer: string }>;
  calculatorData?: {
    name: string;
    description: string;
    category: string;
    features: string[];
    authorName?: string;
    ratingValue?: number;
    reviewCount?: number;
  };
  // E-E-A-T & YMYL Compliance Props
  authorExpertise?: string[];
  authorCredentials?: string[];
  expertReviewerName?: string;
  expertReviewerTitle?: string;
  isFinanceContent?: boolean;
  wordCount?: number;
  contentQualityScore?: number;
  // News-specific
  newsKeywords?: string;
  // Date signals for Google Discover
  datePublished?: string;
  dateModified?: string;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  keywords,
  image,
  url: rawUrl,
  canonicalUrl,
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
  breadcrumbs,
  faqData,
  calculatorData,
  authorExpertise,
  authorCredentials,
  expertReviewerName,
  expertReviewerTitle,
  isFinanceContent = true,
  wordCount,
  contentQualityScore,
  newsKeywords,
  datePublished,
  dateModified,
}) => {
  React.useEffect(() => {
    const sanitizeSeoText = (value: string): string => String(value)
      .replace(/â€"/g, '-')
      .replace(/â€"/g, '-')
      .replace(/â€˜|â€™/g, "'")
      .replace(/â€œ|â€/g, '"')
      .replace(/â‚¹/g, 'Rs ')
      .replace(/Â©/g, 'Copyright')
      .replace(/Â/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const effectiveUrl = canonicalUrl ?? rawUrl;
    const siteName = 'MoneyCal India';
    const cleanTitle = sanitizeSeoText(title);
    const cleanDescription = sanitizeSeoText(description);
    const fullTitle = cleanTitle.includes('MoneyCal') ? cleanTitle : `${cleanTitle} | MoneyCal.in`;
    document.title = fullTitle;
    
    // Set HTML lang attribute for Hindi optimization
    document.documentElement.lang = effectiveUrl?.includes('/hi/') ? 'hi' : 'en';

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

    // Remove meta by selector
    const removeMeta = (selector: string) => {
      document.querySelector(selector)?.remove();
    };

    // Normalize and cap descriptions to 160 chars
    const normalizeDescription = (text: string, maxLen: number = 160): string => {
      const clean = String(text)
        .replace(/\s+/g, ' ')
        .replace(/[\r\n]+/g, ' ')
        .trim();
      if (clean.length <= maxLen) return clean;
      const truncated = clean.slice(0, maxLen - 1);
      const lastSpace = truncated.lastIndexOf(' ');
      return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim();
    };

    const shortDescription = normalizeDescription(cleanDescription);

    // ── Standard meta tags ──────────────────────────────────────────────────
    setMeta('description', shortDescription);

    // FIX: Actually SET keywords (previously this was deleting them!)
    if (keywords && keywords.trim()) {
      setMeta('keywords', keywords.trim());
    } else {
      // Generate smart keywords from title if not provided
      const autoKeywords = cleanTitle
        .replace(/[|–—]/g, ',')
        .split(',')
        .map(k => k.trim())
        .filter(Boolean)
        .join(', ');
      if (autoKeywords) setMeta('keywords', autoKeywords + ', MoneyCal India, free financial calculator India');
    }

    // News keywords for Google News eligibility
    if (newsKeywords) {
      setMeta('news_keywords', newsKeywords);
    }

    // Google Discover freshness signal — date meta
    const publishedDate = articlePublishedTime || datePublished;
    const modifiedDate = articleModifiedTime || dateModified || new Date().toISOString();

    if (publishedDate) {
      setMeta('article:published_time', publishedDate, 'property');
      setMeta('date', new Date(publishedDate).toLocaleDateString('en-IN'));
    }
    if (modifiedDate) {
      setMeta('article:modified_time', modifiedDate, 'property');
      setMeta('last-modified', modifiedDate);
    }

    // ── Canonical URL ─────────────────────────────────────────────────────
    const normalizeCanonicalUrl = (rawUrl?: string): string => {
      const candidate = rawUrl
        ? (rawUrl.startsWith('http') ? rawUrl : `https://moneycal.in${rawUrl}`)
        : window.location.href;

      let parsed: URL;
      try {
        parsed = new URL(candidate);
      } catch {
        parsed = new URL(window.location.href);
      }

      parsed.protocol = 'https:';
      parsed.hostname = 'moneycal.in';
      parsed.port = '';
      parsed.search = '';
      parsed.hash = '';

      let normalizedPath = parsed.pathname;
      const hostSegmentPattern = /^\/moneycal\.in/i;
      while (hostSegmentPattern.test(normalizedPath)) {
        normalizedPath = normalizedPath.replace(hostSegmentPattern, '');
        if (!normalizedPath.startsWith('/')) normalizedPath = '/' + normalizedPath;
      }
      normalizedPath = normalizedPath.replace(/\/moneycal\.in\//gi, '/');

      if (!normalizedPath) normalizedPath = '/';
      // Keep trailing slash for discover/ and other content paths to match sitemaps
      // Only strip double slashes, not intentional trailing slashes

      parsed.pathname = normalizedPath;
      return parsed.toString();
    };

    const canonicalHref = normalizeCanonicalUrl(effectiveUrl);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    try {
      const canonicalPath = new URL(canonicalHref).pathname;
      setMeta('mc:seo-source', canonicalPath);
      setMeta('mc:seo', 'page');
    } catch {
      setMeta('mc:seo-source', canonicalHref);
      setMeta('mc:seo', 'page');
    }

    // ── Robots ────────────────────────────────────────────────────────────
    let effectiveNoIndex = Boolean(noIndex);
    let effectiveNoFollow = Boolean(noFollow);
    try {
      const p = new URL(canonicalHref).pathname.toLowerCase();
      const blocked = [
        '/404', '/error', '/duplicate', '/copy', '/redirect',
        '/admin/', '/private/', '/api/',
        '/gk/',
        '/fun-engagement',
        '/backlink-building',
        '/ai-personalization',
        '/seo-tools/',
      ];
      const blockedExact = ['/analytics', '/astro-finance'];

      const isNotFound = title.toLowerCase().includes('not found');

      if (
        blocked.some((b) => p.includes(b)) ||
        blockedExact.some((b) => p === b) ||
        isNotFound
      ) {
        effectiveNoIndex = true;
        effectiveNoFollow = true;
      }
    } catch {
      effectiveNoIndex = Boolean(noIndex) || title.toLowerCase().includes('not found');
      effectiveNoFollow = Boolean(noFollow);
    }

    if (effectiveNoIndex || effectiveNoFollow) {
      setMeta('robots', `${effectiveNoIndex ? 'noindex' : 'index'},${effectiveNoFollow ? 'nofollow' : 'follow'}`);
    } else {
      setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // ── Open Graph tags ────────────────────────────────────────────────────
    const ogImage = image || 'https://moneycal.in/android-chrome-512x512.png';
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', shortDescription, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', canonicalHref, 'property');
    setMeta('og:site_name', siteName, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:image:alt', cleanTitle, 'property');
    setMeta('og:locale', 'en_IN', 'property');

    if (publishedDate) setMeta('article:published_time', publishedDate, 'property');
    if (modifiedDate) setMeta('article:modified_time', modifiedDate, 'property');
    if (author) setMeta('article:author', author, 'property');
    if (section) setMeta('article:section', section, 'property');
    if (tags && tags.length) {
      tags.forEach(tag => setMeta('article:tag', tag, 'property'));
    }

    // ── Twitter Card tags ─────────────────────────────────────────────────
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', shortDescription);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:image:alt', cleanTitle);
    setMeta('twitter:site', '@MoneyCalIN');
    setMeta('twitter:creator', '@MoneyCalIN');

    // ── Geo & Language ────────────────────────────────────────────────────
    setMeta('geo.region', 'IN');
    setMeta('geo.placename', 'India');
    setMeta('content-language', 'en-IN');
    setMeta('language', 'English');

    // ── Hreflang & Language links ─────────────────────────────────────────
    const pathname = window.location.pathname;
    
    // Update HTML lang attribute for accessibility and basic SEO
    document.documentElement.lang = 'en-IN';

    const setHreflang = (lang: string, href: string) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Remove any stale Hindi hreflang tags from previous renders
    document.querySelector('link[rel="alternate"][hreflang="hi-IN"]')?.remove();
    document.querySelector('link[rel="alternate"][hreflang="hi"]')?.remove();

    // Only set English hreflang tags (Hindi pages have been removed)
    setHreflang('x-default', canonicalHref);
    setHreflang('en-IN', canonicalHref);
    setHreflang('en', canonicalHref);

    if (alternateLanguages) {
      Object.entries(alternateLanguages).forEach(([lang, href]) => {
        setHreflang(lang, href);
      });
    }

    // ── Structured Data ───────────────────────────────────────────────────
    let finalStructuredData: object | object[] | null = structuredData || null;

    // Build breadcrumbs
    const buildFallbackBreadcrumbs = (): Array<{ name: string; url: string }> => {
      let rawPath = effectiveUrl
        ? (effectiveUrl.startsWith('http') ? new URL(effectiveUrl).pathname : effectiveUrl)
        : (typeof window !== 'undefined' ? window.location.pathname : '/');
      rawPath = rawPath.replace(/^\/moneycal\.in(?=\/|$)/i, '') || '/';
      const segments = rawPath.split('/').filter(Boolean);
      const pathBreadcrumbs: Array<{ name: string; url: string }> = [{ name: 'Home', url: '/' }];
      let cumulative = '';
      segments.forEach((segment) => {
        cumulative += `/${segment}`;
        // Prettify common abbreviations
        const upperWords = ['ipo', 'emi', 'sip', 'gst', 'tds', 'itr', 'nps', 'ppf', 'fd', 'hra', 'roi', 'cagr'];
        const label = segment
          .split('-')
          .map(w => upperWords.includes(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        pathBreadcrumbs.push({ name: label, url: cumulative });
      });
      return pathBreadcrumbs;
    };

    const effectiveBreadcrumbs = (breadcrumbs && breadcrumbs.length > 0)
      ? breadcrumbs
      : buildFallbackBreadcrumbs();

    const cleanItemUrl = (u: string) => {
      if (!u || u === '/') return 'https://moneycal.in';
      const path = u.startsWith('http') ? new URL(u).pathname : u;
      const clean = path.replace(/^\/moneycal\.in(?=\/|$)/i, '') || '/';
      return `https://moneycal.in${clean}`;
    };

    if (effectiveBreadcrumbs.length >= 1) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": effectiveBreadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": cleanItemUrl(item.url)
        }))
      };

      if (!finalStructuredData) {
        finalStructuredData = breadcrumbData;
      } else if (Array.isArray(finalStructuredData)) {
        finalStructuredData = [...finalStructuredData, breadcrumbData];
      } else {
        finalStructuredData = [finalStructuredData, breadcrumbData];
      }
    }

    // FAQ structured data
    let effectiveFaqData = faqData;
    if ((!effectiveFaqData || effectiveFaqData.length === 0) && effectiveUrl) {
      const path = effectiveUrl.startsWith('http') ? new URL(effectiveUrl).pathname : effectiveUrl;
      const toolName = cleanTitle.replace(/\s*\|.*$/, '').replace(/\s*-.*$/, '').trim();
      if (path.includes('/calculators/') || path.includes('/tools/') || path.includes('/tax-tools/')) {
        effectiveFaqData = [
          {
            question: `How to use ${toolName}?`,
            answer: `Enter your values in the input fields, and our calculator will instantly show you the result. You can compare multiple scenarios to make better financial decisions. No login or registration required.`,
          },
          {
            question: `Is ${toolName} free to use?`,
            answer: `Yes, MoneyCal's ${toolName} is completely free to use. No sign-up, no subscription, and no hidden charges. All calculations happen in your browser for complete privacy.`,
          },
          {
            question: `How accurate is the ${toolName}?`,
            answer: `Our calculator uses standard financial formulas as per RBI and Income Tax Act guidelines. Results are accurate for planning purposes. For final figures, always verify with your bank or financial advisor.`,
          },
          {
            question: `Can I use ${toolName} on mobile?`,
            answer: `Yes! MoneyCal is fully optimized for mobile devices. Our ${toolName} works perfectly on smartphones and tablets.`,
          },
        ];
      }
    }

    const hasExistingFaqSchema = () => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.some((script) => {
        const content = script.textContent || '';
        return /"@type"\s*:\s*"FAQPage"/.test(content);
      });
    };

    if (effectiveFaqData && effectiveFaqData.length > 0 && !hasExistingFaqSchema()) {
      const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": effectiveFaqData.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };

      if (!finalStructuredData) {
        finalStructuredData = faqStructuredData;
      } else if (Array.isArray(finalStructuredData)) {
        finalStructuredData = [...(finalStructuredData as object[]), faqStructuredData];
      } else {
        finalStructuredData = [finalStructuredData, faqStructuredData];
      }
    }

    // E-E-A-T Author schema
    if (author && (authorExpertise || authorCredentials)) {
      const authorSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": author,
        ...(authorCredentials && authorCredentials.length > 0 && {
          "hasCredential": authorCredentials.map(c => ({
            "@type": "EducationalOccupationalCredential",
            "name": c
          }))
        }),
        ...(authorExpertise && authorExpertise.length > 0 && {
          "knowsAbout": authorExpertise
        }),
        "url": "https://moneycal.in/about-us",
        "worksFor": {
          "@type": "Organization",
          "name": "MoneyCal.in"
        },
        "workLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          }
        }
      };

      if (!finalStructuredData) {
        finalStructuredData = authorSchema;
      } else if (Array.isArray(finalStructuredData)) {
        finalStructuredData = [...(finalStructuredData as object[]), authorSchema];
      } else {
        finalStructuredData = [finalStructuredData, authorSchema];
      }
    }

    // Calculator SoftwareApplication schema
    if (calculatorData) {
      const calcUrl = (() => {
        const u = effectiveUrl ? (effectiveUrl.startsWith('http') ? effectiveUrl : `https://moneycal.in${effectiveUrl}`) : (typeof window !== 'undefined' ? window.location.href : 'https://moneycal.in');
        try {
          const parsed = new URL(u);
          parsed.pathname = parsed.pathname.replace(/^\/moneycal\.in(?=\/|$)/i, '') || '/';
          return parsed.toString();
        } catch { return u; }
      })();

      const calculatorStructuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": calculatorData.name,
        "description": calculatorData.description,
        "url": calcUrl,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "featureList": calculatorData.features,
        "audience": {
          "@type": "Audience",
          "audienceType": "Indian Financial Users",
          "geographicArea": { "@type": "Country", "name": "India" }
        },
        "publisher": {
          "@type": "Organization",
          "name": "MoneyCal.in",
          "url": "https://moneycal.in",
          "logo": "https://moneycal.in/android-chrome-512x512.png"
        },
        ...(calculatorData.authorName && {
          "author": {
            "@type": "Person",
            "name": calculatorData.authorName,
            "url": "https://moneycal.in/about-us"
          }
        })
      };

      if (!finalStructuredData) {
        finalStructuredData = calculatorStructuredData;
      } else if (Array.isArray(finalStructuredData)) {
        finalStructuredData = [...(finalStructuredData as object[]), calculatorStructuredData];
      } else {
        finalStructuredData = [finalStructuredData, calculatorStructuredData];
      }
    }

    // ── WebSite schema with SearchAction (enables Google sitelinks search box) ──
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "MoneyCal.in",
      "alternateName": "MoneyCal India",
      "url": "https://moneycal.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://moneycal.in/browse-all?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["en-IN", "hi-IN"]
    };

    // ── Organization schema (logo, social profiles) ──
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MoneyCal.in",
      "url": "https://moneycal.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moneycal.in/android-chrome-512x512.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://twitter.com/MoneyCalIN",
        "https://linkedin.com/company/moneycal"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@moneycal.in",
        "contactType": "customer support",
        "availableLanguage": ["English", "Hindi"]
      }
    };

    // Append site-wide schemas
    if (!finalStructuredData) {
      finalStructuredData = [websiteSchema, organizationSchema];
    } else if (Array.isArray(finalStructuredData)) {
      finalStructuredData = [...(finalStructuredData as object[]), websiteSchema, organizationSchema];
    } else {
      finalStructuredData = [finalStructuredData, websiteSchema, organizationSchema];
    }

    // Inject JSON-LD
    const dataHash = btoa(unescape(encodeURIComponent(JSON.stringify({ title, url: effectiveUrl || window.location.pathname })))).slice(0, 12);
    const scriptId = `jsonld-helm-${dataHash}`;
    let jsonLdScript = document.querySelector(`script#${scriptId}`) as HTMLScriptElement | null;

    if (finalStructuredData) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        jsonLdScript.id = scriptId;
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(finalStructuredData, null, 0);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

    return () => {
      if (alternateLanguages) {
        Object.keys(alternateLanguages).forEach((lang) => {
          const link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
          if (link) link.remove();
        });
      }
      if (jsonLdScript) jsonLdScript.remove();
    };
  }, [title, description, keywords, image, rawUrl, canonicalUrl, type, structuredData, articlePublishedTime, articleModifiedTime, author, section, tags, noIndex, noFollow, alternateLanguages, breadcrumbs, faqData, calculatorData, authorExpertise, authorCredentials, expertReviewerName, expertReviewerTitle, isFinanceContent, wordCount, contentQualityScore, newsKeywords, datePublished, dateModified]);

  return null;
};

export default SEOHelmet;
