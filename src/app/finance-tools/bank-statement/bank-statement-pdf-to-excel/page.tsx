import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankStatementPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Bank Statement Pdf To Excel | MoneyCal India',
  description: "Explore Bank Statement Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/bank-statement-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
