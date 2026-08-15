import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestmentGoalPlannerClient';

export const metadata: Metadata = {
  title: 'Investment Goal Planner | MoneyCal India',
  description: "Explore Investment Goal Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/investment-goal-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
