import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BonusSalarySlipBreakdownClient';

export const metadata: Metadata = {
  title: 'Bonus Salary Slip Breakdown | MoneyCal India',
  description: "Explore Bonus Salary Slip Breakdown on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/bonus-salary-slip-breakdown'
  }
};

export default function Page() {
  return <ClientComponent />;
}
