import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IpoTargetPageClient';

export const metadata: Metadata = {
  title: 'Ipo Target Page | MoneyCal India',
  description: "Explore Ipo Target Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/ipo/ipo-target-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
