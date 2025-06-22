import React, { useEffect } from 'react';
import { calculatorCategories } from '../data/calculatorData';
import { blogPosts } from '../data/blogData';
import { excelToolBlogPosts } from '../data/exceltooldata';
import { governmentSchemes } from '../data/governmentSchemesData';
import SEOHelmet from '../components/SEOHelmet';

export const SitemapXml: React.FC = () => {
  useEffect(() => {
    // Generate XML sitemap
    const generateSitemap = () => {
      const baseUrl = 'https://financegurus.directory';
      const currentDate = new Date().toISOString();
      
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
      
      // Home page
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>1.0</priority>\n`;
      xml += `  </url>\n`;
      
      // Static pages
      const staticPages = [
        { url: '/blog', priority: '0.9', changefreq: 'daily' },
        { url: '/government-schemes', priority: '0.9', changefreq: 'weekly' },
        { url: '/exceltool', priority: '0.8', changefreq: 'weekly' },
        { url: '/about-us', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact-us', priority: '0.7', changefreq: 'monthly' },
        { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
        { url: '/terms-and-conditions', priority: '0.5', changefreq: 'yearly' },
        { url: '/sitemap', priority: '0.5', changefreq: 'monthly' }
      ];
      
      staticPages.forEach(page => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `  </url>\n`;
      });
      
      // Calculator pages
      calculatorCategories.forEach(category => {
        category.calculators.forEach(calculator => {
          xml += `  <url>\n`;
          xml += `    <loc>${baseUrl}/calculators/${calculator.id}</loc>\n`;
          xml += `    <lastmod>${currentDate}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.8</priority>\n`;
          xml += `  </url>\n`;
        });
      });
      
      // Blog posts
      blogPosts.forEach(post => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
      
      // Excel tool blog posts
      excelToolBlogPosts.forEach(post => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/exceltool/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
      
      // Government schemes
      governmentSchemes.forEach(scheme => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/government-schemes/${scheme.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });
      
      xml += '</urlset>';
      
      // Set content type and return XML
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Download the sitemap
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    
    generateSitemap();
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
            <h1 className="text-3xl font-bold text-neutral-900 mb-6">XML Sitemap Generated</h1>
            <p className="text-lg text-neutral-600 mb-8">
              Your comprehensive XML sitemap has been generated and downloaded. This sitemap includes:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-3">Static Pages</h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Home Page</li>
                  <li>• Blog</li>
                  <li>• Government Schemes</li>
                  <li>• Excel Tools</li>
                  <li>• About Us</li>
                  <li>• Contact Us</li>
                </ul>
              </div>
              
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-3">Dynamic Content</h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• {calculatorCategories.reduce((total, cat) => total + cat.calculators.length, 0)} Financial Calculators</li>
                  <li>• {blogPosts.length} Blog Posts</li>
                  <li>• {excelToolBlogPosts.length} Excel Tool Posts</li>
                  <li>• {governmentSchemes.length} Government Schemes</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">SEO Benefits</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Improved search engine crawling and indexing</li>
                <li>• Better visibility for all pages</li>
                <li>• Faster discovery of new content</li>
                <li>• Enhanced site structure understanding</li>
                <li>• Priority-based crawling instructions</li>
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
    </>
  );
};

export default SitemapXml;