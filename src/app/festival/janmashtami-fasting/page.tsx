import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './JanmashtamiFastingClient';

export const metadata: Metadata = {
  title: 'Janmashtami Fasting | MoneyCal India',
  description: "Explore Janmashtami Fasting on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/janmashtami-fasting'
  }
};

export default function Page() {
  return <ClientComponent />;
}
