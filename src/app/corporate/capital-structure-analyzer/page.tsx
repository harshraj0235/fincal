import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CapitalStructureAnalyzerClient';

export const metadata: Metadata = {
  title: 'Capital Structure Analyzer | MoneyCal India',
  description: "Explore Capital Structure Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/capital-structure-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
