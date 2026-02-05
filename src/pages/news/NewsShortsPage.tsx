import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowLeft, ExternalLink, Share2, Play, Copy, X } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { useNewsShorts } from '../../hooks/useNewsShorts';
import {
  newsShortsReelTabs,
  getShortFullUrl,
  DISCOVER_IMAGE_DEFAULT,
  baseUrl,
  type NewsShort,
  type NewsShortCategory,
} from '../../data/newsShortsData';
import { formatStaticShortDate } from '../../utils/randomCalculators';

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

/** Reel-style: one full-screen card per short, vertical scroll — simple, Google-friendly */
const NewsShortsPage: React.FC = () => {
  const { shorts, loading } = useNewsShorts();
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
        title="MoneyCal Shorts | Finance News in 60 Seconds"
        description="Swipe through finance news in 60 seconds. RBI, markets, economy — short, clear, actionable. Scroll for next story."
        keywords="finance news 60 seconds, MoneyCal Shorts, RBI news, markets, Indian economy, news reels"
        image={DISCOVER_IMAGE_DEFAULT}
        url={`${baseUrl}/news/shorts`}
      />
      {/* JSON-LD for Google Discover / rich results */}
      {filtered.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'MoneyCal Shorts – Finance News in 60 Seconds',
              description: 'Short finance news: RBI, markets, economy. One story per card, scroll for next.',
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
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">Shorts</h1>
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
        {/* Category tabs — simple, touch-friendly */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 sm:px-4 py-2 sm:py-3" style={{ WebkitOverflowScrolling: 'touch' }}>
          {newsShortsReelTabs.map((cat) => (
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

              {/* Actions — one primary CTA + share */}
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
                <button
                  onClick={() => openShare(short)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-3 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white transition-colors touch-manipulation"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/50 mt-2">MoneyCal</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Progress dots — simple, first 8 only */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-40 flex gap-1.5 items-center px-2.5 py-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10"
        style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        {filtered.slice(0, 8).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 touch-manipulation min-w-[20px] min-h-[20px] flex items-center justify-center ${
              i === activeIndex ? 'bg-amber-500 w-5 h-1.5' : 'bg-white/40 w-1.5 h-1.5 hover:bg-white/60'
            }`}
            aria-label={`Story ${i + 1}`}
          />
        ))}
        {filtered.length > 8 && <span className="text-white/60 text-xs ml-0.5 tabular-nums">{activeIndex + 1}/{filtered.length}</span>}
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
