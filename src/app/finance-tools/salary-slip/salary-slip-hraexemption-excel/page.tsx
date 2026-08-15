import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalarySlipHRAExemptionExcelClient';

export const metadata: Metadata = {
  title: 'Salary Slip HRAExemption Excel | MoneyCal India',
  description: "Explore Salary Slip HRAExemption Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/salary-slip-hraexemption-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
