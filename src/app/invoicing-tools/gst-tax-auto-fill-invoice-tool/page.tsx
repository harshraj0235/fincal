import React from 'react';
import { Metadata } from 'next';
import GSTTaxAutoFillInvoiceTool from './GSTTaxAutoFillInvoiceToolClient';

export const metadata: Metadata = {
  title: 'GSTTaxAutoFillInvoiceTool | MoneyCal India',
  description: 'Free online GSTTaxAutoFillInvoiceTool tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/gst-tax-auto-fill-invoice-tool',
  }
};

export default function Page() {
  return <GSTTaxAutoFillInvoiceTool />;
}
