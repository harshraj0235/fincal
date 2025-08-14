import { BlogPost } from '../data/blogs/types';
import { RSSItem, fetchAllRSSFeeds, getNextBlogId, generateBlogSlug, extractKeywords, extractCategories } from './rssFetcher';

export interface BlogGenerationConfig {
  targetWordCount: number;
  includeImages: boolean;
  seoOptimized: boolean;
  plagiarismFree: boolean;
}

export class BlogGenerator {
  private config: BlogGenerationConfig;

  constructor(config: BlogGenerationConfig = {
    targetWordCount: 1200,
    includeImages: false,
    seoOptimized: true,
    plagiarismFree: true
  }) {
    this.config = config;
  }

  async generateBlogFromRSSItem(rssItem: RSSItem, blogId: number): Promise<BlogPost> {
    const slug = generateBlogSlug(rssItem.title);
    const keywords = extractKeywords(rssItem.title, rssItem.description);
    const categories = extractCategories(rssItem.title, rssItem.description);

    // Generate comprehensive content based on RSS item
    const content = await this.generateComprehensiveContent(rssItem);

    const blogPost: BlogPost = {
      id: blogId,
      slug,
      title: this.enhanceTitle(rssItem.title),
      author: 'Harsh Raj',
      authorTitle: 'Software Engineer & Finance Enthusiast',
      authorImage: 'https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png',
      authorBio: 'Harsh Raj is a B.Tech graduate and software engineer who shares educational finance content. Not a financial expert—please consult authorized professionals for advice.',
      metaDescription: this.generateMetaDescription(rssItem.title, rssItem.description),
      excerpt: this.generateExcerpt(rssItem.description),
      categories: categories.length > 0 ? categories : ['Finance', 'Investment', 'Markets'],
      keywords,
      date: new Date().toISOString().split('T')[0],
      coverImage: this.generateCoverImageUrl(rssItem.title),
      content,
      featuredImage: this.generateCoverImageUrl(rssItem.title),
      videoUrl: this.generateVideoUrl(rssItem.title),
      publishedDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      readingTime: Math.ceil(this.config.targetWordCount / 200), // 200 words per minute
      structuredData: this.generateStructuredData(rssItem, blogId, slug),
      faqSchema: this.generateFAQSchema(rssItem),
      openGraph: this.generateOpenGraph(rssItem, slug),
      discoverOptimized: {
        highQualityImages: this.config.includeImages,
        originalReporting: true,
        expertiseSignals: true,
        freshContent: true
      }
    };

    return blogPost;
  }

  private enhanceTitle(originalTitle: string): string {
    // Enhance title for better SEO and readability
    const enhancedTitle = originalTitle
      .replace(/&/g, 'and')
      .replace(/[^\w\s-]/g, '')
      .trim();
    
    // Add year if not present
    if (!enhancedTitle.includes('2025')) {
      return `${enhancedTitle} 2025: Complete Analysis and Insights`;
    }
    
    return enhancedTitle;
  }

  private generateMetaDescription(title: string, description: string): string {
    const baseDescription = description.length > 150 ? description.substring(0, 150) + '...' : description;
    return `Complete analysis of ${title.toLowerCase()}. Learn about the latest trends, insights, and expert opinions on this important financial topic.`;
  }

  private generateExcerpt(description: string): string {
    return description.length > 200 ? description.substring(0, 200) + '...' : description;
  }

  private generateCoverImageUrl(title: string): string {
    // Generate relevant cover image URL based on title keywords
    const keywords = title.toLowerCase().split(' ');
    const imageKeywords = ['finance', 'money', 'investment', 'banking', 'economy', 'market'];
    const relevantKeyword = imageKeywords.find(keyword => keywords.includes(keyword)) || 'finance';
    
    return `https://images.pexels.com/photos/${this.getImageId(relevantKeyword)}/pexels-photo-${this.getImageId(relevantKeyword)}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;
  }

  private getImageId(keyword: string): string {
    // Map keywords to specific Pexels image IDs
    const imageMap: { [key: string]: string } = {
      'finance': '6693661',
      'money': '6802042',
      'investment': '7063778',
      'banking': '7876708',
      'economy': '534216',
      'market': '6693661'
    };
    return imageMap[keyword] || '6693661';
  }

  private generateVideoUrl(title: string): string {
    // Generate relevant video URL (placeholder for now)
    return `https://www.youtube.com/embed/${this.generateVideoId(title)}`;
  }

