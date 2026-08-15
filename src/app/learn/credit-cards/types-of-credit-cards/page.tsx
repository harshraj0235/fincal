import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TypesOfCreditCardsClient';

export const metadata: Metadata = {
  title: 'Types Of Credit Cards | MoneyCal India',
  description: "Explore Types Of Credit Cards on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/types-of-credit-cards'
  }
};

export default function Page() {
  return <ClientComponent />;
}
