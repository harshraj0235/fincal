import React from 'react';
import { Metadata } from 'next';
import TaxOnBonusSharesTracker from './TaxOnBonusSharesTracker';

export const metadata: Metadata = {
  title: 'Tax On Bonus Shares Tracker | MoneyCal India',
  description: 'Use our free Tax On Bonus Shares Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tax-on-bonus-shares-tracker'
  }
};

export default function Page() {
  return <TaxOnBonusSharesTracker />;
}
