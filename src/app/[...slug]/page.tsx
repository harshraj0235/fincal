import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { contentRegistry } from '../cms-content/contentRegistry';
import { taxToolSlugs, financeToolSlugs, gstToolSlugs } from '../data/nextStaticPaths';

const App = dynamic(() => import('../App'), { ssr: false });

const BASE = 'https://moneycal.in';
const DEFAULT_IMAGE = `${BASE}/android-chrome-512x512.png`;

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

/** Title/description for common path segments (link previews). */
function getTitleForSlug(slug: string[]): string {
  if (slug.length === 0) return 'MoneyCal India – Financial Calculators & Tools';
  const [first, ...rest] = slug;
  const segmentTitles: Record<string, string> = {
    news: 'News',
    shorts: 'Shorts',
    'tax-tools': 'Tax Tools',
    'finance-tools': 'Finance Tools',
    'gst-tools': 'GST Tools',
    learn: 'Learn',
    tools: 'Tools',
    'insurance-tools': 'Insurance Tools',
    'loan-tools': 'Loan Tools',
    'bank-tools': 'Bank Tools',
    'privacy-policy': 'Privacy Policy',
    disclaimer: 'Disclaimer',
    'cookie-policy': 'Cookie Policy',
    'terms-of-service': 'Terms of Service',
    'editorial-policy': 'Editorial Policy',
    'government-schemes': 'Government Schemes',
    crypto: 'Crypto',
    'astro-finance': 'Astro Finance',
    calculators: 'Calculators',
  };
  const base = segmentTitles[first] || first;
  if (rest.length === 0) return `${base} | MoneyCal India`;
  const sub = rest.join(' ');
  return `${base} – ${sub} | MoneyCal India`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug ?? [];
  const pathname = '/' + slug.join('/');
  const url = BASE + pathname;
  const title = getTitleForSlug(slug);
  const description = 'Free financial calculators and tools for India. EMI, SIP, tax, loans, investments, and more.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'MoneyCal India',
      images: [{ url: DEFAULT_IMAGE, width: 512, height: 512 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_IMAGE],
    },
    alternates: { canonical: url },
  };
}

export default function CatchAllPage({ params }: PageProps) {
  const pathname = '/' + (params.slug || []).join('/');
  return <App pathname={pathname} skipLayout />;
}
