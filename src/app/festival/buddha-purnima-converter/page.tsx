import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BuddhaPurnimaConverterClient';

export const metadata: Metadata = {
  title: 'Buddha Purnima Converter | MoneyCal India',
  description: "Explore Buddha Purnima Converter on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/buddha-purnima-converter'
  }
};

export default function Page() {
  return <ClientComponent />;
}
