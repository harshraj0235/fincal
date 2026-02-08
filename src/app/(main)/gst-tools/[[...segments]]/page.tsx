import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';
import { getCategoryDescription } from '@/lib/toolsRegistry';

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
  const serverContent = getServerContentForPath(pathname);
  const isTool = serverContent?.type === 'tool';
  const title = isTool
    ? `${(serverContent as { title: string }).title} | GST Tools | MoneyCal India`
    : segments?.length
      ? `GST Tools – ${segments.join(' ')} | MoneyCal`
      : 'GST Tools | MoneyCal India';
  const description = isTool
    ? (serverContent as { description: string }).description
    : getCategoryDescription('gst-tools');
  return {
    title,
    description,
    openGraph: { url: BASE + pathname, title, description },
  };
}

export default async function GstToolsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/gst-tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  const isTool = serverContent?.type === 'tool';
  const tool = isTool ? (serverContent as { title: string; description: string }) : null;

  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="GST Tools">
        {tool ? (
          <article>
            <h1 className="text-3xl font-bold text-gray-900">{tool.title}</h1>
            <p className="text-lg text-gray-700 mt-2">{tool.description}</p>
          </article>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">GST Tools</h1>
            <p className="text-lg text-gray-700 mt-2">{getCategoryDescription('gst-tools')}</p>
          </>
        )}
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
