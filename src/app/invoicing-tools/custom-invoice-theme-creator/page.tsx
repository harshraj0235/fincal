import React from 'react';
import { Metadata } from 'next';
import CustomInvoiceThemeCreator from './CustomInvoiceThemeCreatorClient';

export const metadata: Metadata = {
  title: 'CustomInvoiceThemeCreator | MoneyCal India',
  description: 'Free online CustomInvoiceThemeCreator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/custom-invoice-theme-creator',
  }
};

export default function Page() {
  return <CustomInvoiceThemeCreator />;
}
