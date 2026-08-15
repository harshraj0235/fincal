import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinanceGPTClient';

export const metadata: Metadata = {
  title: 'Finance GPT | MoneyCal India',
  description: "Explore Finance GPT on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-gpt'
  }
};

export default function Page() {
  return <ClientComponent />;
}
