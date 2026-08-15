import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTInvoiceGeneratorClient';

export const metadata: Metadata = {
  title: 'GSTInvoice Generator | MoneyCal India',
  description: "Explore GSTInvoice Generator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstinvoice-generator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
