import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SimpleDailyExpenseTrackerClient';

export const metadata: Metadata = {
  title: 'Simple Daily Expense Tracker | MoneyCal India',
  description: "Explore Simple Daily Expense Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/simple-daily-expense-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
