import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CompositionSchemeCheckerPageClient';

export const metadata: Metadata = {
  title: 'Composition Scheme Checker Page | MoneyCal India',
  description: "Explore Composition Scheme Checker Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/composition-scheme-checker-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
