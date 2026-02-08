import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';

/** Finance Tools: ISR 1 hour */
export const revalidate = 3600;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/finance-tools' + (segments?.length ? '/' + segments.join('/') : '');
  return {
    title: segments?.length ? `Finance Tools – ${segments.join(' ')} | MoneyCal` : 'Finance Tools | MoneyCal India',
    description: 'Mutual fund analysis, SIP vs lumpsum, expense ratio impact, portfolio tools.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function FinanceToolsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/finance-tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Finance Tools">
        <h1 className="text-2xl font-bold text-gray-900">Finance Tools</h1>
        <p className="text-gray-700 mt-2">Mutual fund analysis, SIP vs lumpsum, expense ratio impact, portfolio tools.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
