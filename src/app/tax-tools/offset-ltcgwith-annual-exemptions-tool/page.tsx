import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './OffsetLTCGWithAnnualExemptionsToolClient';

export const metadata: Metadata = {
  title: 'Offset LTCGWith Annual Exemptions Tool | MoneyCal India',
  description: "Explore Offset LTCGWith Annual Exemptions Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/offset-ltcgwith-annual-exemptions-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
