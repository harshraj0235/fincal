// SEO Optimization Utilities for Blog Data Enhancement
// Based on Google Search Central Guidelines for Better Ranking & Discover

interface ExistingBlogPost {
  id?: string | number;
  title: string;
  slug?: string;
  author?: string;
  metaDescription?: string;
  excerpt?: string;
  categories?: string[];
  keywords?: string[];
  content?: any[];
  date?: string;
}

interface EnhancedSEOFields {
  canonicalUrl: string;
  focusKeyword: string;
  relatedKeywords: string[];
  publishedDate: string;
  lastModified: string;
  readingTime: number;
  schema: any;
  openGraph: any;
  discoverOptimized: any;
}

// Focus keyword mapping by category for better targeting
const CATEGORY_KEYWORDS = {
  'Government Schemes': {
    'PM Kisan': 'PM Kisan Yojana 2025',
    'NPS': 'NPS Vatsalya Scheme',
    'PMJJBY': 'PMJJBY eligibility 2025',
    'SCSS': 'Senior Citizen Savings Scheme',
    'Atal Pension': 'Atal Pension Yojana benefits'
  },
  'Investment': {
    'SIP': 'SIP calculator 2025',
    'Mutual Fund': 'mutual fund investment planning',
    'ELSS': 'tax saving ELSS funds',
    'PPF': 'PPF calculator returns'
  },
  'EMI Calculation': {
    'Home Loan': 'home loan EMI calculator 2025',
    'Personal Loan': 'personal loan EMI calculator',
    'Car Loan': 'car loan EMI calculation'
  },
  'Tax Planning': {
    'Income Tax': 'income tax saving 2025',
    'Tax Deduction': 'Section 80C tax deductions',
    'Tax Calculator': 'income tax calculator 2025'
  }
};

// Generate focus keyword based on title and categories
export function generateFocusKeyword(title: string, categories: string[] = []): string {
  const titleLower = title.toLowerCase();
  
  // Check category-specific keywords first
  for (const category of categories) {
    const categoryKeywords = CATEGORY_KEYWORDS[category as keyof typeof CATEGORY_KEYWORDS];
    if (categoryKeywords) {
      for (const [key, keyword] of Object.entries(categoryKeywords)) {
        if (titleLower.includes(key.toLowerCase())) {
          return keyword;
        }
      }
    }
  }
  
  // Fallback: Extract main topic from title
  const words = title.split(' ').slice(0, 3).join(' ');
  return words + ' 2025';
}

// Generate related keywords for semantic SEO
export function generateRelatedKeywords(focusKeyword: string, categories: string[] = []): string[] {
  const baseKeyword = focusKeyword.replace(' 2025', '');
  const relatedKeywords = [
    `${baseKeyword} guide`,
    `${baseKeyword} benefits`,
    `${baseKeyword} eligibility`,
    `${baseKeyword} application process`,
    `best ${baseKeyword}`,
    `${baseKeyword} calculator`,
    `${baseKeyword} comparison`,
    `${baseKeyword} tips`,
    `${baseKeyword} planning`,
    `how to use ${baseKeyword}`
  ];
  
  // Add category-specific keywords
  if (categories.includes('Government Schemes')) {
    relatedKeywords.push(`${baseKeyword} online application`, `${baseKeyword} status check`);
  }
  
  if (categories.includes('Investment')) {
    relatedKeywords.push(`${baseKeyword} returns`, `${baseKeyword} tax benefits`);
  }
  
  if (categories.includes('EMI Calculation')) {
    relatedKeywords.push(`${baseKeyword} interest rates`, `${baseKeyword} prepayment`);
  }
  
  return relatedKeywords.slice(0, 8); // Limit to 8 related keywords
}

