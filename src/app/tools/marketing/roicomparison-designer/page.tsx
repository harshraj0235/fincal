import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ROIComparisonDesignerClient';

export const metadata: Metadata = {
  title: 'ROIComparison Designer | MoneyCal India',
  description: "Explore ROIComparison Designer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/roicomparison-designer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
