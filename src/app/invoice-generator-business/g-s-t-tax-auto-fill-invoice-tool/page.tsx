import React from 'react';
import { Metadata } from 'next';
import GSTTaxAutoFillInvoiceTool from './GSTTaxAutoFillInvoiceTool';

export const metadata: Metadata = {
  title: 'G S T Tax Auto Fill Invoice Tool | MoneyCal India',
  description: 'Use our free G S T Tax Auto Fill Invoice Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/g-s-t-tax-auto-fill-invoice-tool'
  }
};

export default function Page() {
  return <GSTTaxAutoFillInvoiceTool />;
}
