import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TraderTurnoverEstimatorITRClient';

export const metadata: Metadata = {
  title: 'Trader Turnover Estimator ITR | MoneyCal India',
  description: "Explore Trader Turnover Estimator ITR on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/trader-turnover-estimator-itr'
  }
};

export default function Page() {
  return <ClientComponent />;
}
