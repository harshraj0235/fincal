import React from 'react';
import { Metadata } from 'next';
import NPSTaxBenefitVsGrowthEstimator from './NPSTaxBenefitVsGrowthEstimator';

export const metadata: Metadata = {
  title: 'N P S Tax Benefit Vs Growth Estimator | MoneyCal India',
  description: 'Use our free N P S Tax Benefit Vs Growth Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/n-p-s-tax-benefit-vs-growth-estimator'
  }
};

export default function Page() {
  return <NPSTaxBenefitVsGrowthEstimator />;
}
