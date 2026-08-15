import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './OldBankPassbookPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Old Bank Passbook Pdf To Excel | MoneyCal India',
  description: "Explore Old Bank Passbook Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/old-bank-passbook-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
