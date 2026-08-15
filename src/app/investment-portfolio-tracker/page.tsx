import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestmentPortfolioTrackerClient';

export const metadata: Metadata = {
  title: 'Investment Portfolio Tracker | MoneyCal India',
  description: "Explore Investment Portfolio Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/investment-portfolio-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
