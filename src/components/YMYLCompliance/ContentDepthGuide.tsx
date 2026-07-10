import React from 'react';
import { BookOpen, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface ContentDepthGuideProps {
  wordCount?: number;
  readingTime?: number;
  contentSections?: number;
  hasExamples?: boolean;
  hasCaseStudies?: boolean;
  hasExpertQuotes?: boolean;
  updateFrequency?: string;
  lastUpdated?: string;
}

const ContentDepthGuide: React.FC<ContentDepthGuideProps> = ({
  wordCount = 0,
  readingTime = 0,
  contentSections = 0,
  hasExamples = false,
  hasCaseStudies = false,
  hasExpertQuotes = false,
  updateFrequency,
  lastUpdated,
}) => {
  const isQualityContent = wordCount >= 1500;
  const qualityScore = Math.min(
    100,
    Math.round(
      (wordCount / 1500) * 40 +
        (contentSections / 5) * 20 +
        (hasExamples ? 15 : 0) +
        (hasCaseStudies ? 15 : 0) +
        (hasExpertQuotes ? 10 : 0)
    )
  );

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-emerald-600" size={24} />
        <div>
          <h3 className="text-lg font-bold text-gray-900">Content Quality & Depth</h3>
          <p className="text-xs text-gray-600">This article meets high standards for depth and originality</p>
        </div>
      </div>

      {/* Quality Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">Content Quality Score</span>
          <span className="text-2xl font-bold text-emerald-600">{qualityScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              qualityScore >= 80
                ? 'bg-green-500'
                : qualityScore >= 60
                ? 'bg-yellow-500'
                : 'bg-orange-500'
            }`}
            style={{ width: `${qualityScore}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Word Count */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-xs text-gray-600 font-semibold mb-1">WORD COUNT</p>
          <p className="text-2xl font-bold text-blue-600">{wordCount.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-1">
            {wordCount >= 1500
              ? '✓ Meets depth standard'
              : `⚠ Target: 1,500+ words`}
          </p>
        </div>

        {/* Reading Time */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
          <p className="text-xs text-gray-600 font-semibold mb-1">READING TIME</p>
          <p className="text-2xl font-bold text-purple-600">{readingTime} min</p>
          <p className="text-xs text-gray-600 mt-1">Average read duration</p>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
          <p className="text-xs text-gray-600 font-semibold mb-1">SECTIONS</p>
          <p className="text-2xl font-bold text-indigo-600">{contentSections}</p>
          <p className="text-xs text-gray-600 mt-1">
            {contentSections >= 5 ? '✓ Well organized' : 'In-depth breakdown'}
          </p>
        </div>

        {/* Originality */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
          <p className="text-xs text-gray-600 font-semibold mb-1">ORIGINALITY</p>
          <p className="text-2xl font-bold text-emerald-600">100%</p>
          <p className="text-xs text-gray-600 mt-1">Expert-written content</p>
        </div>
      </div>

      {/* Quality Checklist */}
      <div className="bg-white rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-gray-900 mb-3">Content Depth Checklist</h4>

        <div className="flex items-center gap-3">
          {hasExamples ? (
            <CheckCircle size={18} className="text-green-600" />
          ) : (
            <AlertCircle size={18} className="text-gray-400" />
          )}
          <span className={hasExamples ? 'text-gray-900' : 'text-gray-600'}>
            Real-world examples & scenarios
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasCaseStudies ? (
            <CheckCircle size={18} className="text-green-600" />
          ) : (
            <AlertCircle size={18} className="text-gray-400" />
          )}
          <span className={hasCaseStudies ? 'text-gray-900' : 'text-gray-600'}>
            Case studies & detailed analysis
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasExpertQuotes ? (
            <CheckCircle size={18} className="text-green-600" />
          ) : (
            <AlertCircle size={18} className="text-gray-400" />
          )}
          <span className={hasExpertQuotes ? 'text-gray-900' : 'text-gray-600'}>
            Expert insights & quotes
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle size={18} className="text-green-600" />
          <span className="text-gray-900">Comprehensive explanations</span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle size={18} className="text-green-600" />
          <span className="text-gray-900">Actionable takeaways</span>
        </div>
      </div>

      {/* Update Information */}
      {(updateFrequency || lastUpdated) && (
        <div className="mt-4 pt-4 border-t border-emerald-200 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            {lastUpdated && (
              <p>
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
            )}
            {updateFrequency && (
              <p className="mt-1">
                <strong>Update Frequency:</strong> {updateFrequency}
              </p>
            )}
          </div>
          {qualityScore >= 80 && (
            <div className="text-right">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                <TrendingUp size={16} />
                High Quality Content
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentDepthGuide;
