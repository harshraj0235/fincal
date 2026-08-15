import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ValueVsGrowthClient';

export const metadata: Metadata = {
  title: 'Value Vs Growth | MoneyCal India',
  description: "Explore Value Vs Growth on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/value-vs-growth'
  }
};

export default function Page() {
  return <ClientComponent />;
}
