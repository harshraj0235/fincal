import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell from '../AppShell';

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

const EXPLORE_LINKS = [
  { name: 'Calculators', href: '/calculators', desc: 'EMI, SIP, Tax, PPF, FD & more' },
  { name: 'Blog', href: '/blog', desc: 'Finance articles & guides' },
  { name: 'News', href: '/news', desc: 'Finance news & Money Shorts' },
  { name: 'Learn', href: '/learn', desc: 'Lessons on loans, tax, investing' },
  { name: 'Tools', href: '/tools', desc: '200+ finance tools' },
  { name: 'Tax Tools', href: '/tax-tools', desc: 'Income tax, TDS, calculators' },
  { name: 'GST Tools', href: '/gst-tools', desc: 'GST calculator, HSN finder' },
  { name: 'Finance Tools', href: '/finance-tools', desc: 'SIP, mutual fund, FD tools' },
  { name: 'Insurance Tools', href: '/insurance-tools', desc: 'Term, health, premium' },
  { name: 'Government Schemes', href: '/government-schemes', desc: 'Govt schemes & benefits' },
  { name: 'Crypto', href: '/crypto', desc: 'Crypto guides & tools' },
  { name: 'About Us', href: '/about-us', desc: 'About MoneyCal' },
  { name: 'Contact', href: '/contact-us', desc: 'Get in touch' },
];

export default function HomePage() {
  return (
    <>
      <main className="w-full" aria-label="MoneyCal India - All features">
        {/* Hero + tagline */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-10 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              MoneyCal India
            </h1>
            <p className="text-lg text-slate-200 mb-2">
              Financial Calculators &amp; Tools for India
            </p>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              EMI, SIP, income tax, GST, loans, insurance, and more. Free tools, blog, news, and learn—all in one place.
            </p>
          </div>
        </section>

        {/* Explore all – server-rendered so every feature shows on first paint */}
        <section className="border-b border-slate-200 bg-white py-8 px-4" aria-labelledby="explore-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="explore-heading" className="text-xl font-bold text-slate-900 mb-6 text-center">
              Explore all features
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {EXPLORE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-slate-900 group-hover:text-blue-700 block">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <AppShell pathname="/" skipLayout />
    </>
  );
}
