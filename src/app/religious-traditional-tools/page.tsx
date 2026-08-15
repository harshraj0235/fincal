import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ReligiousTraditionalToolsClient';

export const metadata: Metadata = {
  title: 'Religious Traditional Tools | MoneyCal India',
  description: "Explore Religious Traditional Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/religious-traditional-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
