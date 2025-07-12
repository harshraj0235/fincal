import { blogPosts } from '../blogData1';

const blog653 = {
  id: 653,
  slug: 'test-auto-update-feature-demo',
  title: 'Test Blog: Auto-Update Date Feature Demo',
  author: 'Test Author',
  authorTitle: 'Test Author Title',
  authorImage: 'https://moneycal.in/images/authors/test-author.jpg',
  authorBio: 'This is a test blog to demonstrate the auto-update date feature.',
  metaDescription: 'Test blog to demonstrate the auto-update date feature that keeps content fresh for Google.',
  excerpt: 'This is a test blog post to demonstrate how the auto-update date feature works.',
  categories: ['Test', 'Demo', 'Feature'],
  keywords: ['test', 'demo', 'auto-update', 'feature'],
  date: '2025-01-20', // This old date will be auto-updated to current date
  coverImage: 'https://moneycal.in/images/blogs/test-blog.jpg',
  content: [
    { type: 'heading', content: 'Test Blog: Auto-Update Date Feature Demo' },
    { type: 'paragraph', content: 'This is a test blog post to demonstrate the auto-update date feature. The original date was set to 2025-01-20, but it will automatically update to the current date every 2 days to keep the content fresh for Google.' },
    { type: 'heading', content: 'How Auto-Update Works' },
    { type: 'paragraph', content: 'The system automatically checks if a blog post is older than 2 days. If it is, the date field gets updated to the current date, making the content appear fresh to Google and improving SEO rankings.' },
    { type: 'list', items: [
      'Original date: 2025-01-20',
      'Auto-update threshold: 2 days',
      'Current date will be applied if older than 2 days',
      'This helps with Google freshness signals'
    ] },
    { type: 'paragraph', content: 'This feature ensures that your blog content always appears fresh to search engines, which can help improve your rankings and visibility.' }
  ],
  featuredImage: 'https://moneycal.in/images/blogs/test-blog.jpg',
  videoUrl: '',
  publishedDate: new Date('2025-01-20').toISOString(),
  lastModified: new Date('2025-01-20').toISOString(),
  readingTime: 2,
  schema: {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": 'Test Blog: Auto-Update Date Feature Demo',
    "image": [
      'https://moneycal.in/images/blogs/test-blog.jpg'
    ],
    "datePublished": new Date('2025-01-20').toISOString(),
    "dateModified": new Date('2025-01-20').toISOString(),
    "author": {
      "@type": "Person",
      "name": 'Test Author',
      "url": 'https://www.linkedin.com/in/test-author/'
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moneycal.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moneycal.in/images/logo.png"
      }
    },
    "mainEntityOfPage": 'https://moneycal.in/blog/test-auto-update-feature-demo',
    "articleSection": 'Test, Demo, Feature',
    "keywords": 'test, demo, auto-update, feature',
    "wordCount": 200,
    "timeRequired": "PT2M",
    "inLanguage": "en-IN",
    "isAccessibleForFree": true
  },
  faqSchema: [
    { question: 'What is this test blog for?', answer: 'This is a test blog to demonstrate the auto-update date feature.' },
    { question: 'How does auto-update work?', answer: 'The system automatically updates blog dates every 2 days to keep content fresh for Google.' }
  ],
  openGraph: {
    title: 'Test Blog: Auto-Update Date Feature Demo',
    description: 'Test blog to demonstrate the auto-update date feature that keeps content fresh for Google.',
    image: 'https://moneycal.in/images/blogs/test-blog.jpg',
    url: 'https://moneycal.in/blog/test-auto-update-feature-demo',
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
    blog653.categories.includes(cat)
  )
).slice(0, 3);

export default blog653; 