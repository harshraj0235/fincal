import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Stethoscope, Calculator, Heart, AlertCircle, Shield, TrendingUp, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const criticalIllnesses = [
  { name: 'Cancer', cost: 1500000, probability: 0.12, description: 'All types of cancer' },
  { name: 'Heart Attack', cost: 800000, probability: 0.15, description: 'Myocardial infarction' },
  { name: 'Stroke', cost: 600000, probability: 0.08, description: 'Cerebrovascular accident' },
  { name: 'Kidney Failure', cost: 1200000, probability: 0.05, description: 'End-stage renal disease' },
  { name: 'Liver Disease', cost: 1000000, probability: 0.04, description: 'Major organ failure' },
  { name: 'Paralysis', cost: 500000, probability: 0.03, description: 'Permanent paralysis' },
  { name: 'Multiple Sclerosis', cost: 800000, probability: 0.02, description: 'Neurological disorder' },
  { name: 'Parkinson\'s Disease', cost: 600000, probability: 0.02, description: 'Neurodegenerative disorder' }
];

const providers = [
  { name: 'HDFC Life', factor: 1.0, rating: 4.4, features: ['Comprehensive Coverage', 'Quick Claims', 'Good Service'] },
  { name: 'ICICI Prudential', factor: 1.05, rating: 4.3, features: ['Wide Coverage', 'Online Process', 'Competitive Rates'] },
  { name: 'Bajaj Allianz', factor: 0.98, rating: 4.2, features: ['Affordable Premiums', 'Fast Processing', 'Customer Support'] },
  { name: 'SBI Life', factor: 1.02, rating: 4.1, features: ['Bank Backed', 'Reliable', 'Wide Network'] },
  { name: 'Max Life', factor: 1.08, rating: 4.0, features: ['Specialized Plans', 'Good Coverage', 'Trusted Brand'] }
];

const preExistingConditions = [
  'Diabetes', 'Hypertension', 'Heart Disease', 'Cancer History', 'Kidney Disease', 
  'Liver Disease', 'Mental Health', 'Autoimmune Disease', 'None'
];

