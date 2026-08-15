import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PaymentSecurityGuideClient';

export const metadata: Metadata = {
  title: 'Payment Security Guide | MoneyCal India',
  description: "Explore Payment Security Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/payment-security-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
