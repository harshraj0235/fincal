import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalarySlipPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Salary Slip Pdf To Excel | MoneyCal India',
  description: "Explore Salary Slip Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/salary-slip-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
