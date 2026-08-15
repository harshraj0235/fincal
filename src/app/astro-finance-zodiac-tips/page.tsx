import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceZodiacTipsClient';

export const metadata: Metadata = {
  title: 'Astro Finance Zodiac Tips | MoneyCal India',
  description: "Explore Astro Finance Zodiac Tips on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-zodiac-tips'
  }
};

export default function Page() {
  return <ClientComponent />;
}
