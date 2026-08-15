import React from 'react';
import { Metadata } from 'next';
import DividendPolicyImpactTool from './DividendPolicyImpactToolClient';

export const metadata: Metadata = {
  title: 'DividendPolicyImpactTool | MoneyCal India',
  description: 'Free online DividendPolicyImpactTool tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/dividend-policy-impact-tool',
  }
};

export default function Page() {
  return <DividendPolicyImpactTool />;
}
