import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, FileText, CheckSquare, AlertTriangle, ExternalLink, Code, Copy, Check } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { blogPosts } from '../data/blogData';

export const SitemapXml: React.FC = () => {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };
  
  // Generate sitemap entries for all calculators
  const calculatorUrls = calculatorCategories.flatMap(category => 
    category.calculators.map(calculator => ({
      url: `https://moneycal.in/calculators/${calculator.id}`,
      name: calculator.name
    }))
  );
  
  // Generate sitemap entries for all blog posts
  const blogUrls = blogPosts.map(post => ({
    url: `https://moneycal.in/blog/${post.slug}`,
    name: post.title
  }));
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="mb-8 flex items-center">
        <Code className="h-8 w-8 text-primary-600 mr-3" />
        <h1 className="text-3xl font-bold text-neutral-900">XML Sitemap & Google Search Console Guide</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">What is an XML Sitemap?</h2>
          <p>
            An XML sitemap is a file that lists all the pages on your website that you want search engines to index. It helps search engines like Google discover and crawl your content more efficiently, which can improve your site's visibility in search results.
          </p>
          <p>
            Our sitemap is available at: <a href="/sitemap.xml" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">https://moneycal.in/sitemap.xml</a>
          </p>
          
          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 my-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Sample XML Sitemap Structure</h3>
              <button 
                onClick={() => handleCopy(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moneycal.in/</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://moneycal.in/calculators/emi-calculator</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                {copiedText === `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moneycal.in/</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://moneycal.in/calculators/emi-calculator</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>` ? <Check className="h-5 w-5 text-success-500" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
            <pre className="bg-neutral-800 text-neutral-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moneycal.in/</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://moneycal.in/calculators/emi-calculator</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}</code>
            </pre>
            <div className="mt-4">
              <h4 className="font-medium text-neutral-900 mb-2">XML Sitemap Elements</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700">
                <li><strong>&lt;loc&gt;</strong>: The URL of the page (must begin with the protocol, e.g., https://)</li>
                <li><strong>&lt;lastmod&gt;</strong>: The date the page was last modified (YYYY-MM-DD format)</li>
                <li><strong>&lt;changefreq&gt;</strong>: How frequently the page is likely to change (always, hourly, daily, weekly, monthly, yearly, never)</li>
                <li><strong>&lt;priority&gt;</strong>: The relative importance of the URL compared to other URLs (0.0 to 1.0, with 1.0 being most important)</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Our Complete Sitemap Structure</h2>
          <p>
            Our XML sitemap includes all important pages from our website, organized into the following sections:
          </p>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Main Pages</h3>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li>Home Page (Priority: 1.0)</li>
                <li>Blog (Priority: 0.9)</li>
                <li>About Us (Priority: 0.7)</li>
                <li>Contact Us (Priority: 0.7)</li>
                <li>Privacy Policy (Priority: 0.5)</li>
                <li>Terms and Conditions (Priority: 0.5)</li>
                <li>Sitemap (Priority: 0.5)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Blog Posts ({blogUrls.length} entries)</h3>
              <div className="max-h-40 overflow-y-auto bg-neutral-50 p-3 rounded-lg">
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                  {blogUrls.map((blog, index) => (
                    <li key={index}>{blog.name} (Priority: 0.8)</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Calculator Pages ({calculatorUrls.length} entries)</h3>
              <div className="max-h-40 overflow-y-auto bg-neutral-50 p-3 rounded-lg">
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                  {calculatorUrls.slice(0, 10).map((calc, index) => (
                    <li key={index}>{calc.name} (Priority: 0.8)</li>
                  ))}
                  {calculatorUrls.length > 10 && (
                    <li className="text-neutral-500">...and {calculatorUrls.length - 10} more calculator pages</li>
                  )}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Blog Categories</h3>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li>Government Schemes (Priority: 0.7)</li>
                <li>Investment (Priority: 0.7)</li>
                <li>Tax Planning (Priority: 0.7)</li>
                <li>Retirement Planning (Priority: 0.7)</li>
                <li>Financial Inclusion (Priority: 0.7)</li>
                <li>Banking (Priority: 0.7)</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Google Search Console Setup</h2>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Step 1: Verify Ownership</h3>
          <p>
            Before you can submit your sitemap, you need to verify that you own the website in Google Search Console:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Go to <a href="https://search.google.com/search-console" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Search Console</a></li>
            <li>Click "Add Property"</li>
            <li>Enter your domain (https://moneycal.in/)</li>
            <li>Choose a verification method:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>HTML file</strong>: Upload a specific file to your server</li>
                <li><strong>HTML tag</strong>: Add a meta tag to your homepage</li>
                <li><strong>DNS record</strong>: Add a TXT record to your domain's DNS settings</li>
                <li><strong>Google Analytics</strong>: Link your Google Analytics account</li>
                <li><strong>Google Tag Manager</strong>: Link your Tag Manager account</li>
              </ul>
            </li>
            <li>Follow the instructions for your chosen verification method</li>
            <li>Click "Verify"</li>
          </ol>
          
          <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 my-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-primary-900">Recommended Verification Method</h4>
              <button 
                onClick={() => handleCopy(`<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />`)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                {copiedText === `<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />` ? <Check className="h-5 w-5 text-success-500" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-sm text-primary-700 mb-3">
              For most websites, the HTML tag method is easiest. Add the provided meta tag to the <code>&lt;head&gt;</code> section of your index.html file:
            </p>
            <pre className="bg-neutral-800 text-neutral-100 p-3 rounded-md overflow-x-auto text-sm">
              <code>&lt;meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /&gt;</code>
            </pre>
            <div className="mt-4 flex items-start">
              <div className="flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-warning-500" />
              </div>
              <p className="ml-3 text-sm text-warning-700">
                Make sure to replace "YOUR_VERIFICATION_CODE" with the actual code provided by Google Search Console.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Step 2: Submit Your Sitemap</h3>
          <p>
            After verification, submit your sitemap to help Google discover and index all your pages:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>In Google Search Console, select your property</li>
            <li>In the left sidebar, click on "Sitemaps"</li>
            <li>Enter "sitemap.xml" in the "Add a new sitemap" field</li>
            <li>Click "Submit"</li>
          </ol>
          
          <div className="bg-success-50 p-6 rounded-lg border border-success-200 my-6">
            <div className="flex items-start">
              <CheckSquare className="h-5 w-5 text-success-600 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-success-900 mb-2">Successful Submission</h4>
                <p className="text-sm text-success-700">
                  After submission, Google Search Console will process your sitemap and show:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-success-700">
                  <li>The number of submitted URLs</li>
                  <li>How many URLs were indexed</li>
                  <li>Any warnings or errors</li>
                </ul>
                <p className="text-sm text-success-700 mt-2">
                  It may take a few days for Google to process all URLs in your sitemap.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Monitoring Indexing Status</h2>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">Index Coverage Report</h3>
          <p>
            The Index Coverage report in Google Search Console shows which pages have been indexed and any issues that prevent indexing:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Errors</strong>: Pages that couldn't be indexed due to critical issues</li>
            <li><strong>Valid with warnings</strong>: Pages that were indexed but have potential issues</li>
            <li><strong>Valid</strong>: Successfully indexed pages</li>
            <li><strong>Excluded</strong>: Pages intentionally not indexed (e.g., due to noindex tags)</li>
          </ul>
          
          <p>
            For MoneyCalc.in, pay special attention to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Ensuring all calculator pages are properly indexed</li>
            <li>Checking that blog posts are discovered and indexed quickly</li>
            <li>Monitoring for any crawl errors that might affect user experience</li>
          </ul>
          
          <h3 className="text-xl font-medium text-neutral-900 mt-6 mb-3">URL Inspection Tool</h3>
          <p>
            The URL Inspection tool allows you to check the indexing status of individual pages:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Enter the full URL of the page you want to check</li>
            <li>View whether the URL is indexed and any issues</li>
            <li>See how Google views the page (rendered version)</li>
            <li>Request indexing for new or updated pages</li>
          </ol>
          
          <div className="bg-warning-50 p-6 rounded-lg border border-warning-200 my-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-warning-600 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-warning-900 mb-2">Important Notes</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-warning-700">
                  <li>Google has a quota for URL inspection requests (typically a few hundred per day)</li>
                  <li>Focus on requesting indexing for your most important pages</li>
                  <li>For bulk indexing, rely on your sitemap rather than individual URL submissions</li>
                  <li>New content is typically discovered and indexed within a few days if your site is regularly crawled</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">SEO Best Practices for Indexing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Do's</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700">
                <li>Keep your sitemap up-to-date with new content</li>
                <li>Use descriptive, keyword-rich URLs</li>
                <li>Ensure all pages have unique, informative title tags and meta descriptions</li>
                <li>Create high-quality, original content</li>
                <li>Use internal linking to help search engines discover your content</li>
                <li>Optimize page loading speed</li>
                <li>Make your site mobile-friendly</li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Don'ts</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700">
                <li>Don't include non-canonical URLs in your sitemap</li>
                <li>Don't include URLs blocked by robots.txt</li>
                <li>Don't include low-quality or duplicate content</li>
                <li>Don't use intrusive interstitials that hide content</li>
                <li>Don't create doorway pages or keyword stuffing</li>
                <li>Don't use cloaking or deceptive redirects</li>
                <li>Don't have broken links or 404 errors</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Robots.txt Configuration</h2>
          <p>
            The robots.txt file tells search engines which parts of your site they can access. Here's a sample robots.txt file for MoneyCalc.in:
          </p>
          
          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 my-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-neutral-900">Sample robots.txt</h4>
              <button 
                onClick={() => handleCopy(`User-agent: *
Allow: /
Sitemap: https://moneycal.in/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /wp-admin/

# Disallow duplicate content
Disallow: /blog/category/*/page/
Disallow: /blog/tag/*/page/`)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                {copiedText === `User-agent: *
Allow: /
Sitemap: https://moneycal.in/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /wp-admin/

# Disallow duplicate content
Disallow: /blog/category/*/page/
Disallow: /blog/tag/*/page/` ? <Check className="h-5 w-5 text-success-500" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
            <pre className="bg-neutral-800 text-neutral-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`User-agent: *
Allow: /
Sitemap: https://moneycal.in/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /wp-admin/

# Disallow duplicate content
Disallow: /blog/category/*/page/
Disallow: /blog/tag/*/page/`}</code>
            </pre>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Troubleshooting Common Indexing Issues</h2>
          
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-white rounded-lg border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Pages Not Being Indexed</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                <li>Check for noindex tags or robots.txt blocking</li>
                <li>Ensure the page is linked from other pages on your site</li>
                <li>Verify the page has unique, valuable content</li>
                <li>Check for crawl errors in Google Search Console</li>
                <li>Use the URL Inspection tool to request indexing</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Sitemap Errors</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                <li>Ensure your sitemap follows the correct XML format</li>
                <li>Verify all URLs use the same protocol (http vs https)</li>
                <li>Check that all URLs in the sitemap are accessible</li>
                <li>Remove any URLs that return 404 or other error codes</li>
                <li>Keep your sitemap under the 50MB/50,000 URL limit</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Crawl Budget Optimization</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
                <li>Remove or noindex low-value pages</li>
                <li>Fix broken links and redirect chains</li>
                <li>Improve site speed and performance</li>
                <li>Use canonical tags to avoid duplicate content</li>
                <li>Implement proper pagination with rel="next" and rel="prev"</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <a 
              href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                <ExternalLink className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-neutral-900">Google's Sitemap Documentation</h3>
                <p className="text-sm text-neutral-600 mt-1">Official guide to creating and submitting sitemaps</p>
              </div>
            </a>
            
            <a 
              href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                <ExternalLink className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-neutral-900">Robots.txt Documentation</h3>
                <p className="text-sm text-neutral-600 mt-1">Learn how to control crawler access to your site</p>
              </div>
            </a>
            
            <a 
              href="https://developers.google.com/search/docs/crawling-indexing/indexing-process" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                <ExternalLink className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-neutral-900">Google's Indexing Process</h3>
                <p className="text-sm text-neutral-600 mt-1">Understanding how Google crawls and indexes websites</p>
              </div>
            </a>
            
            <a 
              href="https://search.google.com/search-console/about" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                <ExternalLink className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-neutral-900">Google Search Console</h3>
                <p className="text-sm text-neutral-600 mt-1">Tools and reports to measure your site's performance in Google Search</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 mb-8">
        <h2 className="text-xl font-semibold text-primary-900 mb-4">Our Sitemap Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-neutral-500 mb-1">Total URLs</p>
            <p className="text-2xl font-bold text-primary-900">{8 + blogUrls.length + calculatorUrls.length + 6 + 20}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-neutral-500 mb-1">Calculator Pages</p>
            <p className="text-2xl font-bold text-primary-900">{calculatorUrls.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-neutral-500 mb-1">Blog Posts</p>
            <p className="text-2xl font-bold text-primary-900">{blogUrls.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-neutral-500 mb-1">Astro-Finance Pages</p>
            <p className="text-2xl font-bold text-primary-900">20</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Need Help with SEO?</h2>
        <p className="text-neutral-600 mb-6">
          If you need assistance with optimizing your website for search engines or have questions about Google Search Console, feel free to contact our team.
        </p>
        <Link to="/contact-us" className="btn btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default SitemapXml;