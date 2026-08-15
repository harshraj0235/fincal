import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SEOMonetizationToolsClient';

export const metadata: Metadata = {
  title: 'SEOMonetization Tools | MoneyCal India',
  description: "Explore SEOMonetization Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/seomonetization-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
