import React from 'react';
import { Metadata } from 'next';
import LossCarryForwardEstimator from './LossCarryForwardEstimator';

export const metadata: Metadata = {
  title: 'Loss Carry Forward Estimator | MoneyCal India',
  description: 'Use our free Loss Carry Forward Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/loss-carry-forward-estimator'
  }
};

export default function Page() {
  return <LossCarryForwardEstimator />;
}
