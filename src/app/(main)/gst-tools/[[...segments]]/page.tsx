import type { Metadata } from 'next';
import AppShell from '../../../../AppShell';
import { getServerContentForPath } from '../../../../../lib/serverContent';

/** GST Tools: ISR 24h */
export const revalidate = 86400;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/gst-tools' + (segments?.length ? '/' + segments.join('/') : '');
  return {
    title: segments?.length ? `GST Tools – ${segments.join(' ')} | MoneyCal` : 'GST Tools | MoneyCal India',
    description: 'GST calculators, rate finders, invoice helpers for businesses in India.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function GstToolsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/gst-tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="GST Tools">
        <h1 className="text-2xl font-bold text-gray-900">GST Tools</h1>
        <p className="text-gray-700 mt-2">GST calculators, rate finders, invoice helpers for businesses in India.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
