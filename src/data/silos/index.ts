/**
 * moneycal.in - Strategic Content Silos Index 2026
 */
import { msmeSchemes } from './msmeSubsidiesData';
import { landRecordGuides } from './landRecordsData';
import { scholarships } from './scholarshipsData';
import { youthBankingProducts } from './youthBankingData';
import { taxationUpdates } from './taxation2026Data';
import { scamReports } from './scamDiagnosticsData';
import { tradingTerminalGuides } from './tradingTerminalsData';
import { macroTrends } from './macroTrendsData';
import { insuranceNiches } from './insuranceNicheData';
import { authorityHistory } from './authorityData';

export const allSilos = {
  msme: msmeSchemes,
  land: landRecordGuides,
  scholarships,
  youth: youthBankingProducts,
  taxation: taxationUpdates,
  scams: scamReports,
  trading: tradingTerminalGuides,
  macro: macroTrends,
  insurance: insuranceNiches,
  authority: authorityHistory
};

export const siloCategories = [
  { id: 'msme', name: 'MSME Subsidies', hindiName: 'MSME सब्सिडी' },
  { id: 'land', name: 'Land Records', hindiName: 'भूमि रिकॉर्ड' },
  { id: 'scholarships', name: 'Scholarships', hindiName: 'छात्रवृत्ति' },
  { id: 'youth', name: 'Youth Banking', hindiName: 'युवा बैंकिंग' },
  { id: 'taxation', name: 'Taxation & Budget', hindiName: 'कराधान और बजट' },
  { id: 'scams', name: 'Scam Diagnostics', hindiName: 'स्कैम डायग्नोस्टिक्स' },
  { id: 'trading', name: 'Trading Terminals', hindiName: 'ट्रेडिंग टर्मिनल' },
  { id: 'macro', name: 'Macro Trends', hindiName: 'मैक्रो ट्रेंड्स' },
  { id: 'insurance', name: 'Insurance Niche', hindiName: 'बीमा आला' }
];
