import React from 'react';
import { Metadata } from 'next';
import OldVsNewTaxRegimeHelper from './OldVsNewTaxRegimeHelper';

export const metadata: Metadata = {
  title: 'Old Vs New Tax Regime Helper | MoneyCal India',
  description: 'Use our free Old Vs New Tax Regime Helper to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/old-vs-new-tax-regime-helper'
  }
};

export default function Page() {
  return <OldVsNewTaxRegimeHelper />;
}
