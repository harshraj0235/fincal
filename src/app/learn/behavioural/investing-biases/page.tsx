import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestingBiasesClient';

export const metadata: Metadata = {
  title: 'Investing Biases | MoneyCal India',
  description: "Explore Investing Biases on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/behavioural/investing-biases'
  }
};

export default function Page() {
  return <ClientComponent />;
}
