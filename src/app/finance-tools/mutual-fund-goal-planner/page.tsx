import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundGoalPlannerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Goal Planner | MoneyCal India',
  description: "Explore Mutual Fund Goal Planner on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-goal-planner'
  }
};

export default function Page() {
  return <ClientComponent />;
}
