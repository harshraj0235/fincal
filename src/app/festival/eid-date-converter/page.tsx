import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EidDateConverterClient';

export const metadata: Metadata = {
  title: 'Eid Date Converter | MoneyCal India',
  description: "Explore Eid Date Converter on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/eid-date-converter'
  }
};

export default function Page() {
  return <ClientComponent />;
}
