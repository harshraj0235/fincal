import React from 'react';
import { Metadata } from 'next';
import ShortTermCapitalLossBenefitEstimator from './ShortTermCapitalLossBenefitEstimator';

export const metadata: Metadata = {
  title: 'Short Term Capital Loss Benefit Estimator | MoneyCal India',
  description: 'Use our free Short Term Capital Loss Benefit Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/short-term-capital-loss-benefit-estimator'
  }
};

export default function Page() {
  return <ShortTermCapitalLossBenefitEstimator />;
}
