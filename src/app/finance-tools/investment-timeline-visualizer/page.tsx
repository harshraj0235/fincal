import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestmentTimelineVisualizerClient';

export const metadata: Metadata = {
  title: 'Investment Timeline Visualizer | MoneyCal India',
  description: "Explore Investment Timeline Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/investment-timeline-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
