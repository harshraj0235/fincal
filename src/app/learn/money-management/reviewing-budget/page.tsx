import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ReviewingBudgetClient';

export const metadata: Metadata = {
  title: 'Reviewing Budget | MoneyCal India',
  description: "Explore Reviewing Budget on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/money-management/reviewing-budget'
  }
};

export default function Page() {
  return <ClientComponent />;
}
