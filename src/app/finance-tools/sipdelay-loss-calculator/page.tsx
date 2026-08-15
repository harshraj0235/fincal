import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPDelayLossCalculatorClient';

export const metadata: Metadata = {
  title: 'SIPDelay Loss Calculator | MoneyCal India',
  description: "Explore SIPDelay Loss Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/sipdelay-loss-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
