import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ProgrammaticSipDispatcherClient';

export const metadata: Metadata = {
  title: 'Programmatic Sip Dispatcher | MoneyCal India',
  description: "Explore Programmatic Sip Dispatcher on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/calculators/programmatic-sip-dispatcher'
  }
};

export default function Page() {
  return <ClientComponent />;
}
