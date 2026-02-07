'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Calendar, User, FileText } from 'lucide-react';

/**
 * E-E-A-T footer block: Experience, Expertise, Authoritativeness, Trustworthiness.
 * Shown site-wide for Google quality signals and user trust.
 */
export const EEATFooter: React.FC = () => {
  const lastUpdated = 'January 2026';

  return (
    <section
      className="border-t border-slate-200 bg-slate-50/80 py-6 px-4"
      aria-label="Content quality and disclaimer"
    >
      <div className="max-w-4xl mx-auto text-center text-sm text-slate-600 space-y-3">
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" aria-hidden />
            Last updated: {lastUpdated}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-500" aria-hidden />
            Content by <Link to="/about-us" className="text-blue-600 hover:underline font-medium">MoneyCal Team</Link>
          </span>
        </p>
        <p className="flex flex-wrap items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden />
          For education only. Not financial, tax or legal advice. See our{' '}
          <Link to="/disclaimer" className="text-blue-600 hover:underline font-medium">Disclaimer</Link>
          {' '}and{' '}
          <Link to="/privacy-policy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>.
        </p>
        <p>
          <Link to="/about-us" className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium">
            <FileText className="w-4 h-4" aria-hidden />
            About MoneyCal & our methodology
          </Link>
        </p>
      </div>
    </section>
  );
};

export default EEATFooter;
