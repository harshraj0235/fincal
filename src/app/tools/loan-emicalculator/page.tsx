import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanEMICalculatorClient';

export const metadata: Metadata = {
  title: 'Loan EMICalculator | MoneyCal India',
  description: "Explore Loan EMICalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/loan-emicalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
