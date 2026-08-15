import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTTaxAutoFillInvoiceToolClient';

export const metadata: Metadata = {
  title: 'GSTTax Auto Fill Invoice Tool | MoneyCal India',
  description: "Explore GSTTax Auto Fill Invoice Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/gsttax-auto-fill-invoice-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
