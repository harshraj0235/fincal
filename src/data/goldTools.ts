export type GoldToolType =
  | 'purity'
  | 'weightConvert'
  | 'value'
  | 'makingCharges'
  | 'sip'
  | 'lumpsum'
  | 'etfVsPhysical'
  | 'sovereignBond'
  | 'returns'
  | 'loanEmi'
  | 'jewelleryEstimator'
  | 'scrapValue'
  | 'monthlyGoal'
  | 'meltLoss'
  | 'pricePerGram'
  | 'karatToPurity'
  | 'gramToTola'
  | 'gramToOunce'
  | 'goldETFSIP'
  | 'sovereignRedemption';

export interface GoldToolConfig {
  slug: string;
  name: string;
  type: GoldToolType;
  description: string;
  seo?: { title?: string; description?: string; keywords?: string[] };
}

export const goldTools: GoldToolConfig[] = [
  { slug: 'gold-purity-calculator', name: 'Gold Purity Calculator (Karat to Fineness)', type: 'purity', description: 'Convert Karat to fineness and estimate pure gold content in grams.' },
  { slug: 'gold-weight-converter', name: 'Gold Weight Converter (Gram/Tola/Ounce)', type: 'weightConvert', description: 'Convert gold weight between grams, tola, and troy ounces.' },
  { slug: 'gold-value-estimator', name: 'Gold Value Estimator', type: 'value', description: 'Estimate gold value using weight, purity and market price per gram.' },
  { slug: 'gold-making-charges-gst', name: 'Making Charges + GST Estimator', type: 'makingCharges', description: 'Estimate invoice including making charges and GST on gold jewellery.' },
  { slug: 'gold-sip-calculator', name: 'Gold SIP Calculator', type: 'sip', description: 'Future value of monthly gold investment with expected return.' },
  { slug: 'gold-lumpsum-calculator', name: 'Gold Lumpsum Return Calculator', type: 'lumpsum', description: 'Future value/CAGR of lumpsum invested in gold.' },
  { slug: 'gold-etf-vs-physical', name: 'Gold ETF vs Physical Gold', type: 'etfVsPhysical', description: 'Compare costs of ETF expense ratio vs physical gold making/wastage.' },
  { slug: 'sovereign-gold-bond-interest', name: 'Sovereign Gold Bond Interest', type: 'sovereignBond', description: 'Estimate annual interest income on SGB units.' },
  { slug: 'gold-cagr-calculator', name: 'Gold CAGR/Return Calculator', type: 'returns', description: 'Compute CAGR between buy and sell values for gold.' },
  { slug: 'gold-loan-emi-calculator', name: 'Gold Loan EMI Calculator', type: 'loanEmi', description: 'Compute EMI for a gold-backed loan quickly.' },
  { slug: 'jewellery-price-estimator', name: 'Jewellery Price Estimator', type: 'jewelleryEstimator', description: 'Estimate jewellery price with purity, making, wastage and GST.' },
  { slug: 'gold-scrap-resale-value', name: 'Scrap/Resale Value Estimator', type: 'scrapValue', description: 'Estimate resale value after discount and purity deductions.' },
  { slug: 'monthly-goal-in-gold', name: 'Monthly Saving Goal (Gold)', type: 'monthlyGoal', description: 'Monthly saving needed to reach target amount in gold.' },
  { slug: 'melt-loss-estimator', name: 'Melt Loss Estimator', type: 'meltLoss', description: 'Estimate loss during melting/refining of jewellery to bullion.' },
  { slug: 'price-per-gram-from-10g', name: 'Price per Gram from 10g Rate', type: 'pricePerGram', description: 'Convert 10g quoted price to per-gram price for calculations.' },
  { slug: 'karat-to-purity', name: 'Karat to Purity %', type: 'karatToPurity', description: 'Convert Karat to purity percentage and fineness.' },
  { slug: 'gram-to-tola', name: 'Gram to Tola', type: 'gramToTola', description: 'Convert grams to tola units used in Indian markets.' },
  { slug: 'gram-to-ounce', name: 'Gram to Troy Ounce', type: 'gramToOunce', description: 'Convert grams to troy ounces (precious metals).' },
  { slug: 'gold-etf-sip-value', name: 'Gold ETF SIP Value', type: 'goldETFSIP', description: 'Future value for SIP in a Gold ETF given expense ratio.' },
  { slug: 'sovereign-gold-bond-redemption', name: 'SGB Redemption Value Estimator', type: 'sovereignRedemption', description: 'Estimate SGB redemption value at maturity with indicative price.' },
];

export function findGoldTool(slug: string): GoldToolConfig | undefined {
  return goldTools.find(t => t.slug === slug);
}


