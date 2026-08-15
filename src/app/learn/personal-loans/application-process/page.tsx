import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ApplicationProcessClient';

export const metadata: Metadata = {
  title: 'Application Process | MoneyCal India',
  description: "Explore Application Process on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/application-process'
  }
};

export default function Page() {
  return <ClientComponent />;
}
