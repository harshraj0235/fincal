import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvoiceItemLibraryClient';

export const metadata: Metadata = {
  title: 'Invoice Item Library | MoneyCal India',
  description: "Explore Invoice Item Library on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/invoice-item-library'
  }
};

export default function Page() {
  return <ClientComponent />;
}
