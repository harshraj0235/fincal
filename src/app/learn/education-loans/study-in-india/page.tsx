import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StudyInIndiaClient';

export const metadata: Metadata = {
  title: 'Study In India | MoneyCal India',
  description: "Explore Study In India on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/study-in-india'
  }
};

export default function Page() {
  return <ClientComponent />;
}
