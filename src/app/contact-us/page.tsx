import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Us | MoneyCal India',
  description: "Explore Contact Us on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/contact-us'
  }
};

export default function Page() {
  return <ClientComponent />;
}
