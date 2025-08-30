import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Calculator, MapPin, Shield, AlertCircle, Building, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const HomeInsuranceEstimator: React.FC = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    propertyValue: 5000000,
    location: 'metro',
    propertyType: 'apartment',
    constructionYear: 2015,
    area: 1000,
    coverageType: 'comprehensive',
    addOns: ['earthquake', 'flood']
  });

  const [results, setResults] = useState({
    structurePremium: 0,
    contentsPremium: 0,
    totalPremium: 0,
    coverageDetails: {},
    addOnCosts: {}
  });

  const locations = [
    { name: 'Metro City', factor: 1.2, risk: 'medium' },
    { name: 'Tier 1 City', factor: 1.0, risk: 'low' },
    { name: 'Tier 2 City', factor: 0.9, risk: 'low' },
    { name: 'Tier 3 City', factor: 0.8, risk: 'low' },
    { name: 'Rural Area', factor: 0.7, risk: 'low' }
  ];

  const propertyTypes = [
    { name: 'Apartment', factor: 1.0, risk: 'low' },
    { name: 'Independent House', factor: 1.1, risk: 'medium' },
    { name: 'Villa', factor: 1.3, risk: 'medium' },
    { name: 'Penthouse', factor: 1.2, risk: 'medium' },
    { name: 'Duplex', factor: 1.15, risk: 'medium' }
  ];

  const coverageTypes = [
    {
      name: 'Basic',
      structureRate: 0.15,
      contentsRate: 0.25,
      coverage: {
        structure: 0.8,
        contents: 0.5,
        features: ['Fire', 'Lightning', 'Explosion']
      }
    },
    {
      name: 'Standard',
      structureRate: 0.20,
      contentsRate: 0.35,
      coverage: {
        structure: 0.9,
        contents: 0.7,
        features: ['Fire', 'Lightning', 'Explosion', 'Theft', 'Burglary']
      }
    },
    {
      name: 'Comprehensive',
      structureRate: 0.25,
      contentsRate: 0.45,
      coverage: {
        structure: 1.0,
        contents: 0.8,
        features: ['Fire', 'Lightning', 'Explosion', 'Theft', 'Burglary', 'Natural Disasters']
      }
    }
  ];

  const addOns = [
    { name: 'earthquake', cost: 0.05, description: 'Earthquake Coverage' },
    { name: 'flood', cost: 0.08, description: 'Flood Coverage' },
    { name: 'terrorism', cost: 0.03, description: 'Terrorism Coverage' },
    { name: 'renovation', cost: 0.04, description: 'Renovation Coverage' },
    { name: 'jewelry', cost: 0.10, description: 'Jewelry Coverage' }
  ];

  const calculateHomeInsurance = () => {
    const { propertyValue, location, propertyType, constructionYear, area, coverageType, addOns: selectedAddOns } = inputs;
    
    // Get location and property type factors
    const locationData = locations.find(l => l.name.toLowerCase().includes(location.toLowerCase()));
    const propertyData = propertyTypes.find(p => p.name.toLowerCase().includes(propertyType.toLowerCase()));
    const locationFactor = locationData?.factor || 1.0;
    const propertyFactor = propertyData?.factor || 1.0;
    
    // Get coverage type
    const coverage = coverageTypes.find(c => c.name.toLowerCase().includes(coverageType.toLowerCase())) || coverageTypes[0];
    
    // Calculate age factor
    const currentYear = new Date().getFullYear();
    const age = currentYear - constructionYear;
    const ageFactor = age > 20 ? 1.3 : age > 10 ? 1.1 : 1.0;
    
    // Calculate structure premium
    const structureValue = propertyValue * coverage.coverage.structure;
    const structurePremium = (structureValue / 100000) * coverage.structureRate * locationFactor * propertyFactor * ageFactor;
    
    // Calculate contents premium (assuming 20% of property value for contents)
    const contentsValue = propertyValue * 0.2 * coverage.coverage.contents;
    const contentsPremium = (contentsValue / 100000) * coverage.contentsRate * locationFactor;
    
    // Calculate add-on costs
    const addOnCosts = {};
    let totalAddOnCost = 0;
    selectedAddOns.forEach(addOnName => {
      const addOn = addOns.find(a => a.name === addOnName);
      if (addOn) {
        const addOnCost = structurePremium * addOn.cost;
        addOnCosts[addOnName] = addOnCost;
        totalAddOnCost += addOnCost;
      }
    });
    
    const totalPremium = structurePremium + contentsPremium + totalAddOnCost;
    
    setResults({
      structurePremium,
      contentsPremium,
      totalPremium,
      coverageDetails: coverage.coverage,
      addOnCosts
    });
  };

  useEffect(() => {
    calculateHomeInsurance();
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

  return (
    <>
      <SEOHelmet
        title="Home Insurance Cost Estimator - Property Insurance Calculator India | MoneyCal.in"
        description="Free home insurance cost estimator for India. Calculate home insurance premiums based on property value, location, and coverage type. Protect your biggest asset."
        keywords="home insurance premium calculator India, property insurance cost estimator, home insurance tool 2025, property insurance calculator"
        url="/insurance-tools/home-insurance-estimator"
        type="website"
        image="/images/home-insurance-estimator.jpg"
        tags={["home insurance", "property insurance", "insurance calculator", "home protection"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
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
              <Home className="h-16 w-16 text-indigo-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Home Insurance Cost Estimator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Estimate home insurance premiums based on property value, location, and coverage type. 
              Protect your biggest asset with comprehensive home insurance coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-indigo-600 mr-2" />
                Property Details
              </h2>
              
              <div className="space-y-6">
                {/* Property Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Value (₹)
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="100000000"
                    step="500000"
                    value={inputs.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹10 Lakhs</span>
                    <span className="font-semibold text-indigo-600">{formatCurrency(inputs.propertyValue)}</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={inputs.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {locations.map((location, index) => (
                      <option key={index} value={location.name.toLowerCase()}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={inputs.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type.name.toLowerCase()}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Construction Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Construction Year
                  </label>
                  <input
                    type="range"
                    min="1990"
                    max="2024"
                    step="1"
                    value={inputs.constructionYear}
                    onChange={(e) => handleInputChange('constructionYear', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1990</span>
                    <span className="font-semibold text-indigo-600">{inputs.constructionYear}</span>
                    <span>2024</span>
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Built-up Area (sq ft)
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="50"
                    value={inputs.area}
                    onChange={(e) => handleInputChange('area', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>500 sq ft</span>
                    <span className="font-semibold text-indigo-600">{inputs.area} sq ft</span>
                    <span>5000 sq ft</span>
                  </div>
                </div>

                {/* Coverage Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Type
                  </label>
                  <select
                    value={inputs.coverageType}
                    onChange={(e) => handleInputChange('coverageType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {coverageTypes.map((type, index) => (
                      <option key={index} value={type.name.toLowerCase()}>
                        {type.name} Coverage
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add-ons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Coverage
                  </label>
                  <div className="space-y-2">
                    {addOns.map((addOn) => (
                      <label key={addOn.name} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={inputs.addOns.includes(addOn.name)}
                          onChange={(e) => {
                            const newAddOns = e.target.checked
                              ? [...inputs.addOns, addOn.name]
                              : inputs.addOns.filter(a => a !== addOn.name);
                            handleInputChange('addOns', newAddOns);
                          }}
                          className="mr-2"
                        />
                        <span>{addOn.description}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Premium Summary */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-2" />
                  Premium Estimate
                </h2>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {formatCurrency(results.totalPremium)}
                  </div>
                  <div className="text-indigo-100">Annual Premium</div>
                  <div className="text-sm text-indigo-200 mt-2">
                    {formatCurrency(results.totalPremium / 12)} per month
                  </div>
                </div>
              </div>

              {/* Premium Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                  Premium Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Structure Coverage</span>
                    <span className="font-semibold text-indigo-600">
                      {formatCurrency(results.structurePremium)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Contents Coverage</span>
                    <span className="font-semibold text-indigo-600">
                      {formatCurrency(results.contentsPremium)}
                    </span>
                  </div>
                  {Object.entries(results.addOnCosts).map(([addOn, cost]) => {
                    const addOnData = addOns.find(a => a.name === addOn);
                    return (
                      <div key={addOn} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{addOnData?.description}</span>
                        <span className="font-semibold text-indigo-600">
                          {formatCurrency(cost as number)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                    <span className="font-semibold text-gray-900">Total Premium</span>
                    <span className="font-bold text-indigo-600 text-lg">
                      {formatCurrency(results.totalPremium)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coverage Details */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Building className="h-5 w-5 text-indigo-600 mr-2" />
                  Coverage Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Structure Coverage</span>
                    <span className="font-semibold text-indigo-600">
                      {Math.round(results.coverageDetails.structure * 100)}% of Property Value
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Contents Coverage</span>
                    <span className="font-semibold text-indigo-600">
                      {Math.round(results.coverageDetails.contents * 100)}% of Contents Value
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Covered Perils:</div>
                    <div className="flex flex-wrap gap-2">
                      {coverageTypes.find(c => c.name.toLowerCase().includes(inputs.coverageType))?.coverage.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
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
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium estimates are approximate and may vary by provider
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Property inspection may be required for accurate premium calculation
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Older properties may have higher premiums due to increased risk
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Compare policy terms, exclusions, and claim settlement ratios
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Home Insurance in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Home insurance provides financial protection for your property against various risks including fire, 
                natural disasters, theft, and other perils. It's essential for homeowners to protect their most 
                valuable asset and ensure financial security.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Home Insurance Coverage:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Structure Coverage:</strong> Protects the physical structure of your home</li>
                <li><strong>Contents Coverage:</strong> Covers personal belongings and household items</li>
                <li><strong>Liability Coverage:</strong> Protects against legal liability for injuries on your property</li>
                <li><strong>Additional Living Expenses:</strong> Covers temporary accommodation if home becomes uninhabitable</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors Affecting Home Insurance Premiums:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Property Value:</strong> Higher value properties have higher premiums</li>
                <li><strong>Location:</strong> Risk-prone areas have higher premium rates</li>
                <li><strong>Construction Type:</strong> Different materials have varying risk levels</li>
                <li><strong>Age of Property:</strong> Older properties may have higher premiums</li>
                <li><strong>Security Features:</strong> Security systems can reduce premiums</li>
                <li><strong>Claim History:</strong> Previous claims may affect premium rates</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips for Choosing Home Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assess the replacement cost of your property accurately</li>
                <li>Choose adequate coverage limits for both structure and contents</li>
                <li>Consider add-on covers based on your location and needs</li>
                <li>Compare premiums and coverage across multiple insurers</li>
                <li>Review policy exclusions and limitations carefully</li>
                <li>Maintain proper documentation of your belongings</li>
                <li>Update your policy when making home improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeInsuranceEstimator;
