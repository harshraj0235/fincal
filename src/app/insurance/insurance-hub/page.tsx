import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InsuranceHubClient';

export const metadata: Metadata = {
  title: 'Insurance Hub | MoneyCal India',
  description: "Explore Insurance Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/insurance-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
