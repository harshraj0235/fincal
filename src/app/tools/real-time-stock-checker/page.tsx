import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RealTimeStockCheckerClient';

export const metadata: Metadata = {
  title: 'Real Time Stock Checker | MoneyCal India',
  description: "Explore Real Time Stock Checker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/real-time-stock-checker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
