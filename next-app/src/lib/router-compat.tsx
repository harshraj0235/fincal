/**
 * Next.js router compatibility layer.
 * Use these in place of react-router-dom so the same code works with Next.js App Router.
 * Replace: import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
 * With:    import { Link, useNavigate, useParams, useSearchParams } from '@/lib/router-compat'
 */
'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter, usePathname, useSearchParams as useNextSearchParams } from 'next/navigation';

// Link: accepts "to" (react-router style) and forwards as "href" to next/link
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  href?: string;
  replace?: boolean;
  children?: React.ReactNode;
}
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, href, replace, children, ...rest }, ref) => {
    const url = href ?? to;
    return (
      <NextLink ref={ref} href={url} replace={replace} {...rest}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = 'Link';

// useNavigate: returns push, replace, back to match react-router API
export function useNavigate() {
  const router = useRouter();
  return React.useMemo(
    () => ({
      push: (path: string) => router.push(path),
      replace: (path: string) => router.replace(path),
      back: () => router.back(),
    }),
    [router]
  );
}

// useParams: same API; in Next.js params come from page props, we use useParams() from next/navigation
export { useParams } from 'next/navigation';

// useSearchParams: same API
export function useSearchParams(): URLSearchParams {
  const searchParams = useNextSearchParams();
  const [params] = React.useState(() => new URLSearchParams(searchParams?.toString() ?? ''));
  React.useEffect(() => {
    const str = searchParams?.toString() ?? '';
    params.toString() !== str && [...params.entries()].forEach(([k]) => params.delete(k));
    searchParams?.forEach((v, k) => params.set(k, v));
  }, [searchParams, params]);
  return params;
}

// useLocation: build a location-like object for components that need it
export function useLocation() {
  const pathname = usePathname() ?? '';
  const searchParams = useNextSearchParams();
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : '';
  return React.useMemo(
    () => ({
      pathname,
      search,
      hash: typeof window !== 'undefined' ? window.location.hash : '',
      state: null,
      key: 'default',
    }),
    [pathname, search]
  );
}
