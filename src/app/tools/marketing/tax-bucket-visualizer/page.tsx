import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxBucketVisualizerClient';

export const metadata: Metadata = {
  title: 'Tax Bucket Visualizer | MoneyCal India',
  description: "Explore Tax Bucket Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/tax-bucket-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
