import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  targetId?: string;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ targetId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let frameId = 0;

    const calculateProgress = () => {
      const targetElement = targetId ? document.getElementById(targetId) : document.documentElement;
      if (!targetElement) {
        setProgress(0);
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetTop = targetElement.getBoundingClientRect().top + scrollTop;
      const targetHeight = targetElement.scrollHeight || targetElement.clientHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollable = targetHeight - viewportHeight;

      if (totalScrollable <= 0) {
        setProgress(100);
        return;
      }

      const current = Math.min(Math.max(scrollTop - targetTop, 0), totalScrollable);
      const percent = (current / totalScrollable) * 100;
      setProgress(Number.isFinite(percent) ? percent : 0);
    };

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(calculateProgress);
    };

    calculateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [targetId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
