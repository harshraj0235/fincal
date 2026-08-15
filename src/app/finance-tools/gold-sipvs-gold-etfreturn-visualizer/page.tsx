import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GoldSIPVsGoldETFReturnVisualizerClient';

export const metadata: Metadata = {
  title: 'Gold SIPVs Gold ETFReturn Visualizer | MoneyCal India',
  description: "Explore Gold SIPVs Gold ETFReturn Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/gold-sipvs-gold-etfreturn-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
