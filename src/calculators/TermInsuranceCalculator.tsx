import React, { useState, useEffect } from "react";
import { Sliders, Calculator, Shield, Info, ExternalLink, Twitter, Facebook, Share2 } from "lucide-react";

// Utility to format numbers as Indian currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};


// SEO/FAQ Schema for Google EEAT, ranking & FAQ rich snippets
const injectSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is term insurance premium calculated in India in 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Premium is calculated based on age, cover amount, policy term, gender, smoking status, and health. Latest IRDAI and insurer data show digital plans, non-smoker, and female lives enjoy lower rates. Riders and return of premium add cost."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a term plan online and enter my own cover amount?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, most insurers and fintechs allow you to enter your sum assured, term, and other details online for instant quotes and purchase. This calculator lets you compare and plan manually!"
        }
      },
      {
        "@type": "Question",
        "name": "What are the best features of term insurance in India (2025)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Affordable pure protection, flexible premium payment, option for riders (critical illness, accidental death), high claim settlement ratios, and tax benefits under 80C and 10(10D)."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any authentic sources to compare claim settlement ratios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, refer to IRDAI's annual report for claim settlement stats: https://irdai.gov.in/document-detail?documentId=1371410"
        }
      },
      {
        "@type": "Question",
        "name": "Is medical checkup mandatory for term insurance in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Usually for higher sums assured or ages above 40, but many digital plans up to ₹1 crore allow instant policies for young, healthy, non-smokers."
        }
      }
    ]
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
  return () => { document.head.removeChild(script); };
};

// SEO is handled globally by SEOHelmet at the page level
const SEO = () => null;

