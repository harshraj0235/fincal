import type { Metadata } from 'next';
import AppShell from '../../AppShell';

/** force-dynamic – AppShell/App uses useSearchParams which needs Suspense during prerender */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us | MoneyCal India – Free Financial Calculators & Tools',
  description: 'MoneyCal provides free EMI, SIP, tax, and loan calculators for India. Learn about our mission and how we help you plan your finances.',
  openGraph: {
    type: 'website',
    title: 'About Us | MoneyCal India',
    description: 'Free financial calculators and tools for India. EMI, SIP, tax, loans, and more.',
    url: 'https://moneycal.in/about-us',
    siteName: 'MoneyCal India',
    images: [{ url: 'https://moneycal.in/android-chrome-512x512.png', width: 512, height: 512, alt: 'MoneyCal India' }],
  },
  twitter: { card: 'summary_large_image', title: 'About Us | MoneyCal India', description: 'Free financial calculators and tools for India.', images: ['https://moneycal.in/android-chrome-512x512.png'] },
  alternates: { canonical: 'https://moneycal.in/about-us' },
};

export default function AboutUsPage() {
  return (
    <main id="main" role="main">
      <header className="container mx-auto px-4 pt-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">About MoneyCal India</h1>
      </header>
      <section className="container mx-auto px-4 py-4 max-w-4xl" aria-label="About us">
        <p className="text-gray-700 mb-4">
          MoneyCal India offers free online financial calculators and tools for Indian users: EMI, SIP, income tax, PPF, FD, and loan calculators. Our goal is to help you plan your finances with accurate, easy-to-use tools and clear guides.
        </p>
        <p className="text-gray-700">
          For queries or feedback, visit our <a href="/contact-us" className="text-blue-600 hover:underline">Contact</a> page. Read our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</a>.
        </p>
      </section>
      <AppShell pathname="/about-us" skipLayout />
    </main>
  );
}
