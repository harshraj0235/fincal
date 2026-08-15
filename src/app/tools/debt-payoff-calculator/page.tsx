import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DebtPayoffCalculatorClient';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator | MoneyCal India',
  description: "Explore Debt Payoff Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/debt-payoff-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
