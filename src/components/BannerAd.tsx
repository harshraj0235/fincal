import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface BannerAdProps {
  slot?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  lazy?: boolean;        // lazy load for below-fold ads (default: true)
  label?: boolean;       // show "Advertisement" label (default: true)
  rounded?: boolean;     // rounded corners (default: true)
  format?: string;       // auto, rectangle, horizontal, etc.
}

export const BannerAd: React.FC<BannerAdProps> = ({
  slot,
  width = '100%',
  height,
  className = '',
  lazy = true,
  label = true,
  rounded = true,
  format = 'auto'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [activated, setActivated] = useState(false);

  // CLS Hardening: If height is not explicitly provided, reserve space based on format.
  // Responsive auto ads usually take ~250px. Fluid in-article ads take ~280px.
  const resolvedMinHeight = height ? height : (format === 'fluid' ? 280 : 250);

  // Lazy load with IntersectionObserver — improves LCP and doesn't block render
  useEffect(() => {
    if (!lazy) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px 0px' } // start loading 200px before entering viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (shouldLoad && !activated && containerRef.current) {
      const ins = containerRef.current.querySelector('ins.adsbygoogle');
      if (ins) {
        if (ins.getAttribute('data-adsbygoogle-status') === 'done' || ins.innerHTML.trim() !== '') {
          setActivated(true);
          return;
        }
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setActivated(true);
        } catch (e) {
          console.error("AdSense error", e);
        }
      }
    }
  }, [shouldLoad, activated]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ width, minHeight: resolvedMinHeight }}
      aria-label="Advertisement"
      role="complementary"
    >
      {label && (
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-2 select-none">
          Advertisement
        </p>
      )}
      <div
        style={{ width: '100%', minHeight: typeof resolvedMinHeight === 'number' && label ? resolvedMinHeight - 20 : resolvedMinHeight, position: 'relative', overflow: 'hidden' }}
        className={rounded ? 'rounded-xl' : ''}
      >
        {!shouldLoad && (
          <div
            className="skeleton absolute inset-0 bg-slate-50 border border-slate-100 flex items-center justify-center"
            style={{ width: '100%', height: '100%', borderRadius: rounded ? 12 : 0 }}
            aria-hidden="true"
          >
            <span className="text-xs text-slate-300 font-medium tracking-widest uppercase">Ad Space Reserved</span>
          </div>
        )}
        {shouldLoad && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '250px', width: '100%', height: height || 'auto', minHeight: '250px' }}
            data-ad-client="ca-pub-6815277662449747"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
};

// Responsive auto-size ad (best RPM for mobile)
export const ResponsiveAd: React.FC<{ slot?: string; className?: string }> = ({
  slot,
  className = ''
}) => {
  return (
    <div className={`w-full flex justify-center my-4 ${className}`} aria-label="Advertisement">
      <BannerAd
        slot={slot}
        format="auto"
        lazy={true}
        className="w-full"
      />
    </div>
  );
};

// In-content ad (highest RPM placement)
export const InArticleAd: React.FC<{ slot?: string; className?: string }> = ({
  slot,
  className = ''
}) => {
  return (
    <div className={`my-8 w-full flex flex-col items-center ${className}`} aria-label="Advertisement">
      <BannerAd slot={slot} format="fluid" lazy={true} label={true} />
    </div>
  );
};
