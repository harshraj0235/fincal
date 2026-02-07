import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../App'), { ssr: false });

/** ISR: revalidate home every hour */
export const revalidate = 3600;

const BASE = 'https://moneycal.in';
export const metadata: Metadata = {
  title: 'MoneyCal India - Top Financial Calculators & Tools | EMI, SIP, Tax',
  description: "India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users.",
  openGraph: {
    title: 'MoneyCal India - Top Financial Calculators & Tools',
    description: "India's most comprehensive financial calculator platform.",
    url: BASE,
    siteName: 'MoneyCal India',
    images: [{ url: `${BASE}/android-chrome-512x512.png`, width: 512, height: 512 }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyCal India - Top Financial Calculators & Tools',
    description: "India's most comprehensive financial calculator platform.",
    images: [`${BASE}/android-chrome-512x512.png`],
  },
  alternates: { canonical: BASE + '/' },
};

export default function HomePage() {
  return <App pathname="/" skipLayout />;
}
