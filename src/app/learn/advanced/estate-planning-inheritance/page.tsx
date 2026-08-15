import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EstatePlanningInheritanceClient';

export const metadata: Metadata = {
  title: 'Estate Planning Inheritance | MoneyCal India',
  description: "Explore Estate Planning Inheritance on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/advanced/estate-planning-inheritance'
  }
};

export default function Page() {
  return <ClientComponent />;
}
