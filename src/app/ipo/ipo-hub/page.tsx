import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IpoHubClient';

export const metadata: Metadata = {
  title: 'Ipo Hub | MoneyCal India',
  description: "Explore Ipo Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/ipo/ipo-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
