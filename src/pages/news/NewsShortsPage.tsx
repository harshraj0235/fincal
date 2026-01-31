import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Copy,
  Check,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Code,
  ArrowLeft,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { useNewsShorts } from '../../hooks/useNewsShorts';
import {
  newsShortsFilterCategories,
  getShortAsText,
  getShortEmbedCode,
  type NewsShort,
  type NewsShortCategory,
} from '../../data/newsShortsData';

const NewsShortsPage: React.FC = () => {
  const { shorts, loading, refetch } = useNewsShorts();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [embedCopiedId, setEmbedCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<NewsShortCategory | 'latest'>('latest');

  const filtered = useMemo(() => {
    const list = [...shorts].sort(
      (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
    if (filter === 'latest') return list;
    return list.filter((s) => s.category === filter);
  }, [shorts, filter]);

  const handleCopy = async (short: NewsShort) => {
    const text = getShortAsText(short);
    await navigator.clipboard.writeText(text);
    setCopiedId(short.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyEmbed = async (short: NewsShort) => {
    const code = getShortEmbedCode(short);
    await navigator.clipboard.writeText(code);
    setEmbedCopiedId(short.id);
    setTimeout(() => setEmbedCopiedId(null), 2000);
  };

  const shareUrl = (path: string) =>
    typeof window !== 'undefined' ? `${window.location.origin}${path}` : `https://moneycal.in${path}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 pt-20">
      <SEOHelmet
        title="Moneycal News in 60 Seconds | Finance Shorts – Short, Clear, Actionable"
        description="Read finance news in 60 seconds. RBI, markets, tax, loans, crypto – short bullets, key numbers, and what you should do. Inshorts-style for Indian finance."
        keywords="news in 60 seconds, finance shorts, Moneycal news, RBI, markets, tax, loans, Indian economy, finance explainer"
        canonicalUrl="https://moneycal.in/news/shorts"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            Moneycal News in 60 Seconds
          </h1>
          <p className="text-slate-600 mt-2">
            Short. Clear. Actionable. Read in 30–45 seconds. Copy, share, or embed.
          </p>
        </header>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {newsShortsFilterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as NewsShortCategory | 'latest')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.id === 'latest' && (
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1.5 align-middle" />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Shorts list */}
        <div className="space-y-8">
          {filtered.map((short) => (
            <article
              key={short.id}
              id={short.slug}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24"
            >
              {short.imageUrl && (
                <div className="w-full aspect-video bg-slate-100">
                  <img src={short.imageUrl} alt={short.headline} className="w-full h-full object-cover" />
                </div>
              )}
              {short.videoUrl && (
                <div className="w-full aspect-video bg-slate-900">
                  {(() => {
                    const u = short.videoUrl;
                    const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
                    if (ytMatch) {
                      return (
                        <iframe
                          title={short.headline}
                          src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      );
                    }
                    return <video src={short.videoUrl} controls className="w-full h-full" />;
                  })()}
                </div>
              )}
              <div className="p-6 sm:p-8">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  {short.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  {short.headline}
                </h2>

                <div className="mt-4 space-y-3 text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-800">⚡ Why it matters:</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      {short.whyItMatters.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  {short.keyNumbers && short.keyNumbers.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-800">📊 Key numbers:</span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {short.keyNumbers.map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-slate-800">🧠 What should you do?</span>
                    <p className="mt-1">{short.whatToDo}</p>
                  </div>
                </div>

                <Link
                  to={short.fullStoryPath}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  🔗 Read full story →
                </Link>

                {/* Actions: Copy, Embed, Share */}
                <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleCopy(short)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
                  >
                    {copiedId === short.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedId === short.id ? 'Copied!' : 'Copy text'}
                  </button>
                  <button
                    onClick={() => handleCopyEmbed(short)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
                  >
                    {embedCopiedId === short.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Code className="w-4 h-4" />
                    )}
                    {embedCopiedId === short.id ? 'Embed copied!' : 'Copy embed code'}
                  </button>
                  <span className="inline-flex items-center gap-2 text-slate-500 text-sm">
                    <Share2 className="w-4 h-4" />
                    Share:
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl(short.fullStoryPath))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-blue-50 text-blue-600"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl(short.fullStoryPath))}&text=${encodeURIComponent(short.headline)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-sky-50 text-sky-500"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl(short.fullStoryPath))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-blue-50 text-blue-700"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {loading && (
          <p className="text-center text-slate-500 py-12">Loading shorts…</p>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-slate-500 py-12">No shorts in this category yet.</p>
        )}
      </div>
    </div>
  );
};

export default NewsShortsPage;
