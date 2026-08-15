import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NPSTaxBenefitVsGrowthEstimatorClient';

export const metadata: Metadata = {
  title: 'NPSTax Benefit Vs Growth Estimator | MoneyCal India',
  description: "Explore NPSTax Benefit Vs Growth Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/npstax-benefit-vs-growth-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
