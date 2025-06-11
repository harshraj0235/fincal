// SEO utility functions for optimizing content

/**
 * Generates structured data for a calculator page
 * @param name Calculator name
 * @param description Calculator description
 * @param url Page URL
 * @returns Structured data object for the calculator
 */
export const generateCalculatorSchema = (name: string, description: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${name} | MoneyCalc India`,
    "description": description,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "url": url
  };
};

/**
 * Generates structured data for a blog post
 * @param title Blog post title
 * @param description Blog post description
 * @param url Blog post URL
 * @param authorName Author name
 * @param datePublished Publication date
 * @param imageUrl Featured image URL
 * @returns Structured data object for the blog post
 */
export const generateBlogPostSchema = (
  title: string, 
  description: string, 
  url: string, 
  authorName: string, 
  datePublished: string,
  imageUrl: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "MoneyCalc India",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moneycal.in/logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
};

/**
 * Generates structured data for a FAQ page
 * @param questions Array of question-answer pairs
 * @param url Page URL
 * @returns Structured data object for FAQs
 */
export const generateFAQSchema = (
  questions: Array<{question: string, answer: string}>, 
  url: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(qa => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    })),
    "url": url
  };
};

/**
 * Generates breadcrumb structured data
 * @param items Array of breadcrumb items with name and URL
 * @returns Structured data object for breadcrumbs
 */
export const generateBreadcrumbSchema = (
  items: Array<{name: string, url: string}>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generates meta description with optimal length
 * @param text Long description text
 * @param maxLength Maximum length for meta description
 * @returns Optimized meta description
 */
export const generateMetaDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  
  // Find the last space before maxLength
  const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');
  if (lastSpace === -1) return text.substring(0, maxLength) + '...';
  
  return text.substring(0, lastSpace) + '...';
};

/**
 * Generates a list of keywords from text
 * @param text Content text
 * @param additionalKeywords Additional keywords to include
 * @returns Array of keywords
 */
export const generateKeywords = (text: string, additionalKeywords: string[] = []): string[] => {
  // Extract common financial terms from text
  const commonTerms = [
    'finance', 'investment', 'tax', 'loan', 'EMI', 'SIP', 'mutual fund',
    'retirement', 'pension', 'insurance', 'savings', 'calculator', 'India',
    'financial planning', 'wealth management', 'income tax', 'GST'
  ];
  
  const extractedKeywords = commonTerms.filter(term => 
    text.toLowerCase().includes(term.toLowerCase())
  );
  
  // Combine with additional keywords and remove duplicates
  return [...new Set([...extractedKeywords, ...additionalKeywords])];
};

/**
 * Optimizes image alt text for SEO
 * @param imageName Original image name or path
 * @param context Context of the image
 * @returns SEO-friendly alt text
 */
export const optimizeImageAlt = (imageName: string, context: string): string => {
  // Extract filename without extension
  const filename = imageName.split('/').pop()?.split('.')[0] || '';
  
  // Replace hyphens and underscores with spaces
  const baseAlt = filename.replace(/[-_]/g, ' ');
  
  // Combine with context
  return `${baseAlt} - ${context}`.trim();
};

/**
 * Generates canonical URL
 * @param path URL path
 * @returns Full canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `https://moneycal.in${normalizedPath}`;
};