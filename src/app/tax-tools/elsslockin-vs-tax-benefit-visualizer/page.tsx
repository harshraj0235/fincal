import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ELSSLockinVsTaxBenefitVisualizerClient';

export const metadata: Metadata = {
  title: 'ELSSLockin Vs Tax Benefit Visualizer | MoneyCal India',
  description: "Explore ELSSLockin Vs Tax Benefit Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/elsslockin-vs-tax-benefit-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
