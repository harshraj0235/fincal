import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockSplitAdjustedROICalculatorClient';

export const metadata: Metadata = {
  title: 'Stock Split Adjusted ROICalculator | MoneyCal India',
  description: "Explore Stock Split Adjusted ROICalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/stock-split-adjusted-roicalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
