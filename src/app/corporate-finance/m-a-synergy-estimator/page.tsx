import React from 'react';
import { Metadata } from 'next';
import MASynergyEstimator from './MASynergyEstimator';

export const metadata: Metadata = {
  title: 'M A Synergy Estimator | MoneyCal India',
  description: 'Use our free M A Synergy Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/m-a-synergy-estimator'
  }
};

export default function Page() {
  return <MASynergyEstimator />;
}
