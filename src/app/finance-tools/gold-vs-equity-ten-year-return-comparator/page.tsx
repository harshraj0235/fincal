import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GoldVsEquityTenYearReturnComparatorClient';

export const metadata: Metadata = {
  title: 'Gold Vs Equity Ten Year Return Comparator | MoneyCal India',
  description: "Explore Gold Vs Equity Ten Year Return Comparator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/gold-vs-equity-ten-year-return-comparator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
