import React from 'react';
import { Metadata } from 'next';
import IntraYearRedemptionTaxTracker from './IntraYearRedemptionTaxTracker';

export const metadata: Metadata = {
  title: 'Intra Year Redemption Tax Tracker | MoneyCal India',
  description: 'Use our free Intra Year Redemption Tax Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/intra-year-redemption-tax-tracker'
  }
};

export default function Page() {
  return <IntraYearRedemptionTaxTracker />;
}
