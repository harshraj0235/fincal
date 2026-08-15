import React from 'react';
import { Metadata } from 'next';
import POToInvoiceConverter from './POToInvoiceConverterClient';

export const metadata: Metadata = {
  title: 'POToInvoiceConverter | MoneyCal India',
  description: 'Free online POToInvoiceConverter tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/po-to-invoice-converter',
  }
};

export default function Page() {
  return <POToInvoiceConverter />;
}
