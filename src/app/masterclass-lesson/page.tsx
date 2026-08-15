import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MasterclassLessonClient';

export const metadata: Metadata = {
  title: 'Masterclass Lesson | MoneyCal India',
  description: "Explore Masterclass Lesson on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/masterclass-lesson'
  }
};

export default function Page() {
  return <ClientComponent />;
}
