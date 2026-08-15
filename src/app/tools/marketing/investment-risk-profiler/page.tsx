import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestmentRiskProfilerClient';

export const metadata: Metadata = {
  title: 'Investment Risk Profiler | MoneyCal India',
  description: "Explore Investment Risk Profiler on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/investment-risk-profiler'
  }
};

export default function Page() {
  return <ClientComponent />;
}
