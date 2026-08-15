import React from 'react';
import { Metadata } from 'next';
import MutualFundExitLoadChecker from './MutualFundExitLoadChecker';

export const metadata: Metadata = {
  title: 'Mutual Fund Exit Load Checker | MoneyCal India',
  description: 'Use our free Mutual Fund Exit Load Checker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/mutual-fund-exit-load-checker'
  }
};

export default function Page() {
  return <MutualFundExitLoadChecker />;
}
