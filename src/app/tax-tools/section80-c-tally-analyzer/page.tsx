import React from 'react';
import { Metadata } from 'next';
import Section80CTallyAnalyzer from './Section80CTallyAnalyzer';

export const metadata: Metadata = {
  title: 'Section80 C Tally Analyzer | MoneyCal India',
  description: 'Use our free Section80 C Tally Analyzer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/section80-c-tally-analyzer'
  }
};

export default function Page() {
  return <Section80CTallyAnalyzer />;
}
