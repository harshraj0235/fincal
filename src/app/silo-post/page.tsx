import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SiloPostClient';

export const metadata: Metadata = {
  title: 'Silo Post | MoneyCal India',
  description: "Explore Silo Post on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/silo-post'
  }
};

export default function Page() {
  return <ClientComponent />;
}
