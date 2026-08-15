import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankingKnowledgeClient';

export const metadata: Metadata = {
  title: 'Banking Knowledge | MoneyCal India',
  description: "Explore Banking Knowledge on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/banking-knowledge'
  }
};

export default function Page() {
  return <ClientComponent />;
}
