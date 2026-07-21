import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Heart, IndianRupee, TrendingUp, Users, DollarSign, Info, AlertCircle, Shield, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


export const HealthInsuranceEstimator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    familyMembers: 2,
    adults: 2,
    children: 0,
    seniorCitizens: 0,
    averageAge: 35,
    coverageAmount: 500000,
    city: 'metro',
    preExistingConditions: false,
    maternityCoverage: false,
    roomRentLimit: 'single',
    coPayment: 0
  });

  const [results, setResults] = useState({
    basePremium: 0,
    ageFactor: 0,
    familyFactor: 0,
    cityFactor: 0,
    coverageFactor: 0,
    totalPremium: 0,
    taxBenefits: 0,
    providers: []
  });

  const providers = [
    { name: 'Star Health', factor: 1.0, rating: 4.5, features: ['Cashless Treatment', 'Pre-existing Coverage', 'Maternity Benefits'] },
    { name: 'Apollo Munich', factor: 1.1, rating: 4.4, features: ['Network Hospitals', 'Day Care Procedures', 'Emergency Coverage'] },
    { name: 'HDFC ERGO', factor: 1.05, rating: 4.3, features: ['Comprehensive Coverage', 'Wellness Benefits', 'Quick Claims'] },
    { name: 'ICICI Lombard', factor: 1.08, rating: 4.2, features: ['Family Floater', 'Preventive Care', '24/7 Support'] },
    { name: 'Bajaj Allianz', factor: 0.95, rating: 4.1, features: ['Affordable Premiums', 'Wide Network', 'Easy Renewal'] },
    { name: 'New India Assurance', factor: 0.9, rating: 4.0, features: ['Government Backed', 'Reliable Claims', 'Pan India Coverage'] }
  ];

  const calculateHealthInsurance = () => {
    const { familyMembers, averageAge, coverageAmount, city, preExistingConditions, maternityCoverage, roomRentLimit, coPayment } = inputs;
    
    // Base premium calculation
    const basePremium = 8000; // Base premium for ₹5L coverage for 2 adults
    
    // Age factor (premium increases with age)
    const ageFactor = 1 + (averageAge - 30) * 0.02;
    
    // Family size factor
    const familyFactor = 1 + (familyMembers - 2) * 0.3;
    
    // City factor (metro cities have higher premiums)
    const cityFactor = city === 'metro' ? 1.2 : city === 'tier1' ? 1.1 : 1.0;
    
    // Coverage amount factor
    const coverageFactor = coverageAmount / 500000;
    
    // Additional factors
    let additionalFactor = 1;
    if (preExistingConditions) additionalFactor += 0.3;
    if (maternityCoverage) additionalFactor += 0.2;
    if (roomRentLimit === 'private') additionalFactor += 0.15;
    if (coPayment > 0) additionalFactor -= coPayment * 0.1;
    
    const totalPremium = basePremium * ageFactor * familyFactor * cityFactor * coverageFactor * additionalFactor;
    
    // Tax benefits (Section 80D)
    const taxBenefits = Math.min(totalPremium, 25000) * 0.3; // Up to ₹25k for individuals, 30% tax bracket
    
    // Calculate premiums for different providers
    const providerPremiums = providers.map(provider => ({
      ...provider,
      premium: totalPremium * provider.factor
    }));
    
    setResults({
      basePremium,
      ageFactor,
      familyFactor,
      cityFactor,
      coverageFactor,
      totalPremium,
      taxBenefits,
      providers: providerPremiums
    });
  };

  useEffect(() => {
    calculateHealthInsurance();
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
      
      pdf.save('health-insurance-estimator-results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <>
      <SEOHelmet
        title="Health Insurance Premium Calculator - Compare Health Insurance Plans India | MoneyCal.in"
        description="Free health insurance premium Calculator for India. Compare health insurance premiums across top providers. Get family health insurance quotes, tax benefits, and coverage recommendations."
        keywords="health insurance premium Calculator India, family health insurance cost estimator, best health insurance Calculator 2025, health insurance comparison, health insurance quotes"
        url="/insurance-tools/health-insurance-estimator"
        type="website"
        image="/images/health-insurance-calculator.jpg"
        tags={["health insurance", "insurance calculator", "premium calculator", "family health insurance"]}
      />
      
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
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
              <Heart className="h-16 w-16 text-red-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Health Insurance Premium Estimator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Compare health insurance premiums across top providers and find the best family health insurance plans 
              with comprehensive coverage and tax benefits under Section 80D.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 text-red-600 mr-2" />
                Family Details
              </h2>
              
              <div className="space-y-6">
                {/* Family Members */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Family Members
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.familyMembers}
                    onChange={(e) => handleInputChange('familyMembers', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Adults */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Adults (18+ years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={inputs.adults}
                    onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Children */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Children (Below 18 years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    value={inputs.children}
                    onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Senior Citizens */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Senior Citizens (60+ years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    value={inputs.seniorCitizens}
                    onChange={(e) => handleInputChange('seniorCitizens', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Average Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Age of Family Members
                  </label>
                  <input
                    type="range"
                    min="25"
                    max="70"
                    step="5"
                    value={inputs.averageAge}
                    onChange={(e) => handleInputChange('averageAge', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>25 Years</span>
                    <span className="font-semibold text-red-600">{inputs.averageAge} Years</span>
                    <span>70 Years</span>
                  </div>
                </div>

                {/* Coverage Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Coverage Amount (₹)
                  </label>
                  <input
                    type="range"
                    min="200000"
                    max="2000000"
                    step="100000"
                    value={inputs.coverageAmount}
                    onChange={(e) => handleInputChange('coverageAmount', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹2 Lakhs</span>
                    <span className="font-semibold text-red-600">{formatCurrency(inputs.coverageAmount)}</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>

                {/* City Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City Type
                  </label>
                  <select
                    value={inputs.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="metro">Metro City</option>
                    <option value="tier1">Tier 1 City</option>
                    <option value="tier2">Tier 2 City</option>
                    <option value="tier3">Tier 3 City</option>
                  </select>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preExisting"
                      checked={inputs.preExistingConditions}
                      onChange={(e) => handleInputChange('preExistingConditions', e.target.checked)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="preExisting" className="ml-2 text-sm text-gray-700">
                      Pre-existing medical conditions
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maternity"
                      checked={inputs.maternityCoverage}
                      onChange={(e) => handleInputChange('maternityCoverage', e.target.checked)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="maternity" className="ml-2 text-sm text-gray-700">
                      Maternity coverage required
                    </label>
                  </div>
                </div>

                {/* Room Rent Limit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Rent Limit
                  </label>
                  <select
                    value={inputs.roomRentLimit}
                    onChange={(e) => handleInputChange('roomRentLimit', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                    <option value="private">Private Room</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </div>

                {/* Co-payment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Co-payment (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="5"
                    value={inputs.coPayment}
                    onChange={(e) => handleInputChange('coPayment', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-semibold text-red-600">{inputs.coPayment}%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Provider Comparison */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
                    Provider Comparison
                  </h3>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
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
                          <div className="text-lg font-bold text-red-600">
                            {formatCurrency(provider.premium)}
                          </div>
                          <div className="text-sm text-gray-500">per year</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Benefits */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Tax Benefits (Section 80D)
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.taxBenefits)}
                    </div>
                    <div className="text-sm text-gray-600">Tax savings per year</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• Up to ₹25,000 for individuals (₹50,000 for senior citizens)</p>
                    <p>• Additional ₹25,000 for parents' health insurance</p>
                    <p>• Total deduction up to ₹1,00,000 possible</p>
                  </div>
                </div>
              </div>

              {/* Coverage Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  Coverage Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Coverage Amount</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(inputs.coverageAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Family Members</span>
                    <span className="font-semibold text-green-600">{inputs.familyMembers}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Average Age</span>
                    <span className="font-semibold text-purple-600">{inputs.averageAge} years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">City Type</span>
                    <span className="font-semibold text-orange-600 capitalize">{inputs.city}</span>
                  </div>
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
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium estimates are approximate and may vary by provider
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Pre-existing conditions may have waiting periods
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Compare policy features, not just premiums
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Check network hospitals and claim settlement ratio
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Health Insurance Premiums in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Health insurance premiums in India are calculated based on several factors including age, family size, 
                coverage amount, location, and medical history. Understanding these factors helps you make informed 
                decisions about your health insurance coverage. For comprehensive insurance planning, explore our 
                <RouterLink to="/insurance-tools" className="text-blue-600 hover:text-blue-800 underline">complete suite of insurance tools</RouterLink>.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors Affecting Health Insurance Premiums:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Age:</strong> Premiums increase with age due to higher health risks</li>
                <li><strong>Family Size:</strong> More family members generally mean higher premiums</li>
                <li><strong>Coverage Amount:</strong> Higher coverage leads to higher premiums</li>
                <li><strong>Location:</strong> Metro cities have higher premiums due to higher medical costs</li>
                <li><strong>Pre-existing Conditions:</strong> May increase premiums or have waiting periods</li>
                <li><strong>Add-on Covers:</strong> Maternity, critical illness, etc. increase premiums</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tax Benefits Under Section 80D:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Self & Family:</strong> Up to ₹25,000 deduction (₹50,000 for senior citizens)</li>
                <li><strong>Parents:</strong> Additional ₹25,000 (₹50,000 if parents are senior citizens)</li>
                <li><strong>Preventive Health Check-up:</strong> Up to ₹5,000 within the overall limit</li>
                <li><strong>Total Maximum:</strong> Up to ₹1,00,000 in deductions possible</li>
              </ul>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/life-insurance-calculator" className="text-red-600 hover:text-red-800 underline">Life Insurance Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/critical-illness-calculator" className="text-red-600 hover:text-red-800 underline">Critical Illness Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/term-insurance-planner" className="text-red-600 hover:text-red-800 underline">Term Insurance Planner</RouterLink>
                  <RouterLink to="/insurance-tools/portfolio-dashboard" className="text-red-600 hover:text-red-800 underline">Insurance Portfolio Dashboard</RouterLink>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips for Choosing Health Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compare premiums and coverage features across multiple providers</li>
                <li>Check the network of hospitals and claim settlement ratio</li>
                <li>Understand waiting periods for pre-existing conditions</li>
                <li>Consider add-on covers based on your family's needs</li>
                <li>Review the policy terms and exclusions carefully</li>
                <li>Look for cashless treatment facilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthInsuranceEstimator;
