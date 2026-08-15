import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './80CDeductionBucketVisualizerClient';

export const metadata: Metadata = {
  title: '80CDeduction Bucket Visualizer | MoneyCal India',
  description: "Explore 80CDeduction Bucket Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/80cdeduction-bucket-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
