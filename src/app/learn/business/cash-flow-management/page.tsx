import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CashFlowManagementClient';

export const metadata: Metadata = {
  title: 'Cash Flow Management | MoneyCal India',
  description: "Explore Cash Flow Management on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business/cash-flow-management'
  }
};

export default function Page() {
  return <ClientComponent />;
}
