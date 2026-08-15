import React from 'react';
import { Metadata } from 'next';
import PartialPaymentInvoiceTracker from './PartialPaymentInvoiceTracker';

export const metadata: Metadata = {
  title: 'Partial Payment Invoice Tracker | MoneyCal India',
  description: 'Use our free Partial Payment Invoice Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/partial-payment-invoice-tracker'
  }
};

export default function Page() {
  return <PartialPaymentInvoiceTracker />;
}
