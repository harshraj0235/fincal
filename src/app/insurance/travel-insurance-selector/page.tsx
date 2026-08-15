import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TravelInsuranceSelectorClient';

export const metadata: Metadata = {
  title: 'Travel Insurance Selector | MoneyCal India',
  description: "Explore Travel Insurance Selector on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/travel-insurance-selector'
  }
};

export default function Page() {
  return <ClientComponent />;
}
