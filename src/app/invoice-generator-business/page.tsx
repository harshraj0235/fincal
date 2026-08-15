import React from 'react';
import { Metadata } from 'next';
import InvoiceGeneratorBusinessClient from './InvoiceGeneratorBusinessClient';

export const metadata: Metadata = {
  title: 'Invoice Generator Business | MoneyCal.in',
  description: 'Create professional business invoices instantly.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business'
  }
};

export default function Page() {
  return <InvoiceGeneratorBusinessClient />;
}
