import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ICICIKotakCreditCardPdfToExcelClient';

export const metadata: Metadata = {
  title: 'ICICIKotak Credit Card Pdf To Excel | MoneyCal India',
  description: "Explore ICICIKotak Credit Card Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/icicikotak-credit-card-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
