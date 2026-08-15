import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './VacationBudgetPlannerClient';

export const metadata: Metadata = {
  title: 'Vacation Budget Planner | MoneyCal India',
  description: "Explore Vacation Budget Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/vacation-budget-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
