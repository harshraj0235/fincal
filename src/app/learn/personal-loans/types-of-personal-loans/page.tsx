import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TypesOfPersonalLoansClient';

export const metadata: Metadata = {
  title: 'Types Of Personal Loans | MoneyCal India',
  description: "Explore Types Of Personal Loans on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/types-of-personal-loans'
  }
};

export default function Page() {
  return <ClientComponent />;
}
