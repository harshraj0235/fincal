import React, { useEffect, useState } from 'react';
import { calculatorCategories } from '../data/calculatorData';
import { loadBlogData } from '../data/lazyBlogData';
import { loadGovSchemesData } from '../data/lazyGovSchemesData';
import { loadCryptoData } from '../data/lazyCryptoData';
import { excelTools } from '../data/excelToolsData';
import { excelToolBlogPosts } from '../data/exceltooldata';
import { festivalList } from '../data/festivalTools';
import { goldTools } from '../data/goldTools';
import { gkCategories } from '../data/gkData';
import { contentRegistry } from '../cms-content/contentRegistry';
import { investingLessons } from '../data/learn/investingLessons';
import { taxationLessons } from '../data/learn/taxationLessons';
import { fintechLessons } from '../data/learn/fintechLessons';
import { moneyManagementLessons } from '../data/learn/moneyManagementLessons';
import { savingsBankLessons } from '../data/learn/savingsBankLessons';
import { insuranceRetirementLessons } from '../data/learn/insuranceRetirementLessons';
import { businessFinanceLessons } from '../data/learn/businessFinanceLessons';
import { advancedFinanceLessons } from '../data/learn/advancedFinanceLessons';
import { behaviouralFinanceLessons } from '../data/learn/behaviouralFinanceLessons';
import { loanBasicsLessons, homeLoansLessons, personalLoansLessons } from '../data/learn/loansLessons';
import { allIpoData } from '../services/ipoApi';

