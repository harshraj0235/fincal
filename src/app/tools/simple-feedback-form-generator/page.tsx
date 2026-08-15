import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SimpleFeedbackFormGeneratorClient';

export const metadata: Metadata = {
  title: 'Simple Feedback Form Generator | MoneyCal India',
  description: "Explore Simple Feedback Form Generator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/simple-feedback-form-generator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
