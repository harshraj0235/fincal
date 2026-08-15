import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ITRFormTypeHelperClient';

export const metadata: Metadata = {
  title: 'ITRForm Type Helper | MoneyCal India',
  description: "Explore ITRForm Type Helper on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/itrform-type-helper'
  }
};

export default function Page() {
  return <ClientComponent />;
}
