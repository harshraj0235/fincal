/**
 * YMYL Compliance Styling Utilities
 * Common styles for YMYL components to ensure consistency
 */

export const ymylStyles = {
  // E-E-A-T Signals Styles
  eeatContainer:
    'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-6',
  eeatAuthorName: 'text-lg font-bold text-gray-900 flex items-center gap-2',
  eeatCredentials: 'text-sm text-gray-600 mt-1',
  eeatBadge: 'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold',
  eeatBio: 'text-gray-700 text-sm mb-4 leading-relaxed',
  eeatExpertise:
    'flex flex-wrap gap-2 mt-2 after:content-[""] after:flex-basis-[100%]',
  eeatRating: 'flex items-center gap-4 pt-4 border-t border-indigo-200',

  // Disclaimer Styles
  disclaimerContainer:
    'bg-red-50 border-2 border-red-200 rounded-lg overflow-hidden',
  disclaimerButton:
    'w-full flex items-center justify-between p-4 hover:bg-red-100 transition-colors',
  disclaimerHeader: 'flex items-center gap-3',
  disclaimerTitle: 'font-bold text-red-900',
  disclaimerSubtitle: 'text-xs text-red-700',
  disclaimerContent: 'border-t-2 border-red-200 p-4 space-y-4 bg-white',
  disclaimerSection: 'space-y-2',
  disclaimerSectionTitle: 'font-semibold text-gray-900 flex items-center gap-2',
  disclaimerText: 'text-sm text-gray-700 leading-relaxed ml-6',
  disclaimerLegal: 'mt-4 pt-4 border-t border-gray-300 space-y-2',
  disclaimerList: 'list-disc ml-4 mt-2 space-y-1',
  disclaimerLimitation:
    'mt-4 pt-4 border-t border-gray-300 bg-gray-50 p-3 rounded',

  // Source Citations Styles
  citationsContainer:
    'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6',
  citationsHeader: 'flex items-center gap-3 mb-4',
  citationsTitle: 'text-lg font-bold text-gray-900',
  citationsSubtitle: 'text-xs text-gray-600',
  citationsSection: 'mb-6',
  citationsSectionTitle: 'font-semibold text-gray-900 mb-3 flex items-center gap-2',
  citationsList: 'grid gap-2',
  citationsLink: 'group flex items-start gap-3 p-2 rounded hover:bg-blue-100 transition-colors',
  citationsLinkText: 'text-sm font-medium group-hover:underline',
  citationsSource: 'text-xs text-gray-600',
  citationsTrust: 'mt-4 pt-4 border-t border-blue-200 text-xs text-gray-600 text-center',

  // Expert Author Styles
  authorContainer:
    'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 rounded-lg overflow-hidden',
  authorHeader:
    'bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white',
  authorHeaderContent: 'flex items-start gap-4',
  authorImage: 'w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg',
  authorInfo: 'flex-1',
  authorName: 'text-2xl font-bold mb-1',
  authorTitle: 'text-indigo-100 text-lg font-semibold mb-2',
  authorCertBadges: 'flex flex-wrap gap-2',
  authorCertBadge:
    'bg-white bg-opacity-20 backdrop-blur px-3 py-1 rounded-full text-xs font-medium border border-white border-opacity-30',
  authorContent: 'p-6 space-y-6',
  authorBio: 'text-gray-700 leading-relaxed text-sm',
  authorExperience: 'bg-white rounded-lg p-4 border-l-4 border-indigo-600',
  authorExperienceTitle: 'font-semibold text-gray-900 mb-2 flex items-center gap-2',
  authorExperienceYears: 'font-bold text-lg text-indigo-600',
  authorSection: 'flex items-center gap-2 text-gray-900 mb-3',
  authorSectionIcon: 'size-5 mb-3',
  authorSectionList: 'space-y-2',
  authorSectionItem: 'flex items-start gap-3',
  authorVerification: 'bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-xs text-blue-900 leading-relaxed',
  authorFooter: 'flex items-center justify-between pt-4 border-t border-gray-200 text-xs text-gray-600',
  authorSocialLinks: 'flex items-center gap-2',

  // Content Depth Guide Styles
  depthContainer:
    'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6',
  depthHeader: 'flex items-center gap-3 mb-6',
  depthTitle: 'text-lg font-bold text-gray-900',
  depthScore: 'flex items-center justify-between mb-2',
  depthScoreLabel: 'font-semibold text-gray-900',
  depthScoreValue: 'text-2xl font-bold text-emerald-600',
  depthBar: 'w-full bg-gray-200 rounded-full h-3 overflow-hidden',
  depthBarFill: 'h-full transition-all duration-500',
  depthMetricsGrid: 'grid grid-cols-2 gap-4 mb-6',
  depthMetric: 'bg-white rounded-lg p-4 border-l-4',
  depthMetricLabel: 'text-xs text-gray-600 font-semibold mb-1',
  depthMetricValue: 'text-2xl font-bold',
  depthMetricInfo: 'text-xs text-gray-600 mt-1',
  depthChecklist: 'bg-white rounded-lg p-4 space-y-3',
  depthChecklistTitle: 'font-semibold text-gray-900 mb-3',
  depthChecklistItem: 'flex items-center gap-3',
  depthChecklistIcon: 'w-5 h-5',
  depthChecklistText: 'text-sm',
  depthUpdate: 'mt-4 pt-4 border-t border-emerald-200 flex items-center justify-between',
  depthUpdateInfo: 'text-xs text-gray-600',
  depthQualityBadge: 'text-right text-sm text-emerald-700 font-semibold flex items-center gap-2',

  // Common Color Utilities
  badgeGreen: 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold',
  badgeBlue: 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold',
  badgePurple: 'bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold',
  badgeYellow: 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold',
  badgeRed: 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold',

  // Icons
  iconGreen: 'text-green-600',
  iconBlue: 'text-blue-600',
  iconRed: 'text-red-600',
  iconPurple: 'text-purple-600',
  iconYellow: 'text-yellow-600',

  // Text Utilities
  textSmall: 'text-xs',
  textSmallMed: 'text-sm',
  textLarge: 'text-lg',
  textXLarge: 'text-xl',
  textBold: 'font-bold',
  textMedium: 'font-semibold',
  textGray: 'text-gray-600',
  textGrayDark: 'text-gray-900',

  // Responsive Utilities
  gridResponsive: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  containerResponsive: 'mx-auto px-4 py-8 max-w-4xl',

  // Animation Utilities
  transitionSmooth: 'transition-all duration-300',
  hoverEffect: 'hover:bg-gray-50 transition-colors',
};

