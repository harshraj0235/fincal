import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsMoneyClient';

export const metadata: Metadata = {
  title: 'What Is Money | MoneyCal India',
  description: "Explore What Is Money on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/money-management/what-is-money'
  }
};

export default function Page() {
  return <ClientComponent />;
}