export const TermInsuranceCalculator: React.FC = () => {
  // State
  const [age, setAge] = useState<number>(30);
  const [coverAmount, setCoverAmount] = useState<number>(10000000);
  const [policyTerm, setPolicyTerm] = useState<number>(30);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [annualPremium, setAnnualPremium] = useState<number>(0);
  const [monthlyPremium, setMonthlyPremium] = useState<number>(0);
  const [manualCover, setManualCover] = useState<string>("10000000");
  const [manualAge, setManualAge] = useState<string>("30");
  const [manualTerm, setManualTerm] = useState<string>("30");

  // Advanced features
  const [returnOfPremium, setReturnOfPremium] = useState<boolean>(false);
  const [criticalIllness, setCriticalIllness] = useState<boolean>(false);
  const [accidentalDeath, setAccidentalDeath] = useState<boolean>(false);

  // For SEO FAQ schema
  useEffect(() => {
    const cleanup = injectSchema();
    return cleanup;
  }, []);

  // Premium calculation
  useEffect(() => {
    // Realistic base: rates as of 2025 top insurers (₹0.18 - 0.25 per 1000 per year for 30yo, 1Cr, 30yr, non-smoker)
    let basePremium = (coverAmount / 1000) * 0.2;

    // Age factor
    basePremium *= 1 + Math.max(0, (age - 25) * 0.03);

    // Gender
    if (gender === "female") basePremium *= 0.9;

    // Smoker
    if (smoker) basePremium *= 1.5;

    // Policy term
    basePremium *= 1 + Math.max(0, (policyTerm - 20) * 0.02);

    // Riders
    if (returnOfPremium) basePremium *= 1.4;
    if (criticalIllness) basePremium += 0.0015 * coverAmount;
    if (accidentalDeath) basePremium += 0.0008 * coverAmount;

    setAnnualPremium(basePremium);
    setMonthlyPremium(basePremium / 12);
  }, [age, coverAmount, policyTerm, smoker, gender, returnOfPremium, criticalIllness, accidentalDeath]);

  // Manual input handler
  const handleManualInput = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string,
    min: number,
    max: number,
    setManual: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setManual(value);
    let num = Number(value.replace(/[^0-9]/g, ""));
    if (value === "" || isNaN(num)) {
        return value; // Allow user to clear input
    }
    if (num < min) num = min;
    if (num > max) num = max;
    setter(num);
    return String(num);
  };
  
  // Social Share Handler
  const handleShare = (platform: 'twitter' | 'facebook' | 'whatsapp') => {
    const url = "https://fincal.in/term-insurance-calculator";
    const text = `I just calculated my term insurance premium! For a ${formatCurrency(coverAmount)} cover, it's just ${formatCurrency(monthlyPremium)}/month. Calculate yours here:`;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    let shareUrl = "";
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
            break;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };


  return (
    <>
      <SEO />
      <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8" itemScope itemType="https://schema.org/FinancialProduct">
        <h1 className="sr-only" itemProp="name">
          Term Insurance Calculator India 2025 - Instant Premium, IRDAI, Compare
        </h1>
        <meta
          itemProp="description"
          content="Calculate your term insurance premium for India 2025 with EEAT-compliant, SEO-optimized calculator. Enter custom data, see IRDAI stats, compare features, get tax info & authentic external links."
        />
        {/* Left: User Inputs */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Term Insurance Details
          </h2>
          <div className="space-y-4">
            {/* Cover Amount */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="cover-amount" className="text-sm font-medium text-neutral-700">
                  Cover Amount (₹)
                </label>
                <span className="text-sm text-neutral-500">{formatCurrency(coverAmount)}</span>
              </div>
              <input
                type="range"
                id="cover-amount"
                min="1000000"
                max="50000000"
                step="500000"
                value={coverAmount}
                onChange={(e) => {
                  setCoverAmount(Number(e.target.value));
                  setManualCover(e.target.value);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="text"
                className="border mt-2 px-2 py-1 rounded w-full"
                value={manualCover}
                onChange={e =>
                  setManualCover(handleManualInput(setCoverAmount, e.target.value, 1000000, 50000000, setManualCover))
                }
                aria-label="Manual Cover Amount"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {/* Age */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="age" className="text-sm font-medium text-neutral-700">
                  Age (Years)
                </label>
                <span className="text-sm text-neutral-500">{age} years</span>
              </div>
              <input
                type="range"
                id="age"
                min="18"
                max="65"
                value={age}
                onChange={(e) => {
                  setAge(Number(e.target.value));
                  setManualAge(e.target.value);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="text"
                className="border mt-2 px-2 py-1 rounded w-full"
                value={manualAge}
                onChange={e =>
                  setManualAge(handleManualInput(setAge, e.target.value, 18, 65, setManualAge))
                }
                aria-label="Manual Age"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {/* Policy Term */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="policy-term" className="text-sm font-medium text-neutral-700">
                  Policy Term (Years)
                </label>
                <span className="text-sm text-neutral-500">{policyTerm} years</span>
              </div>
              <input
                type="range"
                id="policy-term"
                min="5"
                max="40"
                value={policyTerm}
                onChange={(e) => {
                  setPolicyTerm(Number(e.target.value));
                  setManualTerm(e.target.value);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="text"
                className="border mt-2 px-2 py-1 rounded w-full"
                value={manualTerm}
                onChange={e =>
                  setManualTerm(handleManualInput(setPolicyTerm, e.target.value, 5, 40, setManualTerm))
                }
                aria-label="Manual Policy Term"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {/* Gender & Smoker */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-2 block">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      gender === "male"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                    onClick={() => setGender("male")}
                  >
                    Male
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      gender === "female"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                    onClick={() => setGender("female")}
                  >
                    Female
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="smoker"
                  checked={smoker}
                  onChange={(e) => setSmoker(e.target.checked)}
                  className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="smoker" className="text-sm font-medium text-neutral-700">
                  Smoker
                </label>
              </div>
            </div>
            {/* Riders */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">Add Riders</label>
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={returnOfPremium}
                    onChange={e => setReturnOfPremium(e.target.checked)}
                    className="rounded border-neutral-300 text-blue-600 mr-2"
                  />
                  Return of Premium
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={criticalIllness}
                    onChange={e => setCriticalIllness(e.target.checked)}
                    className="rounded border-neutral-300 text-blue-600 mr-2"
                  />
                  Critical Illness
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={accidentalDeath}
                    onChange={e => setAccidentalDeath(e.target.checked)}
                    className="rounded border-neutral-300 text-blue-600 mr-2"
                  />
                  Accidental Death
                </label>
              </div>
            </div>
          </div>
          {/* Premium Summary */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Premium Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Annual Premium</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(annualPremium)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Monthly Premium</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyPremium)}</p>
              </div>
            </div>
             {/* Social Share Buttons */}
            <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-center font-medium text-blue-800 mb-2">Share Your Results</p>
                <div className="flex justify-center items-center space-x-3">
                    <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm" aria-label="Share on Twitter">
                        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                    </button>
                    <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm" aria-label="Share on Facebook">
                        <Facebook className="w-5 h-5 text-[#1877F2]" />
                    </button>
                    <button onClick={() => handleShare('whatsapp')} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm" aria-label="Share on WhatsApp">
                        <Share2 className="w-5 h-5 text-[#25D366]" />
                    </button>
                </div>
            </div>
            <div className="mt-2 text-xs text-red-700">
              * Actual premium may vary by insurer, health, add-ons, and latest IRDAI rules.
            </div>
          </div>
        </div>
        {/* Right: Features, Info, SEO */}
        <div className="space-y-6">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <Calculator className="w-5 h-5 mr-2 text-blue-600" />
              Policy & Market Information
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Coverage Details</h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>Sum Assured</span>
                    <span className="font-medium">{formatCurrency(coverAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Policy Term</span>
                    <span className="font-medium">{policyTerm} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage Till Age</span>
                    <span className="font-medium">{age + policyTerm} years</span>
                  </div>
                  {returnOfPremium && (
                    <div className="flex justify-between">
                      <span>Return of Premium</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                  )}
                  {criticalIllness && (
                    <div className="flex justify-between">
                      <span>Critical Illness Rider</span>
                      <span className="font-medium text-orange-700">Enabled</span>
                    </div>
                  )}
                  {accidentalDeath && (
                    <div className="flex justify-between">
                      <span>Accidental Death Rider</span>
                      <span className="font-medium text-orange-700">Enabled</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Premium Payment Options</h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>Annual Mode</span>
                    <span className="font-medium">{formatCurrency(annualPremium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Mode</span>
                    <span className="font-medium">{formatCurrency(monthlyPremium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Premium (Annual)</span>
                    <span className="font-medium">{formatCurrency(annualPremium * policyTerm)}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="text-lg font-medium text-orange-900 mb-2">Key Features & Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-orange-700">
                  <li>Pure protection for your family at the lowest cost</li>
                  <li>Tax benefits under Sec 80C & 10(10D)</li>
                  <li>Riders for extra protection (critical illness, accidental death, waiver of premium)</li>
                  <li>Option for return of premium at maturity</li>
                  <li>100% digital application with instant e-policy (upto ₹1 crore, select insurers)</li>
                  <li>
                    <a
                      href="https://irdai.gov.in/document-detail?documentId=1371410"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-700 flex items-center"
                    >
                      IRDAI Claim Settlement Ratios <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </li>
                  <li>
                    Compare term plans at{" "}
                    <a
                      href="https://www.policybazaar.com/life-insurance/term-insurance/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-700"
                    >
                      PolicyBazaar <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Unique FAQ for SEO/EEAT */}
          <div className="bg-white p-6 rounded-lg border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  How is term insurance premium calculated in India?
                </h3>
                <p className="text-neutral-600">
                  Based on age, sum assured, term, gender, smoking/health, riders, and insurer. Premiums are lowest for young, healthy, non-smoking females. See{" "}
                  <a
                    href="https://irdai.gov.in/document-detail?documentId=1371410"
                    className="underline text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRDAI Claim Data
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  Can I enter my own cover amount and term?
                </h3>
                <p className="text-neutral-600">
                  Yes, you can customize cover, term, age, gender, and riders in this calculator for personalized quotes.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  What is the best time to buy a term plan?
                </h3>
                <p className="text-neutral-600">
                  The earlier, the better! Premiums rise sharply with age or health issues. Start in your 20s or after a major life event (marriage, loan, child).
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  Is medical checkup needed for all term plans?
                </h3>
                <p className="text-neutral-600">
                  Not always. Digital plans up to ₹1 crore (age &lt; 40, healthy) may not require tests.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  Is term insurance payout tax-free?
                </h3>
                <p className="text-neutral-600">
                  Yes, sum assured received by nominee is tax-free under Section 10(10D), provided all conditions are met.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-1">
                  Where can I compare top plans and claim ratios?
                </h3>
                <p className="text-neutral-600">
                  For unbiased data, use{" "}
                  <a
                    href="https://irdai.gov.in/document-detail?documentId=1371410"
                    className="underline text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRDAI Annual Report
                  </a>
                  {" "}and{" "}
                  <a
                    href="https://www.policybazaar.com/life-insurance/term-insurance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-700"
                  >
                    PolicyBazaar
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermInsuranceCalculator;
