import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EasterDateToolClient';

export const metadata: Metadata = {
  title: 'Easter Date Tool | MoneyCal India',
  description: "Explore Easter Date Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/easter-date-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
