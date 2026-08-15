import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ProgrammaticMasterDispatcherClient';

export const metadata: Metadata = {
  title: 'Programmatic Master Dispatcher | MoneyCal India',
  description: "Explore Programmatic Master Dispatcher on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/calculators/programmatic-master-dispatcher'
  }
};

export default function Page() {
  return <ClientComponent />;
}
