import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CompoundRaceClient';

export const metadata: Metadata = {
  title: 'Compound Race | MoneyCal India',
  description: "Explore Compound Race on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/games/compound-race'
  }
};

export default function Page() {
  return <ClientComponent />;
}
