import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SolarLunarConverterClient';

export const metadata: Metadata = {
  title: 'Solar Lunar Converter | MoneyCal India',
  description: "Explore Solar Lunar Converter on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/solar-lunar-converter'
  }
};

export default function Page() {
  return <ClientComponent />;
}
