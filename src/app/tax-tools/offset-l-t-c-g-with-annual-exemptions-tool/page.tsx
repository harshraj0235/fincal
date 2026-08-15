import React from 'react';
import { Metadata } from 'next';
import OffsetLTCGWithAnnualExemptionsTool from './OffsetLTCGWithAnnualExemptionsTool';

export const metadata: Metadata = {
  title: 'Offset L T C G With Annual Exemptions Tool | MoneyCal India',
  description: 'Use our free Offset L T C G With Annual Exemptions Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/offset-l-t-c-g-with-annual-exemptions-tool'
  }
};

export default function Page() {
  return <OffsetLTCGWithAnnualExemptionsTool />;
}
