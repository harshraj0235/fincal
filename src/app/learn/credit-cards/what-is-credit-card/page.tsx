import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsCreditCardClient';

export const metadata: Metadata = {
  title: 'What Is Credit Card | MoneyCal India',
  description: "Explore What Is Credit Card on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/what-is-credit-card'
  }
};

export default function Page() {
  return <ClientComponent />;
}
