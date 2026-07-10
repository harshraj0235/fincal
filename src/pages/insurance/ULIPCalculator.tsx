import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, TrendingUp, IndianRupee, Target, DollarSign, AlertCircle, BarChart3, PieChart, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const ULIPCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    age: 30,
    annualPremium: 100000,
    policyTerm: 20,
    premiumPaymentTerm: 20,
    riskProfile: 'moderate',
    expectedReturn: 10,
    sumAssured: 1000000,
    premiumAllocation: {
      equity: 60,
      debt: 30,
      balanced: 10
    }
  });

  const [results, setResults] = useState({
    totalPremiumPaid: 0,
    expectedMaturityValue: 0,
    expectedReturns: 0,
    annualizedReturn: 0,
    fundAllocation: {},
    yearWiseProjection: []
  });

  const riskProfiles = [
    { name: 'Conservative', equity: 20, debt: 70, balanced: 10, expectedReturn: 8 },
    { name: 'Moderate', equity: 60, debt: 30, balanced: 10, expectedReturn: 10 },
    { name: 'Aggressive', equity: 80, debt: 15, balanced: 5, expectedReturn: 12 }
  ];

  const fundTypes = [
    { name: 'Equity Funds', expectedReturn: 12, risk: 'High', description: 'Invests in stocks and equity instruments' },
    { name: 'Debt Funds', expectedReturn: 7, risk: 'Low', description: 'Invests in bonds and fixed income securities' },
    { name: 'Balanced Funds', expectedReturn: 9, risk: 'Medium', description: 'Mix of equity and debt investments' }
  ];

  const calculateULIPReturns = () => {
    const { annualPremium, policyTerm, premiumPaymentTerm, riskProfile, expectedReturn, sumAssured } = inputs;
    
    // Get risk profile data
    const profile = riskProfiles.find(p => p.name.toLowerCase().includes(riskProfile.toLowerCase())) || riskProfiles[1];
    
    // Calculate total premium paid
    const totalPremiumPaid = annualPremium * premiumPaymentTerm;
    
    // Calculate fund allocation based on risk profile
    const fundAllocation = {
      equity: (totalPremiumPaid * profile.equity / 100),
      debt: (totalPremiumPaid * profile.debt / 100),
      balanced: (totalPremiumPaid * profile.balanced / 100)
    };
    
    // Calculate expected returns for each fund type
    const equityReturns = fundAllocation.equity * Math.pow(1 + fundTypes[0].expectedReturn / 100, policyTerm);
    const debtReturns = fundAllocation.debt * Math.pow(1 + fundTypes[1].expectedReturn / 100, policyTerm);
    const balancedReturns = fundAllocation.balanced * Math.pow(1 + fundTypes[2].expectedReturn / 100, policyTerm);
    
    // Total expected maturity value
    const expectedMaturityValue = equityReturns + debtReturns + balancedReturns;
    
    // Calculate expected returns
    const expectedReturns = expectedMaturityValue - totalPremiumPaid;
    
    // Calculate annualized return
    const annualizedReturn = (Math.pow(expectedMaturityValue / totalPremiumPaid, 1 / policyTerm) - 1) * 100;
    
    // Generate year-wise projection
    const yearWiseProjection = [];
    let cumulativeValue = 0;
    
    for (let year = 1; year <= policyTerm; year++) {
      const premiumPaid = year <= premiumPaymentTerm ? annualPremium : 0;
      const equityValue = (fundAllocation.equity * Math.pow(1 + fundTypes[0].expectedReturn / 100, year));
      const debtValue = (fundAllocation.debt * Math.pow(1 + fundTypes[1].expectedReturn / 100, year));
      const balancedValue = (fundAllocation.balanced * Math.pow(1 + fundTypes[2].expectedReturn / 100, year));
      
      cumulativeValue = equityValue + debtValue + balancedValue;
      
      yearWiseProjection.push({
        year,
        premiumPaid,
        cumulativeValue,
        returns: cumulativeValue - (annualPremium * Math.min(year, premiumPaymentTerm))
      });
    }
    
    setResults({
      totalPremiumPaid,
      expectedMaturityValue,
      expectedReturns,
      annualizedReturn,
      fundAllocation,
      yearWiseProjection
    });
  };

  useEffect(() => {
    calculateULIPReturns();
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRiskProfileChange = (profile: string) => {
    const selectedProfile = riskProfiles.find(p => p.name.toLowerCase().includes(profile.toLowerCase()));
    if (selectedProfile) {
      setInputs(prev => ({
        ...prev,
        riskProfile: profile,
        premiumAllocation: {
          equity: selectedProfile.equity,
          debt: selectedProfile.debt,
          balanced: selectedProfile.balanced
        },
        expectedReturn: selectedProfile.expectedReturn
      }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const downloadPDF = async () => {
    if (!resultsRef.current) return;

    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('ulip-return-calculator.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="ULIP Return Calculator - Unit-Linked Insurance Plan Returns India | MoneyCal.in"
        description="Free ULIP return Calculator for India. Estimate returns on Unit-Linked Insurance Plans based on investment amount, risk profile, and expected market performance."
        keywords="ULIP return Calculator India, unit-linked insurance plan returns, ULIP Calculator 2025, ULIP investment calculator"
        url="/insurance-tools/ulip-calculator"
        type="website"
        image="/images/ulip-calculator.jpg"
        tags={["ULIP calculator", "unit linked insurance", "investment calculator", "insurance investment"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="h-16 w-16 text-emerald-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                ULIP Return Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Estimate returns on Unit-Linked Insurance Plans based on investment amount, risk profile, and expected market performance. 
              Plan your investment strategy with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 text-emerald-600 mr-2" />
                Investment Details
              </h2>
              
              <div className="space-y-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Age
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    step="1"
                    value={inputs.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>18 Years</span>
                    <span className="font-semibold text-emerald-600">{inputs.age} Years</span>
                    <span>65 Years</span>
                  </div>
                </div>

                {/* Annual Premium */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Premium (₹)
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={inputs.annualPremium}
                    onChange={(e) => handleInputChange('annualPremium', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹50K</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(inputs.annualPremium)}</span>
                    <span>₹20L</span>
                  </div>
                </div>

                {/* Policy Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Term (Years)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={inputs.policyTerm}
                    onChange={(e) => handleInputChange('policyTerm', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10 Years</span>
                    <span className="font-semibold text-emerald-600">{inputs.policyTerm} Years</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* Premium Payment Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Payment Term (Years)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max={inputs.policyTerm}
                    step="1"
                    value={inputs.premiumPaymentTerm}
                    onChange={(e) => handleInputChange('premiumPaymentTerm', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5 Years</span>
                    <span className="font-semibold text-emerald-600">{inputs.premiumPaymentTerm} Years</span>
                    <span>{inputs.policyTerm} Years</span>
                  </div>
                </div>

                {/* Risk Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Profile
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {riskProfiles.map((profile, index) => (
                      <button
                        key={index}
                        onClick={() => handleRiskProfileChange(profile.name.toLowerCase())}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          inputs.riskProfile.toLowerCase().includes(profile.name.toLowerCase())
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{profile.name}</div>
                        <div className="text-xs text-gray-600">{profile.expectedReturn}% expected</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sum Assured */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sum Assured (₹)
                  </label>
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="100000"
                    value={inputs.sumAssured}
                    onChange={(e) => handleInputChange('sumAssured', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹5L</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(inputs.sumAssured)}</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Fund Allocation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fund Allocation
                  </label>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Equity Funds</span>
                        <span>{inputs.premiumAllocation.equity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={inputs.premiumAllocation.equity}
                        onChange={(e) => {
                          const equity = parseInt(e.target.value);
                          const remaining = 100 - equity;
                          const debt = Math.min(remaining, inputs.premiumAllocation.debt);
                          const balanced = remaining - debt;
                          setInputs(prev => ({
                            ...prev,
                            premiumAllocation: { equity, debt, balanced }
                          }));
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Debt Funds</span>
                        <span>{inputs.premiumAllocation.debt}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={inputs.premiumAllocation.debt}
                        onChange={(e) => {
                          const debt = parseInt(e.target.value);
                          const remaining = 100 - debt;
                          const equity = Math.min(remaining, inputs.premiumAllocation.equity);
                          const balanced = remaining - equity;
                          setInputs(prev => ({
                            ...prev,
                            premiumAllocation: { equity, debt, balanced }
                          }));
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Balanced Funds</span>
                        <span>{inputs.premiumAllocation.balanced}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={inputs.premiumAllocation.balanced}
                        onChange={(e) => {
                          const balanced = parseInt(e.target.value);
                          const remaining = 100 - balanced;
                          const equity = Math.min(remaining, inputs.premiumAllocation.equity);
                          const debt = remaining - equity;
                          setInputs(prev => ({
                            ...prev,
                            premiumAllocation: { equity, debt, balanced }
                          }));
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Returns Summary */}
              <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Expected Returns
                  </h2>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.expectedMaturityValue)}
                    </div>
                    <div className="text-emerald-100">Maturity Value</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.expectedReturns)}
                    </div>
                    <div className="text-emerald-100">Expected Returns</div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div className="text-3xl font-bold">
                    {results.annualizedReturn.toFixed(2)}%
                  </div>
                  <div className="text-emerald-100">Annualized Return</div>
                </div>
              </div>

              {/* Investment Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                  Investment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Premium Paid</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(results.totalPremiumPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Sum Assured</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(inputs.sumAssured)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                    <span className="font-semibold text-gray-900">Net Returns</span>
                    <span className="font-bold text-emerald-600 text-lg">
                      {formatCurrency(results.expectedReturns)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fund Allocation */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <PieChart className="h-5 w-5 text-emerald-600 mr-2" />
                  Fund Allocation
                </h3>
                <div className="space-y-3">
                  {fundTypes.map((fund, index) => {
                    const allocation = index === 0 ? inputs.premiumAllocation.equity : 
                                     index === 1 ? inputs.premiumAllocation.debt : 
                                     inputs.premiumAllocation.balanced;
                    const amount = (results.totalPremiumPaid * allocation / 100);
                    return (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{fund.name}</h4>
                            <div className="text-sm text-gray-600">{fund.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">
                              {allocation}%
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatCurrency(amount)}
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full" 
                            style={{ width: `${allocation}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Expected Return: {fund.expectedReturn}%</span>
                          <span>Risk: {fund.risk}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Year-wise Projection */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-emerald-600 mr-2" />
                  Year-wise Projection
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {results.yearWiseProjection.slice(0, 10).map((projection, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">Year {projection.year}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-emerald-600">
                          {formatCurrency(projection.cumulativeValue)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Returns: {formatCurrency(projection.returns)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {results.yearWiseProjection.length > 10 && (
                    <div className="text-center text-sm text-gray-500 py-2">
                      ... and {results.yearWiseProjection.length - 10} more years
                    </div>
                  )}
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Returns are estimates based on historical performance and market assumptions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    ULIP returns are subject to market risks and may vary
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Charges and fees may reduce actual returns
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Past performance does not guarantee future results
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding ULIPs in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Unit-Linked Insurance Plans (ULIPs) combine life insurance with investment opportunities, 
                allowing you to build wealth while securing your family's future. They offer flexibility 
                in fund selection and premium allocation based on your risk appetite.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits of ULIPs:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Dual Benefits:</strong> Life insurance coverage with investment growth</li>
                <li><strong>Flexibility:</strong> Choose fund allocation based on risk profile</li>
                <li><strong>Tax Benefits:</strong> Premiums eligible for deduction under Section 80C</li>
                <li><strong>Transparency:</strong> Clear visibility of fund performance and charges</li>
                <li><strong>Liquidity:</strong> Partial withdrawal options after lock-in period</li>
                <li><strong>Professional Management:</strong> Expert fund management by insurance companies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Funds in ULIPs:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Equity Funds:</strong> Invest in stocks for higher growth potential</li>
                <li><strong>Debt Funds:</strong> Invest in bonds for stable, lower-risk returns</li>
                <li><strong>Balanced Funds:</strong> Mix of equity and debt for moderate risk-return</li>
                <li><strong>Money Market Funds:</strong> Short-term investments for liquidity</li>
                <li><strong>Index Funds:</strong> Track market indices for diversified exposure</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors to Consider:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Choose funds based on your risk tolerance and investment horizon</li>
                <li>Review fund performance and charges before investing</li>
                <li>Consider the lock-in period and surrender charges</li>
                <li>Monitor and rebalance your portfolio periodically</li>
                <li>Understand the impact of charges on returns</li>
                <li>Compare ULIPs with other investment options</li>
                <li>Ensure adequate life insurance coverage</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/life-insurance-calculator" className="text-blue-600 hover:text-blue-800 underline">Life Insurance Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/term-insurance-planner" className="text-blue-600 hover:text-blue-800 underline">Term Insurance Planner</RouterLink>
                  <RouterLink to="/insurance-tools/portfolio-dashboard" className="text-blue-600 hover:text-blue-800 underline">Insurance Portfolio Dashboard</RouterLink>
                  <RouterLink to="/insurance-tools/critical-illness-calculator" className="text-blue-600 hover:text-blue-800 underline">Critical Illness Calculator</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ULIPCalculator;
