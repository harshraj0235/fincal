import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PersonalFinanceDashboardClient';

export const metadata: Metadata = {
  title: 'Personal Finance Dashboard | MoneyCal India',
  description: "Explore Personal Finance Dashboard on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/personal-finance-dashboard'
  }
};

export default function Page() {
  return <ClientComponent />;
}
