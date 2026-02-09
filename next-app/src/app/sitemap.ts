import type { MetadataRoute } from 'next';
import { calculatorCategories } from '../data/calculatorData';
import { allBlogPosts } from '../data/allBlogData';
import { contentRegistry } from '../cms-content/contentRegistry';
import { taxToolSlugs, financeToolSlugs, gstToolSlugs } from '../data/nextStaticPaths';

const BASE = 'https://moneycal.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split('T')[0];
  const entries: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/calculators`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/tax-tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/finance-tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/disclaimer`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  allBlogPosts.forEach((p: { slug?: string }) => {
    if (p.slug) entries.push({ url: `${BASE}/blog/${p.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
  });

  contentRegistry.forEach((a) => {
    entries.push({ url: `${BASE}/news/${a.category}/${a.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
  });

  calculatorCategories.forEach((cat) => {
    cat.calculators.forEach((calc) => {
      entries.push({ url: `${BASE}/calculators/${calc.id}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 });
    });
  });

  taxToolSlugs.forEach((s) => entries.push({ url: `${BASE}/tax-tools/${s}`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 }));
  financeToolSlugs.forEach((s) => entries.push({ url: `${BASE}/finance-tools/${s}`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 }));
  gstToolSlugs.forEach((s) => entries.push({ url: `${BASE}/gst-tools/${s}`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 }));

  return entries;
}
