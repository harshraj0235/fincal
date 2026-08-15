import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExpenseRatioImpactVisualToolClient';

export const metadata: Metadata = {
  title: 'Expense Ratio Impact Visual Tool | MoneyCal India',
  description: "Explore Expense Ratio Impact Visual Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/expense-ratio-impact-visual-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
