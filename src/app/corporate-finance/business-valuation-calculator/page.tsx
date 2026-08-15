import React from 'react';
import { Metadata } from 'next';
import BusinessValuationCalculator from './BusinessValuationCalculatorClient';

export const metadata: Metadata = {
  title: 'BusinessValuationCalculator | MoneyCal India',
  description: 'Free online BusinessValuationCalculator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/business-valuation-calculator',
  }
};

export default function Page() {
  return <BusinessValuationCalculator />;
}
