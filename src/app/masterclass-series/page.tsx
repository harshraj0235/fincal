import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MasterclassSeriesClient';

export const metadata: Metadata = {
  title: 'Masterclass Series | MoneyCal India',
  description: "Explore Masterclass Series on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/masterclass-series'
  }
};

export default function Page() {
  return <ClientComponent />;
}