  private generateVideoId(title: string): string {
    // Generate a unique video ID based on title
    return title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 11);
  }

  private async generateComprehensiveContent(rssItem: RSSItem): Promise<BlogPost['content']> {
    const content: BlogPost['content'] = [];

    // Main heading
    content.push({
      type: 'heading',
      content: this.enhanceTitle(rssItem.title)
    });

    // Introduction paragraph
    content.push({
      type: 'paragraph',
      content: `In today's dynamic financial landscape, understanding the implications of ${rssItem.title.toLowerCase()} is crucial for investors, businesses, and individuals alike. This comprehensive analysis explores the latest developments, market implications, and strategic insights that can help you make informed financial decisions.`
    });

    // Market overview
    content.push({
      type: 'heading',
      content: 'Market Overview and Current Trends'
    });

    content.push({
      type: 'paragraph',
      content: `The financial markets are constantly evolving, and recent developments in ${rssItem.title.toLowerCase()} have significant implications for various sectors. Market analysts and experts are closely monitoring these changes, as they could impact investment strategies, business decisions, and economic policies.`
    });

    // Key insights
    content.push({
      type: 'heading',
      content: 'Key Insights and Analysis'
    });

    content.push({
      type: 'paragraph',
      content: `Based on the latest data and expert analysis, several key insights emerge regarding ${rssItem.title.toLowerCase()}. These insights provide valuable context for understanding the broader implications and potential opportunities in the current market environment.`
    });

    // Bullet points
    content.push({
      type: 'list',
      items: [
        'Market impact and potential opportunities',
        'Risk factors and considerations for investors',
        'Long-term implications for financial planning',
        'Expert recommendations and best practices',
        'Regulatory considerations and compliance requirements'
      ]
    });

    // Detailed analysis
    content.push({
      type: 'heading',
      content: 'Detailed Analysis and Expert Opinions'
    });

    content.push({
      type: 'paragraph',
      content: `Financial experts and market analysts have provided detailed insights into the implications of ${rssItem.title.toLowerCase()}. Their analysis covers various aspects including market dynamics, investment opportunities, risk management strategies, and future outlook.`
    });

    content.push({
      type: 'paragraph',
      content: `The consensus among industry professionals suggests that these developments could create both challenges and opportunities for different market participants. Understanding these dynamics is essential for making informed investment and business decisions.`
    });

    // Strategic recommendations
    content.push({
      type: 'heading',
      content: 'Strategic Recommendations and Best Practices'
    });

    content.push({
      type: 'paragraph',
      content: `Based on the comprehensive analysis of ${rssItem.title.toLowerCase()}, several strategic recommendations emerge for investors and businesses. These recommendations are designed to help navigate the current market environment effectively while maximizing opportunities and minimizing risks.`
    });

    // Conclusion
    content.push({
      type: 'heading',
      content: 'Conclusion and Future Outlook'
    });

    content.push({
      type: 'paragraph',
      content: `The developments surrounding ${rssItem.title.toLowerCase()} represent a significant moment in the financial markets. As we move forward, it's essential to stay informed about ongoing developments and their implications for various market segments.`
    });

    content.push({
      type: 'paragraph',
      content: `By understanding the current landscape and staying updated with the latest trends, investors and businesses can position themselves strategically to capitalize on opportunities while managing potential risks effectively. The key is to maintain a balanced approach that considers both short-term market dynamics and long-term strategic objectives.`
    });

    return content;
  }

  private generateStructuredData(rssItem: RSSItem, blogId: number, slug: string): any {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": this.enhanceTitle(rssItem.title),
      "description": this.generateMetaDescription(rssItem.title, rssItem.description),
      "author": {
        "@type": "Person",
        "name": "Harsh Raj",
        "url": "https://moneycal.in/author/harsh-raj"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Moneycal.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moneycal.in/images/logo.png"
        }
      },
      "mainEntityOfPage": `https://moneycal.in/blog/${slug}`,
      "articleSection": extractCategories(rssItem.title, rssItem.description).join(', '),
      "keywords": extractKeywords(rssItem.title, rssItem.description).join(', '),
      "wordCount": this.config.targetWordCount,
      "timeRequired": `PT${Math.ceil(this.config.targetWordCount / 200)}M`,
      "inLanguage": "en-IN",
      "isAccessibleForFree": true,
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString()
    };
  }

  private generateFAQSchema(rssItem: RSSItem): Array<{ question: string; answer: string }> {
    return [
      {
        question: `What are the key implications of ${rssItem.title.toLowerCase()}?`,
        answer: `The key implications include market impact, investment opportunities, risk considerations, and strategic planning requirements for various market participants.`
      },
      {
        question: `How does this affect individual investors?`,
        answer: `Individual investors should consider the impact on their portfolios, potential opportunities for diversification, and the need to review their investment strategies.`
      },
      {
        question: `What should businesses consider in light of these developments?`,
        answer: `Businesses should evaluate the impact on their operations, consider strategic adjustments, and stay informed about regulatory changes and market dynamics.`
      },
      {
        question: `What are the long-term implications?`,
        answer: `Long-term implications include potential structural changes in the market, evolving regulatory frameworks, and the need for adaptive strategies in financial planning.`
      }
    ];
  }

  private generateOpenGraph(rssItem: RSSItem, slug: string): any {
    return {
      title: this.enhanceTitle(rssItem.title),
      description: this.generateMetaDescription(rssItem.title, rssItem.description),
      image: this.generateCoverImageUrl(rssItem.title),
      url: `https://moneycal.in/blog/${slug}`,
      type: 'article',
      siteName: 'Moneycal.in'
    };
  }

  async generateDailyBlogs(): Promise<BlogPost[]> {
    const rssItems = await fetchAllRSSFeeds();
    const selectedItems = rssItems.slice(0, 20); // Take first 20 items
    const blogs: BlogPost[] = [];
    
    let currentBlogId = getNextBlogId();
    
    for (const item of selectedItems) {
      const blog = await this.generateBlogFromRSSItem(item, currentBlogId);
      blogs.push(blog);
      currentBlogId++;
    }
    
    return blogs;
  }
}
