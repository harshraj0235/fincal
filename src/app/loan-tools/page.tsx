import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanToolsHubClient';

export const metadata: Metadata = {
  title: 'Loan & EMI Calculators | MoneyCal',
  description: 'Plan your home, personal, and car loans effectively with amortization charts and prepayment strategies.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
