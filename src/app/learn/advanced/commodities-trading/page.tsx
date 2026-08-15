import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CommoditiesTradingClient';

export const metadata: Metadata = {
  title: 'Commodities Trading | MoneyCal India',
  description: "Explore Commodities Trading on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/advanced/commodities-trading'
  }
};

export default function Page() {
  return <ClientComponent />;
}
