import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SavingsGoalCalculatorClient';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator | MoneyCal India',
  description: "Explore Savings Goal Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/savings-goal-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
