import React from 'react';
import { Metadata } from 'next';
import HealthInsuranceEstimator from './HealthInsuranceEstimator';

export const metadata: Metadata = {
  title: 'Health Insurance Estimator | MoneyCal India',
  description: 'Use our free Health Insurance Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/health-insurance-estimator'
  }
};

export default function Page() {
  return <HealthInsuranceEstimator />;
}
