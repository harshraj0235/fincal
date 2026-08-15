import React from 'react';
import { Metadata } from 'next';
import CustomInvoiceGenerator from './CustomInvoiceGenerator';

export const metadata: Metadata = {
  title: 'Custom Invoice Generator | MoneyCal India',
  description: 'Use our free Custom Invoice Generator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/custom-invoice-generator'
  }
};

export default function Page() {
  return <CustomInvoiceGenerator />;
}
