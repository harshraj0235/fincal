import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowLeft, ExternalLink, Share2, Copy, X, BookOpen } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { useNewsShorts } from '../../hooks/useNewsShorts';
import {
  newsShortsReelTabs,
  getShortFullUrl,
  DISCOVER_IMAGE_DEFAULT,
  baseUrl,
  sortShortsByDateLatestFirst,
  type NewsShort,
  type NewsShortCategory,
} from '../../data/newsShortsData';
import { formatStaticShortDate } from '../../utils/randomCalculators';

/** One quality paragraph summary, 360+ chars, for every short. */
const MIN_SUMMARY_CHARS = 360;
const MAX_SUMMARY_CHARS = 560;

function getSummary360(short: NewsShort): string {
  const parts: string[] = short.summaryParagraphs?.length
    ? [...short.summaryParagraphs]
    : [
        ...short.whyItMatters,
        ...(short.keyNumbers?.length ? [`Key figures: ${short.keyNumbers.join(', ')}.`] : []),
        short.whatToDo,
      ];
  let paragraph = parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  if (paragraph.length < MIN_SUMMARY_CHARS) {
    paragraph += ' For full details, read the complete article using the link below.';
  }
  if (paragraph.length < MIN_SUMMARY_CHARS) {
    paragraph += ' This summary gives you the main points in one place.';
  }
  if (paragraph.length <= MAX_SUMMARY_CHARS) return paragraph;
  const cut = paragraph.slice(0, MAX_SUMMARY_CHARS);
  const lastSpace = cut.lastIndexOf(' ');
  const end = lastSpace > MIN_SUMMARY_CHARS ? lastSpace : MAX_SUMMARY_CHARS;
  return cut.slice(0, end).trim() + '…';
}

function getShareUrls(url: string, title: string, text?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
}

/**
 * MoneyCal Shorts — Inshorts-style: one card per story, 60-second read.
 * Structure: image top → headline → 60-word summary → source → actions.
 * Unique UI: paper-style content card, clear typography, simple navigation.
 */
