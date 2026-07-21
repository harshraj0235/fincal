import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Building, DollarSign, Download, Link, PieChart, BarChart3, Target, TrendingUp, Shield } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const CapitalStructureAnalyzer: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    // Company Information
    companyName: '',
    industry: 'technology',
    
    // Capital Structure
    totalDebt: 50000000,
    totalEquity: 100000000,
    preferredStock: 0,
    cashAndEquivalents: 10000000,
    
    // Debt Details
    shortTermDebt: 20000000,
    longTermDebt: 30000000,
    averageInterestRate: 8.5,
    debtMaturity: 5,
    
    // Equity Details
    sharesOutstanding: 1000000,
    currentStockPrice: 100,
    dividendPerShare: 2,
    dividendGrowthRate: 5,
    
    // Market Data
    riskFreeRate: 6.5,
    marketRiskPremium: 7.5,
    beta: 1.2,
    taxRate: 25,
    
    // Industry Benchmarks
    industryDebtRatio: 0.3,
    industryEquityRatio: 0.7,
    industryWACC: 12
  });

  const [results, setResults] = useState({
    capitalStructure: {
      debtRatio: 0,
      equityRatio: 0,
      netDebt: 0,
      debtToEquity: 0,
      interestCoverage: 0
    },
    costOfCapital: {
      costOfDebt: 0,
      costOfEquity: 0,
      wacc: 0,
      optimalWACC: 0
    },
    analysis: {
      currentRating: '',
      optimalDebtRatio: 0,
      waccImprovement: 0,
      recommendations: []
    },
    sensitivity: {
      scenarios: []
    }
  });

  const industries = [
    { name: 'Technology', debtRatio: 0.2, equityRatio: 0.8, wacc: 12, beta: 1.3 },
    { name: 'Manufacturing', debtRatio: 0.4, equityRatio: 0.6, wacc: 10, beta: 1.1 },
    { name: 'Healthcare', debtRatio: 0.3, equityRatio: 0.7, wacc: 11, beta: 1.0 },
    { name: 'Financial Services', debtRatio: 0.6, equityRatio: 0.4, wacc: 9, beta: 0.9 },
    { name: 'Utilities', debtRatio: 0.5, equityRatio: 0.5, wacc: 8, beta: 0.8 },
    { name: 'Retail', debtRatio: 0.3, equityRatio: 0.7, wacc: 11, beta: 1.2 },
    { name: 'Energy', debtRatio: 0.4, equityRatio: 0.6, wacc: 10, beta: 1.1 },
    { name: 'Real Estate', debtRatio: 0.5, equityRatio: 0.5, wacc: 9, beta: 0.9 }
  ];

  const calculateCapitalStructure = () => {
    const {
      totalDebt, totalEquity, preferredStock, cashAndEquivalents,
      shortTermDebt, longTermDebt, averageInterestRate,
      sharesOutstanding, currentStockPrice, dividendPerShare, dividendGrowthRate,
      riskFreeRate, marketRiskPremium, beta, taxRate,
      industryDebtRatio, industryEquityRatio, industryWACC
    } = inputs;

    // Capital Structure Ratios
    const totalCapital = totalDebt + totalEquity + preferredStock;
    const debtRatio = totalDebt / totalCapital;
    const equityRatio = totalEquity / totalCapital;
    const netDebt = totalDebt - cashAndEquivalents;
    const debtToEquity = totalDebt / totalEquity;

    // Interest Coverage (assuming EBIT = 20% of revenue, revenue = market cap * 2)
    const marketCap = sharesOutstanding * currentStockPrice;
    const estimatedEBIT = marketCap * 0.2;
    const interestExpense = totalDebt * (averageInterestRate / 100);
    const interestCoverage = estimatedEBIT / interestExpense;

    // Cost of Capital Calculations
    const costOfDebt = averageInterestRate * (1 - taxRate / 100);
    const costOfEquity = riskFreeRate + (beta * marketRiskPremium);
    const wacc = (debtRatio * costOfDebt) + (equityRatio * costOfEquity);

    // Optimal Capital Structure Analysis
    const optimalDebtRatio = Math.min(0.4, industryDebtRatio * 1.2); // Conservative approach
    const optimalEquityRatio = 1 - optimalDebtRatio;
    const optimalWACC = (optimalDebtRatio * costOfDebt) + (optimalEquityRatio * costOfEquity);
    const waccImprovement = wacc - optimalWACC;

    // Credit Rating Assessment
    let currentRating = 'BBB';
    if (debtRatio < 0.2 && interestCoverage > 5) currentRating = 'AAA';
    else if (debtRatio < 0.3 && interestCoverage > 4) currentRating = 'AA';
    else if (debtRatio < 0.4 && interestCoverage > 3) currentRating = 'A';
    else if (debtRatio < 0.5 && interestCoverage > 2) currentRating = 'BBB';
    else if (debtRatio < 0.6 && interestCoverage > 1.5) currentRating = 'BB';
    else if (debtRatio < 0.7 && interestCoverage > 1) currentRating = 'B';
    else currentRating = 'CCC';

    // Generate Recommendations
    const recommendations = [];
    
    if (debtRatio > industryDebtRatio * 1.2) {
      recommendations.push({
        type: 'Debt Reduction',
        priority: 'High',
        impact: 'Reduce debt ratio to industry average',
        benefit: `Potential WACC reduction of ${(wacc - optimalWACC).toFixed(2)}%`,
        action: 'Consider equity issuance or asset sales to reduce debt'
      });
    }
    
    if (interestCoverage < 2.5) {
      recommendations.push({
        type: 'Interest Coverage',
        priority: 'High',
        impact: 'Improve interest coverage ratio',
        benefit: 'Better credit rating and lower borrowing costs',
        action: 'Increase profitability or reduce debt levels'
      });
    }
    
    if (wacc > industryWACC * 1.1) {
      recommendations.push({
        type: 'WACC Optimization',
        priority: 'Medium',
        impact: 'Optimize capital structure',
        benefit: `Potential WACC improvement of ${waccImprovement.toFixed(2)}%`,
        action: 'Adjust debt-equity mix to optimal levels'
      });
    }

    // Sensitivity Analysis
    const scenarios = [];
    const debtRatios = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    
    debtRatios.forEach(ratio => {
      const equityRatio = 1 - ratio;
      const scenarioWACC = (ratio * costOfDebt) + (equityRatio * costOfEquity);
      const scenarioDebt = totalCapital * ratio;
      const scenarioEquity = totalCapital * equityRatio;
      
      scenarios.push({
        debtRatio: ratio,
        equityRatio: equityRatio,
        wacc: scenarioWACC,
        debtAmount: scenarioDebt,
        equityAmount: scenarioEquity,
        waccDifference: scenarioWACC - wacc
      });
    });

    setResults({
      capitalStructure: {
        debtRatio,
        equityRatio,
        netDebt,
        debtToEquity,
        interestCoverage
      },
      costOfCapital: {
        costOfDebt,
        costOfEquity,
        wacc,
        optimalWACC
      },
      analysis: {
        currentRating,
        optimalDebtRatio,
        waccImprovement,
        recommendations
      },
      sensitivity: {
        scenarios
      }
    });
  };

  useEffect(() => {
    calculateCapitalStructure();
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
      
      pdf.save('capital-structure-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Capital Structure Analyzer - Free Debt vs Equity Analysis Tool | MoneyCal.in"
        description="Analyze optimal capital structure with our free debt vs equity tool. Calculate WACC, debt ratios, and get recommendations for optimal capital mix."
        keywords="capital structure Calculator, debt vs equity tool, WACC analyzer, optimal capital structure, corporate finance tool"
        url="/corporate-finance/capital-structure-analyzer"
        type="website"
        image="/images/capital-structure-analyzer.jpg"
        tags={["capital structure", "WACC", "debt equity", "corporate finance"]}
      />
      
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
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
              <Building className="h-16 w-16 text-indigo-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Capital Structure Analyzer
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Analyze your company's optimal capital structure and debt-equity mix. 
              Calculate WACC, assess credit ratings, and get recommendations for capital structure optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <PieChart className="h-6 w-6 text-indigo-600 mr-2" />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                        handleInputChange('industryDebtRatio', selectedIndustry.debtRatio);
                        handleInputChange('industryEquityRatio', selectedIndustry.equityRatio);
                        handleInputChange('industryWACC', selectedIndustry.wacc);
                        handleInputChange('beta', selectedIndustry.beta);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {industries.map((industry, index) => (
                      <option key={index} value={industry.name.toLowerCase()}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Capital Structure */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Structure (₹)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Debt
                      </label>
                      <input
                        type="number"
                        value={inputs.totalDebt}
                        onChange={(e) => handleInputChange('totalDebt', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Equity
                      </label>
                      <input
                        type="number"
                        value={inputs.totalEquity}
                        onChange={(e) => handleInputChange('totalEquity', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Stock
                      </label>
                      <input
                        type="number"
                        value={inputs.preferredStock}
                        onChange={(e) => handleInputChange('preferredStock', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cash & Equivalents
                      </label>
                      <input
                        type="number"
                        value={inputs.cashAndEquivalents}
                        onChange={(e) => handleInputChange('cashAndEquivalents', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Debt Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Debt Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short-term Debt (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.shortTermDebt}
                        onChange={(e) => handleInputChange('shortTermDebt', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Long-term Debt (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.longTermDebt}
                        onChange={(e) => handleInputChange('longTermDebt', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.averageInterestRate}
                        onChange={(e) => handleInputChange('averageInterestRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Debt Maturity (Years)
                      </label>
                      <input
                        type="number"
                        value={inputs.debtMaturity}
                        onChange={(e) => handleInputChange('debtMaturity', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Equity Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Equity Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shares Outstanding
                      </label>
                      <input
                        type="number"
                        value={inputs.sharesOutstanding}
                        onChange={(e) => handleInputChange('sharesOutstanding', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Stock Price (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.currentStockPrice}
                        onChange={(e) => handleInputChange('currentStockPrice', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dividend Per Share (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.dividendPerShare}
                        onChange={(e) => handleInputChange('dividendPerShare', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Rate
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.taxRate}
                        onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Capital Structure Summary */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Capital Structure Analysis
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
                      {(results.capitalStructure.debtRatio * 100).toFixed(1)}%
                    </div>
                    <div className="text-indigo-100">Debt Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {(results.capitalStructure.equityRatio * 100).toFixed(1)}%
                    </div>
                    <div className="text-indigo-100">Equity Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.costOfCapital.wacc.toFixed(2)}%
                    </div>
                    <div className="text-indigo-100">WACC</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.analysis.currentRating}
                    </div>
                    <div className="text-indigo-100">Credit Rating</div>
                  </div>
                </div>
              </div>

              {/* Capital Structure Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <PieChart className="h-5 w-5 text-indigo-600 mr-2" />
                  Capital Structure Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Debt Ratio</span>
                    <span className="font-semibold text-indigo-600">
                      {(results.capitalStructure.debtRatio * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Equity Ratio</span>
                    <span className="font-semibold text-indigo-600">
                      {(results.capitalStructure.equityRatio * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Debt-to-Equity Ratio</span>
                    <span className="font-semibold text-indigo-600">
                      {results.capitalStructure.debtToEquity.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Net Debt</span>
                    <span className="font-semibold text-indigo-600">
                      {formatCurrency(results.capitalStructure.netDebt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Interest Coverage Ratio</span>
                    <span className="font-semibold text-indigo-600">
                      {results.capitalStructure.interestCoverage.toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>

              {/* Cost of Capital */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Cost of Capital Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-semibold text-gray-900">Weighted Average Cost of Capital (WACC)</span>
                    <span className="font-bold text-green-600 text-lg">
                      {results.costOfCapital.wacc.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Cost of Debt (After Tax)</span>
                    <span className="font-semibold text-green-600">
                      {results.costOfCapital.costOfDebt.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Cost of Equity</span>
                    <span className="font-semibold text-green-600">
                      {results.costOfCapital.costOfEquity.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="font-semibold text-gray-900">Optimal WACC</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {results.costOfCapital.optimalWACC.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                  Optimization Recommendations
                </h3>
                <div className="space-y-4">
                  {results.analysis.recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      rec.priority === 'High' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.type}</h4>
                        <span className={`text-sm font-semibold px-2 py-1 rounded ${
                          rec.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
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

              {/* Sensitivity Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                  Sensitivity Analysis
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Debt Ratio</th>
                        <th className="text-right py-2">WACC</th>
                        <th className="text-right py-2">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.sensitivity.scenarios.map((scenario, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2">{(scenario.debtRatio * 100).toFixed(0)}%</td>
                          <td className="text-right py-2">{scenario.wacc.toFixed(2)}%</td>
                          <td className={`text-right py-2 ${
                            scenario.waccDifference < 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {scenario.waccDifference > 0 ? '+' : ''}{scenario.waccDifference.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Capital Structure</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Capital structure refers to the mix of debt and equity financing used by a company to fund its operations and growth. 
                The optimal capital structure minimizes the weighted average cost of capital (WACC) while maintaining financial flexibility.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Components:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Debt:</strong> Borrowed funds that must be repaid with interest</li>
                <li><strong>Equity:</strong> Ownership capital provided by shareholders</li>
                <li><strong>Preferred Stock:</strong> Hybrid security with characteristics of both debt and equity</li>
                <li><strong>Cash & Equivalents:</strong> Liquid assets that can be used to reduce net debt</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Metrics:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Debt Ratio:</strong> Proportion of total capital financed by debt</li>
                <li><strong>Debt-to-Equity Ratio:</strong> Relative proportion of debt and equity</li>
                <li><strong>Interest Coverage Ratio:</strong> Ability to pay interest expenses</li>
                <li><strong>WACC:</strong> Weighted average cost of all capital sources</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Optimization Factors:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tax benefits of debt (interest tax shield)</li>
                <li>Financial distress costs and bankruptcy risk</li>
                <li>Agency costs between shareholders and creditors</li>
                <li>Market conditions and investor preferences</li>
                <li>Industry benchmarks and peer comparisons</li>
              </ul>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-indigo-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-indigo-600 hover:text-indigo-800 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/working-capital-optimizer" className="text-indigo-600 hover:text-indigo-800 underline">Working Capital Optimizer</RouterLink>
                  <RouterLink to="/corporate-finance/cost-capital-benchmarking" className="text-indigo-600 hover:text-indigo-800 underline">Cost of Capital Benchmarking</RouterLink>
                  <RouterLink to="/corporate-finance/scenario-analysis-simulator" className="text-indigo-600 hover:text-indigo-800 underline">Scenario Analysis Simulator</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CapitalStructureAnalyzer;
