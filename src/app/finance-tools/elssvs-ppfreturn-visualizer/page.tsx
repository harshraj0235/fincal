import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ELSSVsPPFReturnVisualizerClient';

export const metadata: Metadata = {
  title: 'ELSSVs PPFReturn Visualizer | MoneyCal India',
  description: "Explore ELSSVs PPFReturn Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/elssvs-ppfreturn-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
