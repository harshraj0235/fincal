import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTInclusiveInvoiceBuilderClient';

export const metadata: Metadata = {
  title: 'GSTInclusive Invoice Builder | MoneyCal India',
  description: "Explore GSTInclusive Invoice Builder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/gstinclusive-invoice-builder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
