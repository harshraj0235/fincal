import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SchemesFinderClient';

export const metadata: Metadata = {
  title: 'Schemes Finder | MoneyCal India',
  description: "Explore Schemes Finder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/schemes-finder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
