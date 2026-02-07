import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../App'), { ssr: false });

export const metadata: Metadata = {
  title: 'Blog | MoneyCal India – Personal Finance, EMI, Tax & Investment Tips',
  description: 'Expert articles on personal finance, EMI calculators, income tax, SIP, loans, and investments. Practical money tips for India.',
  openGraph: {
    title: 'Blog | MoneyCal India – Finance & Calculator Guides',
    description: 'Expert articles on personal finance, EMI, tax, and investments for India.',
    url: 'https://moneycal.in/blog',
    siteName: 'MoneyCal India',
    images: [{ url: 'https://moneycal.in/android-chrome-512x512.png', width: 512, height: 512 }],
  },
  twitter: { card: 'summary_large_image', title: 'Blog | MoneyCal India', description: 'Expert articles on personal finance, EMI, tax, and investments for India.' },
  alternates: { canonical: 'https://moneycal.in/blog' },
};

export default function BlogPage() {
  return (
    <main id="main" role="main">
      <header className="sr-only">
        <h1>MoneyCal Blog – Personal Finance & Calculator Guides</h1>
      </header>
      <section aria-label="Blog intro" className="container mx-auto px-4 py-6 max-w-6xl">
        <p className="text-gray-700 max-w-2xl">
          Read our latest articles on EMI, loans, tax, SIP, and investments. Practical guides and tips to plan your finances in India.
        </p>
      </section>
      <App pathname="/blog" skipLayout />
    </main>
  );
}
