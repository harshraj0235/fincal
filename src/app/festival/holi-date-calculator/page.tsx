import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HoliDateCalculatorClient';

export const metadata: Metadata = {
  title: 'Holi Date Calculator | MoneyCal India',
  description: "Explore Holi Date Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/holi-date-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
