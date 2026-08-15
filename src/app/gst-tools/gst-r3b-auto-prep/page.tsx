import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GSTR3BAutoPrepClient';

export const metadata: Metadata = {
  title: 'GSTR3BAuto Prep | MoneyCal India',
  description: "Explore GSTR3BAuto Prep on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/gst/gstr3bauto-prep'
  }
};

export default function Page() {
  return <ClientComponent />;
}
