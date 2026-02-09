import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell from '../AppShell';

const BASE = 'https://moneycal.in';
const OG_IMAGE = `${BASE}/android-chrome-512x512.png`;
export const metadata: Metadata = {
  title: 'MoneyCal India - Financial Calculators & Tools for India',
  description: "India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users.",
  openGraph: {
    type: 'website',
    title: 'MoneyCal India - Financial Calculators & Tools for India',
    description: "India's most comprehensive financial calculator platform.",
    url: BASE,
    siteName: 'MoneyCal India',
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: 'MoneyCal India' }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyCal India - Financial Calculators & Tools for India',
    description: "India's most comprehensive financial calculator platform.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: `${BASE}/` },
};

const NAV_LINKS = [
  { name: 'Calculators', href: '/calculators' },
  { name: 'News', href: '/news' },
  { name: 'Learn', href: '/learn' },
  { name: 'Tools', href: '/tools' },
  { name: 'Finance Tools', href: '/finance-tools' },
  { name: 'Tax Tools', href: '/tax-tools' },
  { name: 'GST Tools', href: '/gst-tools' },
  { name: 'Insurance Tools', href: '/insurance-tools' },
  { name: 'Government Schemes', href: '/government-schemes' },
  { name: 'Crypto', href: '/crypto' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about-us' },
  { name: 'Contact', href: '/contact-us' },
];

export default function HomePage() {
  return (
    <>
      <main className="w-full min-h-[70vh] flex flex-col" aria-label="MoneyCal India">
        {/* Hero */}
        <section className="flex-1 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-12 sm:py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              MoneyCal India
            </h1>
            <p className="text-lg font-medium text-slate-600 mb-4">
              Financial Calculators &amp; Tools for India
            </p>
            <p className="text-slate-600 leading-relaxed">
              India&apos;s most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users.
            </p>
          </div>
        </section>

        {/* Navigation – all sections, easy to navigate */}
        <nav
          className="bg-white py-10 px-4 border-b border-slate-100"
          aria-label="Main sections"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="sr-only">Navigate to all sections</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 list-none p-0 m-0">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-center sm:justify-start gap-2 py-3 px-4 rounded-xl text-slate-700 font-medium bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </main>
      <AppShell pathname="/" skipLayout />
    </>
  );
}
