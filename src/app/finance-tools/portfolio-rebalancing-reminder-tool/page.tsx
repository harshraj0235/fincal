import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PortfolioRebalancingReminderToolClient';

export const metadata: Metadata = {
  title: 'Portfolio Rebalancing Reminder Tool | MoneyCal India',
  description: "Explore Portfolio Rebalancing Reminder Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/portfolio-rebalancing-reminder-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
