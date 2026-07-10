import React, { useEffect, useState } from 'react';

const ConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mc-consent');
      if (saved === 'granted' || saved === 'denied') {
        setVisible(false);
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('consent', 'update', {
            ad_storage: saved,
            analytics_storage: saved,
            functionality_storage: 'granted',
            security_storage: 'granted'
          });
        }
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('mc-consent', 'granted');
    } catch {
      setVisible(false);
    }
    setVisible(false);
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        security_storage: 'granted'
      });
    }
  };

  const decline = () => {
    try {
      localStorage.setItem('mc-consent', 'denied');
    } catch {
      setVisible(false);
    }
    setVisible(false);
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted'
      });
    }
  };

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="rounded-lg border border-gray-200 bg-white shadow-lg p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-700">
              MoneyCal uses cookies for analytics and non-personalized ads to improve your experience.
              Manage your choice below. See our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>{' '}
              and{' '}
              <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={decline}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
