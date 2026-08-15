import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './market-rates-hub/MarketRatesHubClient';

export const metadata: Metadata = {
  title: 'Market Rates Today - Gold, Silver, Forex & Commodity Prices | MoneyCal',
  description: 'Live market rates - gold rate today, silver rate today, forex rates, commodity prices. City-wise gold rates & historical price charts.',
  keywords: 'gold rate today, silver rate today, market rates India, commodity prices, forex rates India',
  alternates: { canonical: 'https://moneycal.in/market' }
};

export default function Page() {
  return <ClientComponent />;
}
