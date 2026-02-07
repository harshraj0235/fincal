import dynamic from 'next/dynamic';
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

/** SSG/ISR: pre-generate ALL news, ALL tools at build time. Blog is handled by app/blog and app/blog/[slug]. */
export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

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

  // Key static pages (about-us, contact-us, blog have dedicated routes but catch-all still needed for other slugs)
  const staticPaths = [
    ['learn'],
    ['tools'],
    ['insurance-tools'],
    ['loan-tools'],
    ['bank-tools'],
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
  return <App pathname={pathname} skipLayout />;
}
