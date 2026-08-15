import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HDFCSBIAxisStatementPdfToExcelClient';

export const metadata: Metadata = {
  title: 'HDFCSBIAxis Statement Pdf To Excel | MoneyCal India',
  description: "Explore HDFCSBIAxis Statement Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/hdfcsbiaxis-statement-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
