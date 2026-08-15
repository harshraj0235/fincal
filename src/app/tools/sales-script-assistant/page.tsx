import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalesScriptAssistantClient';

export const metadata: Metadata = {
  title: 'Sales Script Assistant | MoneyCal India',
  description: "Explore Sales Script Assistant on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/sales-script-assistant'
  }
};

export default function Page() {
  return <ClientComponent />;
}
