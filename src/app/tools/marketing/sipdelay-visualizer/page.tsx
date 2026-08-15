import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPDelayVisualizerClient';

export const metadata: Metadata = {
  title: 'SIPDelay Visualizer | MoneyCal India',
  description: "Explore SIPDelay Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/sipdelay-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
