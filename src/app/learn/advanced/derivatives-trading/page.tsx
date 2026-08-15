import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DerivativesTradingClient';

export const metadata: Metadata = {
  title: 'Derivatives Trading | MoneyCal India',
  description: "Explore Derivatives Trading on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/advanced/derivatives-trading'
  }
};

export default function Page() {
  return <ClientComponent />;
}
