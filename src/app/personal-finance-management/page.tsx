import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PersonalFinanceManagementClient';

export const metadata: Metadata = {
  title: 'Personal Finance Management | MoneyCal India',
  description: "Explore Personal Finance Management on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/personal-finance-management'
  }
};

export default function Page() {
  return <ClientComponent />;
}
