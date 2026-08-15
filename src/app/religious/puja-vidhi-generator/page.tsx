import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PujaVidhiGeneratorClient';

export const metadata: Metadata = {
  title: 'Puja Vidhi Generator | MoneyCal India',
  description: "Explore Puja Vidhi Generator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/religious/puja-vidhi-generator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
