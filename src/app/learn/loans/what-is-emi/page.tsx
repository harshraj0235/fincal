import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsEMIClient';

export const metadata: Metadata = {
  title: 'What Is EMI | MoneyCal India',
  description: "Explore What Is EMI on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/what-is-emi'
  }
};

export default function Page() {
  return <ClientComponent />;
}
