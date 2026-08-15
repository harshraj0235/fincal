import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MeetingAgendaNoteTakerClient';

export const metadata: Metadata = {
  title: 'Meeting Agenda Note Taker | MoneyCal India',
  description: "Explore Meeting Agenda Note Taker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/meeting-agenda-note-taker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
