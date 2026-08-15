import React from 'react';
import { Metadata } from 'next';
import TraderTurnoverEstimatorITR from './TraderTurnoverEstimatorITR';

export const metadata: Metadata = {
  title: 'Trader Turnover Estimator I T R | MoneyCal India',
  description: 'Use our free Trader Turnover Estimator I T R to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/trader-turnover-estimator-i-t-r'
  }
};

export default function Page() {
  return <TraderTurnoverEstimatorITR />;
}
