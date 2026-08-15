import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanDefaultConsequencesClient';

export const metadata: Metadata = {
  title: 'Loan Default Consequences | MoneyCal India',
  description: "Explore Loan Default Consequences on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/loan-default-consequences'
  }
};

export default function Page() {
  return <ClientComponent />;
}
