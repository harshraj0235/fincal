import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceZodiacSavingsCalculatorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Zodiac Savings Calculator | MoneyCal India',
  description: "Explore Astro Finance Zodiac Savings Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-zodiac-savings-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
