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
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
      xml += '</urlset>';
    };
    generateSitemap();
  }, []);
  return null;
};