// Optimize meta description for better CTR
export function optimizeMetaDescription(
  title: string, 
  focusKeyword: string, 
  categories: string[] = []
): string {
  const year = '2025';
  const baseDescription = title.replace(/[:|].*/, ''); // Remove subtitle
  
  // Add compelling elements based on category
  let cta = 'Complete guide with expert tips.';
  let benefit = '';
  
  if (categories.includes('Government Schemes')) {
    cta = 'Check eligibility, benefits, and application process.';
    if (focusKeyword.includes('PM Kisan')) benefit = '₹6000 annual benefits, ';
    if (focusKeyword.includes('NPS')) benefit = 'retirement planning for children, ';
  }
  
  if (categories.includes('Investment')) {
    cta = 'Plan investments and maximize returns.';
    benefit = 'wealth creation strategies, ';
  }
  
  if (categories.includes('EMI Calculation')) {
    cta = 'Calculate EMI, compare rates, and save money.';
    benefit = 'interest rate comparison, ';
  }
  
  const description = `${baseDescription} ${year}: ${benefit}${cta}`;
  
  // Ensure it's under 160 characters
  return description.length > 160 ? description.substring(0, 157) + '...' : description;
}

// Calculate reading time based on content
export function calculateReadingTime(content: any[] = []): number {
  const wordsPerMinute = 200;
  
  let totalWords = 0;
  content.forEach(section => {
    if (section.content) {
      totalWords += section.content.split(' ').length;
    }
    if (section.items && Array.isArray(section.items)) {
      totalWords += section.items.join(' ').split(' ').length;
    }
  });
  
  // Minimum 2 minutes, maximum 15 minutes
  const readingTime = Math.ceil(totalWords / wordsPerMinute);
  return Math.max(2, Math.min(15, readingTime));
}

// Generate Schema.org markup
export function generateSchema(post: ExistingBlogPost & { focusKeyword: string }): any {
  const baseUrl = 'https://yoursite.com';
  const publishedDate = post.date || new Date().toISOString();
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt || '',
    author: {
      "@type": "Person",
      name: post.author || "Financial Expert",
      url: `${baseUrl}/authors/${(post.author || 'expert').toLowerCase().replace(' ', '-')}`
    },
    publisher: {
      "@type": "Organization",
      name: "Your Financial Site",
      logo: `${baseUrl}/logo.png`
    },
    datePublished: publishedDate,
    dateModified: new Date().toISOString(),
    mainEntityOfPage: `${baseUrl}/${post.slug}`,
    keywords: post.keywords?.join(', ') || post.focusKeyword,
    articleSection: post.categories?.join(', ') || 'Finance'
  };
}

// Generate Open Graph metadata
export function generateOpenGraph(post: ExistingBlogPost & { focusKeyword: string }): any {
  const baseUrl = 'https://yoursite.com';
  
  return {
    title: `${post.title} | Your Financial Site`,
    description: post.metaDescription || post.excerpt || '',
    image: `${baseUrl}/images/${post.slug || 'default'}-guide.jpg`,
    url: `${baseUrl}/${post.slug}`,
    type: "article",
    siteName: "Your Financial Site"
  };
}

// Generate Google Discover optimization signals
export function generateDiscoverOptimization(
  categories: string[] = [],
  hasRecentData: boolean = true
): any {
  return {
    highQualityImages: true,
    originalReporting: categories.includes('Government Schemes') || categories.includes('Investment'),
    expertiseSignals: true,
    freshContent: hasRecentData
  };
}

// Main function to enhance existing blog post
export function enhanceBlogPostSEO(post: ExistingBlogPost): ExistingBlogPost & EnhancedSEOFields {
  const focusKeyword = generateFocusKeyword(post.title, post.categories);
  const relatedKeywords = generateRelatedKeywords(focusKeyword, post.categories);
  const optimizedMetaDescription = optimizeMetaDescription(post.title, focusKeyword, post.categories);
  const readingTime = calculateReadingTime(post.content);
  
  const baseUrl = 'https://yoursite.com';
  const canonicalUrl = `${baseUrl}/${post.slug}`;
  const now = new Date().toISOString();
  
  const enhancedPost = {
    ...post,
    metaDescription: optimizedMetaDescription,
    focusKeyword,
    relatedKeywords,
    canonicalUrl,
    publishedDate: post.date || now,
    lastModified: now,
    readingTime,
    schema: generateSchema({ ...post, focusKeyword }),
    openGraph: generateOpenGraph({ ...post, focusKeyword }),
    discoverOptimized: generateDiscoverOptimization(post.categories, true)
  };
  
  return enhancedPost;
}

