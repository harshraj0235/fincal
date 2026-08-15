import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RepaymentStrategiesClient';

export const metadata: Metadata = {
  title: 'Repayment Strategies | MoneyCal India',
  description: "Explore Repayment Strategies on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/repayment-strategies'
  }
};

export default function Page() {
  return <ClientComponent />;
}
