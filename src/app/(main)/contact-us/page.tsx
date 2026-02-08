import type { Metadata } from 'next';
import AppShell from '../../AppShell';

/** force-dynamic – AppShell/App uses useSearchParams which needs Suspense during prerender */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us | MoneyCal India',
  description: 'Get in touch with MoneyCal India for feedback, calculator suggestions, or partnership inquiries.',
  openGraph: {
    type: 'website',
    title: 'Contact Us | MoneyCal India',
    description: 'Get in touch for feedback, calculator suggestions, or partnership inquiries.',
    url: 'https://moneycal.in/contact-us',
    siteName: 'MoneyCal India',
    images: [{ url: 'https://moneycal.in/android-chrome-512x512.png', width: 512, height: 512, alt: 'MoneyCal India' }],
  },
  twitter: { card: 'summary_large_image', title: 'Contact Us | MoneyCal India', description: 'Get in touch with MoneyCal India.', images: ['https://moneycal.in/android-chrome-512x512.png'] },
  alternates: { canonical: 'https://moneycal.in/contact-us' },
};

export default function ContactUsPage() {
  return (
    <main id="main" role="main">
      <header className="container mx-auto px-4 pt-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
      </header>
      <section className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Contact">
        <p className="text-gray-700 mb-4">
          Have a question, suggestion, or want to report an issue? We'd love to hear from you. Use the form below or email us for calculator feedback, content corrections, or business inquiries.
        </p>
        <p className="text-gray-600 text-sm">
          Email: <a href="mailto:support@moneycal.in" className="text-blue-600 hover:underline">support@moneycal.in</a>
        </p>
      </section>
      <AppShell pathname="/contact-us" skipLayout />
    </main>
  );
}
