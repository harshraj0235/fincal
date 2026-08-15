import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StudyAbroadClient';

export const metadata: Metadata = {
  title: 'Study Abroad | MoneyCal India',
  description: "Explore Study Abroad on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/study-abroad'
  }
};

export default function Page() {
  return <ClientComponent />;
}
