import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ShareholdingPatternVisualizerClient';

export const metadata: Metadata = {
  title: 'Shareholding Pattern Visualizer | MoneyCal India',
  description: "Explore Shareholding Pattern Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/shareholding-pattern-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
