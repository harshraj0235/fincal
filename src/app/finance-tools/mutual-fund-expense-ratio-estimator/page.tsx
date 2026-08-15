import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundExpenseRatioEstimatorClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Expense Ratio Estimator | MoneyCal India',
  description: "Explore Mutual Fund Expense Ratio Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-expense-ratio-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
