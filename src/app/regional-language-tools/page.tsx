import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RegionalLanguageToolsClient';

export const metadata: Metadata = {
  title: 'Regional Language Tools | MoneyCal India',
  description: "Explore Regional Language Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/regional-language-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
