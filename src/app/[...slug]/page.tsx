import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { contentRegistry } from '../cms-content/contentRegistry';
import { taxToolSlugs, financeToolSlugs, gstToolSlugs } from '../data/nextStaticPaths';

const App = dynamic(() => import('../App'));

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

/** Server-rendered intro text for key segments (in first HTML for Google). */
const SEGMENT_INTROS: Record<string, { heading: string; body: string }> = {
  learn: {
    heading: 'Learn',
    body: 'Free guides on personal finance, loans, insurance, investing, tax, and money management for India. Build your financial literacy with practical lessons and calculators.',
  },
  tools: {
    heading: 'Tools',
    body: 'Free business and productivity tools: EMI affordability, discount calculator, product comparison, time zone converter, and more. No sign-up required.',
  },
  news: {
    heading: 'News',
    body: 'Latest news and short updates on economy, markets, startups, and personal finance. Bite-sized reads for busy readers.',
  },
  calculators: {
    heading: 'Calculators',
    body: 'Free online calculators for EMI, SIP, tax, PPF, NPS, loans, insurance, and more. Built for Indian users with accurate formulas and export options.',
  },
  'tax-tools': {
    heading: 'Tax Tools',
    body: 'Income tax, TDS, capital gains, and tax planning tools for individuals and salaried users in India. Estimate tax and plan investments.',
  },
  'finance-tools': {
    heading: 'Finance Tools',
    body: 'Mutual fund analysis, SIP vs lumpsum, expense ratio impact, portfolio tools, and investment calculators for better financial decisions.',
  },
  'gst-tools': {
    heading: 'GST Tools',
    body: 'GST calculators, rate finders, invoice helpers, and compliance tools for businesses and taxpayers in India.',
  },
  'insurance-tools': {
    heading: 'Insurance Tools',
    body: 'Term insurance, health insurance, and life insurance calculators. Compare premiums and plan your cover with free online tools.',
  },
  'loan-tools': {
    heading: 'Loan Tools',
    body: 'Loan calculators, EMI comparison, prepayment and refinance tools. Plan home loans, personal loans, and vehicle loans.',
  },
  'government-schemes': {
    heading: 'Government Schemes',
    body: 'Guides and calculators for PPF, NPS, Sukanya Samriddhi, and other government savings and pension schemes in India.',
  },
  crypto: {
    heading: 'Crypto',
    body: 'Cryptocurrency basics, tax implications, and resources for Indian investors. Educational content and tools.',
  },
  'astro-finance': {
    heading: 'Astro Finance',
    body: 'Astrology and finance: horoscope-based tips, muhurat calculators, and zodiac savings guides. For entertainment and planning.',
  },
};

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
  const slug = params.slug ?? [];
  const pathname = '/' + slug.join('/');
  const firstSegment = slug[0];
  const intro = firstSegment ? SEGMENT_INTROS[firstSegment] : null;

  return (
    <>
      {intro && (
        <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Introduction">
          <h1 className="text-2xl font-bold text-gray-900">{intro.heading}</h1>
          <p className="text-gray-700 mt-2">{intro.body}</p>
        </main>
      )}
      <App pathname={pathname} skipLayout />
    </>
  );
}
