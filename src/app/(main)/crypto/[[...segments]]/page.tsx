import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';

export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/crypto' + (segments?.length ? '/' + segments.join('/') : '');
  return {
    title: segments?.length ? `Crypto – ${segments.join(' ')} | MoneyCal` : 'Crypto | MoneyCal India',
    description: 'Cryptocurrency basics, tax implications, and resources for Indian investors.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function CryptoPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/crypto' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Crypto">
        <h1 className="text-2xl font-bold text-gray-900">Crypto</h1>
        <p className="text-gray-700 mt-2">Cryptocurrency basics, tax implications, and resources for Indian investors.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
