import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MultipleSalarySlipsToYearlyExcelClient';

export const metadata: Metadata = {
  title: 'Multiple Salary Slips To Yearly Excel | MoneyCal India',
  description: "Explore Multiple Salary Slips To Yearly Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/multiple-salary-slips-to-yearly-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
