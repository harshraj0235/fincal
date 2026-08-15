import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MinimumVsFullPaymentClient';

export const metadata: Metadata = {
  title: 'Minimum Vs Full Payment | MoneyCal India',
  description: "Explore Minimum Vs Full Payment on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/minimum-vs-full-payment'
  }
};

export default function Page() {
  return <ClientComponent />;
}
