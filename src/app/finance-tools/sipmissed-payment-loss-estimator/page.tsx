import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPMissedPaymentLossEstimatorClient';

export const metadata: Metadata = {
  title: 'SIPMissed Payment Loss Estimator | MoneyCal India',
  description: "Explore SIPMissed Payment Loss Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/sipmissed-payment-loss-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
