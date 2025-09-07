import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';
import { blogs as newFolderBlogs } from '../data/blogs';

const allBlogPosts = [...newFolderBlogs, ...newPosts, ...oldPosts];

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface BlogSitemapData {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  lastModified: string;
}

export class SitemapGenerator {
  private baseUrl = 'https://moneycal.in';
  
  constructor(baseUrl?: string) {
    if (baseUrl) this.baseUrl = baseUrl;
  }

  /**
   * Generate XML sitemap for blog posts
   */
  generateBlogSitemap(): string {
    const urls: SitemapUrl[] = allBlogPosts.map(post => ({
      loc: `${this.baseUrl}/blog/${post.slug}`,
      lastmod: new Date(post.date).toISOString().split('T')[0],
      changefreq: 'weekly' as const,
      priority: 0.8
    }));

    return this.generateXMLSitemap(urls);
  }

  /**
   * Generate XML sitemap for main pages
   */
  generateMainSitemap(): string {
    const urls: SitemapUrl[] = [
      {
        loc: `${this.baseUrl}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily' as const,
        priority: 1.0
      },
      {
        loc: `${this.baseUrl}/tools`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      
      {
        loc: `${this.baseUrl}/blog`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily' as const,
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/calculators`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/finance-tools`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/tax-tools`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/insurance-tools`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/corporate-finance`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/festival-tools`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/about`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly' as const,
        priority: 0.6
      },
      {
        loc: `${this.baseUrl}/contact`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly' as const,
        priority: 0.5
      }
    ];

    return this.generateXMLSitemap(urls);
  }

  /**
   * Generate XML sitemap for calculator pages
   */
  generateCalculatorSitemap(): string {
    const calculatorUrls: SitemapUrl[] = [
      {
        loc: `${this.baseUrl}/calculators/emi-calculator`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/calculators/sip-calculator`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/calculators/fd-calculator`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/calculators/ppf-calculator`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/calculators/income-tax-calculator`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      }
    ];

    return this.generateXMLSitemap(calculatorUrls);
  }

  /**
   * Generate XML sitemap for insurance tools
   */
  generateInsuranceSitemap(): string {
    const tools = [
      'life-insurance-calculator',
      'health-insurance-estimator',
      'car-insurance-calculator',
      'term-insurance-planner',
      'travel-insurance-selector',
      'home-insurance-estimator',
      'two-wheeler-tracker',
      'critical-illness-calculator',
      'portfolio-dashboard',
      'ulip-calculator'
    ];
    const today = new Date().toISOString().split('T')[0];
    const urls: SitemapUrl[] = [
      {
        loc: `${this.baseUrl}/insurance-tools`,
        lastmod: today,
        changefreq: 'weekly' as const,
        priority: 0.9
      },
      ...tools.map((slug): SitemapUrl => ({
        loc: `${this.baseUrl}/insurance-tools/${slug}`,
        lastmod: today,
        changefreq: 'weekly' as const,
        priority: 0.9
      }))
    ];
    return this.generateXMLSitemap(urls);
  }

  /**
   * Generate XML sitemap for corporate finance tools
   */
  generateCorporateFinanceSitemap(): string {
    const tools = [
      'business-valuation-calculator',
      'loan-amortization-generator',
      'ma-synergy-estimator',
      'working-capital-optimizer',
      'capital-structure-analyzer',
      'break-even-calculator',
      'dividend-policy-impact-tool',
      'fx-exposure-risk-calculator',
      'cost-capital-benchmarking',
      'scenario-analysis-simulator'
    ];
    const today = new Date().toISOString().split('T')[0];
    const urls: SitemapUrl[] = [
      {
        loc: `${this.baseUrl}/corporate-finance`,
        lastmod: today,
        changefreq: 'weekly' as const,
        priority: 0.8
      },
      ...tools.map((slug): SitemapUrl => ({
        loc: `${this.baseUrl}/corporate-finance/${slug}`,
        lastmod: today,
        changefreq: 'weekly' as const,
        priority: 0.7
      }))
    ];
    return this.generateXMLSitemap(urls);
  }