/**
 * YMYL Component Theme Colors
 */
export const ymylTheme = {
  // Primary Colors
  primary: {
    indigo: '#4F46E5',
    blue: '#3B82F6',
    purple: '#A855F7',
    pink: '#EC4899',
  },

  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Backgrounds
  backgrounds: {
    light: '#F3F4F6',
    lighter: '#F9FAFB',
    warning: '#FEF3C7',
    error: '#FEE2E2',
    success: '#ECFDF5',
    info: '#EFF6FF',
  },

  // Borders
  borders: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    warning: '#FCD34D',
    error: '#FECACA',
    success: '#A7F3D0',
  },

  // Text
  text: {
    dark: '#1F2937',
    medium: '#4B5563',
    light: '#6B7280',
  },
};

/**
 * Tailwind CSS Class Presets
 * Ready-to-use class combinations
 */
export const presetClasses = {
  // Card Styles
  card: 'bg-white rounded-lg shadow-md p-6 border border-gray-200',
  cardHover: 'bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow',
  cardHighlight: 'bg-blue-50 rounded-lg border-l-4 border-blue-500 p-6',

  // Buttons
  buttonPrimary:
    'bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors',
  buttonSecondary:
    'bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors',
  buttonDanger:
    'bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors',

  // Links
  linkPrimary: 'text-indigo-600 hover:text-indigo-800 underline transition-colors',
  linkExternal: 'text-blue-600 hover:text-blue-800 underline flex items-center gap-2',

  // Badges & Labels
  badgeSuccess: 'inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold',
  badgeWarning: 'inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold',
  badgeError: 'inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold',
  badgeInfo: 'inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold',

  // Sections
  sectionHeader:
    'border-b-2 border-gray-200 pb-4 mb-6 flex items-center justify-between',
  sectionTitle: 'text-2xl font-bold text-gray-900',

  // Grid Layouts
  grid2Col: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  grid3Col: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  grid4Col: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4',
};

export default ymylStyles;
