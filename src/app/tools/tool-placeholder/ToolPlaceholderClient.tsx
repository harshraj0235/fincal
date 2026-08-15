"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IndianRupee, BookOpen, CheckCircle, ArrowLeft, Calculator, Target, Zap, ArrowRight, Info, PlusCircle } from 'lucide-react';
import { CalculatorSchema } from '@/components/CalculatorSchema';
import { motion } from 'framer-motion';

const ToolPlaceholder: React.FC = () => {
  const { toolId } = (useParams<{ toolId: string | string[] }>() || {});
  const [currentHub, setCurrentHub] = useState<string>('');
  
  // Calculator State
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(5);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        setCurrentHub(pathSegments[0]);
      }
    }
  }, []);

  let safeToolId = '';
  if (Array.isArray(toolId)) {
    safeToolId = toolId[toolId.length - 1];
  } else if (typeof toolId === 'string') {
    safeToolId = toolId;
  } else if (typeof window !== 'undefined') {
    const segments = window.location.pathname.split('/').filter(Boolean);
    safeToolId = segments[segments.length - 1] || 'finance-tool';
  }

  // Programmatic SEO Variables
  const toolName = safeToolId 
    ? safeToolId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
    : 'Financial Calculator';
  const hubNameClean = currentHub ? currentHub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Tools Hub';

  // Generic Calculation Logic (Compound Interest / Percentage Estimator)
  const calculationResults = useMemo(() => {
    const principal = amount || 0;
    const r = (rate || 0) / 100;
    const t = years || 0;
    
    // Fallback formula: A = P(1+r)^t
    const finalAmount = principal * Math.pow(1 + r, t);
    const growth = finalAmount - principal;

    return {
      principal,
      growth,
      finalAmount
    };
  }, [amount, rate, years]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <>
      {/* Schema Markup for SEO */}
      <CalculatorSchema 
        name={toolName}
        description={`Free online ${toolName} by MoneyCal. Calculate and plan your finances accurately.`}
        url={`/${currentHub}/${safeToolId}`}
        features={['Instant Calculation', 'Accurate Estimations', 'Interactive Outputs']}
        category="FinanceApplication"
        faqData={[
          { question: `What is the ${toolName}?`, answer: `The ${toolName} is a free tool provided by MoneyCal to help you accurately estimate your financial metrics instantly.` },
          { question: `How accurate is the ${toolName}?`, answer: `Our tool uses standardized mathematical formulas to provide highly accurate estimates for your planning.` },
          { question: `Is this tool free to use?`, answer: `Yes, all calculators on MoneyCal are 100% free with no sign-up required.` }
        ]}
      />

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={currentHub ? `/${currentHub}` : "/"} className="inline-flex items-center text-blue-200 hover:text-white mb-8 text-sm font-medium transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {hubNameClean}
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/50 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-700/50">
                  <Calculator className="w-3 h-3 mr-2" /> Programmatic SEO Engine Active
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                  {toolName}
                </h1>
                <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
                  Use our advanced <strong>{toolName}</strong> to simulate scenarios, project financial outcomes, and make smarter decisions instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Calculator Interface */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Interactive Calculator Engine */}
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" /> Dynamic Estimator
                  </h2>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Base Amount (₹)</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-gray-500 font-medium">₹</span>
                          </div>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold text-gray-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Percentage / Rate (%)</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="1"
                            max="50"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="w-20 relative">
                            <input
                              type="number"
                              value={rate}
                              onChange={(e) => setRate(Number(e.target.value))}
                              className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg font-semibold text-gray-900"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Time Period (Years)</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="1"
                            max="30"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="w-20 relative">
                            <input
                              type="number"
                              value={years}
                              onChange={(e) => setYears(Number(e.target.value))}
                              className="w-full pl-3 pr-6 py-2 bg-gray-50 border border-gray-200 rounded-lg font-semibold text-gray-900"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-xs">Yr</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-center">
                      <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-6 text-center">Projected Results</h3>
                      
                      <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-blue-200/60 pb-3">
                          <span className="text-gray-600 font-medium">Base Value</span>
                          <span className="text-lg font-bold text-gray-900">{formatCurrency(calculationResults.principal)}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-blue-200/60 pb-3">
                          <span className="text-gray-600 font-medium flex items-center"><PlusCircle className="w-4 h-4 mr-1 text-green-500"/> Estimated Variance</span>
                          <span className="text-lg font-bold text-green-600">+{formatCurrency(calculationResults.growth)}</span>
                        </div>
                        <div className="pt-2">
                          <span className="block text-gray-500 font-medium text-sm mb-1">Final Calculated Value</span>
                          <span className="text-3xl font-black text-blue-700">{formatCurrency(calculationResults.finalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Programmatic SEO Article Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 prose prose-blue max-w-none">
                <h2>The Ultimate Guide to the {toolName}</h2>
                <p>
                  Planning your finances can be complex, but the <strong>{toolName}</strong> simplifies the process. Whether you are analyzing long-term strategies, calculating estimated costs, or projecting future growth, our dynamic calculator provides immediate, data-driven insights tailored to your specific inputs.
                </p>
                
                <h3>How It Works</h3>
                <p>Using the {toolName} is straightforward and requires no technical expertise:</p>
                <ol>
                  <li><strong>Enter your Base Amount:</strong> This represents your starting capital, principal, or initial cost.</li>
                  <li><strong>Adjust the Percentage:</strong> Input the expected rate of return, interest rate, or variance percentage applicable to your scenario.</li>
                  <li><strong>Select the Time Period:</strong> Define the duration in years for which the calculation applies.</li>
                  <li><strong>Analyze the Results:</strong> The engine instantly computes the variance and provides a final projected value.</li>
                </ol>

                <h3>Why Use This Tool?</h3>
                <p>
                  Accuracy is critical in financial planning. By leveraging standard mathematical formulas—including compounding interest algorithms—the {toolName} eliminates manual computation errors and provides a clear picture of your financial trajectory.
                </p>

                <h3>Frequently Asked Questions</h3>
                <div className="space-y-4 not-prose mt-6">
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                    <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0 mt-0.5"/> What is the formula behind this calculator?</h4>
                    <p className="text-gray-600 leading-relaxed">It utilizes dynamic mathematical modeling, factoring in your base value against the selected rate and time variables to output an accurate projection.</p>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                    <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0 mt-0.5"/> Can I trust these estimations?</h4>
                    <p className="text-gray-600 leading-relaxed">Yes, while results are indicative, they are based on standardized financial equations designed to give you a highly accurate baseline for planning.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" /> Related Tools
                </h3>
                <p className="text-sm text-gray-500 mb-6">Explore other highly utilized tools in the {hubNameClean}.</p>
                
                <div className="space-y-3">
                  <Link href="/calculators/emi-calculator" className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 group transition-colors border border-transparent hover:border-blue-100">
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700 text-sm">Advanced EMI Calculator</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/calculators/sip-calculator" className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 group transition-colors border border-transparent hover:border-blue-100">
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700 text-sm">SIP Returns Estimator</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/tax-tools/old-vs-new-tax-regime-helper" className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 group transition-colors border border-transparent hover:border-blue-100">
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700 text-sm">Tax Regime Comparison</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-md p-6 text-white text-center">
                <BookOpen className="w-10 h-10 mx-auto text-blue-200 mb-4 opacity-80" />
                <h3 className="font-bold text-xl mb-2">Need Financial Advice?</h3>
                <p className="text-blue-100 text-sm mb-6 opacity-90 leading-relaxed">
                  Calculators provide the math, but experts provide the strategy. Connect with certified planners.
                </p>
                <button className="w-full py-3 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98]">
                  Consult an Expert
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ToolPlaceholder;
