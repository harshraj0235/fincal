import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './games-hub/GamesHubClient';

export const metadata: Metadata = {
  title: 'Finance Games - Learn Money Management Through Fun Games | MoneyCal',
  description: 'Play free finance games - Stock Simulator, Budget Challenge, Millionaire Quiz, Finance Wordle & more. Learn money management through gaming.',
  keywords: 'finance games, money games, stock simulator game, budget challenge, financial literacy games, millionaire quiz',
  alternates: { canonical: 'https://moneycal.in/games' }
};

export default function Page() {
  return <ClientComponent />;
}
