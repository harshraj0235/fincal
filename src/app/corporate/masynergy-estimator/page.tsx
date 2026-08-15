import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MASynergyEstimatorClient';

export const metadata: Metadata = {
  title: 'MASynergy Estimator | MoneyCal India',
  description: "Explore MASynergy Estimator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/masynergy-estimator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
