import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './UltimateTaxGuideClient';

export const metadata: Metadata = {
  title: 'Ultimate Tax Guide | MoneyCal India',
  description: "Explore Ultimate Tax Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/ultimate-tax-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
