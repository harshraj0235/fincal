import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RepaymentOptionsClient';

export const metadata: Metadata = {
  title: 'Repayment Options | MoneyCal India',
  description: "Explore Repayment Options on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/gold-loans/repayment-options'
  }
};

export default function Page() {
  return <ClientComponent />;
}
