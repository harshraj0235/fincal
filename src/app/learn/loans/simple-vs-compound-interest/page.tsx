import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SimpleVsCompoundInterestClient';

export const metadata: Metadata = {
  title: 'Simple Vs Compound Interest | MoneyCal India',
  description: "Explore Simple Vs Compound Interest on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/simple-vs-compound-interest'
  }
};

export default function Page() {
  return <ClientComponent />;
}
