import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockSimulatorClient';

export const metadata: Metadata = {
  title: 'Stock Simulator | MoneyCal India',
  description: "Explore Stock Simulator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/games/stock-simulator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
