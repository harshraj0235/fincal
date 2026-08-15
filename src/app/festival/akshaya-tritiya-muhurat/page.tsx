import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AkshayaTritiyaMuhuratClient';

export const metadata: Metadata = {
  title: 'Akshaya Tritiya Muhurat | MoneyCal India',
  description: "Explore Akshaya Tritiya Muhurat on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/akshaya-tritiya-muhurat'
  }
};

export default function Page() {
  return <ClientComponent />;
}
