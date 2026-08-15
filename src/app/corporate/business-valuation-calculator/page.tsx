import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BusinessValuationCalculatorClient';

export const metadata: Metadata = {
  title: 'Business Valuation Calculator | MoneyCal India',
  description: "Explore Business Valuation Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/business-valuation-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
