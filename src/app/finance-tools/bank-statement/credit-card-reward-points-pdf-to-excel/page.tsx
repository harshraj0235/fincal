import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CreditCardRewardPointsPdfToExcelClient';

export const metadata: Metadata = {
  title: 'Credit Card Reward Points Pdf To Excel | MoneyCal India',
  description: "Explore Credit Card Reward Points Pdf To Excel on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/bank-statement/credit-card-reward-points-pdf-to-excel'
  }
};

export default function Page() {
  return <ClientComponent />;
}
