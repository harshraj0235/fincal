import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EquityVsDebtSplitRecommenderClient';

export const metadata: Metadata = {
  title: 'Equity Vs Debt Split Recommender | MoneyCal India',
  description: "Explore Equity Vs Debt Split Recommender on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/equity-vs-debt-split-recommender'
  }
};

export default function Page() {
  return <ClientComponent />;
}
