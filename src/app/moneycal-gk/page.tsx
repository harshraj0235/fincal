import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MoneycalGKClient';

export const metadata: Metadata = {
  title: 'Moneycal GK | MoneyCal India',
  description: "Explore Moneycal GK on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/moneycal-gk'
  }
};

export default function Page() {
  return <ClientComponent />;
}
