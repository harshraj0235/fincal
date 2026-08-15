import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RetirementPlanningClient';

export const metadata: Metadata = {
  title: 'Retirement Planning | MoneyCal India',
  description: "Explore Retirement Planning on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/insurance/retirement-planning'
  }
};

export default function Page() {
  return <ClientComponent />;
}
