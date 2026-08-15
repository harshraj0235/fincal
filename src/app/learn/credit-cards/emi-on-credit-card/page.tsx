import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EmiOnCreditCardClient';

export const metadata: Metadata = {
  title: 'Emi On Credit Card | MoneyCal India',
  description: "Explore Emi On Credit Card on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/emi-on-credit-card'
  }
};

export default function Page() {
  return <ClientComponent />;
}
