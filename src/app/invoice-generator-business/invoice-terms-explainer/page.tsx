import React from 'react';
import { Metadata } from 'next';
import InvoiceTermsExplainer from './InvoiceTermsExplainer';

export const metadata: Metadata = {
  title: 'Invoice Terms Explainer | MoneyCal India',
  description: 'Use our free Invoice Terms Explainer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/invoice-terms-explainer'
  }
};

export default function Page() {
  return <InvoiceTermsExplainer />;
}
