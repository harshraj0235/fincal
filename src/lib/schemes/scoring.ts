export type Gender = 'male' | 'female' | 'other';
export type Occupation = 'salaried' | 'farmer' | 'gig' | 'housewife' | 'senior';
export type FamilyStatus = 'single' | 'married' | 'married_children' | 'parents_dependent';
export type IncomeRange = 'lt2l' | '2to5l' | '5to10l' | 'gt10l';
export type State =
  | 'maharashtra' | 'karnataka' | 'uttar-pradesh' | 'bihar' | 'madhya-pradesh'
  | 'rajasthan' | 'telangana' | 'gujarat' | 'tamil-nadu' | 'delhi';

export interface Answers {
  age: number;
  gender: Gender;
  incomeRange: IncomeRange;
  occupation: Occupation;
  familyStatus: FamilyStatus;
  state: State;
  hasGirlChild: boolean;
}

export type RuleOp = 'eq' | 'in' | 'bool' | 'gte' | 'lte' | 'between';

export interface EligibilityRule {
  key: keyof Answers;
  op: RuleOp;
  value: any;
  weight: number;
  description: string;
}

export interface Scheme {
  id: string;
  name: string;
  briefBenefit: string;
  applyUrl: string;
  rules: EligibilityRule[];
}

export interface ChecklistItem {
  text: string;
  ok: boolean;
}

export interface ScoreResult {
  pct: number;
  checklist: ChecklistItem[];
}

function evaluateRule(ans: Answers, rule: EligibilityRule): boolean {
  const v = ans[rule.key] as any;
  switch (rule.op) {
    case 'eq':
      return v === rule.value;
    case 'in':
      return Array.isArray(rule.value) ? rule.value.includes(v) : false;
    case 'bool':
      return Boolean(v) === Boolean(rule.value);
    case 'gte':
      return typeof v === 'number' && v >= Number(rule.value);
    case 'lte':
      return typeof v === 'number' && v <= Number(rule.value);
    case 'between':
      if (Array.isArray(rule.value) && rule.value.length === 2) {
        const [min, max] = rule.value;
        return typeof v === 'number' && v >= Number(min) && v <= Number(max);
      }
      return false;
    default:
      return false;
  }
}

export function scoreScheme(ans: Answers, scheme: Scheme): ScoreResult {
  let total = 0;
  let matched = 0;
  const checklist: ChecklistItem[] = [];
  for (const r of scheme.rules) {
    total += r.weight;
    const ok = evaluateRule(ans, r);
    if (ok) matched += r.weight;
    checklist.push({ text: r.description, ok });
  }
  const pct = total > 0 ? Math.round((matched / total) * 100) : 0;
  return { pct, checklist };
}
