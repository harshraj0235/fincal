import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FundamentalAnalysisClient';

export const metadata: Metadata = {
  title: 'Fundamental Analysis | MoneyCal India',
  description: "Explore Fundamental Analysis on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/fundamental-analysis'
  }
};

export default function Page() {
  return <ClientComponent />;
}
