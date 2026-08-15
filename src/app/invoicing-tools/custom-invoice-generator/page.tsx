import React from 'react';
import { Metadata } from 'next';
import CustomInvoiceGenerator from './CustomInvoiceGeneratorClient';

export const metadata: Metadata = {
  title: 'CustomInvoiceGenerator | MoneyCal India',
  description: 'Free online CustomInvoiceGenerator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/custom-invoice-generator',
  }
};

export default function Page() {
  return <CustomInvoiceGenerator />;
}
