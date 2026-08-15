import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ClientComponent from './GovernmentSchemesClient';

export const metadata: Metadata = {
  title: 'Government Schemes | MoneyCal India',
  description: "Explore Government Schemes on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/government-schemes'
  }
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>}>
      <ClientComponent />
    </Suspense>
  );
}
