import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CreditCardStatementPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Credit Card Statement Pdf To Excel | MoneyCal India',
  description: "Explore Credit Card Statement Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/credit-card-statement-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
