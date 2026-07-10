import React from 'react';
import { Shield, Award, BadgeCheck, Users, Verified, CheckCircle, Zap } from 'lucide-react';

interface EEATSignalsProps {
  authorName?: string;
  authorCredentials?: string[];
  authorBio?: string;
  expertiseAreas?: string[];
  authorImage?: string;
  reviewCount?: number;
  ratingValue?: number;
  trustBadges?: Array<'verified' | 'certified' | 'expert' | 'trusted'>;
}

const EEATSignals: React.FC<EEATSignalsProps> = ({
  authorName,
  authorCredentials = [],
  authorBio,
  expertiseAreas = [],
  authorImage,
  reviewCount = 0,
  ratingValue = 0,
  trustBadges = ['verified', 'trusted'],
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-6">
      {/* Expertise & Authoritativeness Header */}
      <div className="flex items-start gap-4 mb-6">
        {authorImage && (
          <img
            src={authorImage}
            alt={authorName}
            className="w-16 h-16 rounded-full border-2 border-indigo-600 object-cover"
          />
        )}
        <div className="flex-1">
          {authorName && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {authorName}
                <BadgeCheck size={20} className="text-indigo-600" />
              </h3>
              {authorCredentials.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {authorCredentials.join(' • ')}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      {trustBadges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {trustBadges.includes('verified') && (
            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              <Verified size={16} />
              Verified Expert
            </div>
          )}
          {trustBadges.includes('certified') && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              <Award size={16} />
              Certified Professional
            </div>
          )}
          {trustBadges.includes('expert') && (
            <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              <Zap size={16} />
              Industry Expert
            </div>
          )}
          {trustBadges.includes('trusted') && (
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
              <Shield size={16} />
              Trusted Authority
            </div>
          )}
        </div>
      )}

      {/* Author Bio */}
      {authorBio && (
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {authorBio}
        </p>
      )}

      {/* Expertise Areas */}
      {expertiseAreas.length > 0 && (
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
            Areas of Expertise
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {expertiseAreas.map((area, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Rating & Reviews */}
      {(ratingValue > 0 || reviewCount > 0) && (
        <div className="flex items-center gap-4 pt-4 border-t border-indigo-200">
          {ratingValue > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.round(ratingValue) ? 'text-yellow-400' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {ratingValue.toFixed(1)}/5
              </span>
            </div>
          )}
          {reviewCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              {reviewCount.toLocaleString()} expert reviews
            </div>
          )}
        </div>
      )}

      {/* Trust Statement */}
      <div className="mt-4 flex items-start gap-2 text-xs text-gray-600 bg-white bg-opacity-50 p-3 rounded">
        <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
        <p>
          This content is reviewed and verified by financial experts with extensive industry experience. All information meets our high standards for accuracy and relevance.
        </p>
      </div>
    </div>
  );
};

export default EEATSignals;
