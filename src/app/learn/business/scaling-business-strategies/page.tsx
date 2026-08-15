import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ScalingBusinessStrategiesClient';

export const metadata: Metadata = {
  title: 'Scaling Business Strategies | MoneyCal India',
  description: "Explore Scaling Business Strategies on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business/scaling-business-strategies'
  }
};

export default function Page() {
  return <ClientComponent />;
}
