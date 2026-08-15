import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Form16PartABPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Form16Part ABPdf To Excel | MoneyCal India',
  description: "Explore Form16Part ABPdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/form16/form16part-abpdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
