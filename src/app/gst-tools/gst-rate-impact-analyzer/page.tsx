import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTRateImpactAnalyzerClient';

export const metadata: Metadata = {
  title: 'GSTRate Impact Analyzer | MoneyCal India',
  description: "Explore GSTRate Impact Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstrate-impact-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
