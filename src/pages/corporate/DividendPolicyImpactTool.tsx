import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Download, Link, PieChart, BarChart3, Target, IndianRupee, Percent } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const DividendPolicyImpactTool: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    // Company Information
    companyName: '',
    industry: 'technology',
    
    // Financial Metrics
    currentStockPrice: 100,
    sharesOutstanding: 1000000,
    earningsPerShare: 8,
    bookValuePerShare: 50,
    
    // Dividend Information
    currentDividendPerShare: 2,
    dividendPayoutRatio: 25,
    dividendYield: 2,
    dividendGrowthRate: 5,
    
    // Financial Performance
    netIncome: 8000000,
    retainedEarnings: 6000000,
    freeCashFlow: 10000000,
    capitalExpenditure: 2000000,
    
    // Market Data
    riskFreeRate: 6.5,
    marketRiskPremium: 7.5,
    beta: 1.2,
    requiredReturn: 14,
    
    // Policy Scenarios
    scenario1PayoutRatio: 20,
    scenario2PayoutRatio: 30,
    scenario3PayoutRatio: 40,
    
    // Growth Assumptions
    earningsGrowthRate: 10,
    reinvestmentRate: 75,
    returnOnEquity: 16
  });

  const [results, setResults] = useState({
    currentPolicy: {
      dividendPerShare: 0,
      payoutRatio: 0,
      dividendYield: 0,
      retentionRatio: 0,
      sustainableGrowthRate: 0
    },
    scenarios: {
      conservative: { payoutRatio: 0, dividendPerShare: 0, impact: 0 },
      moderate: { payoutRatio: 0, dividendPerShare: 0, impact: 0 },
      aggressive: { payoutRatio: 0, dividendPerShare: 0, impact: 0 }
    },
    valuation: {
      currentValue: 0,
      gordonGrowthValue: 0,
      ddmValue: 0,
      impactAnalysis: []
    },
    analysis: {
      recommendations: [],
      riskAssessment: '',
      optimalPayoutRatio: 0
    }
  });

  const industries = [
    { name: 'Technology', typicalPayout: 20, growthRate: 15, roe: 18 },
    { name: 'Manufacturing', typicalPayout: 35, growthRate: 8, roe: 14 },
    { name: 'Healthcare', typicalPayout: 30, growthRate: 10, roe: 16 },
    { name: 'Financial Services', typicalPayout: 40, growthRate: 6, roe: 12 },
    { name: 'Utilities', typicalPayout: 60, growthRate: 4, roe: 10 },
    { name: 'Consumer Goods', typicalPayout: 45, growthRate: 7, roe: 13 },
    { name: 'Energy', typicalPayout: 50, growthRate: 5, roe: 11 },
    { name: 'Real Estate', typicalPayout: 70, growthRate: 3, roe: 9 }
  ];

  const calculateDividendImpact = () => {
    const {
      currentStockPrice, sharesOutstanding, earningsPerShare, bookValuePerShare,
      currentDividendPerShare, dividendPayoutRatio, dividendYield, dividendGrowthRate,
      netIncome, retainedEarnings, freeCashFlow, capitalExpenditure,
      riskFreeRate, marketRiskPremium, beta, requiredReturn,
      scenario1PayoutRatio, scenario2PayoutRatio, scenario3PayoutRatio,
      earningsGrowthRate, reinvestmentRate, returnOnEquity
    } = inputs;

    // Current Policy Analysis
    const currentPayoutRatio = (currentDividendPerShare / earningsPerShare) * 100;
    const currentDividendYield = (currentDividendPerShare / currentStockPrice) * 100;
    const retentionRatio = 100 - currentPayoutRatio;
    const sustainableGrowthRate = returnOnEquity * (retentionRatio / 100);

    // Scenario Analysis
    const scenarios = {
      conservative: {
        payoutRatio: scenario1PayoutRatio,
        dividendPerShare: (earningsPerShare * scenario1PayoutRatio) / 100,
        impact: ((earningsPerShare * scenario1PayoutRatio) / 100) - currentDividendPerShare
      },
      moderate: {
        payoutRatio: scenario2PayoutRatio,
        dividendPerShare: (earningsPerShare * scenario2PayoutRatio) / 100,
        impact: ((earningsPerShare * scenario2PayoutRatio) / 100) - currentDividendPerShare
      },
      aggressive: {
        payoutRatio: scenario3PayoutRatio,
        dividendPerShare: (earningsPerShare * scenario3PayoutRatio) / 100,
        impact: ((earningsPerShare * scenario3PayoutRatio) / 100) - currentDividendPerShare
      }
    };

    // Valuation Analysis
    const currentValue = currentStockPrice;
    
    // Gordon Growth Model
    const gordonGrowthValue = currentDividendPerShare * (1 + dividendGrowthRate / 100) / 
                             ((requiredReturn / 100) - (dividendGrowthRate / 100));
    
    // Dividend Discount Model (DDM)
    const ddmValue = currentDividendPerShare / ((requiredReturn / 100) - (dividendGrowthRate / 100));

    // Impact Analysis
    const impactAnalysis = [];
    
    if (scenarios.conservative.dividendPerShare > currentDividendPerShare) {
      impactAnalysis.push({
        scenario: 'Conservative',
        impact: 'Positive',
        description: 'Lower payout ratio allows for more reinvestment and growth',
        value: scenarios.conservative.impact
      });
    }
    
    if (scenarios.moderate.dividendPerShare > currentDividendPerShare) {
      impactAnalysis.push({
        scenario: 'Moderate',
        impact: 'Balanced',
        description: 'Balanced approach between dividends and growth',
        value: scenarios.moderate.impact
      });
    }
    
    if (scenarios.aggressive.dividendPerShare > currentDividendPerShare) {
      impactAnalysis.push({
        scenario: 'Aggressive',
        impact: 'High Yield',
        description: 'Higher dividends but may limit growth potential',
        value: scenarios.aggressive.impact
      });
    }

    // Generate Recommendations
    const recommendations = [];
    
    if (currentPayoutRatio > 60) {
      recommendations.push({
        type: 'High Payout Risk',
        priority: 'High',
        impact: 'High payout ratio may limit growth',
        benefit: 'Consider reducing payout to fund growth initiatives',
        action: 'Reduce dividend payout ratio to 40-50% for better growth prospects'
      });
    }
    
    if (dividendYield < 2) {
      recommendations.push({
        type: 'Low Dividend Yield',
        priority: 'Medium',
        impact: 'Low yield may not attract income investors',
        benefit: 'Increase dividend to attract income-focused investors',
        action: 'Consider increasing dividend payout ratio to improve yield'
      });
    }
    
    if (sustainableGrowthRate < earningsGrowthRate) {
      recommendations.push({
        type: 'Growth Sustainability',
        priority: 'High',
        impact: 'Current growth rate may not be sustainable',
        benefit: 'Adjust dividend policy to support sustainable growth',
        action: 'Reduce payout ratio to support sustainable growth rate'
      });
    }

    // Risk Assessment
    let riskAssessment = 'Low';
    if (currentPayoutRatio > 70 || dividendYield > 8) {
      riskAssessment = 'High';
    } else if (currentPayoutRatio > 50 || dividendYield > 5) {
      riskAssessment = 'Medium';
    }

    // Optimal Payout Ratio (based on industry and growth prospects)
    const selectedIndustry = industries.find(i => i.name.toLowerCase() === inputs.industry);
    const optimalPayoutRatio = selectedIndustry ? selectedIndustry.typicalPayout : 30;

    setResults({
      currentPolicy: {
        dividendPerShare: currentDividendPerShare,
        payoutRatio: currentPayoutRatio,
        dividendYield: currentDividendYield,
        retentionRatio,
        sustainableGrowthRate
      },
      scenarios,
      valuation: {
        currentValue,
        gordonGrowthValue,
        ddmValue,
        impactAnalysis
      },
      analysis: {
        recommendations,
        riskAssessment,
        optimalPayoutRatio
      }
    });
  };

  useEffect(() => {
    calculateDividendImpact();
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + ' L';
    } else {
      return num.toLocaleString();
    }
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
      
      pdf.save('dividend-policy-impact-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Dividend Policy Impact Tool - Free Corporate Dividend Analysis Calculator | MoneyCal.in"
        description="Analyze dividend policy impact with our free corporate dividend tool. Calculate payout ratios, dividend yields, and assess the impact on company valuation and growth."
        keywords="dividend policy Calculator, corporate dividend tool, payout ratio analysis, dividend yield Calculator, dividend impact on valuation"
        url="/corporate-finance/dividend-policy-impact-tool"
        type="website"
        image="/images/dividend-policy-impact-tool.jpg"
        tags={["dividend policy", "payout ratio", "corporate finance", "dividend analysis"]}
      />
      
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
                Dividend Policy Impact Tool
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Analyze the impact of dividend policy on company valuation and growth. 
              Calculate payout ratios, dividend yields, and assess different dividend scenarios for optimal policy decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 text-emerald-600 mr-2" />
                Company Information
              </h2>
              
              <div className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={inputs.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={inputs.industry}
                    onChange={(e) => {
                      const selectedIndustry = industries.find(i => i.name.toLowerCase() === e.target.value);
                      handleInputChange('industry', e.target.value);
                      if (selectedIndustry) {
                        handleInputChange('scenario1PayoutRatio', selectedIndustry.typicalPayout - 10);
                        handleInputChange('scenario2PayoutRatio', selectedIndustry.typicalPayout);
                        handleInputChange('scenario3PayoutRatio', selectedIndustry.typicalPayout + 10);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {industries.map((industry, index) => (
                      <option key={index} value={industry.name.toLowerCase()}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Stock Price (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.currentStockPrice}
                        onChange={(e) => handleInputChange('currentStockPrice', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shares Outstanding
                      </label>
                      <input
                        type="number"
                        value={inputs.sharesOutstanding}
                        onChange={(e) => handleInputChange('sharesOutstanding', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Earnings Per Share (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.earningsPerShare}
                        onChange={(e) => handleInputChange('earningsPerShare', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Book Value Per Share (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.bookValuePerShare}
                        onChange={(e) => handleInputChange('bookValuePerShare', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Dividend Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dividend Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Dividend Per Share (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.currentDividendPerShare}
                        onChange={(e) => handleInputChange('currentDividendPerShare', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dividend Growth Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.dividendGrowthRate}
                        onChange={(e) => handleInputChange('dividendGrowthRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Performance */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Performance (₹)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Net Income
                      </label>
                      <input
                        type="number"
                        value={inputs.netIncome}
                        onChange={(e) => handleInputChange('netIncome', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retained Earnings
                      </label>
                      <input
                        type="number"
                        value={inputs.retainedEarnings}
                        onChange={(e) => handleInputChange('retainedEarnings', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Free Cash Flow
                      </label>
                      <input
                        type="number"
                        value={inputs.freeCashFlow}
                        onChange={(e) => handleInputChange('freeCashFlow', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capital Expenditure
                      </label>
                      <input
                        type="number"
                        value={inputs.capitalExpenditure}
                        onChange={(e) => handleInputChange('capitalExpenditure', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Market Data */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Data (%)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Risk-free Rate
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.riskFreeRate}
                        onChange={(e) => handleInputChange('riskFreeRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Market Risk Premium
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.marketRiskPremium}
                        onChange={(e) => handleInputChange('marketRiskPremium', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Beta
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.beta}
                        onChange={(e) => handleInputChange('beta', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Return
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.requiredReturn}
                        onChange={(e) => handleInputChange('requiredReturn', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Policy Scenarios */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Scenarios (%)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conservative Payout
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.scenario1PayoutRatio}
                        onChange={(e) => handleInputChange('scenario1PayoutRatio', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Moderate Payout
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.scenario2PayoutRatio}
                        onChange={(e) => handleInputChange('scenario2PayoutRatio', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aggressive Payout
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.scenario3PayoutRatio}
                        onChange={(e) => handleInputChange('scenario3PayoutRatio', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Current Policy Summary */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Current Dividend Policy
                  </h2>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.currentPolicy.payoutRatio.toFixed(1)}%
                    </div>
                    <div className="text-emerald-100">Payout Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.currentPolicy.dividendYield.toFixed(2)}%
                    </div>
                    <div className="text-emerald-100">Dividend Yield</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.currentPolicy.retentionRatio.toFixed(1)}%
                    </div>
                    <div className="text-emerald-100">Retention Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.currentPolicy.sustainableGrowthRate.toFixed(1)}%
                    </div>
                    <div className="text-emerald-100">Sustainable Growth</div>
                  </div>
                </div>
              </div>

              {/* Scenario Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <PieChart className="h-5 w-5 text-emerald-600 mr-2" />
                  Scenario Analysis
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Conservative</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Payout: {results.scenarios.conservative.payoutRatio.toFixed(1)}%</div>
                        <div>DPS: ₹{results.scenarios.conservative.dividendPerShare.toFixed(2)}</div>
                        <div className={`font-semibold ${results.scenarios.conservative.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Impact: {results.scenarios.conservative.impact >= 0 ? '+' : ''}₹{results.scenarios.conservative.impact.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Moderate</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Payout: {results.scenarios.moderate.payoutRatio.toFixed(1)}%</div>
                        <div>DPS: ₹{results.scenarios.moderate.dividendPerShare.toFixed(2)}</div>
                        <div className={`font-semibold ${results.scenarios.moderate.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Impact: {results.scenarios.moderate.impact >= 0 ? '+' : ''}₹{results.scenarios.moderate.impact.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2">Aggressive</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Payout: {results.scenarios.aggressive.payoutRatio.toFixed(1)}%</div>
                        <div>DPS: ₹{results.scenarios.aggressive.dividendPerShare.toFixed(2)}</div>
                        <div className={`font-semibold ${results.scenarios.aggressive.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Impact: {results.scenarios.aggressive.impact >= 0 ? '+' : ''}₹{results.scenarios.aggressive.impact.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Valuation Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Valuation Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Current Stock Price</span>
                    <span className="font-semibold text-gray-900">
                      ₹{results.valuation.currentValue.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-semibold text-gray-900">Gordon Growth Model Value</span>
                    <span className="font-bold text-green-600 text-lg">
                      ₹{results.valuation.gordonGrowthValue.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="font-semibold text-gray-900">DDM Value</span>
                    <span className="font-bold text-blue-600 text-lg">
                      ₹{results.valuation.ddmValue.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Percent className="h-5 w-5 text-orange-600 mr-2" />
                  Risk Assessment
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <span className="font-semibold text-gray-900">Risk Level</span>
                    <span className={`font-bold text-lg px-3 py-1 rounded ${
                      results.analysis.riskAssessment === 'High' ? 'bg-red-100 text-red-700' :
                      results.analysis.riskAssessment === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {results.analysis.riskAssessment}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Optimal Payout Ratio</span>
                    <span className="font-semibold text-orange-600">
                      {results.analysis.optimalPayoutRatio.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                  Recommendations
                </h3>
                <div className="space-y-4">
                  {results.analysis.recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      rec.priority === 'High' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.type}</h4>
                        <span className={`text-sm font-semibold px-2 py-1 rounded ${
                          rec.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {rec.priority} Priority
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Impact:</strong> {rec.impact}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Benefit:</strong> {rec.benefit}
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Action:</strong> {rec.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Dividend Policy Impact</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Dividend policy is a crucial corporate finance decision that affects both shareholders and the company's growth prospects. 
                The policy determines how much of the company's earnings are distributed to shareholders versus retained for reinvestment.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Components:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Payout Ratio:</strong> Percentage of earnings paid out as dividends</li>
                <li><strong>Dividend Yield:</strong> Annual dividend per share divided by stock price</li>
                <li><strong>Retention Ratio:</strong> Percentage of earnings retained for growth</li>
                <li><strong>Sustainable Growth Rate:</strong> Maximum growth rate without external financing</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Policy Types:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Conservative:</strong> Low payout ratio, high retention for growth</li>
                <li><strong>Moderate:</strong> Balanced approach between dividends and growth</li>
                <li><strong>Aggressive:</strong> High payout ratio, attractive to income investors</li>
                <li><strong>Residual:</strong> Dividends paid from remaining cash after investments</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Impact Factors:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Company's growth stage and investment opportunities</li>
                <li>Industry characteristics and competitive position</li>
                <li>Shareholder preferences and tax considerations</li>
                <li>Financial flexibility and capital structure</li>
                <li>Market conditions and investor expectations</li>
              </ul>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-emerald-600 hover:text-emerald-800 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-emerald-600 hover:text-emerald-800 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/fx-exposure-risk-calculator" className="text-emerald-600 hover:text-emerald-800 underline">FX Exposure Risk Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/loan-amortization-generator" className="text-emerald-600 hover:text-emerald-800 underline">Corporate Loan Amortization</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DividendPolicyImpactTool;


