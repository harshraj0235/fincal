import { useEffect } from 'react';
import { useRouter } from 'next/router';

/** Placeholder page - redirects to home. Required default export for Next.js Pages Router. */
export default function App() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, [router]);
  return null;
}