import type { Metadata } from 'next';
import AppShell from '../AppShell';

const BASE = 'https://moneycal.in';
const OG_IMAGE = `${BASE}/android-chrome-512x512.png`;
export const metadata: Metadata = {
  title: 'MoneyCal.in – Free Tax, Gold, GST & Finance Calculators | 200+ Tools India',
  description: "India's #1 financial tools hub. Free EMI, SIP, Income Tax, GST, Gold, PPF, FD calculators. Tax tools, loan tools, festival tools. Easy to find any calculator – user & Google friendly.",
  openGraph: {
    type: 'website',
    title: 'MoneyCal.in – Free Tax, Gold, GST & Finance Calculators | 200+ Tools India',
    description: "India's #1 financial tools hub. Free calculators and 200+ tools for India.",
    url: BASE,
    siteName: 'MoneyCal India',
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: 'MoneyCal India' }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyCal.in – Free Tax, Gold, GST & Finance Calculators | 200+ Tools India',
    description: "India's #1 financial tools hub.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: `${BASE}/` },
};

/** Home: full content from HomeInvestopedia (hero, search, categories, calculators, tools, resources). */
export default function HomePage() {
  return <AppShell pathname="/" />;
}
