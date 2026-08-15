import React from 'react';
import { Metadata } from 'next';
import TDSImpactVisualizerOnGains from './TDSImpactVisualizerOnGains';

export const metadata: Metadata = {
  title: 'T D S Impact Visualizer On Gains | MoneyCal India',
  description: 'Use our free T D S Impact Visualizer On Gains to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/t-d-s-impact-visualizer-on-gains'
  }
};

export default function Page() {
  return <TDSImpactVisualizerOnGains />;
}
