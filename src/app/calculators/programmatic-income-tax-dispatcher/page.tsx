import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ProgrammaticIncomeTaxDispatcherClient';

export const metadata: Metadata = {
  title: 'Programmatic Income Tax Dispatcher | MoneyCal India',
  description: "Explore Programmatic Income Tax Dispatcher on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/calculators/programmatic-income-tax-dispatcher'
  }
};

export default function Page() {
  return <ClientComponent />;
}
