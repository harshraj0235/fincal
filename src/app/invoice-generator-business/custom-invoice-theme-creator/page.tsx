import React from 'react';
import { Metadata } from 'next';
import CustomInvoiceThemeCreator from './CustomInvoiceThemeCreator';

export const metadata: Metadata = {
  title: 'Custom Invoice Theme Creator | MoneyCal India',
  description: 'Use our free Custom Invoice Theme Creator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/custom-invoice-theme-creator'
  }
};

export default function Page() {
  return <CustomInvoiceThemeCreator />;
}
