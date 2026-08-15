import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StrategicHub2026Client';

export const metadata: Metadata = {
  title: 'Strategic Hub2026 | MoneyCal India',
  description: "Explore Strategic Hub2026 on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/strategic-hub2026'
  }
};

export default function Page() {
  return <ClientComponent />;
}
