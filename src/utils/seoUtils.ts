// SEO Utility Functions for MoneyCal India Website

export interface SEOPage {
  url: string;
  title: string;
  description: string;
  keywords?: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
  image?: string;
  type?: 'website' | 'article' | 'calculator';
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
}

// Generate dynamic meta tags for calculators
export const generateCalculatorMeta = (calculator: Calculator): SEOPage => {
  const baseKeywords = [
    'financial calculator india',
    'free calculator',
    'online calculator',
    'financial planning india'
  ];

  return {
    url: `/calculators/${calculator.id}`,
    title: `${calculator.name} - Free Online Calculator | MoneyCal India`,
    description: `${calculator.description} Use our free ${calculator.name.toLowerCase()} to make informed financial decisions. Quick, accurate, and easy to use.`,
    keywords: [...calculator.keywords, ...baseKeywords].join(', '),
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
    type: 'calculator'
  };
};

// Generate category page meta
export const generateCategoryMeta = (categoryId: string, categoryName: string, calculatorCount: number): SEOPage => {
  return {
    url: `/category/${categoryId}`,
    title: `${categoryName} - ${calculatorCount} Free Calculators | MoneyCal India`,
    description: `Explore ${calculatorCount} free ${categoryName.toLowerCase()} tools. Calculate EMI, SIP, taxes, and more with our comprehensive financial calculators designed for Indian users.`,
    keywords: `${categoryName.toLowerCase()}, financial calculators, india, free tools, ${categoryId.replace('-', ' ')}`,
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
    type: 'website'
  };
};

// Generate blog post meta
export const generateBlogMeta = (slug: string, title: string, excerpt: string, category: string, tags: string[], publishDate: string): SEOPage => {
  return {
    url: `/blog/${slug}`,
    title: `${title} | MoneyCal India Blog`,
    description: excerpt,
    keywords: [...tags, 'financial advice', 'money management', 'investment tips', 'india finance'].join(', '),
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: publishDate,
    type: 'article'
  };
};

// Generate structured data for different page types
export const generateStructuredData = (page: SEOPage, additionalData?: any) => {
  const baseData: any = {
    '@context': 'https://schema.org',
    '@graph': [] as any[]
  };

  // WebPage schema
  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `https://moneycal.in${page.url}#webpage`,
    url: `https://moneycal.in${page.url}`,
    name: page.title,
    description: page.description,
    inLanguage: 'en-IN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://moneycal.in/#website'
    },
    datePublished: page.lastmod || new Date().toISOString(),
    dateModified: page.lastmod || new Date().toISOString()
  };

  baseData['@graph'].push(webPageSchema);

  // Calculator-specific schema
  if (page.type === 'calculator') {
    const calculatorSchema = {
      '@type': 'WebApplication',
      '@id': `https://moneycal.in${page.url}#calculator`,
      name: page.title.split(' - ')[0],
      description: page.description,
      url: `https://moneycal.in${page.url}`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR'
      },
      isAccessibleForFree: true,
      inLanguage: 'en-IN'
    };

    baseData['@graph'].push(calculatorSchema);
  }

  // Article schema
  if (page.type === 'article') {
    const articleSchema = {
      '@type': 'Article',
      '@id': `https://moneycal.in${page.url}#article`,
      headline: page.title.split(' | ')[0],
      description: page.description,
      image: page.image || 'https://moneycal.in/og-image.jpg',
      datePublished: page.lastmod || new Date().toISOString(),
      dateModified: page.lastmod || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'MoneyCal India'
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://moneycal.in/#organization'
      },
      mainEntityOfPage: `https://moneycal.in${page.url}`
    };

    baseData['@graph'].push(articleSchema);
  }

  // Add additional data if provided
  if (additionalData) {
    if (Array.isArray(additionalData)) {
      baseData['@graph'].push(...additionalData);
    } else {
      baseData['@graph'].push(additionalData);
    }
  }

  return baseData;
};

// Generate XML sitemap entry
export const generateSitemapEntry = (page: SEOPage): string => {
  return `
  <url>
    <loc>https://moneycal.in${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
};

// Generate Open Graph meta tags
export const generateOpenGraphTags = (page: SEOPage): Array<{ property: string; content: string }> => {
  return [
    { property: 'og:type', content: page.type === 'article' ? 'article' : 'website' },
    { property: 'og:title', content: page.title },
    { property: 'og:description', content: page.description },
    { property: 'og:url', content: `https://moneycal.in${page.url}` },
    { property: 'og:image', content: page.image || 'https://moneycal.in/og-image.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'MoneyCal India' },
    { property: 'og:locale', content: 'en_IN' }
  ];
};

