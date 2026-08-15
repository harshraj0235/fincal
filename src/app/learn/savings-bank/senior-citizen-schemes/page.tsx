import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SeniorCitizenSchemesClient';

export const metadata: Metadata = {
  title: 'Senior Citizen Schemes | MoneyCal India',
  description: "Explore Senior Citizen Schemes on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/senior-citizen-schemes'
  }
};

export default function Page() {
  return <ClientComponent />;
}
