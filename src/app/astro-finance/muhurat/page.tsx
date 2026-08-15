import React from 'react';
import { Metadata } from 'next';
import AstroFinanceMuhuratCalculator from './AstroFinanceMuhuratCalculatorClient';

export const metadata: Metadata = {
  title: 'AstroFinanceMuhuratCalculator | MoneyCal India',
  description: 'Free online AstroFinanceMuhuratCalculator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/astro-finance/muhurat',
  }
};

export default function Page() {
  return <AstroFinanceMuhuratCalculator />;
}
