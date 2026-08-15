import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinancialHabitsClient';

export const metadata: Metadata = {
  title: 'Financial Habits | MoneyCal India',
  description: "Explore Financial Habits on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/money-management/financial-habits'
  }
};

export default function Page() {
  return <ClientComponent />;
}
