import React from 'react';
import { Metadata } from 'next';
import PartialPaymentInvoiceTracker from './PartialPaymentInvoiceTrackerClient';

export const metadata: Metadata = {
  title: 'PartialPaymentInvoiceTracker | MoneyCal India',
  description: 'Free online PartialPaymentInvoiceTracker tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/partial-payment-invoice-tracker',
  }
};

export default function Page() {
  return <PartialPaymentInvoiceTracker />;
}
