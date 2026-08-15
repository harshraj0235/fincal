import React from 'react';
import { Metadata } from 'next';
import MASynergyEstimator from './MASynergyEstimatorClient';

export const metadata: Metadata = {
  title: 'MASynergyEstimator | MoneyCal India',
  description: 'Free online MASynergyEstimator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/ma-synergy-estimator',
  }
};

export default function Page() {
  return <MASynergyEstimator />;
}
