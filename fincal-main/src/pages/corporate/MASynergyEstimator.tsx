import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Download, Link, Building, BarChart3, Target, PieChart, Users } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const MASynergyEstimator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    // Company Information
    acquirerName: '',
    targetName: '',
    dealValue: 1000000000,
    dealType: 'acquisition',
    
    // Revenue Synergies
    revenueOverlap: 20,
    crossSellingPotential: 15,
    marketExpansion: 10,
    newProductLaunch: 5,
    
    // Cost Synergies
    sgaReduction: 12,
    operationalEfficiency: 8,
    procurementSavings: 5,
    facilityConsolidation: 3,
    workforceOptimization: 7,
    
    // Financial Parameters
    acquirerRevenue: 5000000000,
    targetRevenue: 2000000000,
    acquirerEBITDA: 750000000,
    targetEBITDA: 300000000,
    taxRate: 25,
    discountRate: 10,
    synergyTimeline: 3,
    
    // Integration Costs
    integrationCost: 50000000,
    restructuringCost: 30000000,
    technologyIntegration: 20000000
  });

  const [results, setResults] = useState({
    revenueSynergies: {
      total: 0,
      breakdown: {},
      npv: 0
    },
    costSynergies: {
      total: 0,
      breakdown: {},
      npv: 0
    },
    totalSynergies: {
      annual: 0,
      npv: 0,
      percentage: 0
    },
    integrationCosts: {
      total: 0,
      breakdown: {}
    },
    netSynergyValue: 0,
    synergyMultiples: {
      revenue: 0,
      cost: 0,
      total: 0
    }
  });

  const dealTypes = [
    { value: 'acquisition', label: 'Acquisition' },
    { value: 'merger', label: 'Merger' },
    { value: 'joint-venture', label: 'Joint Venture' },
    { value: 'strategic-alliance', label: 'Strategic Alliance' }
  ];

  const calculateSynergies = () => {
    const {
      revenueOverlap, crossSellingPotential, marketExpansion, newProductLaunch,
      sgaReduction, operationalEfficiency, procurementSavings, facilityConsolidation, workforceOptimization,
      acquirerRevenue, targetRevenue, acquirerEBITDA, targetEBITDA,
      taxRate, discountRate, synergyTimeline,
      integrationCost, restructuringCost, technologyIntegration
    } = inputs;

    // Revenue Synergies Calculation
    const revenueSynergies = {
      overlapReduction: (acquirerRevenue + targetRevenue) * (revenueOverlap / 100) * 0.1, // 10% of overlap becomes synergy
      crossSelling: (acquirerRevenue + targetRevenue) * (crossSellingPotential / 100) * 0.05, // 5% cross-selling uplift
      marketExpansion: (acquirerRevenue + targetRevenue) * (marketExpansion / 100) * 0.08, // 8% market expansion
      newProducts: (acquirerRevenue + targetRevenue) * (newProductLaunch / 100) * 0.12, // 12% new product revenue
      total: 0
    };

    revenueSynergies.total = revenueSynergies.overlapReduction + revenueSynergies.crossSelling + 
                            revenueSynergies.marketExpansion + revenueSynergies.newProducts;

    // Cost Synergies Calculation
    const costSynergies = {
      sgaReduction: (acquirerEBITDA + targetEBITDA) * (sgaReduction / 100) * 0.3, // 30% of EBITDA from SGA
      operationalEfficiency: (acquirerEBITDA + targetEBITDA) * (operationalEfficiency / 100) * 0.4, // 40% from operations
      procurementSavings: (acquirerRevenue + targetRevenue) * (procurementSavings / 100) * 0.02, // 2% of revenue
      facilityConsolidation: (acquirerEBITDA + targetEBITDA) * (facilityConsolidation / 100) * 0.1, // 10% from facilities
      workforceOptimization: (acquirerEBITDA + targetEBITDA) * (workforceOptimization / 100) * 0.2, // 20% from workforce
      total: 0
    };

    costSynergies.total = costSynergies.sgaReduction + costSynergies.operationalEfficiency + 
                         costSynergies.procurementSavings + costSynergies.facilityConsolidation + 
                         costSynergies.workforceOptimization;

    // Total Annual Synergies
    const totalAnnualSynergies = revenueSynergies.total + costSynergies.total;

    // NPV Calculation
    const calculateNPV = (annualAmount: number, years: number, rate: number) => {
      let npv = 0;
      for (let year = 1; year <= years; year++) {
        const pv = annualAmount / Math.pow(1 + rate / 100, year);
        npv += pv;
      }
      return npv;
    };

    const revenueNPV = calculateNPV(revenueSynergies.total, synergyTimeline, discountRate);
    const costNPV = calculateNPV(costSynergies.total, synergyTimeline, discountRate);
    const totalNPV = revenueNPV + costNPV;

    // Integration Costs
    const totalIntegrationCosts = integrationCost + restructuringCost + technologyIntegration;

    // Net Synergy Value
    const netSynergyValue = totalNPV - totalIntegrationCosts;

    // Synergy Multiples
    const synergyMultiples = {
      revenue: revenueNPV / inputs.dealValue,
      cost: costNPV / inputs.dealValue,
      total: totalNPV / inputs.dealValue
    };

    // Synergy Percentage
    const synergyPercentage = (totalAnnualSynergies / (acquirerEBITDA + targetEBITDA)) * 100;

    setResults({
      revenueSynergies: {
        total: revenueSynergies.total,
        breakdown: revenueSynergies,
        npv: revenueNPV
      },
      costSynergies: {
        total: costSynergies.total,
        breakdown: costSynergies,
        npv: costNPV
      },
      totalSynergies: {
        annual: totalAnnualSynergies,
        npv: totalNPV,
        percentage: synergyPercentage
      },
      integrationCosts: {
        total: totalIntegrationCosts,
        breakdown: {
          integration: integrationCost,
          restructuring: restructuringCost,
          technology: technologyIntegration
        }
      },
      netSynergyValue,
      synergyMultiples
    });
  };

  useEffect(() => {
    calculateSynergies();
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
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + ' B';
    } else if (num >= 10000000) {
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
      
      pdf.save('ma-synergy-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="M&A Synergy Estimator - Free Merger & Acquisition Analysis Tool | MoneyCal.in"
        description="Calculate M&A synergies with our free merger and acquisition analysis tool. Estimate revenue synergies, cost savings, and integration benefits for corporate deals."
        keywords="M&A synergy calculator, merger synergy estimator, acquisition value calculator, corporate merger analysis, M&A valuation tool"
        url="/corporate-finance/ma-synergy-estimator"
        type="website"
        image="/images/ma-synergy-estimator.jpg"
        tags={["M&A analysis", "merger synergies", "acquisition valuation", "corporate finance"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
              <TrendingUp className="h-16 w-16 text-purple-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                M&A Synergy Estimator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive M&A synergy analysis tool for mergers and acquisitions. 
              Calculate revenue synergies, cost savings, and integration benefits with detailed NPV analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-purple-600 mr-2" />
                Deal Information
              </h2>
              
              <div className="space-y-6">
                {/* Company Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acquirer Company
                    </label>
                    <input
                      type="text"
                      value={inputs.acquirerName}
                      onChange={(e) => handleInputChange('acquirerName', e.target.value)}
                      placeholder="Enter acquirer name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Company
                    </label>
                    <input
                      type="text"
                      value={inputs.targetName}
                      onChange={(e) => handleInputChange('targetName', e.target.value)}
                      placeholder="Enter target name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Deal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deal Value (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.dealValue}
                      onChange={(e) => handleInputChange('dealValue', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deal Type
                    </label>
                    <select
                      value={inputs.dealType}
                      onChange={(e) => handleInputChange('dealType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {dealTypes.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Financial Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acquirer Revenue (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.acquirerRevenue}
                      onChange={(e) => handleInputChange('acquirerRevenue', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Revenue (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.targetRevenue}
                      onChange={(e) => handleInputChange('targetRevenue', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acquirer EBITDA (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.acquirerEBITDA}
                      onChange={(e) => handleInputChange('acquirerEBITDA', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target EBITDA (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.targetEBITDA}
                      onChange={(e) => handleInputChange('targetEBITDA', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Revenue Synergies */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Synergies (%)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Revenue Overlap
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.revenueOverlap}
                        onChange={(e) => handleInputChange('revenueOverlap', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cross-selling Potential
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.crossSellingPotential}
                        onChange={(e) => handleInputChange('crossSellingPotential', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Market Expansion
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.marketExpansion}
                        onChange={(e) => handleInputChange('marketExpansion', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Product Launch
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.newProductLaunch}
                        onChange={(e) => handleInputChange('newProductLaunch', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Cost Synergies */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Synergies (%)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SG&A Reduction
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.sgaReduction}
                        onChange={(e) => handleInputChange('sgaReduction', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Operational Efficiency
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.operationalEfficiency}
                        onChange={(e) => handleInputChange('operationalEfficiency', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Procurement Savings
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.procurementSavings}
                        onChange={(e) => handleInputChange('procurementSavings', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facility Consolidation
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.facilityConsolidation}
                        onChange={(e) => handleInputChange('facilityConsolidation', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Workforce Optimization
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.workforceOptimization}
                        onChange={(e) => handleInputChange('workforceOptimization', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Parameters */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.taxRate}
                        onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.discountRate}
                        onChange={(e) => handleInputChange('discountRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Synergy Timeline (Years)
                      </label>
                      <input
                        type="number"
                        value={inputs.synergyTimeline}
                        onChange={(e) => handleInputChange('synergyTimeline', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Integration Costs */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Costs (₹)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Integration Cost
                      </label>
                      <input
                        type="number"
                        value={inputs.integrationCost}
                        onChange={(e) => handleInputChange('integrationCost', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Restructuring Cost
                      </label>
                      <input
                        type="number"
                        value={inputs.restructuringCost}
                        onChange={(e) => handleInputChange('restructuringCost', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Technology Integration
                      </label>
                      <input
                        type="number"
                        value={inputs.technologyIntegration}
                        onChange={(e) => handleInputChange('technologyIntegration', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Synergy Summary */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Synergy Analysis
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
                      {formatCurrency(results.totalSynergies.annual)}
                    </div>
                    <div className="text-purple-100">Annual Synergies</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.totalSynergies.npv)}
                    </div>
                    <div className="text-purple-100">NPV of Synergies</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.totalSynergies.percentage.toFixed(1)}%
                    </div>
                    <div className="text-purple-100">Synergy % of EBITDA</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.netSynergyValue)}
                    </div>
                    <div className="text-purple-100">Net Synergy Value</div>
                  </div>
                </div>
              </div>

              {/* Revenue Synergies */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Revenue Synergies
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-semibold text-gray-900">Total Annual Revenue Synergies</span>
                    <span className="font-bold text-green-600 text-lg">
                      {formatCurrency(results.revenueSynergies.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">NPV of Revenue Synergies</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.revenueSynergies.npv)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Revenue Synergy Multiple</span>
                    <span className="font-semibold text-green-600">
                      {results.synergyMultiples.revenue.toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>

              {/* Cost Synergies */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                  Cost Synergies
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="font-semibold text-gray-900">Total Annual Cost Synergies</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {formatCurrency(results.costSynergies.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">NPV of Cost Synergies</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(results.costSynergies.npv)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Cost Synergy Multiple</span>
                    <span className="font-semibold text-blue-600">
                      {results.synergyMultiples.cost.toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>

              {/* Integration Costs */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 text-orange-600 mr-2" />
                  Integration Costs
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <span className="font-semibold text-gray-900">Total Integration Costs</span>
                    <span className="font-bold text-orange-600 text-lg">
                      {formatCurrency(results.integrationCosts.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Integration Cost</span>
                    <span className="font-semibold text-orange-600">
                      {formatCurrency(results.integrationCosts.breakdown.integration)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Restructuring Cost</span>
                    <span className="font-semibold text-orange-600">
                      {formatCurrency(results.integrationCosts.breakdown.restructuring)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Technology Integration</span>
                    <span className="font-semibold text-orange-600">
                      {formatCurrency(results.integrationCosts.breakdown.technology)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding M&A Synergies</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                M&A synergies are the additional value created when two companies combine through merger or acquisition. 
                These synergies can be categorized into revenue synergies and cost synergies, each contributing to 
                the overall value creation of the deal.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Revenue Synergies:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Revenue Overlap:</strong> Eliminating duplicate revenue streams and cross-selling opportunities</li>
                <li><strong>Cross-selling:</strong> Selling each company's products to the other's customer base</li>
                <li><strong>Market Expansion:</strong> Accessing new markets through combined distribution channels</li>
                <li><strong>New Product Launch:</strong> Leveraging combined R&D capabilities for innovation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost Synergies:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>SG&A Reduction:</strong> Eliminating duplicate administrative functions</li>
                <li><strong>Operational Efficiency:</strong> Streamlining operations and processes</li>
                <li><strong>Procurement Savings:</strong> Bulk purchasing and supplier consolidation</li>
                <li><strong>Facility Consolidation:</strong> Closing redundant offices and facilities</li>
                <li><strong>Workforce Optimization:</strong> Eliminating duplicate roles and functions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Considerations:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Synergies should be realistic and achievable within the specified timeline</li>
                <li>Integration costs must be factored into the overall synergy calculation</li>
                <li>Cultural integration and change management are critical for success</li>
                <li>Regulatory approvals and market conditions can impact synergy realization</li>
                <li>Regular monitoring and adjustment of synergy targets is essential</li>
              </ul>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-purple-600 hover:text-purple-800 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-purple-600 hover:text-purple-800 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/scenario-analysis-simulator" className="text-purple-600 hover:text-purple-800 underline">Scenario Analysis Simulator</RouterLink>
                  <RouterLink to="/corporate-finance/working-capital-optimizer" className="text-purple-600 hover:text-purple-800 underline">Working Capital Optimizer</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MASynergyEstimator;
