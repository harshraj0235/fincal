import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BestCreditCardsClient';

export const metadata: Metadata = {
  title: 'Best Credit Cards | MoneyCal India',
  description: "Explore Best Credit Cards on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/best-credit-cards'
  }
};

export default function Page() {
  return <ClientComponent />;
}
