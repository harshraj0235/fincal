import type { Metadata } from 'next';
import AppShell from '../AppShell';

/** force-dynamic – React Router context null during prerender */
export const dynamic = 'force-dynamic';

const BASE = 'https://moneycal.in';
const OG_IMAGE = `${BASE}/android-chrome-512x512.png`;
export const metadata: Metadata = {
  title: 'MoneyCal India - Top Financial Calculators & Tools | EMI, SIP, Tax',
  description: "India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users.",
  openGraph: {
    type: 'website',
    title: 'MoneyCal India - Top Financial Calculators & Tools',
    description: "India's most comprehensive financial calculator platform.",
    url: BASE,
    siteName: 'MoneyCal India',
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: 'MoneyCal India' }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyCal India - Top Financial Calculators & Tools',
    description: "India's most comprehensive financial calculator platform.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: `${BASE}/` },
};

export default function HomePage() {
  return (
    <>
      <main className="container mx-auto px-4 py-6 max-w-4xl" aria-label="Introduction">
        <h1 className="text-2xl font-bold text-gray-900">
          MoneyCal India – Top Financial Calculators &amp; Tools
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          India&apos;s most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more.
        </p>
        <p className="text-gray-600">
          Use our free calculators for loans, investments, tax, GST, insurance, and personal finance—no sign-up required.
        </p>
      </main>
      <AppShell pathname="/" skipLayout />
    </>
  );
}
