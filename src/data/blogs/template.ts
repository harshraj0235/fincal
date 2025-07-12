import { blogPosts } from '../blogData1';

// ========================================
// TEMPLATE FOR NEW BLOG POSTS
// ========================================
// 
// HOW TO USE:
// 1. Copy this file and rename it to your desired blog ID (e.g., 653.ts, 654.ts, etc.)
// 2. Update all the content below with your blog information
// 3. The file will be automatically imported - no need to update any index files!
//
// AUTO-UPDATE FEATURE: Blog dates will automatically update every 2 days to keep content fresh for Google
// The system will automatically update the 'date' field if the blog is older than 2 days
//
// ========================================

const blogTemplate = {
  id: 654, // CHANGE THIS TO YOUR BLOG ID (must be unique)
  slug: 'your-blog-slug-here', // CHANGE THIS TO YOUR SLUG (URL-friendly)
  title: 'Your Blog Title Here', // CHANGE THIS TO YOUR TITLE
  author: 'Author Name', // CHANGE THIS TO AUTHOR NAME
  authorTitle: 'Author Title', // CHANGE THIS TO AUTHOR TITLE
  authorImage: 'https://moneycal.in/images/authors/author-name.jpg', // CHANGE THIS TO AUTHOR IMAGE
  authorBio: 'Author bio here...', // CHANGE THIS TO AUTHOR BIO
  metaDescription: 'Your meta description here...', // CHANGE THIS TO META DESCRIPTION
  excerpt: 'Your blog excerpt here...', // CHANGE THIS TO EXCERPT
  categories: ['Category1', 'Category2', 'Category3'], // CHANGE THESE CATEGORIES
  keywords: ['keyword1', 'keyword2', 'keyword3'], // CHANGE THESE KEYWORDS
  date: '2025-01-29', // CHANGE THIS TO YOUR DATE (YYYY-MM-DD format) - Will auto-update every 2 days
  coverImage: 'https://moneycal.in/images/blogs/your-image.jpg', // CHANGE THIS TO COVER IMAGE
  content: [
    { type: 'heading', content: 'Your Main Heading' },
    { type: 'paragraph', content: 'Your first paragraph content here...' },
    { type: 'heading', content: 'Sub Heading' },
    { type: 'paragraph', content: 'More paragraph content...' },
    { type: 'list', items: [
      'List item 1',
      'List item 2',
      'List item 3'
    ] },
    { type: 'paragraph', content: 'More content...' }
    // Add more content sections as needed
  ],
  featuredImage: 'https://moneycal.in/images/blogs/your-featured-image.jpg', // CHANGE THIS
  videoUrl: 'https://www.youtube.com/embed/your-video-id', // CHANGE THIS (optional)
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 5, // CHANGE THIS TO ESTIMATED READING TIME
  schema: {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": 'Your Blog Title Here', // CHANGE THIS
    "image": [
      'https://moneycal.in/images/blogs/your-image.jpg' // CHANGE THIS
    ],
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": 'Author Name', // CHANGE THIS
      "url": 'https://www.linkedin.com/in/author-profile/' // CHANGE THIS
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moneycal.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moneycal.in/images/logo.png"
      }
    },
    "mainEntityOfPage": 'https://moneycal.in/blog/your-blog-slug-here', // CHANGE THIS
    "articleSection": 'Category1, Category2, Category3', // CHANGE THIS
    "keywords": 'keyword1, keyword2, keyword3', // CHANGE THIS
    "wordCount": 1200, // CHANGE THIS TO ACTUAL WORD COUNT
    "timeRequired": "PT5M", // CHANGE THIS TO READING TIME
    "inLanguage": "en-IN",
    "isAccessibleForFree": true
  },
  faqSchema: [
    { question: 'Your FAQ question 1?', answer: 'Your FAQ answer 1.' }, // CHANGE THESE
    { question: 'Your FAQ question 2?', answer: 'Your FAQ answer 2.' },
    { question: 'Your FAQ question 3?', answer: 'Your FAQ answer 3.' },
    { question: 'Your FAQ question 4?', answer: 'Your FAQ answer 4.' }
  ],
  openGraph: {
    title: 'Your Blog Title Here', // CHANGE THIS
    description: 'Your meta description here...', // CHANGE THIS
    image: 'https://moneycal.in/images/blogs/your-image.jpg', // CHANGE THIS
    url: 'https://moneycal.in/blog/your-blog-slug-here', // CHANGE THIS
    type: 'article',
    siteName: 'Moneycal.in'
  },
  discoverOptimized: {
    highQualityImages: true,
    originalReporting: true,
    expertiseSignals: true,
    freshContent: true
  }
};

// Get related blog posts from blogData1 for internal linking
export const relatedBlogPosts = blogPosts.filter(post => 
  post.categories?.some(cat => 
    blogTemplate.categories.includes(cat)
  )
).slice(0, 3);

export default blogTemplate; 