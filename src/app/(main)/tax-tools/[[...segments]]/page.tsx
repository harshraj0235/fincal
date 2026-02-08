import type { Metadata } from 'next';
import AppShell from '../../../../AppShell';
import { getServerContentForPath } from '../../../../../lib/serverContent';

/** Tax Tools: ISR 24h – seasonal spikes */
export const revalidate = 86400;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/tax-tools' + (segments?.length ? '/' + segments.join('/') : '');
  return {
    title: segments?.length ? `Tax Tools – ${segments.join(' ')} | MoneyCal` : 'Tax Tools | MoneyCal India',
    description: 'Income tax, TDS, capital gains, and tax planning tools for India.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function TaxToolsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/tax-tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Tax Tools">
        <h1 className="text-2xl font-bold text-gray-900">Tax Tools</h1>
        <p className="text-gray-700 mt-2">Income tax, TDS, capital gains, and tax planning tools for India.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
