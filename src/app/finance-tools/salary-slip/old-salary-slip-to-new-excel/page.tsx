import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './OldSalarySlipToNewExcelClient';

export const metadata: Metadata = {
  title: 'Old Salary Slip To New Excel | MoneyCal India',
  description: "Explore Old Salary Slip To New Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/old-salary-slip-to-new-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
