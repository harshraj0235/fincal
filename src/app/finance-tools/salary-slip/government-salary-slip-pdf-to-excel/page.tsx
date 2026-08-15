import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GovernmentSalarySlipPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Government Salary Slip Pdf To Excel | MoneyCal India',
  description: "Explore Government Salary Slip Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/government-salary-slip-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
