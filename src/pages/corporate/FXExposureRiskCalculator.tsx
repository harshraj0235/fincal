import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Globe, DollarSign, Download, Link, TrendingUp, BarChart3, Target, AlertTriangle, Shield } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const FXExposureRiskCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    // Company Information
    companyName: '',
    industry: 'manufacturing',
    
    // Transaction Details
    transactionAmount: 1000000,
    transactionCurrency: 'USD',
    baseCurrency: 'INR',
    transactionDate: new Date().toISOString().split('T')[0],
    settlementDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    
    // Exchange Rates
    currentSpotRate: 83.5,
    forwardRate: 84.0,
    historicalVolatility: 12,
    
    // Exposure Types
    transactionExposure: 1000000,
    translationExposure: 500000,
    economicExposure: 2000000,
    
    // Risk Parameters
    confidenceLevel: 95,
    timeHorizon: 30,
    correlationFactor: 0.7,
    
    // Hedging Options
    hedgeRatio: 80,
    hedgeCost: 0.5,
    hedgeEffectiveness: 85,
    
    // Market Data
    interestRateUSD: 5.25,
    interestRateINR: 6.5,
    inflationRateUSD: 3.2,
    inflationRateINR: 4.8
  });

  const [results, setResults] = useState({
    exposure: {
      totalExposure: 0,
      transactionExposure: 0,
      translationExposure: 0,
      economicExposure: 0,
      netExposure: 0
    },
    risk: {
      var95: 0,
      var99: 0,
      expectedLoss: 0,
      maximumLoss: 0,
      riskLevel: ''
    },
    hedging: {
      hedgeAmount: 0,
      hedgeCost: 0,
      netBenefit: 0,
      effectiveness: 0,
      recommendations: []
    },
    scenarios: {
      optimistic: { rate: 0, impact: 0 },
      base: { rate: 0, impact: 0 },
      pessimistic: { rate: 0, impact: 0 }
    }
  });

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }
  ];

  const industries = [
    { name: 'Manufacturing', exposure: 'High', volatility: 15 },
    { name: 'Technology', exposure: 'Medium', volatility: 20 },
    { name: 'Healthcare', exposure: 'Low', volatility: 10 },
    { name: 'Financial Services', exposure: 'High', volatility: 18 },
    { name: 'Energy', exposure: 'High', volatility: 25 },
    { name: 'Retail', exposure: 'Medium', volatility: 12 },
    { name: 'Automotive', exposure: 'High', volatility: 16 },
    { name: 'Pharmaceuticals', exposure: 'Medium', volatility: 14 }
  ];

  const calculateFXRisk = () => {
    const {
      transactionAmount, currentSpotRate, forwardRate, historicalVolatility,
      transactionExposure, translationExposure, economicExposure,
      confidenceLevel, timeHorizon, correlationFactor,
      hedgeRatio, hedgeCost, hedgeEffectiveness
    } = inputs;

    // Total Exposure Calculation
    const totalExposure = transactionExposure + translationExposure + economicExposure;
    const netExposure = totalExposure * (1 - hedgeRatio / 100);

    // Value at Risk (VaR) Calculation
    const volatility = historicalVolatility / 100;
    const timeFactor = Math.sqrt(timeHorizon / 365);
    const zScore95 = 1.645; // 95% confidence level
    const zScore99 = 2.326; // 99% confidence level;

    const var95 = totalExposure * volatility * timeFactor * zScore95;
    const var99 = totalExposure * volatility * timeFactor * zScore99;

    // Expected Loss and Maximum Loss
    const expectedLoss = totalExposure * volatility * timeFactor * 0.5;
    const maximumLoss = totalExposure * volatility * timeFactor * 3; // 3-sigma event

    // Risk Level Assessment
    let riskLevel = 'Low';
    if (var95 > totalExposure * 0.1) riskLevel = 'High';
    else if (var95 > totalExposure * 0.05) riskLevel = 'Medium';

    // Hedging Analysis
    const hedgeAmount = totalExposure * (hedgeRatio / 100);
    const hedgeCostAmount = hedgeAmount * (hedgeCost / 100);
    const riskReduction = var95 * (hedgeEffectiveness / 100);
    const netBenefit = riskReduction - hedgeCostAmount;

    // Scenario Analysis
    const scenarios = {
      optimistic: {
        rate: currentSpotRate * 0.95, // 5% appreciation
        impact: -totalExposure * 0.05
      },
      base: {
        rate: currentSpotRate,
        impact: 0
      },
      pessimistic: {
        rate: currentSpotRate * 1.05, // 5% depreciation
        impact: totalExposure * 0.05
      }
    };

    // Generate Hedging Recommendations
    const recommendations = [];
    
    if (riskLevel === 'High') {
      recommendations.push({
        type: 'High Risk Exposure',
        priority: 'High',
        impact: 'Significant FX risk exposure',
        benefit: 'Implement comprehensive hedging strategy',
        action: 'Consider forward contracts, options, or natural hedging'
      });
    }
    
    if (hedgeRatio < 50) {
      recommendations.push({
        type: 'Low Hedge Ratio',
        priority: 'Medium',
        impact: 'Insufficient hedging coverage',
        benefit: 'Increase hedge ratio to reduce exposure',
        action: 'Increase hedge ratio to 70-80% for better protection'
      });
    }
    
    if (netBenefit < 0) {
      recommendations.push({
        type: 'Hedge Cost Analysis',
        priority: 'Medium',
        impact: 'Hedging costs exceed benefits',
        benefit: 'Optimize hedging strategy for cost-effectiveness',
        action: 'Review hedge instruments and consider alternative strategies'
      });
    }

    setResults({
      exposure: {
        totalExposure,
        transactionExposure,
        translationExposure,
        economicExposure,
        netExposure
      },
      risk: {
        var95,
        var99,
        expectedLoss,
        maximumLoss,
        riskLevel
      },
      hedging: {
        hedgeAmount,
        hedgeCost: hedgeCostAmount,
        netBenefit,
        effectiveness: hedgeEffectiveness,
        recommendations
      },
      scenarios
    });
  };

  useEffect(() => {
    calculateFXRisk();
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
      
      pdf.save('fx-exposure-risk-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="FX Exposure Risk Calculator - Free Foreign Exchange Risk Analysis Tool | MoneyCal.in"
        description="Calculate foreign exchange exposure risk with our free FX risk analysis tool. Analyze transaction, translation, and economic exposure with VaR calculations and hedging strategies."
        keywords="FX exposure calculator, currency risk tool, forex risk corporate, foreign exchange risk analysis, VaR calculator"
        url="/corporate-finance/fx-exposure-risk-calculator"
        type="website"
        image="/images/fx-exposure-risk-calculator.jpg"
        tags={["FX exposure", "currency risk", "forex risk", "corporate finance"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
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
              <Globe className="h-16 w-16 text-cyan-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                FX Exposure Risk Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Analyze foreign exchange exposure risk and develop hedging strategies. 
              Calculate VaR, assess transaction, translation, and economic exposure with comprehensive risk analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="h-6 w-6 text-cyan-600 mr-2" />
                Transaction Information
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                        handleInputChange('historicalVolatility', selectedIndustry.volatility);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {industries.map((industry, index) => (
                      <option key={index} value={industry.name.toLowerCase()}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transaction Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Amount
                      </label>
                      <input
                        type="number"
                        value={inputs.transactionAmount}
                        onChange={(e) => handleInputChange('transactionAmount', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Currency
                      </label>
                      <select
                        value={inputs.transactionCurrency}
                        onChange={(e) => handleInputChange('transactionCurrency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        {currencies.map((currency, index) => (
                          <option key={index} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base Currency
                      </label>
                      <select
                        value={inputs.baseCurrency}
                        onChange={(e) => handleInputChange('baseCurrency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        {currencies.map((currency, index) => (
                          <option key={index} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Settlement Date
                      </label>
                      <input
                        type="date"
                        value={inputs.settlementDate}
                        onChange={(e) => handleInputChange('settlementDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Exchange Rates */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exchange Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Spot Rate
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.currentSpotRate}
                        onChange={(e) => handleInputChange('currentSpotRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Forward Rate
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.forwardRate}
                        onChange={(e) => handleInputChange('forwardRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Historical Volatility (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.historicalVolatility}
                        onChange={(e) => handleInputChange('historicalVolatility', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Exposure Types */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exposure Types (₹)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Exposure
                      </label>
                      <input
                        type="number"
                        value={inputs.transactionExposure}
                        onChange={(e) => handleInputChange('transactionExposure', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Translation Exposure
                      </label>
                      <input
                        type="number"
                        value={inputs.translationExposure}
                        onChange={(e) => handleInputChange('translationExposure', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Economic Exposure
                      </label>
                      <input
                        type="number"
                        value={inputs.economicExposure}
                        onChange={(e) => handleInputChange('economicExposure', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Parameters */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confidence Level (%)
                      </label>
                      <input
                        type="number"
                        value={inputs.confidenceLevel}
                        onChange={(e) => handleInputChange('confidenceLevel', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Horizon (Days)
                      </label>
                      <input
                        type="number"
                        value={inputs.timeHorizon}
                        onChange={(e) => handleInputChange('timeHorizon', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correlation Factor
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={inputs.correlationFactor}
                        onChange={(e) => handleInputChange('correlationFactor', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Hedging Options */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hedging Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hedge Ratio (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={inputs.hedgeRatio}
                        onChange={(e) => handleInputChange('hedgeRatio', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hedge Cost (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.hedgeCost}
                        onChange={(e) => handleInputChange('hedgeCost', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hedge Effectiveness (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={inputs.hedgeEffectiveness}
                        onChange={(e) => handleInputChange('hedgeEffectiveness', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Risk Summary */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    FX Risk Analysis
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
                      {formatCurrency(results.exposure.totalExposure)}
                    </div>
                    <div className="text-cyan-100">Total Exposure</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.risk.var95)}
                    </div>
                    <div className="text-cyan-100">VaR (95%)</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.risk.expectedLoss)}
                    </div>
                    <div className="text-cyan-100">Expected Loss</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.risk.riskLevel}
                    </div>
                    <div className="text-cyan-100">Risk Level</div>
                  </div>
                </div>
              </div>

              {/* Exposure Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-cyan-600 mr-2" />
                  Exposure Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Transaction Exposure</span>
                    <span className="font-semibold text-cyan-600">
                      {formatCurrency(results.exposure.transactionExposure)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Translation Exposure</span>
                    <span className="font-semibold text-cyan-600">
                      {formatCurrency(results.exposure.translationExposure)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Economic Exposure</span>
                    <span className="font-semibold text-cyan-600">
                      {formatCurrency(results.exposure.economicExposure)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                    <span className="font-semibold text-gray-900">Net Exposure (After Hedging)</span>
                    <span className="font-bold text-cyan-600 text-lg">
                      {formatCurrency(results.exposure.netExposure)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  Risk Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="font-semibold text-gray-900">VaR (95% Confidence)</span>
                    <span className="font-bold text-red-600 text-lg">
                      {formatCurrency(results.risk.var95)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">VaR (99% Confidence)</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.risk.var99)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Expected Loss</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.risk.expectedLoss)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Maximum Loss (3σ)</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.risk.maximumLoss)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hedging Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  Hedging Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-semibold text-gray-900">Hedge Amount</span>
                    <span className="font-bold text-green-600 text-lg">
                      {formatCurrency(results.hedging.hedgeAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Hedge Cost</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.hedging.hedgeCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Hedge Effectiveness</span>
                    <span className="font-semibold text-green-600">
                      {results.hedging.effectiveness.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="font-semibold text-gray-900">Net Benefit</span>
                    <span className={`font-bold text-lg ${
                      results.hedging.netBenefit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(results.hedging.netBenefit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scenario Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                  Scenario Analysis
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Optimistic</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Rate: {results.scenarios.optimistic.rate.toFixed(2)}</div>
                        <div className={`font-semibold ${results.scenarios.optimistic.impact < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Impact: {formatCurrency(results.scenarios.optimistic.impact)}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Base Case</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Rate: {results.scenarios.base.rate.toFixed(2)}</div>
                        <div className="font-semibold text-gray-600">
                          Impact: {formatCurrency(results.scenarios.base.impact)}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">Pessimistic</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Rate: {results.scenarios.pessimistic.rate.toFixed(2)}</div>
                        <div className={`font-semibold ${results.scenarios.pessimistic.impact < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Impact: {formatCurrency(results.scenarios.pessimistic.impact)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-orange-600 mr-2" />
                  Hedging Recommendations
                </h3>
                <div className="space-y-4">
                  {results.hedging.recommendations.map((rec, index) => (
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
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding FX Exposure Risk</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Foreign exchange (FX) exposure risk refers to the potential financial impact of currency fluctuations on a company's 
                operations, financial position, and cash flows. Effective FX risk management is crucial for multinational corporations 
                and companies with international operations.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of FX Exposure:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Transaction Exposure:</strong> Risk from future cash flows in foreign currencies</li>
                <li><strong>Translation Exposure:</strong> Risk from converting foreign subsidiary financial statements</li>
                <li><strong>Economic Exposure:</strong> Risk from long-term competitive position changes due to FX movements</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk Measurement:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Value at Risk (VaR):</strong> Maximum expected loss over a given time period</li>
                <li><strong>Expected Loss:</strong> Average expected loss from currency fluctuations</li>
                <li><strong>Maximum Loss:</strong> Worst-case scenario loss (3-sigma event)</li>
                <li><strong>Volatility:</strong> Historical price movement variability</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hedging Strategies:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Forward Contracts:</strong> Lock in exchange rates for future transactions</li>
                <li><strong>Currency Options:</strong> Right to buy/sell at predetermined rates</li>
                <li><strong>Natural Hedging:</strong> Matching foreign currency revenues and expenses</li>
                <li><strong>Currency Swaps:</strong> Exchange principal and interest payments</li>
                <li><strong>Netting:</strong> Offset receivables and payables in same currency</li>
              </ul>

              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-cyan-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-cyan-600 hover:text-cyan-800 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-cyan-600 hover:text-cyan-800 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/dividend-policy-impact-tool" className="text-cyan-600 hover:text-cyan-800 underline">Dividend Policy Impact</RouterLink>
                  <RouterLink to="/corporate-finance/working-capital-optimizer" className="text-cyan-600 hover:text-cyan-800 underline">Working Capital Optimizer</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FXExposureRiskCalculator;


