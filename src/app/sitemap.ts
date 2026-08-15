import { MetadataRoute } from 'next';
import { calculatorCategories } from '@/data/calculatorData';
import { discoverMetadata } from '@/data/discover/metadata';

const BASE_URL = 'https://moneycal.in';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static Routes
  const staticRoutes = [
    '',
    '/calculators',
    '/tools',
    '/finance-tools',
    '/tax-tools',
    '/gst-tools',
    '/ipo',
    '/gold-rate',
    '/silver-rate',
    '/learn',
    '/blog',
    '/news',
    '/discover',
    '/games',
    '/government-schemes'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Calculators & Tools
  const calculatorRoutes = calculatorCategories.flatMap((cat) =>
    cat.calculators.map((calc) => {
      const urlPath = calc.url || `/calculators/${calc.id}`;
      return {
        url: `${BASE_URL}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    })
  );

  // Discover Articles
  const discoverRoutes = discoverMetadata.map((article) => ({
    url: `${BASE_URL}/discover/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...calculatorRoutes, ...discoverRoutes];
}
