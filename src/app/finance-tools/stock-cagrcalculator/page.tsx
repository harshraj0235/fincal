import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockCAGRCalculatorClient';

export const metadata: Metadata = {
  title: 'Stock CAGRCalculator | MoneyCal India',
  description: "Explore Stock CAGRCalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/stock-cagrcalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
