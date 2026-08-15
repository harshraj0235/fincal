import React from 'react';
import { Metadata } from 'next';
import BonusSharesTaxImpactTool from './BonusSharesTaxImpactTool';

export const metadata: Metadata = {
  title: 'Bonus Shares Tax Impact Tool | MoneyCal India',
  description: 'Use our free Bonus Shares Tax Impact Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/bonus-shares-tax-impact-tool'
  }
};

export default function Page() {
  return <BonusSharesTaxImpactTool />;
}
