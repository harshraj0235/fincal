import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowLeft, ExternalLink, Share2, Play, Rss, RefreshCw, Globe, Copy, X } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { useNewsShorts } from '../../hooks/useNewsShorts';
import { useTrendingRss } from '../../hooks/useTrendingRss';
import {
  newsShortsFilterCategories,
  getShortFullUrl,
  DISCOVER_IMAGE_DEFAULT,
  baseUrl,
  type NewsShort,
  type NewsShortCategory,
} from '../../data/newsShortsData';
import { formatStaticShortDate } from '../../utils/randomCalculators';
import type { TrendingRssItem } from '../../data/trendingRssFeeds';

/** Share options: WhatsApp, Twitter, Copy, Native share */
function getShareUrls(url: string, title: string, text?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text || title);
  return {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
}

/** Single RSS item card: image, title, full link, source, date, share — infographic-style */
function TrendingRssCard({ item, onShare }: { item: TrendingRssItem; onShare?: (item: TrendingRssItem) => void }) {
  const imgUrl = item.thumbnail || DISCOVER_IMAGE_DEFAULT;
  const dateStr = item.pubDate ? formatStaticShortDate(item.pubDate) : '';
  return (
    <motion.article
      className="group block rounded-2xl overflow-hidden bg-slate-800/60 backdrop-blur border border-white/10 hover:border-amber-500/40 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 relative"
      initial={{ opacity: 0.9, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
          <div className="aspect-[16/10] relative overflow-hidden">
            <img
              src={imgUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/25 text-amber-300 text-xs font-semibold">
                <Globe className="w-3 h-3" />
                {item.source}
              </span>
              {dateStr && <span className="text-white/70 text-xs">{dateStr}</span>}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-white font-semibold text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-amber-200 transition-colors">
              {item.title}
            </h3>
            <span className="inline-flex items-center gap-2 mt-3 text-amber-400 font-medium text-sm">
              Read full story
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </a>
        {onShare && (
          <button
            type="button"
            onClick={() => onShare(item)}
            className="absolute top-2 right-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/50 hover:bg-black/70 text-white touch-manipulation z-10"
            aria-label="Share this story"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.article>
  );
}

/** Inshorts-style: one full-screen card per short, vertical scroll like reels — attractive & engaging */
const NewsShortsPage: React.FC = () => {
  const { shorts, loading } = useNewsShorts();
  const { items: rssItems, loading: rssLoading, error: rssError, refetch: refetchRss, updatedAt: rssUpdatedAt } = useTrendingRss();
  const [filter, setFilter] = useState<NewsShortCategory | 'latest'>('latest');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const filtered = useMemo(() => {
    const list = [...shorts].sort(
      (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
    if (filter === 'latest') return list;
    return list.filter((s) => s.category === filter);
  }, [shorts, filter]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardHeight = el.offsetHeight;
      const scrollTop = el.scrollTop;
      const index = Math.round(scrollTop / cardHeight);
      setActiveIndex(Math.min(Math.max(0, index), filtered.length - 1));
      if (scrollTop > 60) setShowSwipeHint(false);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [filtered.length]);

  const goTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardHeight = el.offsetHeight;
    el.scrollTo({ top: index * cardHeight, behavior: 'smooth' });
  }, []);

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
    const url = getShortFullUrl(short);
    setSharePayload({
      url,
      title: short.headline,
      text: short.whyItMatters[0] || short.headline,
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
    } catch (e) {
      console.log(e);
    }
  }, [sharePayload]);

  const handleCopyLink = useCallback(async () => {
    if (!sharePayload) return;
    try {
      await navigator.clipboard.writeText(sharePayload.url);
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    } catch (e) {
      console.log(e);
    }
  }, [sharePayload]);

  const openShareRss = useCallback((item: TrendingRssItem) => {
    setSharePayload({
      url: item.link,
      title: item.title,
      text: item.description || item.title,
    });
    setShareOpen(true);
    setCopyDone(false);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center pt-16">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Loading shorts…</p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center pt-16">
        <div className="text-white text-center max-w-md px-4">
          <p className="text-lg mb-4">No shorts in this category yet.</p>
          <Link to="/news" className="text-amber-400 hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  const progressPct = filtered.length > 0 ? (Math.min(activeIndex + 1, filtered.length) / filtered.length) * 100 : 0;

  return (
    <div
      className="min-h-screen bg-slate-950 text-white touch-manipulation"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <SEOHelmet
        title="MoneyCal News in 60 Seconds | Finance Shorts – Inshorts Style"
        description="Read finance news in 60 seconds. Swipe through RBI, markets, economy shorts. Short, clear, actionable — like Inshorts for Indian finance."
        keywords="news in 60 seconds, finance shorts, MoneyCal, Inshorts style, RBI, markets, Indian economy"
        image={DISCOVER_IMAGE_DEFAULT}
        url={`${baseUrl}/news/shorts`}
      />

      {/* Fixed header — glass, safe area, mobile-friendly */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          <Link
            to="/news"
            className="min-h-[44px] min-w-[44px] sm:min-w-0 inline-flex items-center justify-center gap-2 text-white hover:text-amber-300 font-semibold text-sm transition-colors touch-manipulation -m-2 p-2 sm:m-0 sm:p-0"
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Play className="w-4 h-4 text-white" fill="currentColor" />
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">Money Shorts</h1>
          </div>
          <span className="text-sm font-semibold text-white/90 tabular-nums">
            {activeIndex + 1}<span className="text-white/50 font-normal"> / {filtered.length}</span>
          </span>
        </div>
        {/* Progress bar — thicker, more visible */}
        <div className="h-1 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-r"
            style={{ width: `${progressPct}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
        {/* Category tabs — horizontal scroll, touch-friendly */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 sm:px-4 py-2 sm:py-3" style={{ WebkitOverflowScrolling: 'touch' }}>
          {newsShortsFilterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as NewsShortCategory | 'latest')}
              className={`flex-shrink-0 min-h-[44px] px-4 py-2.5 rounded-full text-sm font-semibold transition-all touch-manipulation ${
                filter === cat.id
                  ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
                  : 'bg-white/10 text-white/90 hover:bg-white/20 active:bg-white/25'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Reel container — full height snap scroll, safe bottom for notches */}
      <div
        ref={scrollRef}
        className="pt-[130px] sm:pt-[140px] pb-24 sm:pb-28 h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {filtered.map((short) => (
          <motion.article
            key={short.id}
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            className="h-screen min-h-[100vh] snap-start snap-always flex flex-col relative"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Background image + stronger gradient for text legibility */}
            <div className="absolute inset-0">
              <img
                src={short.imageUrl || DISCOVER_IMAGE_DEFAULT}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-900/50" />
            </div>

            {/* Content — generous top and bottom space (2 inch) so text is easily visible */}
            <div
              className="relative flex-1 flex flex-col justify-end px-3 sm:px-6"
              style={{
                paddingTop: 'min(2in, 3rem)',
                paddingBottom: 'max(min(2in, 3rem), env(safe-area-inset-bottom))',
              }}
            >
              {/* Readable content card — paragraph structure, no bullets */}
              <div
                className="rounded-xl sm:rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-y-auto scrollbar-hide mx-auto w-full max-w-2xl"
                style={{
                  padding: 'clamp(1.25rem, 4vw, 2rem)',
                  minHeight: '280px',
                  maxHeight: 'min(65vh, 420px)',
                }}
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/25 text-amber-300 uppercase tracking-wider">
                    {short.category}
                  </span>
                  <time className="text-xs text-white/60 font-medium" dateTime={short.datePublished}>
                    {formatStaticShortDate(short.datePublished)}
                  </time>
                  <span className="text-xs text-white/50 ml-auto">60 sec read</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug mb-4 tracking-tight">
                  {short.headline}
                </h2>
                {/* Paragraph-only content: short summary, concise, no bullets */}
                <div className="text-white/95 text-base sm:text-lg leading-relaxed space-y-4">
                  {short.summaryParagraphs && short.summaryParagraphs.length > 0 ? (
                    short.summaryParagraphs.map((para, i) => (
                      <p key={i} className="first:mt-0">
                        {para}
                      </p>
                    ))
                  ) : (
                    <>
                      <p>{short.whyItMatters.join(' ')}</p>
                      {short.keyNumbers && short.keyNumbers.length > 0 && (
                        <p className="text-amber-200/95">
                          Notable figures: {short.keyNumbers.join(', ')}.
                        </p>
                      )}
                      <p>
                        <span className="font-semibold text-amber-400">What to do: </span>
                        {short.whatToDo}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Actions row — touch-friendly buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                <a
                  href={getShortFullUrl(short)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-amber-500 text-slate-900 font-bold px-4 sm:px-5 py-3 rounded-xl hover:bg-amber-400 active:bg-amber-400 transition-all shadow-lg shadow-amber-500/30 text-sm sm:text-base touch-manipulation"
                >
                  Read full story
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
                <Link
                  to={short.fullStoryPath}
                  className="min-h-[44px] inline-flex items-center justify-center text-white/90 hover:text-white text-sm font-semibold underline underline-offset-2 py-2 touch-manipulation"
                >
                  Open on site
                </Link>
                <button
                  onClick={() => openShare(short)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-3 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white transition-colors touch-manipulation"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/50 mt-2">Source: MoneyCal</p>
            </div>
          </motion.article>
        ))}

        {/* Trending from India — RSS feed section (full link + image, infographic-style) */}
        <section
          className="min-h-[100vh] snap-start snap-always flex flex-col relative bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 pb-24">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Rss className="w-5 h-5 text-amber-400" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Trending from India</h2>
                    <p className="text-sm text-white/60">Live headlines · Updated every 2 hours</p>
                  </div>
                </div>
                <button
                  onClick={() => refetchRss()}
                  disabled={rssLoading}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
                  aria-label="Refresh"
                >
                  <RefreshCw className={`w-5 h-5 ${rssLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {rssError && (
                <p className="text-amber-300/90 text-sm mb-4 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2">
                  {rssError}
                </p>
              )}

              {rssLoading && rssItems.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-2xl bg-white/5 animate-pulse h-56" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {rssItems.map((item: TrendingRssItem, idx: number) => (
                    <TrendingRssCard key={`${item.link}-${idx}`} item={item} onShare={openShareRss} />
                  ))}
                </div>
              )}

              {rssUpdatedAt && (
                <p className="text-xs text-white/40 mt-4 text-center">
                  Last updated: {new Date(rssUpdatedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Progress dots — larger tap targets on mobile */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-40 flex gap-2 items-center px-3 py-2.5 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        {filtered.slice(0, 12).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 touch-manipulation min-w-[28px] min-h-[28px] flex items-center justify-center ${
              i === activeIndex ? 'bg-amber-500 w-7 h-2.5 scale-100' : 'bg-white/50 w-2 h-2 hover:bg-white/70 hover:scale-110 active:scale-110'
            }`}
            aria-label={`Go to story ${i + 1}`}
          />
        ))}
        {filtered.length > 12 && (
          <span className="text-white/70 text-xs font-medium ml-1 tabular-nums">+{filtered.length - 12}</span>
        )}
      </div>

      {/* Swipe hint — fades after first scroll, above safe area */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed left-1/2 -translate-x-1/2 z-40 text-white/90 text-sm sm:text-base font-medium flex items-center gap-2 bg-slate-900/60 backdrop-blur px-4 py-2.5 rounded-full border border-white/20 touch-manipulation"
            style={{ bottom: 'max(5rem, calc(env(safe-area-inset-bottom) + 4rem))' }}
          >
            <ChevronDown className="w-5 h-5 animate-bounce flex-shrink-0" />
            Scroll or swipe for next
          </motion.p>
        )}
      </AnimatePresence>

      {/* Prev/next buttons — desktop, clearer and easier to use */}
      <div className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="p-3.5 rounded-xl bg-slate-800/90 backdrop-blur border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 hover:border-white/20 transition-all shadow-lg"
          aria-label="Previous"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex >= filtered.length - 1}
          className="p-3.5 rounded-xl bg-slate-800/90 backdrop-blur border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 hover:border-white/20 transition-all shadow-lg"
          aria-label="Next"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Share sheet — WhatsApp, Twitter, Telegram, LinkedIn, Copy, Native */}
      <AnimatePresence>
        {shareOpen && sharePayload && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setShareOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[61] rounded-t-3xl bg-slate-900 border border-white/10 shadow-2xl pb-safe"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              <div className="pt-4 pb-2 px-4">
                <div className="w-10 h-1 rounded-full bg-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white text-center">Share this story</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-4 pb-6">
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title, sharePayload.text).whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] flex flex-col items-center justify-center gap-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 active:bg-emerald-500/40 transition-colors touch-manipulation"
                >
                  <span className="text-2xl" aria-hidden>📱</span>
                  <span className="text-sm font-semibold">WhatsApp</span>
                </a>
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title).twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] flex flex-col items-center justify-center gap-1.5 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 active:bg-sky-500/40 transition-colors touch-manipulation"
                >
                  <span className="text-2xl" aria-hidden>𝕏</span>
                  <span className="text-sm font-semibold">Twitter / X</span>
                </a>
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title).telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] flex flex-col items-center justify-center gap-1.5 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 active:bg-blue-500/40 transition-colors touch-manipulation"
                >
                  <span className="text-2xl" aria-hidden>✈️</span>
                  <span className="text-sm font-semibold">Telegram</span>
                </a>
                <a
                  href={getShareUrls(sharePayload.url, sharePayload.title).linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] flex flex-col items-center justify-center gap-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 active:bg-indigo-500/40 transition-colors touch-manipulation"
                >
                  <span className="text-2xl" aria-hidden>in</span>
                  <span className="text-sm font-semibold">LinkedIn</span>
                </a>
                <button
                  onClick={handleCopyLink}
                  className="min-h-[52px] flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 active:bg-white/25 transition-colors touch-manipulation"
                >
                  <Copy className="w-6 h-6" />
                  <span className="text-sm font-semibold">{copyDone ? 'Copied!' : 'Copy link'}</span>
                </button>
                {navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    className="min-h-[52px] flex flex-col items-center justify-center gap-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 active:bg-amber-500/40 transition-colors touch-manipulation"
                  >
                    <Share2 className="w-6 h-6" />
                    <span className="text-sm font-semibold">More options</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => setShareOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 text-white/70 hover:text-white border-t border-white/10 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
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
