import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GuruPurnimaCalendarClient';

export const metadata: Metadata = {
  title: 'Guru Purnima Calendar | MoneyCal India',
  description: "Explore Guru Purnima Calendar on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/guru-purnima-calendar'
  }
};

export default function Page() {
  return <ClientComponent />;
}
