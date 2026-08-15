import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HealthInsuranceEstimatorClient';

export const metadata: Metadata = {
  title: 'Health Insurance Estimator | MoneyCal India',
  description: "Explore Health Insurance Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/health-insurance-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
