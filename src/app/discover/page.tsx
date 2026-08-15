import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DiscoverClient';

export const metadata: Metadata = {
  title: 'Discover | MoneyCal India',
  description: "Explore Discover on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/discover'
  }
};

export default function Page() {
  return <ClientComponent />;
}
