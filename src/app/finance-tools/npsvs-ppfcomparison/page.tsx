import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NPSVsPPFComparisonClient';

export const metadata: Metadata = {
  title: 'NPSVs PPFComparison | MoneyCal India',
  description: "Explore NPSVs PPFComparison on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/npsvs-ppfcomparison'
  }
};

export default function Page() {
  return <ClientComponent />;
}
