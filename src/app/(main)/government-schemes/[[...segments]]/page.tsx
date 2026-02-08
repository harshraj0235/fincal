import type { Metadata } from 'next';
import AppShell from '../../../../AppShell';
import { getServerContentForPath } from '../../../../../lib/serverContent';

/** Government: ISR 7 days – trust + E-E-A-T */
export const revalidate = 604800;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/government-schemes' + (segments?.length ? '/' + segments.join('/') : '');
  return {
    title: segments?.length ? `Government Schemes – ${segments.join(' ')} | MoneyCal` : 'Government Schemes | MoneyCal India',
    description: 'Guides and calculators for PPF, NPS, Sukanya Samriddhi, and government savings schemes.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function GovernmentSchemesPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/government-schemes' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Government Schemes">
        <h1 className="text-2xl font-bold text-gray-900">Government Schemes</h1>
        <p className="text-gray-700 mt-2">Guides and calculators for PPF, NPS, Sukanya Samriddhi, and government savings schemes.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
