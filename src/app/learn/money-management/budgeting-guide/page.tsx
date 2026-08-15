import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BudgetingGuideClient';

export const metadata: Metadata = {
  title: 'Budgeting Guide | MoneyCal India',
  description: "Explore Budgeting Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/money-management/budgeting-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
