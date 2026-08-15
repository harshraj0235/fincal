import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TimeZoneConverterClient';

export const metadata: Metadata = {
  title: 'Time Zone Converter | MoneyCal India',
  description: "Explore Time Zone Converter on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/time-zone-converter'
  }
};

export default function Page() {
  return <ClientComponent />;
}
