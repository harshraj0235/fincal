import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MonthlyBudgetTrackerClient';

export const metadata: Metadata = {
  title: 'Monthly Budget Tracker | MoneyCal India',
  description: "Explore Monthly Budget Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/monthly-budget-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
