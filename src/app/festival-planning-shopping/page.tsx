import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalPlanningShoppingClient';

export const metadata: Metadata = {
  title: 'Festival Planning Shopping | MoneyCal India',
  description: "Explore Festival Planning Shopping on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival-planning-shopping'
  }
};

export default function Page() {
  return <ClientComponent />;
}
