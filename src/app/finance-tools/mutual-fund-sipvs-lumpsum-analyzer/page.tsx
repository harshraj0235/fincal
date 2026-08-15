import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundSIPvsLumpsumAnalyzerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund SIPvs Lumpsum Analyzer | MoneyCal India',
  description: "Explore Mutual Fund SIPvs Lumpsum Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-sipvs-lumpsum-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
