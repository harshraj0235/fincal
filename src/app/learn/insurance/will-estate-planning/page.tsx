import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WillEstatePlanningClient';

export const metadata: Metadata = {
  title: 'Will Estate Planning | MoneyCal India',
  description: "Explore Will Estate Planning on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/insurance/will-estate-planning'
  }
};

export default function Page() {
  return <ClientComponent />;
}
