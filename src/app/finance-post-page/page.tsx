import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinancePostPageClient';

export const metadata: Metadata = {
  title: 'Finance Post Page | MoneyCal India',
  description: "Explore Finance Post Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-post-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
