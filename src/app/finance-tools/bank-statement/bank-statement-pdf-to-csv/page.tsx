import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankStatementPdfToCSVClient';

export const metadata: Metadata = {
  title: 'Bank Statement Pdf To CSV | MoneyCal India',
  description: "Explore Bank Statement Pdf To CSV on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/bank-statement-pdf-to-csv'
  }
};

export default function Page() {
  return <ClientComponent />;
}
