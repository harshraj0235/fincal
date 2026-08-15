import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DownPaymentStrategyClient';

export const metadata: Metadata = {
  title: 'Down Payment Strategy | MoneyCal India',
  description: "Explore Down Payment Strategy on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/down-payment-strategy'
  }
};

export default function Page() {
  return <ClientComponent />;
}
