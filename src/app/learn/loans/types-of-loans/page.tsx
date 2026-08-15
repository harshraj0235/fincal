import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TypesOfLoansClient';

export const metadata: Metadata = {
  title: 'Types Of Loans | MoneyCal India',
  description: "Explore Types Of Loans on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/types-of-loans'
  }
};

export default function Page() {
  return <ClientComponent />;
}
