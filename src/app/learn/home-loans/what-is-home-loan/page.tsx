import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsHomeLoanClient';

export const metadata: Metadata = {
  title: 'What Is Home Loan | MoneyCal India',
  description: "Explore What Is Home Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/what-is-home-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
