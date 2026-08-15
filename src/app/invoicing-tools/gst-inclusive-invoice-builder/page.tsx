import React from 'react';
import { Metadata } from 'next';
import GSTInclusiveInvoiceBuilder from './GSTInclusiveInvoiceBuilderClient';

export const metadata: Metadata = {
  title: 'GSTInclusiveInvoiceBuilder | MoneyCal India',
  description: 'Free online GSTInclusiveInvoiceBuilder tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/gst-inclusive-invoice-builder',
  }
};

export default function Page() {
  return <GSTInclusiveInvoiceBuilder />;
}
