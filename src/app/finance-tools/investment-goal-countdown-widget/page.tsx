import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestmentGoalCountdownWidgetClient';

export const metadata: Metadata = {
  title: 'Investment Goal Countdown Widget | MoneyCal India',
  description: "Explore Investment Goal Countdown Widget on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/investment-goal-countdown-widget'
  }
};

export default function Page() {
  return <ClientComponent />;
}
