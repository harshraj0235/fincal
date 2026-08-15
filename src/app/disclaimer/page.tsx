import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DisclaimerClient';

export const metadata: Metadata = {
  title: 'Disclaimer | MoneyCal India',
  description: "Explore Disclaimer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/disclaimer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
