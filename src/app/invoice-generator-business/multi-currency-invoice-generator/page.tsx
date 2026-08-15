import React from 'react';
import { Metadata } from 'next';
import MultiCurrencyInvoiceGenerator from './MultiCurrencyInvoiceGenerator';

export const metadata: Metadata = {
  title: 'Multi Currency Invoice Generator | MoneyCal India',
  description: 'Use our free Multi Currency Invoice Generator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/multi-currency-invoice-generator'
  }
};

export default function Page() {
  return <MultiCurrencyInvoiceGenerator />;
}
