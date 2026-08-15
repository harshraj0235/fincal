import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CashFlowNetWorthClient';

export const metadata: Metadata = {
  title: 'Cash Flow Net Worth | MoneyCal India',
  description: "Explore Cash Flow Net Worth on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/money-management/cash-flow-net-worth'
  }
};

export default function Page() {
  return <ClientComponent />;
}
