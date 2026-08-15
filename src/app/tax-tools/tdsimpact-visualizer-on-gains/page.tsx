import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TDSImpactVisualizerOnGainsClient';

export const metadata: Metadata = {
  title: 'TDSImpact Visualizer On Gains | MoneyCal India',
  description: "Explore TDSImpact Visualizer On Gains on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tdsimpact-visualizer-on-gains'
  }
};

export default function Page() {
  return <ClientComponent />;
}
