import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LumpsumVsSIPAnalyzerClient';

export const metadata: Metadata = {
  title: 'Lumpsum Vs SIPAnalyzer | MoneyCal India',
  description: "Explore Lumpsum Vs SIPAnalyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/lumpsum-vs-sipanalyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
