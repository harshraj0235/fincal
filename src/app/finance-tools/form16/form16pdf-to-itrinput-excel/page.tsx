import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './Form16PdfToITRInputExcelClient';

export const metadata: Metadata = {
  title: 'Form16Pdf To ITRInput Excel | MoneyCal India',
  description: "Explore Form16Pdf To ITRInput Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/form16/form16pdf-to-itrinput-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
