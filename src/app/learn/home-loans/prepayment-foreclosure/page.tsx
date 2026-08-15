import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PrepaymentForeclosureClient';

export const metadata: Metadata = {
  title: 'Prepayment Foreclosure | MoneyCal India',
  description: "Explore Prepayment Foreclosure on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/prepayment-foreclosure'
  }
};

export default function Page() {
  return <ClientComponent />;
}
