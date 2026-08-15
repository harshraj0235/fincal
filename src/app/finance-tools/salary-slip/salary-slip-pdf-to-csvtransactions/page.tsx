import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalarySlipPdfToCSVTransactionsClient';

export const metadata: Metadata = {
  title: 'Salary Slip Pdf To CSVTransactions | MoneyCal India',
  description: "Explore Salary Slip Pdf To CSVTransactions on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/salary-slip-pdf-to-csvtransactions'
  }
};

export default function Page() {
  return <ClientComponent />;
}
