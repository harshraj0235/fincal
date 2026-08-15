import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PrivateCompanySalarySlipPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Private Company Salary Slip Pdf To Excel | MoneyCal India',
  description: "Explore Private Company Salary Slip Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/private-company-salary-slip-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
