import dynamic from 'next/dynamic';
import { allBlogPosts } from '../data/allBlogData';
import { contentRegistry } from '../cms-content/contentRegistry';
import { taxToolSlugs, financeToolSlugs, gstToolSlugs } from '../data/nextStaticPaths';

const App = dynamic(() => import('../App'), { ssr: false });

interface PageProps {
  params: { slug?: string[] };
}

/** ISR: revalidate these pages periodically (seconds). */
export const revalidate = 3600;

/** Allow paths not in generateStaticParams to be generated on-demand (Google can crawl them). */
export const dynamicParams = true;

/** SSG/ISR: pre-generate ALL blog, ALL news, ALL tools at build time. */
export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  // ALL blog
  params.push({ slug: ['blog'] });
  allBlogPosts.forEach((p: { slug?: string }) => {
    if (p.slug) params.push({ slug: ['blog', p.slug] });
  });

  // ALL news
  params.push({ slug: ['news'] });
  params.push({ slug: ['news', 'shorts'] });
  contentRegistry.forEach((a) => {
    params.push({ slug: ['news', a.category, a.slug] });
  });

  // ALL tax-tools
  params.push({ slug: ['tax-tools'] });
  taxToolSlugs.forEach((s) => params.push({ slug: ['tax-tools', s] }));

  // ALL finance-tools
  params.push({ slug: ['finance-tools'] });
  financeToolSlugs.forEach((s) => params.push({ slug: ['finance-tools', s] }));

  // ALL gst-tools
  params.push({ slug: ['gst-tools'] });
  gstToolSlugs.forEach((s) => params.push({ slug: ['gst-tools', s] }));

  // Calculator paths are SSG via app/calculators/[id]/page.tsx

  // Key static pages
  const staticPaths = [
    ['learn'],
    ['tools'],
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
    ['calculators'],
  ];
  staticPaths.forEach((s) => params.push({ slug: s }));

  return params;
}

export default function CatchAllPage({ params }: PageProps) {
  const pathname = '/' + (params.slug || []).join('/');
  return <App pathname={pathname} />;
}
