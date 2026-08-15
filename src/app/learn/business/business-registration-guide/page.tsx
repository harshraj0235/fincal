import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BusinessRegistrationGuideClient';

export const metadata: Metadata = {
  title: 'Business Registration Guide | MoneyCal India',
  description: "Explore Business Registration Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business/business-registration-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
