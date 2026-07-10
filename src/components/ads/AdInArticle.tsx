import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdInArticleProps = {
  slot?: string;
  layoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
  testId?: string;
};

const AdInArticle: React.FC<AdInArticleProps> = ({
  slot,
  layoutKey,
  className,
  style,
  testId,
}) => {
  const adRef = useRef<HTMLDivElement | null>(null);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const node = adRef.current;
    if (!node) return;

    const ins = node.querySelector('ins.adsbygoogle') as HTMLElement | null;
    if (!ins) return;

    // Lazy activate only when visible
    const activate = () => {
      if (activated) return;
      if (ins.getAttribute('data-adsbygoogle-status') === 'done' || ins.innerHTML.trim() !== '') {
        setActivated(true);
        return;
      }
      const ads = window.adsbygoogle || [];
      try {
        ads.push({});
        setActivated(true);
      } catch {
        // ignore push errors; AdSense handles retries
      }
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activate();
              io.disconnect();
            }
          });
        },
        { rootMargin: '200px 0px' }
      );
      io.observe(ins);
      return () => io.disconnect();
    } else {
      // Fallback: activate after a short delay
      const t = globalThis.setTimeout(activate, 1000);
      return () => globalThis.clearTimeout(t);
    }
  }, [activated]);

  return (
    <div
      ref={adRef}
      className={className || 'my-8 sm:my-10 not-prose'}
      style={style}
      data-testid={testId}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-6815277662449747"
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-ad-layout-key={layoutKey}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdInArticle;

