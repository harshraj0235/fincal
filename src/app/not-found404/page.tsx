import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NotFound404Client';

export const metadata: Metadata = {
  title: 'Not Found404 | MoneyCal India',
  description: "Explore Not Found404 on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/not-found404'
  }
};

export default function Page() {
  return <ClientComponent />;
}
