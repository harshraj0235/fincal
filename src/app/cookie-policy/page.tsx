import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CookiePolicyClient';

export const metadata: Metadata = {
  title: 'Cookie Policy | MoneyCal India',
  description: "Explore Cookie Policy on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/cookie-policy'
  }
};

export default function Page() {
  return <ClientComponent />;
}
