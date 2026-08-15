import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalarySlipPdfToCleanPdfClient';

export const metadata: Metadata = {
  title: 'Salary Slip Pdf To Clean Pdf | MoneyCal India',
  description: "Explore Salary Slip Pdf To Clean Pdf on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/salary-slip/salary-slip-pdf-to-clean-pdf'
  }
};

export default function Page() {
  return <ClientComponent />;
}
