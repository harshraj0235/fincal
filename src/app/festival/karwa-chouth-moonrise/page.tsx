import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './KarwaChouthMoonriseClient';

export const metadata: Metadata = {
  title: 'Karwa Chouth Moonrise | MoneyCal India',
  description: "Explore Karwa Chouth Moonrise on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/karwa-chouth-moonrise'
  }
};

export default function Page() {
  return <ClientComponent />;
}
