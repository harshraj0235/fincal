import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MarketRatesHubClient';

export const metadata: Metadata = {
  title: 'Market Rates Hub | MoneyCal India',
  description: "Explore Market Rates Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/market/market-rates-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
