/**
 * News Article Type Definitions
 * Defines structure for news articles across all categories
 */

export interface NewsAuthor {
  name: string;
  bio?: string;
  image?: string;
  url?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  headline: string;
  subheadline?: string;
  excerpt: string;
  content: ArticleContent[];
  category: string; // Main category slug
  subcategory?: string; // Subcategory slug
  tags: string[];
  keywords: string[];
  
  // Publishing info
  author: NewsAuthor;
  datePublished: string; // ISO format
  dateModified?: string;
  status: 'draft' | 'published' | 'archived';
  
  // SEO & Media
  featuredImage: string;
  imageAlt: string;
  metaDescription: string;
  canonicalUrl?: string;
  
  // Engagement
  readTime: number; // minutes
  views?: number;
  trending?: boolean;
  featured?: boolean;
  
  // Related content
  relatedArticles?: string[]; // Article IDs
  relatedCalculators?: string[]; // Calculator IDs
  
  // Optional enhancements
  videoUrl?: string;
  infographicUrl?: string;
  sources?: ExternalSource[];
}

export interface ArticleContent {
  type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'quote' | 'table' | 'image' | 'callout' | 'divider' | 'embed';
  content: string | string[] | TableData | any;
  level?: number; // For headings: 2, 3, 4
  author?: string; // For quotes
  caption?: string; // For images
  style?: 'info' | 'warning' | 'success' | 'tip'; // For callouts
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ExternalSource {
  name: string;
  url: string;
  credibility: 'official' | 'verified' | 'standard';
}

// Article Templates for Different Content Types
export const articleTemplates = {
  // BREAKING NEWS - Quick updates
  breakingNews: {
    structure: ['heading', 'paragraph', 'list', 'paragraph', 'callout'],
    minWords: 300,
    maxWords: 600,
    readTime: 2,
    requiredSections: ['What Happened', 'Why It Matters', 'What\'s Next']
  },
  
  // DEEP DIVE - Comprehensive analysis
  deepDive: {
    structure: ['heading', 'subheading', 'paragraph', 'list', 'quote', 'table', 'paragraph', 'callout'],
    minWords: 1500,
    maxWords: 3000,
    readTime: 8,
    requiredSections: ['Introduction', 'Background', 'Analysis', 'Data/Evidence', 'Expert Opinion', 'Implications', 'Conclusion']
  },
  
  // HOW-TO GUIDE - Educational content
  howTo: {
    structure: ['heading', 'paragraph', 'list', 'subheading', 'paragraph', 'image', 'callout'],
    minWords: 800,
    maxWords: 1500,
    readTime: 5,
    requiredSections: ['Introduction', 'Step-by-Step Guide', 'Pro Tips', 'Common Mistakes', 'Related Tools']
  },
  
  // LISTICLE - Top 10, Best of, etc.
  listicle: {
    structure: ['heading', 'paragraph', 'subheading', 'paragraph', 'list', 'divider'],
    minWords: 1000,
    maxWords: 2000,
    readTime: 6,
    requiredSections: ['Introduction', 'List Items (numbered)', 'Conclusion']
  },
  
  // REGIONAL STORY - Local business focus
  regionalStory: {
    structure: ['heading', 'paragraph', 'quote', 'subheading', 'paragraph', 'callout'],
    minWords: 800,
    maxWords: 1500,
    readTime: 5,
    requiredSections: ['Local Context', 'Story/Case Study', 'Regional Impact', 'Opportunities']
  },
  
  // MARKET ANALYSIS - Daily/weekly market wrap
  marketAnalysis: {
    structure: ['heading', 'paragraph', 'table', 'list', 'paragraph', 'callout'],
    minWords: 600,
    maxWords: 1200,
    readTime: 4,
    requiredSections: ['Market Summary', 'Top Gainers/Losers', 'Key Drivers', 'Outlook']
  }
};

// Content Quality Guidelines
export const contentGuidelines = {
  seo: {
    titleLength: { min: 50, max: 60 },
    metaDescriptionLength: { min: 150, max: 160 },
    keywordDensity: { min: 1, max: 3 }, // percentage
    internalLinks: { min: 3, max: 8 },
    externalLinks: { min: 2, max: 5 },
    imageAltText: true,
    headingHierarchy: true
  },
  
  readability: {
    averageSentenceLength: { max: 20 }, // words
    paragraphLength: { max: 150 }, // words
    useSubheadings: true,
    useBulletPoints: true,
    fleschReadingEase: { min: 60 } // Target 60+ for general audience
  },
  
  eeat: {
    authorAttribution: true,
    publicationDate: true,
    lastUpdated: true,
    sources: { min: 2 }, // Minimum external authoritative sources
    expertQuotes: true, // When applicable
    originalResearch: true // Preferred for deep dives
  }
};

export default NewsArticle;

