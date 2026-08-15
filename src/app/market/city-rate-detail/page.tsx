import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CityRateDetailClient';

export const metadata: Metadata = {
  title: 'City Rate Detail | MoneyCal India',
  description: "Explore City Rate Detail on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/market/city-rate-detail'
  }
};

export default function Page() {
  return <ClientComponent />;
}
