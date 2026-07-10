import React from 'react';
import { AlertCircle, Clock, CheckCircle, ExternalLink, Info } from 'lucide-react';

/**
 * Google News-Approved Features Bundle
 * All features Google wants to see in quality news websites
 */

// Last Updated Banner - Google wants fresh timestamps
export const LastUpdatedBanner: React.FC<{ lastUpdate: string }> = ({ lastUpdate }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
    <div className="flex items-center gap-2">
      <Clock className="h-5 w-5 text-blue-600" />
      <div>
        <p className="font-bold text-blue-900 text-sm">Last Updated</p>
        <p className="text-blue-700 text-sm">{lastUpdate}</p>
      </div>
    </div>
  </div>
);

// Source Citations - Google rewards credible sources
export const SourceCitations: React.FC<{ sources: Array<{ name: string; url: string }> }> = ({ sources }) => (
  <div className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-6 my-8">
    <div className="flex items-start gap-3 mb-4">
      <ExternalLink className="h-6 w-6 text-indigo-600 flex-shrink-0" />
      <div>
        <h3 className="text-xl font-black text-neutral-900 mb-2">Sources & References</h3>
        <p className="text-sm text-neutral-600">This article cites the following credible sources:</p>
      </div>
    </div>
    
    <ul className="space-y-2">
      {sources.map((source, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <a 
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
          >
            {source.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Quick Facts Box - Google loves structured key facts
export const QuickFactsBox: React.FC<{ facts: Array<{ label: string; value: string }> }> = ({ facts }) => (
  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6 my-8 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <Info className="h-6 w-6 text-indigo-600" />
      <h3 className="text-xl font-black text-indigo-900">Quick Facts</h3>
    </div>
    
    <dl className="space-y-3">
      {facts.map((fact, index) => (
        <div key={index} className="border-b border-indigo-200 last:border-0 pb-3 last:pb-0">
          <dt className="text-sm font-semibold text-indigo-700 mb-1">{fact.label}</dt>
          <dd className="text-lg font-bold text-indigo-900">{fact.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

// Corrections/Updates Banner - Transparency Google loves
export const CorrectionsBanner: React.FC<{ corrections: string[] }> = ({ corrections }) => {
  if (corrections.length === 0) return null;
  
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
        <div>
          <h3 className="font-black text-yellow-900 mb-2">Corrections & Updates</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            {corrections.map((correction, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="font-bold">{index + 1}.</span>
                <span>{correction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Expertise Banner - E-E-A-T signals Google wants
export const ExpertiseBanner: React.FC<{ author: { name: string; credentials: string[] } }> = ({ author }) => (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 my-6">
    <div className="flex items-start gap-3">
      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-green-800 mb-1">Written by Expert</p>
        <p className="text-lg font-black text-green-900 mb-2">{author.name}</p>
        <ul className="text-sm text-green-700 space-y-1">
          {author.credentials.map((cred, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
              {cred}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default {
  LastUpdatedBanner,
  SourceCitations,
  QuickFactsBox,
  CorrectionsBanner,
  ExpertiseBanner
};






