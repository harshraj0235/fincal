import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CONSENT_KEY = 'fincal_cookie_consent_v1';

type ConsentState = 'accepted' | 'rejected' | 'unset';

export const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<ConsentState>('unset');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null;
      const initial: ConsentState = stored === 'accepted' || stored === 'rejected' ? stored : 'unset';
      setConsent(initial);
      setOpen(initial === 'unset');
    } catch {
      setOpen(true);
    }
  }, []);

  const persistConsent = (value: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
  };

  const handleAccept = () => {
    setConsent('accepted');
    persistConsent('accepted');
    try {
      window.dispatchEvent(new Event('cookie-consent-accepted'));
    } catch {}
    setOpen(false);
  };

  const handleReject = () => {
    setConsent('rejected');
    persistConsent('rejected');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-neutral-200 bg-white shadow-xl">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 mb-1">We value your privacy</h2>
              <p className="text-sm text-neutral-700">
                We use cookies to enhance your experience, analyze traffic, and show relevant content. You can accept or reject non-essential cookies. 
                See our <a href="/cookie-policy" className="text-blue-600 underline">Cookie Policy</a> and 
                <a href="/privacy-policy" className="text-blue-600 underline ml-1">Privacy Policy</a>.
              </p>
            </div>
            <button
              aria-label="Close cookie banner"
              className="p-2 rounded-md hover:bg-neutral-100 text-neutral-600"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <button
              onClick={handleReject}
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
            >
              Reject non-essential
            </button>
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;


