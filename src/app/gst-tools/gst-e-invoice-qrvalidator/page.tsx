import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTEInvoiceQRValidatorClient';

export const metadata: Metadata = {
  title: 'GSTEInvoice QRValidator | MoneyCal India',
  description: "Explore GSTEInvoice QRValidator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gsteinvoice-qrvalidator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
