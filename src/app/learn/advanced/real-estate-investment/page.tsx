import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RealEstateInvestmentClient';

export const metadata: Metadata = {
  title: 'Real Estate Investment | MoneyCal India',
  description: "Explore Real Estate Investment on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/advanced/real-estate-investment'
  }
};

export default function Page() {
  return <ClientComponent />;
}
