import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CityFestivalWidgetClient';

export const metadata: Metadata = {
  title: 'City Festival Widget | MoneyCal India',
  description: "Explore City Festival Widget on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/city-festival-widget'
  }
};

export default function Page() {
  return <ClientComponent />;
}
