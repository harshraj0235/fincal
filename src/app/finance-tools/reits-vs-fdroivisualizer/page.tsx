import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './REITsVsFDROIVisualizerClient';

export const metadata: Metadata = {
  title: 'REITs Vs FDROIVisualizer | MoneyCal India',
  description: "Explore REITs Vs FDROIVisualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/reits-vs-fdroivisualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
