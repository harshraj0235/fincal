import React from 'react';
import { Metadata } from 'next';
import GiftedSharesTaxEstimator from './GiftedSharesTaxEstimator';

export const metadata: Metadata = {
  title: 'Gifted Shares Tax Estimator | MoneyCal India',
  description: 'Use our free Gifted Shares Tax Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/gifted-shares-tax-estimator'
  }
};

export default function Page() {
  return <GiftedSharesTaxEstimator />;
}
