import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GoalBasedInvestmentAllocatorClient';

export const metadata: Metadata = {
  title: 'Goal Based Investment Allocator | MoneyCal India',
  description: "Explore Goal Based Investment Allocator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/goal-based-investment-allocator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
