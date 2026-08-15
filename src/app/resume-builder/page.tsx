import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ResumeBuilderClient';

export const metadata: Metadata = {
  title: 'Resume Builder | MoneyCal India',
  description: "Explore Resume Builder on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/resume-builder'
  }
};

export default function Page() {
  return <ClientComponent />;
}
