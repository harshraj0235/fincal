import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AMCFeeAnalyzerToolClient';

export const metadata: Metadata = {
  title: 'AMCFee Analyzer Tool | MoneyCal India',
  description: "Explore AMCFee Analyzer Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/amcfee-analyzer-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
