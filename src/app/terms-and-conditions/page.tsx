import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TermsAndConditionsClient';

export const metadata: Metadata = {
  title: 'Terms And Conditions | MoneyCal India',
  description: "Explore Terms And Conditions on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/terms-and-conditions'
  }
};

export default function Page() {
  return <ClientComponent />;
}
