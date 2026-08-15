import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WealthBuildingStrategiesClient';

export const metadata: Metadata = {
  title: 'Wealth Building Strategies | MoneyCal India',
  description: "Explore Wealth Building Strategies on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/behavioural/wealth-building-strategies'
  }
};

export default function Page() {
  return <ClientComponent />;
}
