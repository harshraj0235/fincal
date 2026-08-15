import React from 'react';
import { Metadata } from 'next';
import InvoiceTermsExplainer from './InvoiceTermsExplainerClient';

export const metadata: Metadata = {
  title: 'InvoiceTermsExplainer | MoneyCal India',
  description: 'Free online InvoiceTermsExplainer tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/invoice-terms-explainer',
  }
};

export default function Page() {
  return <InvoiceTermsExplainer />;
}
