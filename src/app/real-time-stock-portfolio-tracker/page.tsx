import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RealTimeStockPortfolioTrackerClient';

export const metadata: Metadata = {
  title: 'Real Time Stock Portfolio Tracker | MoneyCal India',
  description: "Explore Real Time Stock Portfolio Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/real-time-stock-portfolio-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
