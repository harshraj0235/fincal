import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxPlanningStrategiesClient';

export const metadata: Metadata = {
  title: 'Tax Planning Strategies | MoneyCal India',
  description: "Explore Tax Planning Strategies on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/tax-planning-strategies'
  }
};

export default function Page() {
  return <ClientComponent />;
}