export const SitemapXml: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSitemap = async () => {
      let allBlogPosts: any[] = [];
      let governmentSchemes: any[] = [];
      let cryptoArticles: any[] = [];

      try {
        const [blogData, schemeData, cryptoData] = await Promise.all([
          loadBlogData(),
          loadGovSchemesData(),
          loadCryptoData()
        ]);
        allBlogPosts = blogData;
        governmentSchemes = schemeData.schemes;
        cryptoArticles = cryptoData;
      } catch (error) {
        console.error("Error loading data for SitemapXml:", error);
      } finally {
        setLoading(false);
      }

      const baseUrl = 'https://moneycal.in';
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
        { url: '/excel-tools', priority: '0.8', changefreq: 'weekly' }, // Changed from /exceltool
        { url: '/about-us', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact-us', priority: '0.7', changefreq: 'monthly' },
        { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
        { url: '/terms-and-conditions', priority: '0.5', changefreq: 'yearly' },
        { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' }, // Added explicit terms-of-service
        { url: '/disclaimer', priority: '0.5', changefreq: 'yearly' },
        { url: '/cookie-policy', priority: '0.5', changefreq: 'yearly' },
        { url: '/editorial-policy', priority: '0.5', changefreq: 'yearly' },
        { url: '/sitemap', priority: '0.5', changefreq: 'monthly' },
        { url: '/financial-education', priority: '0.8', changefreq: 'weekly' },
        { url: '/tools/promo-designer', priority: '0.6', changefreq: 'monthly' }
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

      // Blog posts (including dynamic blogs from src/data/blogs)
      allBlogPosts.forEach(post => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.lastModified || post.publishedDate || post.date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      // Excel tool blog posts
      excelToolBlogPosts.forEach(post => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/excel-tools/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      // Excel Tools
      excelTools.forEach(tool => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/excel-tools/${tool.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      // Government schemes
      governmentSchemes.forEach(scheme => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/government-schemes/${scheme.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      // Crypto Articles
      cryptoArticles.forEach(article => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/crypto/${article.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      // News Articles
      contentRegistry.forEach(post => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/news/${post.category}/${post.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      // IPO Articles - Added for full SEO coverage
      allIpoData.forEach(ipo => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/ipo/${ipo.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.9</priority>\n`;
        xml += `  </url>\n`;
      });

      // GK Section
      gkCategories.forEach(category => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/gk/${category.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;

        category.topics.forEach(topic => {
          xml += `  <url>\n`;
          xml += `    <loc>${baseUrl}/gk/${category.slug}/${topic.slug}</loc>\n`;
          xml += `    <lastmod>${currentDate}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.6</priority>\n`;
          xml += `  </url>\n`;
        });
      });

      // Learning Lessons
      const allLessons = [
        ...investingLessons.map(l => ({ slug: l.slug, cat: 'investing-wealth' })),
        ...taxationLessons.map(l => ({ slug: l.slug, cat: 'taxation-compliance' })),
        ...fintechLessons.map(l => ({ slug: l.slug, cat: 'fintech-digital-payments' })),
        ...moneyManagementLessons.map(l => ({ slug: l.slug, cat: 'money-management' })),
        ...savingsBankLessons.map(l => ({ slug: l.slug, cat: 'savings-bank-products' })),
        ...insuranceRetirementLessons.map(l => ({ slug: l.slug, cat: 'insurance-retirement' })),
        ...businessFinanceLessons.map(l => ({ slug: l.slug, cat: 'business-finance-entrepreneurship' })),
        ...advancedFinanceLessons.map(l => ({ slug: l.slug, cat: 'advanced-specialised-finance' })),
        ...behaviouralFinanceLessons.map(l => ({ slug: l.slug, cat: 'behavioural-finance-money-psychology' })),
        ...loanBasicsLessons.map(l => ({ slug: l.slug, cat: 'loans' })),
        ...homeLoansLessons.map(l => ({ slug: l.slug, cat: 'home-loans' })),
        ...personalLoansLessons.map(l => ({ slug: l.slug, cat: 'personal-loans' }))
      ];

      allLessons.forEach(lesson => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/learn/${lesson.cat}/${lesson.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      // Festival Tools
      festivalList.forEach(fest => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/festival-tools/${fest.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;

        fest.tools.forEach(tool => {
          xml += `  <url>\n`;
          xml += `    <loc>${baseUrl}/festival-tools/${fest.slug}/${tool.slug}</loc>\n`;
          xml += `    <lastmod>${currentDate}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.6</priority>\n`;
          xml += `  </url>\n`;
        });
      });

      // Gold Tools
      goldTools.forEach(tool => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/gold-tools/${tool.slug}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      // Specialized Finance & PDF Tools
      const specializedTools = [
        '/finance-tools/pdf-converters',
        '/finance-tools/pdf-converters/form16-suite',
        '/finance-tools/pdf-converters/salary-slip-pdf-to-excel',
        '/finance-tools/pdf-converters/bank-statement-pdf-to-excel',
        '/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel',
        '/finance-tools/sip-delay-loss-calculator',
        '/finance-tools/sip-step-up-planner',
        '/finance-tools/lumpsum-vs-sip-analyzer',
        '/finance-tools/real-vs-nominal-return-calculator',
        '/finance-tools/fd-vs-mutual-fund-return-tool',
        '/finance-tools/stock-cagr-calculator',
        '/finance-tools/portfolio-diversification-visualizer',
        '/finance-tools/dividend-tracker',
        '/finance-tools/xirr-calculator',
        '/finance-tools/mutual-fund-expense-ratio-estimator',
        '/finance-tools/nifty-vs-sensex-performance-tracker',
        '/tools/stock-analyzer',
        '/tools/mutual-fund-analyzer',
        '/tools/investment-goal-planner',
        '/tools/compound-interest-calculator',
        '/tools/monthly-budget-planner'
      ];

      specializedTools.forEach(path => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${path}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += '</urlset>';

      // Update DOM for prerendering tools that might scrape this component
      const pre = document.createElement('pre');
      pre.id = 'sitemap-xml-output';
      pre.style.display = 'none';
      pre.textContent = xml;
      document.body.appendChild(pre);

      // Also log it
      if (import.meta.env.DEV) console.log('Sitemap generated with ' + xml.split('\u003curl\u003e').length + ' URLs');
    };
    generateSitemap();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[--primary-500] mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading Sitemap XML...</p>
        </div>
      </div>
    );
  }

  return null;
};
