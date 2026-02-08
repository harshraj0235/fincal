import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';
import { getCategoryDescription } from '@/lib/toolsRegistry';

/** Tax Tools: force-dynamic – React Router context null during prerender */
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/tax-tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  const isTool = serverContent?.type === 'tool';
  const title = isTool
    ? `${(serverContent as { title: string }).title} | Tax Tools | MoneyCal India`
    : segments?.length
      ? `Tax Tools – ${segments.join(' ')} | MoneyCal`
      : 'Tax Tools | MoneyCal India';
  const description = isTool
    ? (serverContent as { description: string }).description
    : getCategoryDescription('tax-tools');
  return {
    title,
    description,
    openGraph: { url: BASE + pathname, title, description },
  };
}

export default async function TaxToolsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/tax-tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  const isTool = serverContent?.type === 'tool';
  const tool = isTool ? (serverContent as { title: string; description: string }) : null;

  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Tax Tools">
        {tool ? (
          <article>
            <h1 className="text-3xl font-bold text-gray-900">{tool.title}</h1>
            <p className="text-lg text-gray-700 mt-2">{tool.description}</p>
          </article>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">Tax Tools</h1>
            <p className="text-lg text-gray-700 mt-2">{getCategoryDescription('tax-tools')}</p>
          </>
        )}
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
