import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsEducationLoanClient';

export const metadata: Metadata = {
  title: 'What Is Education Loan | MoneyCal India',
  description: "Explore What Is Education Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/what-is-education-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
