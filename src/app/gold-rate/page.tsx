import React from 'react';
import { Metadata } from 'next';
import ClientComponent from '../market/market-rates-hub/MarketRatesHubClient';

export const metadata: Metadata = {
  title: 'Gold Rate Today India - 22K & 24K Gold Price | MoneyCal',
  description: 'Check today\'s gold rate in India. 22K & 24K gold price per gram in Mumbai, Delhi, Bangalore, Chennai & all cities. Historical gold price chart & analysis.',
  keywords: 'gold rate today, gold price today India, 22K gold rate, 24K gold rate, gold rate Mumbai, gold rate Delhi, gold price per gram',
  alternates: { canonical: 'https://moneycal.in/gold-rate' }
};

export default function Page() {
  return <ClientComponent />;
}
