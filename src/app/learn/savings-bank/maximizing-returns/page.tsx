import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MaximizingReturnsClient';

export const metadata: Metadata = {
  title: 'Maximizing Returns | MoneyCal India',
  description: "Explore Maximizing Returns on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/maximizing-returns'
  }
};

export default function Page() {
  return <ClientComponent />;
}
