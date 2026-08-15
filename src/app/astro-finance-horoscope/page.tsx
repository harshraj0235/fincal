import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceHoroscopeClient';

export const metadata: Metadata = {
  title: 'Astro Finance Horoscope | MoneyCal India',
  description: "Explore Astro Finance Horoscope on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-horoscope'
  }
};

export default function Page() {
  return <ClientComponent />;
}
