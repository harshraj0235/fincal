import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CaseStudiesMarketPsychologyClient';

export const metadata: Metadata = {
  title: 'Case Studies Market Psychology | MoneyCal India',
  description: "Explore Case Studies Market Psychology on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/case-studies-market-psychology'
  }
};

export default function Page() {
  return <ClientComponent />;
}
