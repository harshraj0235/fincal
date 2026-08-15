import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Form16MultipleYearsToTaxHistoryClient';

export const metadata: Metadata = {
  title: 'Form16Multiple Years To Tax History | MoneyCal India',
  description: "Explore Form16Multiple Years To Tax History on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/form16/form16multiple-years-to-tax-history'
  }
};

export default function Page() {
  return <ClientComponent />;
}
