import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundRiskAnalyzerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Risk Analyzer | MoneyCal India',
  description: "Explore Mutual Fund Risk Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-risk-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
