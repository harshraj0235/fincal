import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FixedVsFloatingClient';

export const metadata: Metadata = {
  title: 'Fixed Vs Floating | MoneyCal India',
  description: "Explore Fixed Vs Floating on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/fixed-vs-floating'
  }
};

export default function Page() {
  return <ClientComponent />;
}
