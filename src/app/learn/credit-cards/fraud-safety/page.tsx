import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FraudSafetyClient';

export const metadata: Metadata = {
  title: 'Fraud Safety | MoneyCal India',
  description: "Explore Fraud Safety on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/fraud-safety'
  }
};

export default function Page() {
  return <ClientComponent />;
}
