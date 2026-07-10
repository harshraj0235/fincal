import React, { useEffect, useMemo, useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';

interface LinkItem {
  url: string;
  path: string;
  group: string;
}

const blockedPatterns = [
  '/admin/', '/private/', '/api/', '/redirect', '/404', '/error', '/duplicate', '/copy'
];

const normalizePath = (u: string): string => {
  try {
    const url = u.startsWith('http') ? new URL(u) : new URL(`https://moneycal.in${u}`);
    let p = url.pathname.replace(/^\/moneycal\.in(?=\/|$)/i, '') || '/';
    p = p.replace(/\/+/g, '/');
    if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
    return p;
  } catch {
    let p = u || '/';
    p = p.replace(/^\/moneycal\.in(?=\/|$)/i, '') || '/';
    p = p.replace(/\/+/g, '/');
    if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
    return p;
  }
};

const groupFor = (p: string): string => {
  const seg = (p.split('/').filter(Boolean)[0] || 'root').toLowerCase();
  return seg || 'root';
};

const BrowseAll: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [redirectSources, setRedirectSources] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      const files = ['/all-urls-from-code.txt', '/all-urls-master.txt', '/all-urls-complete.txt'];
      const urls = new Set<string>();
      for (const f of files) {
        try {
          const res = await fetch(f);
          if (!res.ok) continue;
          const text = await res.text();
          text.split(/\r?\n/).forEach(line => {
            const l = line.trim();
            if (!l) return;
            if (!l.startsWith('http')) return;
            if (!l.includes('moneycal.in')) return;
            urls.add(l);
          });
        } catch {
          setLinks((prev) => prev);
        }
      }
      const parsed: LinkItem[] = Array.from(urls).map(u => {
        const path = normalizePath(u);
        return { url: `https://moneycal.in${path}`, path, group: groupFor(path) };
      }).filter(item => {
        const p = item.path.toLowerCase();
        if (redirectSources.has(p)) return false;
        if (blockedPatterns.some(b => p.includes(b))) return false;
        return true;
      });
      setLinks(parsed);
    };
    const loadRedirects = async () => {
      try {
        const res = await fetch('/_redirects');
        if (!res.ok) return;
        const text = await res.text();
        const set = new Set<string>();
        text.split(/\r?\n/).forEach(line => {
          const l = line.trim();
          if (!l || l.startsWith('#')) return;
          const src = l.split(/\s+/)[0] || '';
          if (!src.startsWith('/')) return;
          let p = src.replace(/:splat/gi, '').replace(/\/+/g, '/');
          if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
          set.add(p.toLowerCase());
        });
        setRedirectSources(set);
      } catch {
        setRedirectSources(new Set());
      }
    };
    loadRedirects().then(fetchAll);
  }, []);

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter(l => l.path.toLowerCase().includes(q) || l.url.toLowerCase().includes(q));
  }, [links, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, LinkItem[]>();
    filteredLinks.forEach(l => {
      const key = l.group;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(l);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredLinks]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHelmet
        title="Browse All Pages"
        description="Browse all MoneyCal.in pages organized by category to improve internal linking and discover calculators, tools, and guides."
        url="/browse-all"
        section="Sitemap"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Browse All Pages - MoneyCal",
          description: "Site-wide index of calculators, tools, and learning guides grouped by section.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: grouped.length,
            itemListOrder: "http://schema.org/ItemListOrderAscending"
          }
        }}
      />
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Browse All Pages</h1>
      <p className="text-neutral-600 mb-6">This hub lists internal links across the site to reduce orphan pages and help discovery.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold text-neutral-800 mb-2">How to use</h2>
          <ul className="text-sm text-neutral-700 space-y-2">
            <li>Search by keyword or path fragment</li>
            <li>Open calculators directly from their section</li>
            <li>Bookmark frequently used tools and guides</li>
          </ul>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold text-neutral-800 mb-2">Popular destinations</h2>
          <ul className="text-sm text-blue-700 space-y-2">
            <li><a href="/calculators" className="hover:underline">All Calculators</a></li>
            <li><a href="/tools" className="hover:underline">Tools Hub</a></li>
            <li><a href="/learn" className="hover:underline">Learn Hub</a></li>
          </ul>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold text-neutral-800 mb-2">Tips</h2>
          <p className="text-sm text-neutral-700">Use this index to fix broken navigation, find hidden gems, and improve internal linking for SEO.</p>
        </div>
      </div>
      <div className="mb-6">
        <input
          placeholder="Search pages..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full input"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grouped.map(([group, items]) => (
          <div key={group} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-neutral-800 mb-3">
              {group === 'root' ? 'Top' : group.replace(/-/g, ' ')}
            </h2>
            <ul className="space-y-2">
              {items.slice(0, 50).map(item => (
                <li key={item.url}>
                  <a href={item.url} className="text-sm text-blue-700 hover:underline">
                    {item.path}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseAll;
