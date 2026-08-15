import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsCreditScoreClient';

export const metadata: Metadata = {
  title: 'What Is Credit Score | MoneyCal India',
  description: "Explore What Is Credit Score on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/what-is-credit-score'
  }
};

export default function Page() {
  return <ClientComponent />;
}
