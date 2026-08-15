import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalarySlipAndForm16ToExcelClient';

export const metadata: Metadata = {
  title: 'Salary Slip And Form16To Excel | MoneyCal India',
  description: "Explore Salary Slip And Form16To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/form16/salary-slip-and-form16to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
