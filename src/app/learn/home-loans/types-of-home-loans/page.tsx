import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TypesOfHomeLoansClient';

export const metadata: Metadata = {
  title: 'Types Of Home Loans | MoneyCal India',
  description: "Explore Types Of Home Loans on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/types-of-home-loans'
  }
};

export default function Page() {
  return <ClientComponent />;
}
