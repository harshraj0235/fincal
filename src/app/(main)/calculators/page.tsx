import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';

const BASE = 'https://moneycal.in';

export const metadata: Metadata = {
  title: 'Calculators | MoneyCal India',
  description: 'Free online calculators for EMI, SIP, tax, PPF, NPS, loans, insurance, and more. Built for Indian users.',
  openGraph: { url: BASE + '/calculators' },
};

export default function CalculatorsHubPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Calculators">
        <h1 className="text-2xl font-bold text-gray-900">Calculators</h1>
        <p className="text-gray-700 mt-2">Free online calculators for EMI, SIP, tax, PPF, NPS, loans, insurance, and more. Built for Indian users.</p>
      </main>
      <AppShell pathname="/calculators" skipLayout />
    </>
  );
}
