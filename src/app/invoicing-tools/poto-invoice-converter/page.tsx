import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './POToInvoiceConverterClient';

export const metadata: Metadata = {
  title: 'POTo Invoice Converter | MoneyCal India',
  description: "Explore POTo Invoice Converter on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/poto-invoice-converter'
  }
};

export default function Page() {
  return <ClientComponent />;
}
