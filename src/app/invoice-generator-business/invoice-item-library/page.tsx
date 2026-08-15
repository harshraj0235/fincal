import React from 'react';
import { Metadata } from 'next';
import InvoiceItemLibrary from './InvoiceItemLibrary';

export const metadata: Metadata = {
  title: 'Invoice Item Library | MoneyCal India',
  description: 'Use our free Invoice Item Library to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/invoice-item-library'
  }
};

export default function Page() {
  return <InvoiceItemLibrary />;
}
