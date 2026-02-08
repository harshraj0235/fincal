'use client';

import App from '../App';
import { ServerContentProvider } from '../contexts/ServerContentContext';

/** Single static import of App so one React/scheduler instance is used (avoids unstable_scheduleCallback). */
export default function AppShell({
  pathname,
  skipLayout,
  serverContent,
}: {
  pathname: string;
  skipLayout?: boolean;
  serverContent?: import('../lib/serverContent').ServerContent | null;
}) {
  return (
    <ServerContentProvider value={serverContent ?? null}>
      <App pathname={pathname} skipLayout={skipLayout} />
    </ServerContentProvider>
  );
}
