import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MonthlyPassiveIncomeCalculatorClient';

export const metadata: Metadata = {
  title: 'Monthly Passive Income Calculator | MoneyCal India',
  description: "Explore Monthly Passive Income Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/monthly-passive-income-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
