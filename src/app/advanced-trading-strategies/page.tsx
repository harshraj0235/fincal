import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AdvancedTradingStrategiesClient';

export const metadata: Metadata = {
  title: 'Advanced Trading Strategies | MoneyCal India',
  description: "Explore Advanced Trading Strategies on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/advanced-trading-strategies'
  }
};

export default function Page() {
  return <ClientComponent />;
}
