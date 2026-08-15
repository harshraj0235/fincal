import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LongTermCapitalGainsEstimatorClient';

export const metadata: Metadata = {
  title: 'Long Term Capital Gains Estimator | MoneyCal India',
  description: "Explore Long Term Capital Gains Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/long-term-capital-gains-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
