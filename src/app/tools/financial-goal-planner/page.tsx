import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinancialGoalPlannerClient';

export const metadata: Metadata = {
  title: 'Financial Goal Planner | MoneyCal India',
  description: "Explore Financial Goal Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/financial-goal-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
