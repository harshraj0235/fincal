import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LohriSunriseSunsetClient';

export const metadata: Metadata = {
  title: 'Lohri Sunrise Sunset | MoneyCal India',
  description: "Explore Lohri Sunrise Sunset on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/lohri-sunrise-sunset'
  }
};

export default function Page() {
  return <ClientComponent />;
}
