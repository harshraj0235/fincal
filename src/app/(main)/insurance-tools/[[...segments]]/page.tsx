import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';

/** Insurance Tools: ISR 24h – AdSense sensitive */
export const revalidate = 86400;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/insurance-tools' + (segments?.length ? '/' + segments.join('/') : '');
  return {
    title: segments?.length ? `Insurance Tools – ${segments.join(' ')} | MoneyCal` : 'Insurance Tools | MoneyCal India',
    description: 'Term insurance, health insurance, and life insurance calculators.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function InsuranceToolsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/insurance-tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Insurance Tools">
        <h1 className="text-2xl font-bold text-gray-900">Insurance Tools</h1>
        <p className="text-gray-700 mt-2">Term insurance, health insurance, and life insurance calculators.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
