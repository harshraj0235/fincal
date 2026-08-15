import React from 'react';
import { Metadata } from 'next';
import ComparisonGuide from './ComparisonGuide';

export const metadata: Metadata = {
  title: 'Comparison Guide | MoneyCal India',
  description: 'Use our free Comparison Guide to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/comparison-guide'
  }
};

export default function Page() {
  return <ComparisonGuide />;
}
