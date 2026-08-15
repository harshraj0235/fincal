import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ProgrammaticEmiDispatcherClient';

export const metadata: Metadata = {
  title: 'Programmatic Emi Dispatcher | MoneyCal India',
  description: "Explore Programmatic Emi Dispatcher on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/calculators/programmatic-emi-dispatcher'
  }
};

export default function Page() {
  return <ClientComponent />;
}