  /**
   * Generate sitemap index
   */
  generateSitemapIndex(): string {
    const sitemaps = [
      {
        loc: `${this.baseUrl}/sitemap-main.xml`,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: `${this.baseUrl}/sitemap-blog.xml`,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: `${this.baseUrl}/sitemap-calculators.xml`,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: `${this.baseUrl}/sitemap-insurance.xml`,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: `${this.baseUrl}/sitemap-corporate.xml`,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        loc: `${this.baseUrl}/sitemap-gst.xml`,
        lastmod: new Date().toISOString().split('T')[0]
      }
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
  }

  /**
   * Generate RSS feed for blog
   */
  generateRSSFeed(): string {
    const latestPosts = allBlogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20);

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FinanceGurus Directory Blog</title>
    <link>${this.baseUrl}/blog</link>
    <description>Expert financial insights, tips, and guides for Indian users</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${this.baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${latestPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${this.baseUrl}/blog/${post.slug}</link>
      <guid>${this.baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.categories.join(', ')}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;
  }

  /**
   * Generate blog data for Google Discover
   */
  generateBlogDataForDiscover(): BlogSitemapData[] {
    return allBlogPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      categories: post.categories,
      lastModified: post.date
    }));
  }

  /**
   * Generate JSON-LD structured data for blog posts
   */
  generateStructuredDataForBlog(slug: string): string {
    const post = allBlogPosts.find(p => p.slug === slug);
    if (!post) return '';

    const isRecord = (obj: unknown): obj is Record<string, unknown> => {
      return obj !== null && typeof obj === 'object';
    };
    let imageUrl = `${this.baseUrl}/images/blog-default.jpg`;
    if (isRecord(post)) {
      const maybeImage = post['image'];
      if (typeof maybeImage === 'string' && maybeImage.length > 0) {
        imageUrl = maybeImage;
      }
    }
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author || "FinanceGurus Team"
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "image": imageUrl,
      "url": `${this.baseUrl}/blog/${post.slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/blog/${post.slug}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "FinanceGurus Directory",
        "url": this.baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/images/logo.png`
        }
      },
      "articleSection": post.categories.join(", "),
      "keywords": post.categories.join(", "),
      "wordCount": post.excerpt.split(' ').length + 200,
      "timeRequired": "PT5M",
      "inLanguage": "en-IN",
      "isAccessibleForFree": true,
      "isPartOf": {
        "@type": "Blog",
        "name": "FinanceGurus Directory Blog",
        "url": `${this.baseUrl}/blog`
      }
    };

    return JSON.stringify(structuredData, null, 2);
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-blog.xml
Sitemap: ${this.baseUrl}/sitemap-calculators.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow important pages
Allow: /blog/
Allow: /calculators/
Allow: /about/
Allow: /contact/

# Google Discover optimization
User-agent: Googlebot-News
Allow: /blog/
Allow: /amp-blog.html

# Mobile optimization
User-agent: *
Allow: /amp-*.html
Allow: /mobile/
`;
  }

  /**
   * Generate XML sitemap from URL array
   */
  private generateXMLSitemap(urls: SitemapUrl[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  }

  /**
   * Submit sitemap to search engines
   */
  async submitSitemapToSearchEngines(): Promise<void> {
    const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
    
    try {
      // Submit to Google
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      
      // Submit to Bing
      await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      
      console.log('Sitemap submitted to search engines successfully');
    } catch (error) {
      console.error('Error submitting sitemap:', error);
    }
  }

  /**
   * Generate all sitemap files
   */
  generateAllSitemaps(): {
    main: string;
    blog: string;
    calculators: string;
    insurance: string;
    corporate: string;
    gst: string;
    festival?: string;
    index: string;
    rss: string;
    robots: string;
  } {
    return {
      main: this.generateMainSitemap(),
      blog: this.generateBlogSitemap(),
      calculators: this.generateCalculatorSitemap(),
      insurance: this.generateInsuranceSitemap(),
      corporate: this.generateCorporateFinanceSitemap(),
      gst: this.generateGSTSitemap(),
      festival: this.generateXMLSitemap([{ loc: `${this.baseUrl}/festival-tools`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 }]),
      index: this.generateSitemapIndex(),
      rss: this.generateRSSFeed(),
      robots: this.generateRobotsTxt()
    };
  }

  /**
   * Generate XML sitemap for GST tools
   */
  generateGSTSitemap(): string {
    const gstTools = [
      'gst-calculator',
      'gst-due-date-tracker',
      'gstr-3b-preparation',
      'gst-hsn-sac-finder',
      'gst-penalty-interest-calculator',
      'gst-composition-eligibility',
      'gst-rcm-calculator',
      'gst-einvoice-qr-validator',
      'gst-itc-reconciliation',
      'gst-slab-finder',
      'gst-invoice-generator',
      'gst-eway-distance-calculator',
      'gst-liability-calculator',
      'gst-turnover-tracker',
      'gst-rate-impact-analyzer'
    ];
    const today = new Date().toISOString().split('T')[0];
    const urls: SitemapUrl[] = [
      { loc: `${this.baseUrl}/gst-tools`, lastmod: today, changefreq: 'weekly', priority: 0.8 },
      ...gstTools.map((slug): SitemapUrl => ({ loc: `${this.baseUrl}/gst-tools/${slug}`, lastmod: today, changefreq: 'weekly', priority: 0.8 }))
    ];
    return this.generateXMLSitemap(urls);
  }
}

// Export singleton instance
export const sitemapGenerator = new SitemapGenerator(); 