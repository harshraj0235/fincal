import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial GK - Finance General Knowledge Quiz & Learning | MoneyCal',
  description: 'Test your financial knowledge - banking GK, economy quiz, finance general knowledge, competitive exam preparation for banking & finance.',
  keywords: 'financial GK, banking GK quiz, economy general knowledge, finance quiz, banking exam preparation',
  alternates: { canonical: 'https://moneycal.in/gk' }
};

export default function Page() {
  redirect('/moneycal-gk');
}
