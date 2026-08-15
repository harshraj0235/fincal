import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NetWorthCalculatorClient';

export const metadata: Metadata = {
  title: 'Net Worth Calculator | MoneyCal India',
  description: "Explore Net Worth Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/net-worth-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
