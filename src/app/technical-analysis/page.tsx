import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TechnicalAnalysisClient';

export const metadata: Metadata = {
  title: 'Technical Analysis | MoneyCal India',
  description: "Explore Technical Analysis on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/technical-analysis'
  }
};

export default function Page() {
  return <ClientComponent />;
}
