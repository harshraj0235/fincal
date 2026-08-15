import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MillionaireQuizClient';

export const metadata: Metadata = {
  title: 'Millionaire Quiz | MoneyCal India',
  description: "Explore Millionaire Quiz on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/games/millionaire-quiz'
  }
};

export default function Page() {
  return <ClientComponent />;
}
