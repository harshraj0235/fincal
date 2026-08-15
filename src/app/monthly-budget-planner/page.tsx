import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MonthlyBudgetPlannerClient';

export const metadata: Metadata = {
  title: 'Monthly Budget Planner | MoneyCal India',
  description: "Explore Monthly Budget Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/monthly-budget-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
