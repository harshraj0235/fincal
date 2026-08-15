import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanSavingsVisualizerClient';

export const metadata: Metadata = {
  title: 'Loan Savings Visualizer | MoneyCal India',
  description: "Explore Loan Savings Visualizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/marketing/loan-savings-visualizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
