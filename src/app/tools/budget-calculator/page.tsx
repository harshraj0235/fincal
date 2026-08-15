import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BudgetCalculatorClient';

export const metadata: Metadata = {
  title: 'Budget Calculator | MoneyCal India',
  description: "Explore Budget Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/budget-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
