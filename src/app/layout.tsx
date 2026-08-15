import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'MoneyCal.in - Free Financial Calculators & Tools India',
    template: '%s | MoneyCal.in'
  },
  description: 'India\'s #1 free financial platform. 200+ calculators — SIP, EMI, Income Tax, Mutual Fund, PPF, NPS, FD. Gold rate today, IPO GMP, government schemes & AI assistant. Free forever.',
  keywords: 'SIP calculator, EMI calculator, income tax calculator, gold rate today, IPO GMP, mutual fund calculator, financial calculator India, MoneyCal',
  metadataBase: new URL('https://moneycal.in'),
  openGraph: {
    siteName: 'MoneyCal.in',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://moneycal.in',
  },
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/components/I18nProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <I18nProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
