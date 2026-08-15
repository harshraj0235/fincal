import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ExpenseTrackerClient';

export const metadata: Metadata = {
  title: 'Expense Tracker | MoneyCal India',
  description: "Explore Expense Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/expense-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
