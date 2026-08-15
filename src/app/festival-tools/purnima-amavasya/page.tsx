import React from 'react';
import { Metadata } from 'next';
import PurnimaAmavasya from './PurnimaAmavasya';

export const metadata: Metadata = {
  title: 'Purnima Amavasya | MoneyCal India',
  description: 'Use our free Purnima Amavasya to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/purnima-amavasya'
  }
};

export default function Page() {
  return <PurnimaAmavasya />;
}
