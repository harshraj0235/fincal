import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundPortfolioRebalancerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Portfolio Rebalancer | MoneyCal India',
  description: "Explore Mutual Fund Portfolio Rebalancer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-portfolio-rebalancer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
