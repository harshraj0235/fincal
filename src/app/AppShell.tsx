'use client';

import App from '../App';

/** Single static import of App so one React/scheduler instance is used (avoids unstable_scheduleCallback). */
export default function AppShell({
  pathname,
  skipLayout,
}: {
  pathname: string;
  skipLayout?: boolean;
}) {
  return <App pathname={pathname} skipLayout={skipLayout} />;
}
