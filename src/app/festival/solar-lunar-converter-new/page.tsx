import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SolarLunarConverterNewClient';

export const metadata: Metadata = {
  title: 'Solar Lunar Converter New | MoneyCal India',
  description: "Explore Solar Lunar Converter New on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/solar-lunar-converter-new'
  }
};

export default function Page() {
  return <ClientComponent />;
}
