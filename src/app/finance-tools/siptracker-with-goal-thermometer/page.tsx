import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPTrackerWithGoalThermometerClient';

export const metadata: Metadata = {
  title: 'SIPTracker With Goal Thermometer | MoneyCal India',
  description: "Explore SIPTracker With Goal Thermometer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/siptracker-with-goal-thermometer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
