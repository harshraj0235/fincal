import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BusinessFinancialStatementsClient';

export const metadata: Metadata = {
  title: 'Business Financial Statements | MoneyCal India',
  description: "Explore Business Financial Statements on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business/business-financial-statements'
  }
};

export default function Page() {
  return <ClientComponent />;
}
