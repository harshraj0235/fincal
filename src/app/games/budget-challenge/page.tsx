import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BudgetChallengeClient';

export const metadata: Metadata = {
  title: 'Budget Challenge | MoneyCal India',
  description: "Explore Budget Challenge on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/games/budget-challenge'
  }
};

export default function Page() {
  return <ClientComponent />;
}
