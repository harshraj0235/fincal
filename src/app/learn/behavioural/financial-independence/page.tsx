import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinancialIndependenceClient';

export const metadata: Metadata = {
  title: 'Financial Independence | MoneyCal India',
  description: "Explore Financial Independence on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/behavioural/financial-independence'
  }
};

export default function Page() {
  return <ClientComponent />;
}
