import dynamic from 'next/dynamic';
import { calculatorCategories } from '../data/calculatorData';
import { allBlogPosts } from '../data/allBlogData';
import { contentRegistry } from '../cms-content/contentRegistry';

const App = dynamic(() => import('../App'), { ssr: false });

interface PageProps {
  params: { slug?: string[] };
}

/** ISR: revalidate these pages periodically (seconds). */
export const revalidate = 3600;

/** Allow paths not in generateStaticParams to be generated on-demand (Google can crawl them). */
export const dynamicParams = true;

/** SSG: pre-generate key paths at build time. */
export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  // Blog list and top blog slugs
  params.push({ slug: ['blog'] });
  allBlogPosts.slice(0, 100).forEach((p: { slug?: string }) => {
    if (p.slug) params.push({ slug: ['blog', p.slug] });
  });

  // News list and top news (category/slug)
  params.push({ slug: ['news'] });
  params.push({ slug: ['news', 'shorts'] });
  contentRegistry.slice(0, 80).forEach((a) => {
    params.push({ slug: ['news', a.category, a.slug] });
  });

  // All calculator paths
  calculatorCategories.forEach((cat) => {
    cat.calculators.forEach((calc) => {
      params.push({ slug: ['calculators', calc.id] });
    });
  });

  // Key static pages (Google-friendly)
  const staticPaths = [
    ['learn'],
    ['tax-tools'],
    ['finance-tools'],
    ['tools'],
    ['gst-tools'],
    ['insurance-tools'],
    ['loan-tools'],
    ['bank-tools'],
    ['about-us'],
    ['contact-us'],
    ['privacy-policy'],
    ['disclaimer'],
    ['cookie-policy'],
    ['terms-of-service'],
    ['editorial-policy'],
    ['government-schemes'],
    ['crypto'],
    ['astro-finance'],
  ];
  staticPaths.forEach((s) => params.push({ slug: s }));

  return params;
}

export default function CatchAllPage({ params }: PageProps) {
  const pathname = '/' + (params.slug || []).join('/');
  return <App pathname={pathname} />;
}
