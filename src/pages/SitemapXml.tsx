import React, { useEffect } from 'react';
import { calculatorCategories } from '../data/calculatorData';
import { optimizedBlogPosts } from '../data/optimizedBlogPosts';
import SEOHelmet from '../components/SEOHelmet';

export const SitemapXml: React.FC = () => {
  // Get all calculator URLs
  const calculatorUrls = calculatorCategories.flatMap(category =>
    category.calculators.map(calculator => ({
      url: `https://moneycal.in/calculators/${calculator.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  );
  
  // Get all blog post URLs
  const blogUrls = optimizedBlogPosts.map(post => ({
    url: post.canonicalUrl,
    lastModified: post.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));
      
      // Static pages
      const staticPages = [
    {
      url: 'https://moneycal.in/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: 'https://moneycal.in/calculators',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    },
    {
      url: 'https://moneycal.in/blog',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: 'https://moneycal.in/government-schemes',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: 'https://moneycal.in/crypto',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.7
    },
    {
      url: 'https://moneycal.in/astro-finance',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: 'https://moneycal.in/excel-tools',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: 'https://moneycal.in/news-reel',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.7
    },
    {
      url: 'https://moneycal.in/about-us',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: 'https://moneycal.in/contact-us',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: 'https://moneycal.in/privacy-policy',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.3
    },
    {
      url: 'https://moneycal.in/terms-and-conditions',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.3
    }
  ];
  
  // Category pages
  const categoryPages = calculatorCategories.map(category => ({
    url: `https://moneycal.in/category/${category.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }));
  
  // Combine all URLs
  const allUrls = [...staticPages, ...categoryPages, ...calculatorUrls, ...blogUrls];
  
  // Generate XML sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Set content type header
  useEffect(() => {
    document.title = 'Sitemap - FinanceGurus';
  }, []);
  
  return (
    <>
      <SEOHelmet
        title="XML Sitemap - FinanceGurus Directory"
        description="Complete XML sitemap for FinanceGurus Directory. Find all financial calculators, blog posts, government schemes, and tools."
        url="/sitemap.xml"
        noIndex={true}
      />
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-6">XML Sitemap</h1>
            <p className="text-lg text-neutral-600 mb-8">
              This is the XML sitemap for FinanceGurus. It contains all the important pages and calculators on our website.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">
                <strong>Total URLs:</strong> {allUrls.length} | 
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-3">Static Pages</h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Home Page</li>
                  <li>• Calculator Pages</li>
                  <li>• Blog Posts</li>
                  <li>• Government Schemes</li>
                  <li>• About Us</li>
                  <li>• Contact Us</li>
                </ul>
              </div>
              
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-3">Dynamic Content</h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• {calculatorUrls.length} Financial Calculators</li>
                  <li>• {blogUrls.length} Blog Posts</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">SEO Benefits</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Helps search engines discover and index all your pages</li>
                <li>• Improves crawl efficiency and indexing speed</li>
                <li>• Provides priority and change frequency information</li>
                <li>• Supports multiple content types (news, images, videos)</li>
                <li>• Optimized for Google Search Console monitoring</li>
              </ul>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-neutral-600 mb-4">
                The sitemap.xml file has been automatically downloaded to your device.
              </p>
              <p className="text-sm text-neutral-500">
                Upload this file to your web server root directory and submit to Google Search Console for optimal SEO performance.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
        <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Raw XML Sitemap</h2>
        </div>
        <div className="p-6">
          <pre className="text-xs text-neutral-700 overflow-x-auto bg-neutral-50 p-4 rounded-lg">
            <code>{sitemapXml}</code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default SitemapXml;