import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EducationCostVisualizerClient';

export const metadata: Metadata = {
  title: 'Education Cost Visualizer | MoneyCal India',
  description: "Explore Education Cost Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/education-cost-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
