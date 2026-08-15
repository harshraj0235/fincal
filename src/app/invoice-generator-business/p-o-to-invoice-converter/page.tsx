import React from 'react';
import { Metadata } from 'next';
import POToInvoiceConverter from './POToInvoiceConverter';

export const metadata: Metadata = {
  title: 'P O To Invoice Converter | MoneyCal India',
  description: 'Use our free P O To Invoice Converter to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/p-o-to-invoice-converter'
  }
};

export default function Page() {
  return <POToInvoiceConverter />;
}
