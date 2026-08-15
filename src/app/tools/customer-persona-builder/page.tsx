import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CustomerPersonaBuilderClient';

export const metadata: Metadata = {
  title: 'Customer Persona Builder | MoneyCal India',
  description: "Explore Customer Persona Builder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/customer-persona-builder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
