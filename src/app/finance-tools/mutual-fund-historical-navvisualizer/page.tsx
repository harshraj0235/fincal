import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundHistoricalNAVVisualizerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Historical NAVVisualizer | MoneyCal India',
  description: "Explore Mutual Fund Historical NAVVisualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-historical-navvisualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
