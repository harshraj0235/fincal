import { CalculatorConfig } from '../types';
import { emiConfig } from './emiConfig';
import { sipConfig } from './sipConfig';
import { fdConfig } from './fdConfig';
import { ppfConfig } from './ppfConfig';
import { personalLoanConfig } from './personalLoanConfig';
import { advanceTaxConfig } from './advanceTaxConfig';
import { carLoanConfig } from './carLoanConfig';
import { homeLoanConfig } from './homeLoanConfig';
import { mutualFundReturnsConfig } from './mutualFundReturnsConfig';
import { npsConfig } from './npsConfig';
import { apyConfig } from './apyConfig';
import { bikeLoanConfig } from './bikeLoanConfig';

// A central registry mapping calculator IDs to their configurations.
export const omniRegistry: Record<string, CalculatorConfig> = {
  'emi-calculator': emiConfig,
  'sip-calculator': sipConfig,
  'fd-calculator': fdConfig,
  'ppf-calculator': ppfConfig,
  'personal-loan-calculator': personalLoanConfig,
  'advance-tax-calculator': advanceTaxConfig,
  'car-loan-calculator': carLoanConfig,
  'home-loan-calculator': homeLoanConfig,
  'mutual-fund-returns-calculator': mutualFundReturnsConfig,
  'nps-calculator': npsConfig,
  'apy-calculator': apyConfig,
  'bike-loan-calculator': bikeLoanConfig,
  // Add more migrated configs here...
};

export function getOmniConfig(id: string): CalculatorConfig | undefined {
  return omniRegistry[id];
}