const NewsShortsPage: React.FC = () => {
  const { shorts, loading } = useNewsShorts();
  const [filter, setFilter] = useState<NewsShortCategory | 'latest'>('latest');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const filtered = useMemo(() => {
    const list = sortShortsByDateLatestFirst([...shorts]);
    if (filter === 'latest') return list;
    return list.filter((s) => s.category === filter);
  }, [shorts, filter]);

  // Reset to first card when category changes
  useEffect(() => {
    setActiveIndex(0);
    setShowSwipeHint(true);
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: 0, behavior: 'auto' });
  }, [filter]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardHeight = el.offsetHeight;
      const scrollTop = el.scrollTop;
      const index = Math.round(scrollTop / cardHeight);
      const next = Math.min(Math.max(0, index), filtered.length - 1);
      setActiveIndex(next);
      if (scrollTop > 80) setShowSwipeHint(false);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [filtered.length]);

  const goTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const i = Math.min(Math.max(0, index), filtered.length - 1);
    const cardHeight = el.offsetHeight;
    el.scrollTo({ top: i * cardHeight, behavior: 'smooth' });
    setActiveIndex(i);
  }, [filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo]);

  const [shareOpen, setShareOpen] = useState(false);
  const [sharePayload, setSharePayload] = useState<{ url: string; title: string; text: string } | null>(null);
  const [copyDone, setCopyDone] = useState(false);

  const openShare = useCallback((short: NewsShort) => {
    setSharePayload({
      url: getShortFullUrl(short),
      title: short.headline,
      text: getSummary360(short),
    });
    setShareOpen(true);
    setCopyDone(false);
  }, []);

  const handleNativeShare = useCallback(async () => {
    if (!sharePayload || !navigator.share) return;
    try {
      await navigator.share({
        title: sharePayload.title,
        text: sharePayload.text,
        url: sharePayload.url,
      });
      setShareOpen(false);
    } catch (_) {}
  }, [sharePayload]);

  const handleCopyLink = useCallback(async () => {
    if (!sharePayload) return;
    try {
      await navigator.clipboard.writeText(sharePayload.url);
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    } catch (_) {}
  }, [sharePayload]);

  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'index, follow, max-image-preview:large');
    return () => { meta?.setAttribute('content', 'index, follow'); };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-neutral-500 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <p className="text-neutral-700 font-medium mb-4">No stories in this category yet.</p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  const progressPct = (Math.min(activeIndex + 1, filtered.length) / filtered.length) * 100;

  return (
    <div
      className="min-h-screen bg-neutral-200 text-neutral-900 touch-manipulation"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <SEOHelmet
        title="MoneyCal Shorts | India News in 60 Seconds"
        description="India-focused news in 60 seconds. Finance, markets, economy — auto-updated every 10 min. One card per story with 360+ char summary and image."
        keywords="India news shorts, MoneyCal Shorts, finance news India, markets, economy, news in 60 seconds, Inshorts style"
        image={DISCOVER_IMAGE_DEFAULT}
        url={`${baseUrl}/news/shorts`}
      />
      {filtered.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'MoneyCal Shorts – News in 60 Seconds',
              numberOfItems: filtered.length,
              itemListOrder: 'ItemListOrderDescending',
              itemListElement: filtered.slice(0, 20).map((short, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'NewsArticle',
                  headline: short.headline,
                  datePublished: short.datePublished,
                  image: short.imageUrl || DISCOVER_IMAGE_DEFAULT,
                  url: getShortFullUrl(short),
                  publisher: { '@type': 'Organization', name: 'MoneyCal', url: baseUrl },
                },
              })),
            }),
          }}
        />
      )}

      {/* Header — Inshorts-style: minimal, progress, categories */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm"
        style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
      >
        <div className="flex items-center justify-between px-3 py-2">
          <Link
            to="/news"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 text-neutral-700 hover:text-amber-600 font-medium text-sm -m-1 p-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h1 className="text-base font-bold text-neutral-900">In 60 Seconds</h1>
            </div>
            <span className="text-[10px] sm:text-xs text-neutral-500">India-focused · Fetched every 10 min · Image + summary on every card</span>
          </div>
          <span className="text-sm tabular-nums text-neutral-500 min-w-[3ch] text-right">
            {activeIndex + 1}<span className="text-neutral-400">/{filtered.length}</span>
          </span>
        </div>
        <div className="h-0.5 bg-neutral-200">
          <motion.div
            className="h-full bg-amber-500 rounded-r-full"
            style={{ width: `${progressPct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 24 }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 py-2.5" style={{ WebkitOverflowScrolling: 'touch' }}>
          {newsShortsReelTabs.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as NewsShortCategory | 'latest')}
              className={`flex-shrink-0 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.id
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Card stack — one full-screen card per short, Inshorts layout */}
      <div
        ref={scrollRef}
        className="pt-[120px] sm:pt-[128px] pb-20 h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {filtered.map((short) => (
          <article
            key={short.id}
            className="h-screen min-h-[100vh] snap-start snap-always flex flex-col bg-white shadow-lg"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Image — top ~38%, Inshorts-style; every short has image (normalized in hook) */}
            <div className="relative w-full flex-shrink-0" style={{ height: '38vh', minHeight: 200 }}>
              <img
                src={short.imageUrl || DISCOVER_IMAGE_DEFAULT}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-white/90 text-neutral-800 text-xs font-semibold uppercase tracking-wide">
                  {short.category.replace(/-/g, ' ')}
                </span>
                <span className="text-white/90 text-xs font-medium drop-shadow">
                  {formatStaticShortDate(short.datePublished)} · 60 sec read
                </span>
              </div>
            </div>

            {/* Content — paper-style, 62%, scrollable if needed */}
            <div className="flex-1 overflow-y-auto flex flex-col px-4 sm:px-6 pt-4 pb-6" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug mb-3 pr-2">
                {short.headline}
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-5 min-h-[4.5em]">
                {getSummary360(short)}
              </p>
              {/* Stylish link to full article */}
              <a
                href={getShortFullUrl(short)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl border-2 border-amber-500 bg-amber-50 text-amber-700 font-bold text-base hover:bg-amber-500 hover:text-white hover:border-amber-600 transition-all shadow-sm mb-3"
              >
                Read full article
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              {/* Share feature — prominent */}
              <button
                onClick={() => openShare(short)}
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-neutral-300 bg-neutral-50 text-neutral-700 font-semibold text-sm hover:bg-neutral-100 hover:border-neutral-400 active:bg-neutral-200 transition-all"
                aria-label="Share this story"
              >
                <Share2 className="w-4 h-4" />
                Share this story
              </button>
              <p className="text-xs text-neutral-400 mt-3 text-center">Source: MoneyCal</p>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom nav — dots (orange active, gray rest) + current/total count */}
      <div
        className="fixed left-0 right-0 z-40 flex flex-col items-center gap-2"
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex gap-1.5 items-center px-3 py-2 rounded-full bg-white shadow border border-neutral-200">
          {filtered.slice(0, 10).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all w-2 h-2 flex-shrink-0 ${
                i === activeIndex ? 'bg-amber-500 scale-110' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Story ${i + 1}`}
            />
          ))}
          <span className="text-neutral-500 text-sm tabular-nums ml-2">{activeIndex + 1}/{filtered.length}</span>
        </div>
        <AnimatePresence>
          {showSwipeHint && (
            <motion.p
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-neutral-500 text-sm flex items-center gap-1.5"
            >
              <ChevronDown className="w-4 h-4 animate-bounce" />
              Swipe or scroll for next
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop prev/next */}
      <div className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="p-3 rounded-xl bg-white/90 backdrop-blur border border-neutral-200 shadow-md text-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
          aria-label="Previous"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex >= filtered.length - 1}
          className="p-3 rounded-xl bg-white/90 backdrop-blur border border-neutral-200 shadow-md text-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
          aria-label="Next"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Share sheet */}
      <AnimatePresence>
        {shareOpen && sharePayload && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setShareOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[61] rounded-t-2xl bg-white border-t border-neutral-200 shadow-2xl"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              <div className="pt-3 pb-2 px-4">
                <div className="w-8 h-1 rounded-full bg-neutral-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-neutral-900 text-center">Share this story</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 pb-4">
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title, sharePayload.text).whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium text-sm"
                >
                  <span className="text-xl">📱</span>
                  WhatsApp
                </a>
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title).twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-medium text-sm"
                >
                  <span className="text-xl">𝕏</span>
                  Twitter
                </a>
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title).telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-sm"
                >
                  <span className="text-xl">✈️</span>
                  Telegram
                </a>
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title).linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-sm"
                >
                  <span className="text-xl">in</span>
                  LinkedIn
                </a>
                <button
                  onClick={handleCopyLink}
                  className="min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-medium text-sm"
                >
                  <Copy className="w-5 h-5" />
                  {copyDone ? 'Copied!' : 'Copy link'}
                </button>
                {navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    className="min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium text-sm"
                  >
                    <Share2 className="w-5 h-5" />
                    More
                  </button>
                )}
              </div>
              <button
                onClick={() => setShareOpen(false)}
                className="w-full min-h-[48px] text-neutral-500 hover:text-neutral-700 font-medium border-t border-neutral-100"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsShortsPage;
