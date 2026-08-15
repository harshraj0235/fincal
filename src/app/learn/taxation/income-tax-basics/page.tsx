import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IncomeTaxBasicsClient';

export const metadata: Metadata = {
  title: 'Income Tax Basics | MoneyCal India',
  description: "Explore Income Tax Basics on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/income-tax-basics'
  }
};

export default function Page() {
  return <ClientComponent />;
}
