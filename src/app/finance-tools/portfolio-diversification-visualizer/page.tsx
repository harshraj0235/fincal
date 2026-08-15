import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PortfolioDiversificationVisualizerClient';

export const metadata: Metadata = {
  title: 'Portfolio Diversification Visualizer | MoneyCal India',
  description: "Explore Portfolio Diversification Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/portfolio-diversification-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
