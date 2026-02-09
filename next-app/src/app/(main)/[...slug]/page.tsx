import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';
import { ALL_SLUG_PARAMS } from '@/lib/staticParams.generated';

const BASE = 'https://moneycal.in';
const DEFAULT_IMAGE = `${BASE}/android-chrome-512x512.png`;

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

/** Static export: all paths pre-generated at build time. */
export async function generateStaticParams() {
  return ALL_SLUG_PARAMS;
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
  const { slug: slugArr } = await params;
  const slug = slugArr ?? [];
  const pathname = '/' + slug.join('/');
  const url = BASE + pathname;
  const title = getTitleForSlug(slug);
  const description = 'Free financial calculators and tools for India. EMI, SIP, tax, loans, investments, and more.';
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'MoneyCal India',
      images: [{ url: DEFAULT_IMAGE, width: 512, height: 512, alt: 'MoneyCal India' }],
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

export default async function CatchAllPage({ params }: PageProps) {
  const { slug: slugArr } = await params;
  const slug = slugArr ?? [];
  const pathname = '/' + slug.join('/');
  const firstSegment = slug[0];
  const intro = firstSegment ? SEGMENT_INTROS[firstSegment] : null;

  // Pre-load content for news, learn, etc. so it appears in initial HTML (SEO)
  const serverContent = getServerContentForPath(pathname);

  return (
    <>
      {intro && (
        <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Introduction">
          <h1 className="text-2xl font-bold text-gray-900">{intro.heading}</h1>
          <p className="text-gray-700 mt-2">{intro.body}</p>
        </main>
      )}
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
