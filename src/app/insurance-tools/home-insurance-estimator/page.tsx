import React from 'react';
import { Metadata } from 'next';
import HomeInsuranceEstimator from './HomeInsuranceEstimator';

export const metadata: Metadata = {
  title: 'Home Insurance Estimator | MoneyCal India',
  description: 'Use our free Home Insurance Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/home-insurance-estimator'
  }
};

export default function Page() {
  return <HomeInsuranceEstimator />;
}
