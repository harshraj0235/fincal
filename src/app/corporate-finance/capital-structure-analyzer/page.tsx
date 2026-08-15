import React from 'react';
import { Metadata } from 'next';
import CapitalStructureAnalyzer from './CapitalStructureAnalyzerClient';

export const metadata: Metadata = {
  title: 'CapitalStructureAnalyzer | MoneyCal India',
  description: 'Free online CapitalStructureAnalyzer tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/capital-structure-analyzer',
  }
};

export default function Page() {
  return <CapitalStructureAnalyzer />;
}