// Generate Twitter Card meta tags
export const generateTwitterTags = (page: SEOPage): Array<{ name: string; content: string }> => {
  return [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: page.title },
    { name: 'twitter:description', content: page.description },
    { name: 'twitter:image', content: page.image || 'https://moneycal.in/og-image.jpg' },
    { name: 'twitter:site', content: '@MoneyCalIN' },
    { name: 'twitter:creator', content: '@MoneyCalIN' }
  ];
};

// Generate FAQ schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

// Calculate reading time for articles
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate keyword density analysis
export const analyzeKeywordDensity = (content: string, targetKeywords: string[]): { [key: string]: number } => {
  const words = content.toLowerCase().split(/\s+/);
  const wordCount = words.length;
  const keywordDensity: { [key: string]: number } = {};

  targetKeywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    const occurrences = content.toLowerCase().split(keywordLower).length - 1;
    keywordDensity[keyword] = (occurrences / wordCount) * 100;
  });

  return keywordDensity;
};

// Generate meta description from content
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const sentences = content.split('. ');
  let description = '';
  
  for (const sentence of sentences) {
    if ((description + sentence).length <= maxLength - 3) {
      description += (description ? '. ' : '') + sentence;
    } else {
      break;
    }
  }
  
  return description + (description.length < maxLength - 3 ? '.' : '...');
};

// SEO score calculator
export const calculateSEOScore = (page: SEOPage, content?: string): { score: number; issues: string[] } => {
  let score = 100;
  const issues: string[] = [];

  // Title checks
  if (!page.title || page.title.length < 30) {
    score -= 10;
    issues.push('Title is too short (should be 30-60 characters)');
  }
  if (page.title && page.title.length > 60) {
    score -= 5;
    issues.push('Title is too long (should be 30-60 characters)');
  }

  // Description checks
  if (!page.description || page.description.length < 120) {
    score -= 10;
    issues.push('Meta description is too short (should be 120-160 characters)');
  }
  if (page.description && page.description.length > 160) {
    score -= 5;
    issues.push('Meta description is too long (should be 120-160 characters)');
  }

  // Keywords check
  if (!page.keywords || page.keywords.split(',').length < 3) {
    score -= 5;
    issues.push('Add more relevant keywords');
  }

  // URL structure
  if (page.url.length > 100) {
    score -= 5;
    issues.push('URL is too long');
  }

  // Content checks (if provided)
  if (content) {
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 300) {
      score -= 10;
      issues.push('Content is too short (should be at least 300 words)');
    }
  }

  return { score: Math.max(0, score), issues };
};

// Content quality checks for low-value/thin content
export const isLowValueContent = (content?: string, minWords: number = 300): boolean => {
  if (!content) return true;
  const text = content
    .replace(/<[^>]*>/g, ' ') // strip HTML
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return wordCount < minWords;
};

export const shouldIndexPage = (page: SEOPage, content?: string): { index: boolean; reasons: string[] } => {
  const reasons: string[] = [];
  // Auto noindex for obvious thin/utility pages
  if (page.url.includes('/blog/write') || page.url.includes('/admin') || page.url.includes('/private')) {
    reasons.push('Utility or submission page');
    return { index: false, reasons };
  }
  // Content length gate
  if (isLowValueContent(content)) {
    reasons.push('Content below minimum quality threshold');
    return { index: false, reasons };
  }
  return { index: true, reasons };
};

// Generate robots meta tag
export const generateRobotsMeta = (index: boolean = true, follow: boolean = true, otherDirectives: string[] = []): string => {
  const directives = [
    index ? 'index' : 'noindex',
    follow ? 'follow' : 'nofollow',
    ...otherDirectives
  ];
  
  return directives.join(', ');
};

// Export utility object
export const SEOUtils = {
  generateCalculatorMeta,
  generateCategoryMeta,
  generateBlogMeta,
  generateStructuredData,
  generateSitemapEntry,
  generateOpenGraphTags,
  generateTwitterTags,
  generateFAQSchema,
  generateBreadcrumbSchema,
  calculateReadingTime,
  analyzeKeywordDensity,
  generateMetaDescription,
  calculateSEOScore,
  generateRobotsMeta,
  isLowValueContent,
  shouldIndexPage
};

export default SEOUtils;