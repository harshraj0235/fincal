import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SecuredVsUnsecuredClient';

export const metadata: Metadata = {
  title: 'Secured Vs Unsecured | MoneyCal India',
  description: "Explore Secured Vs Unsecured on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/secured-vs-unsecured'
  }
};

export default function Page() {
  return <ClientComponent />;
}
