import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundExpenseRatioCalculatorClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Expense Ratio Calculator | MoneyCal India',
  description: "Explore Mutual Fund Expense Ratio Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-expense-ratio-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
