import React from 'react';
import { Metadata } from 'next';
import MultiCurrencyInvoiceGenerator from './MultiCurrencyInvoiceGeneratorClient';

export const metadata: Metadata = {
  title: 'MultiCurrencyInvoiceGenerator | MoneyCal India',
  description: 'Free online MultiCurrencyInvoiceGenerator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/multi-currency-invoice-generator',
  }
};

export default function Page() {
  return <MultiCurrencyInvoiceGenerator />;
}