export const CriticalIllnessCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    age: 35,
    annualIncome: 800000,
    existingHealthInsurance: 500000,
    familyHistory: 'none',
    lifestyle: 'moderate',
    coverageAmount: 1000000,
    policyTerm: 20,
    premiumPaymentTerm: 20,
    smoking: false,
    preExistingConditions: []
  });

  const [results, setResults] = useState({
    recommendedCoverage: 0,
    estimatedPremium: 0,
    coverageGap: 0,
    providers: [] as Array<{
      name: string;
      factor: number;
      rating: number;
      features: string[];
      premium: number;
    }>
  });

  const calculateCriticalIllnessCoverage = useCallback(() => {
    const { age, annualIncome, existingHealthInsurance, familyHistory, lifestyle, coverageAmount, policyTerm, smoking, preExistingConditions } = inputs;
    
    // Calculate recommended coverage based on income and potential costs
    const incomeBasedCoverage = annualIncome * 2; // 2 years of income
    const averageIllnessCost = criticalIllnesses.reduce((sum, illness) => sum + illness.cost, 0) / criticalIllnesses.length;
    const recommendedCoverage = Math.max(incomeBasedCoverage, averageIllnessCost);
    
    // Calculate coverage gap
    const coverageGap = Math.max(0, recommendedCoverage - existingHealthInsurance);
    
    // Base premium calculation
    let basePremium = (coverageAmount / 100000) * 200; // ₹200 per ₹1L coverage
    
    // Age factor
    const ageFactor = 1 + (age - 25) * 0.03;
    
    // Family history factor
    const familyHistoryFactors = {
      'none': 1.0,
      'moderate': 1.2,
      'high': 1.5
    };
    const familyFactor = familyHistoryFactors[familyHistory as keyof typeof familyHistoryFactors] || 1.0;
    
    // Lifestyle factor
    const lifestyleFactors = {
      'healthy': 0.9,
      'moderate': 1.0,
      'risky': 1.3
    };
    const lifestyleFactor = lifestyleFactors[lifestyle as keyof typeof lifestyleFactors] || 1.0;
    
    // Smoking factor
    const smokingFactor = smoking ? 1.4 : 1.0;
    
    // Pre-existing conditions factor
    const conditionsFactor = 1 + (preExistingConditions.length * 0.2);
    
    // Calculate premium
    const estimatedPremium = basePremium * ageFactor * familyFactor * lifestyleFactor * smokingFactor * conditionsFactor;
    
    // Calculate premiums for different providers
    const providerPremiums = providers.map(provider => ({
      ...provider,
      premium: estimatedPremium * provider.factor
    }));
    
    setResults({
      recommendedCoverage,
      estimatedPremium,
      coverageGap,
      providers: providerPremiums
    });
  }, [inputs]);

  useEffect(() => {
    calculateCriticalIllnessCoverage();
  }, [calculateCriticalIllnessCoverage]);

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreExistingConditionChange = (condition: string, checked: boolean) => {
    const newConditions = checked
      ? [...inputs.preExistingConditions, condition]
      : inputs.preExistingConditions.filter(c => c !== condition);
    setInputs(prev => ({
      ...prev,
      preExistingConditions: newConditions
    }));
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
      
      pdf.save('critical-illness-calculator-results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <>
      <SEOHelmet
        title="Critical Illness Cover Calculator - Critical Illness Insurance India | MoneyCal.in"
        description="Free critical illness cover calculator for India. Determine the right critical illness coverage based on medical history, income, and potential healthcare costs."
        keywords="critical illness insurance calculator India, critical illness cover estimator, critical illness tool, health insurance calculator"
        url="/insurance-tools/critical-illness-calculator"
        type="website"
        image="/images/critical-illness-calculator.jpg"
        tags={["critical illness insurance", "health insurance", "insurance calculator", "medical coverage"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
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
              <Stethoscope className="h-16 w-16 text-pink-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Critical Illness Cover Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Determine the right critical illness coverage based on medical history, income, and potential healthcare costs. 
              Protect yourself and your family from financial burden during critical health conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-pink-600 mr-2" />
                Your Details
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
                    <span className="font-semibold text-pink-600">{inputs.age} Years</span>
                    <span>65 Years</span>
                  </div>
                </div>

                {/* Annual Income */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income (₹)
                  </label>
                  <input
                    type="range"
                    min="300000"
                    max="3000000"
                    step="50000"
                    value={inputs.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹3 Lakhs</span>
                    <span className="font-semibold text-pink-600">{formatCurrency(inputs.annualIncome)}</span>
                    <span>₹30 Lakhs</span>
                  </div>
                </div>

                {/* Existing Health Insurance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Existing Health Insurance Coverage (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="50000"
                    value={inputs.existingHealthInsurance}
                    onChange={(e) => handleInputChange('existingHealthInsurance', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span className="font-semibold text-pink-600">{formatCurrency(inputs.existingHealthInsurance)}</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>

                {/* Family History */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Family History of Critical Illness
                  </label>
                  <select
                    value={inputs.familyHistory}
                    onChange={(e) => handleInputChange('familyHistory', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="none">No Family History</option>
                    <option value="moderate">Moderate Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                </div>

                {/* Lifestyle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lifestyle
                  </label>
                  <select
                    value={inputs.lifestyle}
                    onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="healthy">Healthy Lifestyle</option>
                    <option value="moderate">Moderate Lifestyle</option>
                    <option value="risky">Risky Lifestyle</option>
                  </select>
                </div>

                {/* Smoking Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Smoking Status
                  </label>
                  <select
                    value={inputs.smoking ? 'smoker' : 'non-smoker'}
                    onChange={(e) => handleInputChange('smoking', e.target.value === 'smoker')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="non-smoker">Non-Smoker</option>
                    <option value="smoker">Smoker</option>
                  </select>
                </div>

                {/* Pre-existing Conditions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pre-existing Medical Conditions
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {preExistingConditions.map((condition) => (
                      <label key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={inputs.preExistingConditions.includes(condition)}
                          onChange={(e) => handlePreExistingConditionChange(condition, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Coverage Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Coverage Amount (₹)
                  </label>
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="100000"
                    value={inputs.coverageAmount}
                    onChange={(e) => handleInputChange('coverageAmount', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹5 Lakhs</span>
                    <span className="font-semibold text-pink-600">{formatCurrency(inputs.coverageAmount)}</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Coverage Analysis */}
              <div className="bg-gradient-to-br from-pink-600 to-red-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Heart className="h-6 w-6 mr-2" />
                    Coverage Analysis
                  </h2>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.recommendedCoverage)}
                    </div>
                    <div className="text-pink-100">Recommended Coverage</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.coverageGap)}
                    </div>
                    <div className="text-pink-100">Coverage Gap</div>
                  </div>
                </div>
              </div>

              {/* Premium Estimates */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-pink-600 mr-2" />
                  Premium Estimates
                </h3>
                <div className="text-center p-4 bg-pink-50 rounded-lg mb-4">
                  <div className="text-3xl font-bold text-pink-600">
                    {formatCurrency(results.estimatedPremium)}
                  </div>
                  <div className="text-gray-600">Annual Premium</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {formatCurrency(results.estimatedPremium / 12)} per month
                  </div>
                </div>
              </div>

              {/* Provider Comparison */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-pink-600 mr-2" />
                  Provider Comparison
                </h3>
                <div className="space-y-3">
                  {results.providers.map((provider, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600 ml-1">{provider.rating}/5</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-pink-600">
                            {formatCurrency(provider.premium)}
                          </div>
                          <div className="text-sm text-gray-500">per year</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-pink-50 text-pink-700 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Illnesses Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-pink-600 mr-2" />
                  Critical Illnesses Overview
                </h3>
                <div className="space-y-3">
                  {criticalIllnesses.slice(0, 4).map((illness, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{illness.name}</div>
                        <div className="text-sm text-gray-600">{illness.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-pink-600">
                          {formatCurrency(illness.cost)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(illness.probability * 100).toFixed(1)}% risk
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium estimates are approximate and may vary by provider
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Medical examination may be required for higher coverage amounts
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Pre-existing conditions may affect coverage and premiums
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Compare policy terms and waiting periods before purchasing
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Critical Illness Insurance in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Critical illness insurance provides a lump sum payment upon diagnosis of a covered critical illness, 
                helping you manage medical expenses, loss of income, and other financial obligations during recovery. 
                It's designed to complement your health insurance and provide financial security during challenging times. For comprehensive insurance planning, explore our 
                <RouterLink to="/insurance-tools" className="text-blue-600 hover:text-blue-800 underline">complete suite of insurance tools</RouterLink>.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits of Critical Illness Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Lump Sum Payment:</strong> Receive the full sum assured upon diagnosis</li>
                <li><strong>No Medical Bills:</strong> Use the money for any purpose, not just medical expenses</li>
                <li><strong>Income Replacement:</strong> Covers loss of income during treatment and recovery</li>
                <li><strong>Tax Benefits:</strong> Premiums eligible for deduction under Section 80D</li>
                <li><strong>Peace of Mind:</strong> Financial security during critical health conditions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Critical Illnesses Covered:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Cancer:</strong> All types of cancer including early-stage detection</li>
                <li><strong>Heart Attack:</strong> Myocardial infarction with specific criteria</li>
                <li><strong>Stroke:</strong> Cerebrovascular accident with permanent neurological deficit</li>
                <li><strong>Kidney Failure:</strong> End-stage renal disease requiring dialysis</li>
                <li><strong>Major Organ Transplant:</strong> Heart, liver, lung, kidney, pancreas transplants</li>
                <li><strong>Paralysis:</strong> Permanent paralysis of limbs</li>
                <li><strong>Multiple Sclerosis:</strong> Neurological disorder with specific criteria</li>
                <li><strong>Parkinson's Disease:</strong> Neurodegenerative disorder</li>
              </ul>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-pink-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/health-insurance-estimator" className="text-pink-600 hover:text-pink-800 underline">Health Insurance Estimator</RouterLink>
                  <RouterLink to="/insurance-tools/life-insurance-calculator" className="text-pink-600 hover:text-pink-800 underline">Life Insurance Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/portfolio-dashboard" className="text-pink-600 hover:text-pink-800 underline">Insurance Portfolio Dashboard</RouterLink>
                  <RouterLink to="/insurance-tools/term-insurance-planner" className="text-pink-600 hover:text-pink-800 underline">Term Insurance Planner</RouterLink>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips for Choosing Critical Illness Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Choose adequate coverage based on your income and potential medical costs</li>
                <li>Consider your family history and lifestyle factors</li>
                <li>Compare coverage for different illnesses across providers</li>
                <li>Check waiting periods and survival periods</li>
                <li>Review exclusions and limitations carefully</li>
                <li>Consider add-on benefits like second opinion services</li>
                <li>Buy early when you're young and healthy for lower premiums</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriticalIllnessCalculator;
