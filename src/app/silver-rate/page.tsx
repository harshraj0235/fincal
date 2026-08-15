import React from 'react';
import { Metadata } from 'next';
import ClientComponent from '../market/market-rates-hub/MarketRatesHubClient';

export const metadata: Metadata = {
  title: 'Silver Rate Today India - Silver Price Per Gram & KG | MoneyCal',
  description: 'Check today\'s silver rate in India. Silver price per gram, per kg in all Indian cities. Historical silver price chart, analysis & investment guide.',
  keywords: 'silver rate today, silver price India, silver rate per gram, silver rate per kg, silver price today, silver investment',
  alternates: { canonical: 'https://moneycal.in/silver-rate' }
};

export default function Page() {
  return <ClientComponent />;
}
