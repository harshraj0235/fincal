import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PrepaymentOptionsClient';

export const metadata: Metadata = {
  title: 'Prepayment Options | MoneyCal India',
  description: "Explore Prepayment Options on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/prepayment-options'
  }
};

export default function Page() {
  return <ClientComponent />;
}
