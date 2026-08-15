import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Section80CTallyAnalyzerClient';

export const metadata: Metadata = {
  title: 'Section80CTally Analyzer | MoneyCal India',
  description: "Explore Section80CTally Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/section80ctally-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
