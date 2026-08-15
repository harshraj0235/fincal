import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HomeInsuranceEstimatorClient';

export const metadata: Metadata = {
  title: 'Home Insurance Estimator | MoneyCal India',
  description: "Explore Home Insurance Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/home-insurance-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
