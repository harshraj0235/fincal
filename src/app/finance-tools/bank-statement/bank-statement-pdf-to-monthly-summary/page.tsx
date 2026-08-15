import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankStatementPdfToMonthlySummaryClient';

export const metadata: Metadata = {
  title: 'Bank Statement Pdf To Monthly Summary | MoneyCal India',
  description: "Explore Bank Statement Pdf To Monthly Summary on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/bank-statement-pdf-to-monthly-summary'
  }
};

export default function Page() {
  return <ClientComponent />;
}
