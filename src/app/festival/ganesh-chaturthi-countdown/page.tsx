import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GaneshChaturthiCountdownClient';

export const metadata: Metadata = {
  title: 'Ganesh Chaturthi Countdown | MoneyCal India',
  description: "Explore Ganesh Chaturthi Countdown on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival/ganesh-chaturthi-countdown'
  }
};

export default function Page() {
  return <ClientComponent />;
}