// Bulk enhancement function for multiple posts
export function enhanceMultipleBlogPosts(posts: ExistingBlogPost[]): (ExistingBlogPost & EnhancedSEOFields)[] {
  return posts.map(post => enhanceBlogPostSEO(post));
}

// Keyword density checker
export function checkKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  
  let keywordCount = 0;
  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const slice = words.slice(i, i + keywordWords.length);
    if (slice.join(' ') === keywordWords.join(' ')) {
      keywordCount++;
    }
  }
  
  const density = (keywordCount / words.length) * 100;
  return Math.round(density * 100) / 100; // Round to 2 decimal places
}

// SEO score calculator
export function calculateSEOScore(post: ExistingBlogPost & Partial<EnhancedSEOFields>): number {
  let score = 0;
  let maxScore = 100;
  
  // Title optimization (20 points)
  if (post.title && post.title.length > 10 && post.title.length < 60) score += 10;
  if (post.title && post.title.includes('2025')) score += 5;
  if (post.focusKeyword && post.title && post.title.toLowerCase().includes(post.focusKeyword.toLowerCase())) score += 5;
  
  // Meta description (15 points)
  if (post.metaDescription && post.metaDescription.length > 120 && post.metaDescription.length < 160) score += 10;
  if (post.focusKeyword && post.metaDescription && post.metaDescription.toLowerCase().includes(post.focusKeyword.toLowerCase())) score += 5;
  
  // Keywords (15 points)
  if (post.keywords && post.keywords.length >= 5) score += 10;
  if (post.relatedKeywords && post.relatedKeywords.length >= 5) score += 5;
  
  // Content structure (20 points)
  if (post.content && post.content.length > 5) score += 10;
  if (post.readingTime && post.readingTime >= 3 && post.readingTime <= 12) score += 10;
  
  // Technical SEO (15 points)
  if (post.canonicalUrl) score += 5;
  if (post.schema) score += 5;
  if (post.openGraph) score += 5;
  
  // Author and expertise (15 points)
  if (post.author && post.author.length > 3) score += 5;
  if (post.categories && post.categories.length >= 2) score += 5;
  if (post.excerpt && post.excerpt.length > 50) score += 5;
  
  return Math.round((score / maxScore) * 100);
}

// Priority scoring for optimization order
export function calculateOptimizationPriority(posts: ExistingBlogPost[]): ExistingBlogPost[] {
  return posts
    .map(post => ({
      ...post,
      seoScore: calculateSEOScore(post),
      priority: getPriorityScore(post)
    }))
    .sort((a, b) => b.priority - a.priority);
}

function getPriorityScore(post: ExistingBlogPost): number {
  let priority = 0;
  
  // High-value categories get higher priority
  if (post.categories?.includes('Government Schemes')) priority += 30;
  if (post.categories?.includes('Investment')) priority += 25;
  if (post.categories?.includes('EMI Calculation')) priority += 20;
  if (post.categories?.includes('Tax Planning')) priority += 20;
  
  // Recent or evergreen content
  if (post.title?.includes('2025')) priority += 15;
  if (post.title?.includes('Calculator')) priority += 10;
  
  // Content quality indicators
  if (post.title && post.title.length > 30) priority += 5;
  if (post.metaDescription && post.metaDescription.length > 100) priority += 5;
  
  return priority;
}

// Export utility for easy import
export const SEOOptimizer = {
  enhanceBlogPostSEO,
  enhanceMultipleBlogPosts,
  generateFocusKeyword,
  generateRelatedKeywords,
  optimizeMetaDescription,
  calculateReadingTime,
  checkKeywordDensity,
  calculateSEOScore,
  calculateOptimizationPriority
};