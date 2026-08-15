import React from 'react';
import { Metadata } from 'next';
import GSTInclusiveInvoiceBuilder from './GSTInclusiveInvoiceBuilder';

export const metadata: Metadata = {
  title: 'G S T Inclusive Invoice Builder | MoneyCal India',
  description: 'Use our free G S T Inclusive Invoice Builder to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/g-s-t-inclusive-invoice-builder'
  }
};

export default function Page() {
  return <GSTInclusiveInvoiceBuilder />;
}
