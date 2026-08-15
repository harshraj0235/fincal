import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RepaymentMoratoriumClient';

export const metadata: Metadata = {
  title: 'Repayment Moratorium | MoneyCal India',
  description: "Explore Repayment Moratorium on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/repayment-moratorium'
  }
};

export default function Page() {
  return <ClientComponent />;
}
