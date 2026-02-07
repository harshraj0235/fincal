import type { MetadataRoute } from 'next';

const BASE = 'https://moneycal.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/private/', '/api/', '/blog/write', '/hi/'] },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: [
      `${BASE}/sitemap.xml`,
      `${BASE}/sitemap-calculators.xml`,
      `${BASE}/sitemap-learn.xml`,
      `${BASE}/sitemap-blog.xml`,
      `${BASE}/sitemap-news.xml`,
      `${BASE}/sitemap-tax-tools.xml`,
      `${BASE}/sitemap-finance-tools.xml`,
      `${BASE}/sitemap-pages.xml`,
    ],
  };
}
