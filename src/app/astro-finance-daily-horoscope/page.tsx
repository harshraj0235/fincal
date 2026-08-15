import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceDailyHoroscopeClient';

export const metadata: Metadata = {
  title: 'Astro Finance Daily Horoscope | MoneyCal India',
  description: "Explore Astro Finance Daily Horoscope on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-daily-horoscope'
  }
};

export default function Page() {
  return <ClientComponent />;
}
