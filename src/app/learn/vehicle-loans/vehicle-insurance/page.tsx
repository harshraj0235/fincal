import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './VehicleInsuranceClient';

export const metadata: Metadata = {
  title: 'Vehicle Insurance | MoneyCal India',
  description: "Explore Vehicle Insurance on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/vehicle-insurance'
  }
};

export default function Page() {
  return <ClientComponent />;
}
