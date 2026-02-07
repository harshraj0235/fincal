import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: "MoneyCal India - Top Financial Calculators & Tools | EMI, SIP, Tax",
  description: "India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users.",
  keywords: "financial calculator india, EMI calculator, SIP calculator, income tax calculator, mutual fund calculator, loan calculator, investment calculator, personal finance tools, financial planning india, free financial calculator, PPF calculator, retirement calculator",
  openGraph: {
    title: "MoneyCal India - Top Financial Calculators & Tools",
    description: "India's most comprehensive financial calculator platform.",
    url: "https://moneycal.in",
    siteName: "MoneyCal India",
    images: [{ url: "https://moneycal.in/android-chrome-512x512.png", width: 512, height: 512 }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyCal India - Top Financial Calculators & Tools",
    description: "India's most comprehensive financial calculator platform.",
    images: ["https://moneycal.in/android-chrome-512x512.png"],
  },
  robots: "index, follow",
  metadataBase: new URL("https://moneycal.in"),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MoneyCal India',
      url: 'https://moneycal.in',
      logo: 'https://moneycal.in/android-chrome-512x512.png',
      description: "India's free financial calculators and tools: EMI, SIP, tax, GST, loans, investments.",
      sameAs: ['https://twitter.com/MoneyCalIN', 'https://linkedin.com/company/moneycal', 'https://github.com/harshraj0235/fincal'],
      contactPoint: { '@type': 'ContactPoint', email: 'support@moneycal.in', contactType: 'customer support', areaServed: 'IN' },
    },
    {
      '@type': 'WebSite',
      name: 'MoneyCal India',
      url: 'https://moneycal.in',
      potentialAction: { '@type': 'SearchAction', target: 'https://moneycal.in/?q={search_term}', 'query-input': 'required name=search_term' },
    },
  ],
};

import ClientLayoutWrapper from './ClientLayoutWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://moneycal.in/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
