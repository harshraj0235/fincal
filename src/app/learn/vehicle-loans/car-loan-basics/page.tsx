import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CarLoanBasicsClient';

export const metadata: Metadata = {
  title: 'Car Loan Basics | MoneyCal India',
  description: "Explore Car Loan Basics on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/car-loan-basics'
  }
};

export default function Page() {
  return <ClientComponent />;
}
