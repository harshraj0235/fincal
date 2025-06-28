import React, { useState, useMemo, ChangeEvent } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Search, MapPin, Banknote, Shield, Clock, Star, Filter, Calculator, Building2, Phone, Mail, Globe, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

// Comprehensive bank locker data
const bankLockerData = {
  'State Bank of India': {
    charges: { small: '₹500-1,000', medium: '₹1,000-2,000', large: '₹2,000-5,000' },
    availability: 'Limited', waitingTime: '6-12 months',
    requirements: ['Savings Account', 'KYC Documents', 'Nominee Details'],
    contact: '+91-22-2202-1234', website: 'https://www.sbi.co.in',
    features: ['24/7 Access', 'Insurance Coverage', 'Online Booking']
  },
  'HDFC Bank': {
    charges: { small: '₹1,500-3,000', medium: '₹3,000-6,000', large: '₹6,000-12,000' },
    availability: 'Available', waitingTime: '1-3 months',
    requirements: ['Savings Account', 'Minimum Balance', 'Income Proof'],
    contact: '+91-22-6652-1000', website: 'https://www.hdfcbank.com',
    features: ['Premium Security', 'Digital Access', 'Insurance']
  },
  'ICICI Bank': {
    charges: { small: '₹1,200-2,500', medium: '₹2,500-5,000', large: '₹5,000-10,000' },
    availability: 'Available', waitingTime: '2-4 months',
    requirements: ['Savings Account', 'KYC Documents', 'Nominee'],
    contact: '+91-22-2493-7777', website: 'https://www.icicibank.com',
    features: ['Smart Locker', 'Biometric Access', 'Insurance']
  },
  'Axis Bank': {
    charges: { small: '₹1,000-2,000', medium: '₹2,000-4,000', large: '₹4,000-8,000' },
    availability: 'Available', waitingTime: '1-2 months',
    requirements: ['Savings Account', 'KYC Documents'],
    contact: '+91-22-2425-2525', website: 'https://www.axisbank.com',
    features: ['Digital Locker', '24/7 Access', 'Insurance']
  },
  'Kotak Mahindra Bank': {
    charges: { small: '₹1,500-3,000', medium: '₹3,000-6,000', large: '₹6,000-12,000' },
    availability: 'Limited', waitingTime: '3-6 months',
    requirements: ['Savings Account', 'Income Proof', 'Nominee'],
    contact: '+91-22-6605-6565', website: 'https://www.kotak.com',
    features: ['Premium Security', 'Digital Access', 'Insurance']
  },
  'Punjab National Bank': {
    charges: { small: '₹400-800', medium: '₹800-1,500', large: '₹1,500-3,000' },
    availability: 'Available', waitingTime: '2-4 months',
    requirements: ['Savings Account', 'KYC Documents'],
    contact: '+91-11-2371-4567', website: 'https://www.pnbindia.in',
    features: ['Basic Security', 'Regular Access', 'Insurance']
  },
  'Bank of Baroda': {
    charges: { small: '₹500-1,000', medium: '₹1,000-2,000', large: '₹2,000-4,000' },
    availability: 'Available', waitingTime: '1-3 months',
    requirements: ['Savings Account', 'KYC Documents'],
    contact: '+91-22-6698-5000', website: 'https://www.bankofbaroda.in',
    features: ['Standard Security', 'Regular Access', 'Insurance']
  },
  'Canara Bank': {
    charges: { small: '₹400-800', medium: '₹800-1,500', large: '₹1,500-3,000' },
    availability: 'Limited', waitingTime: '3-6 months',
    requirements: ['Savings Account', 'KYC Documents'],
    contact: '+91-80-2222-1818', website: 'https://www.canarabank.com',
    features: ['Basic Security', 'Regular Access', 'Insurance']
  },
  'Union Bank of India': {
    charges: { small: '₹400-800', medium: '₹800-1,500', large: '₹1,500-3,000' },
    availability: 'Available', waitingTime: '2-4 months',
    requirements: ['Savings Account', 'KYC Documents'],
    contact: '+91-22-2289-2000', website: 'https://www.unionbankofindia.co.in',
    features: ['Standard Security', 'Regular Access', 'Insurance']
  },
  'IDFC First Bank': {
    charges: { small: '₹1,000-2,000', medium: '₹2,000-4,000', large: '₹4,000-8,000' },
    availability: 'Available', waitingTime: '1-2 months',
    requirements: ['Savings Account', 'KYC Documents'],
    contact: '+91-22-6140-0000', website: 'https://www.idfcfirstbank.com',
    features: ['Modern Security', 'Digital Access', 'Insurance']
  }
};

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad', 'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Aligarh', 'Jalandhar'];

const faqData = [
  {
    q: 'How much does a bank locker cost in India?',
    a: 'Bank locker charges in India range from ₹400-12,000 per year depending on the bank and locker size. Public sector banks like SBI and PNB charge ₹400-3,000, while private banks like HDFC and ICICI charge ₹1,200-12,000 annually.'
  },
  {
    q: 'How long is the waiting period for bank lockers?',
    a: 'Waiting periods vary by bank: SBI (6-12 months), HDFC (1-3 months), ICICI (2-4 months), Axis (1-2 months), and public sector banks (2-6 months). Availability depends on location and demand.'
  },
  {
    q: 'What documents are required for bank locker?',
    a: 'Required documents include: Savings account with the bank, KYC documents (Aadhaar, PAN), nominee details, income proof, and address verification. Some banks require minimum balance maintenance.'
  },
  {
    q: 'Are bank lockers insured?',
    a: 'Yes, most bank lockers come with basic insurance coverage. However, the coverage amount is limited (usually ₹1-5 lakhs). For higher value items, additional insurance is recommended.'
  },
  {
    q: 'Can I access my bank locker 24/7?',
    a: 'Access depends on the bank. Most banks offer access during business hours (9 AM-5 PM). Some premium lockers and private banks offer extended hours or 24/7 access with prior arrangement.'
  }
];

const BankLockerFinder: React.FC = () => {
  const [searchBank, setSearchBank] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [activeTab, setActiveTab] = useState('finder');

  const banks = Object.keys(bankLockerData);

  const filteredBanks = useMemo(() => {
    if (!searchBank) return banks;
    return banks.filter(bank => bank.toLowerCase().includes(searchBank.toLowerCase()));
  }, [searchBank, banks]);

  const filteredCities = useMemo(() => {
    if (!searchCity) return cities;
    return cities.filter(city => city.toLowerCase().includes(searchCity.toLowerCase()));
  }, [searchCity]);

  const selectedBankData = selectedBank ? bankLockerData[selectedBank] : null;

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'text-green-600 bg-green-100';
      case 'Limited': return 'text-yellow-600 bg-yellow-100';
      case 'Not Available': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Bank Locker Availability & Charges Finder | Compare Locker Costs Across Indian Banks 2024"
        description="Find bank locker availability, charges, and waiting periods for SBI, HDFC, ICICI, Axis, and all major Indian banks. Compare locker costs, check availability near you, and book lockers online. Updated for 2024."
        keywords="bank locker charges comparison, bank locker availability near me, SBI locker charges, HDFC bank locker fees, ICICI locker booking, bank locker waiting period, locker charges India, bank locker requirements, locker availability check, bank locker booking online"
        url="/calculators/bank-locker-finder"
        tags={["bank locker", "locker charges", "locker availability", "bank locker booking", "locker comparison"]}
        schemaType="FAQPage"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqData.map(faq => ({
            '@type': 'Question',
            'name': faq.q,
            'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
          }))
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        {/* Header */}
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Bank Locker Availability & Charges Finder
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Find and compare bank locker availability, charges, and waiting periods across all major Indian banks. 
                Get real-time information on locker costs, requirements, and booking procedures.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('finder')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'finder'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50'
              }`}
            >
              <Search className="inline w-4 h-4 mr-2" />
              Locker Finder
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'comparison'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50'
              }`}
            >
              <Calculator className="inline w-4 h-4 mr-2" />
              Compare Charges
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'guide'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50'
              }`}
            >
              <Info className="inline w-4 h-4 mr-2" />
              Booking Guide
            </button>
          </div>

          {/* Locker Finder Tab */}
          {activeTab === 'finder' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Search Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Find Your Locker
                  </h2>

                  {/* Bank Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Banknote className="w-4 h-4 inline mr-2" />
                      Search Bank
                    </label>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Type bank name..."
                        value={searchBank}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchBank(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <select
                      value={selectedBank}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedBank(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      <option value="">Select a bank</option>
                      {filteredBanks.map(bank => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>

                  {/* City Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Select City
                    </label>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Type city name..."
                        value={searchCity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                      <option value="">Select a city</option>
                      {filteredCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                    Find Locker Details
                  </button>
                </div>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2">
                {selectedBankData ? (
                  <div className="space-y-6">
                    {/* Bank Details Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedBank}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getAvailabilityColor(selectedBankData.availability)}`}>
                          {selectedBankData.availability}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Charges */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Locker Charges (Per Year)</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium">Small Locker</span>
                              <span className="font-bold text-purple-600">{selectedBankData.charges.small}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium">Medium Locker</span>
                              <span className="font-bold text-purple-600">{selectedBankData.charges.medium}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium">Large Locker</span>
                              <span className="font-bold text-purple-600">{selectedBankData.charges.large}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Info</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-500" />
                              <span className="text-sm">Waiting Time: <span className="font-semibold">{selectedBankData.waitingTime}</span></span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-gray-500" />
                              <span className="text-sm">Contact: <span className="font-semibold">{selectedBankData.contact}</span></span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="w-4 h-4 mr-2 text-gray-500" />
                              <a href={selectedBankData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:underline">
                                Visit Website
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedBankData.requirements.map((req, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedBankData.features.map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Find Your Perfect Bank Locker
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Select a bank and city to get detailed information about locker availability, charges, and requirements.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                          <Banknote className="w-5 h-5 mr-2 text-purple-600" />
                          <div>
                            <div className="font-semibold text-purple-800">10+ Banks</div>
                            <div className="text-xs text-purple-600">All Categories</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                          <span>50+ Cities</span>
                        </div>
                        <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                          <Clock className="w-4 h-4 mr-2 text-gray-600" />
                          <span>Real-time Data</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bank Locker Charges Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Bank</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Small Locker</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Medium Locker</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Large Locker</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Availability</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Waiting Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banks.map(bank => {
                      const data = bankLockerData[bank];
                      return (
                        <tr key={bank} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{bank}</td>
                          <td className="py-3 px-4">{data.charges.small}</td>
                          <td className="py-3 px-4">{data.charges.medium}</td>
                          <td className="py-3 px-4">{data.charges.large}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(data.availability)}`}>
                              {data.availability}
                            </span>
                          </td>
                          <td className="py-3 px-4">{data.waitingTime}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Guide Tab */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Book a Bank Locker</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Open Savings Account</h4>
                          <p className="text-sm text-gray-600">Most banks require you to have a savings account with them before applying for a locker.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Submit Application</h4>
                          <p className="text-sm text-gray-600">Fill the locker application form with required documents and nominee details.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Pay Charges</h4>
                          <p className="text-sm text-gray-600">Pay the annual locker charges and security deposit as required by the bank.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Get Access</h4>
                          <p className="text-sm text-gray-600">Receive locker keys and access instructions once your application is approved.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                    <div className="space-y-3">
                      {['Aadhaar Card', 'PAN Card', 'Passport Size Photos', 'Address Proof', 'Nominee Details', 'Income Proof (if required)'].map((doc, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                          <span className="text-sm">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-700">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Related Banking Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="/calculators/bank-charges-analyzer" className="block p-6 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Bank Charges Analyzer</h3>
                <p className="text-sm text-gray-600">Compare hidden bank charges and fees</p>
              </a>
              <a href="/calculators/cheque-bounce-charges-calculator" className="block p-6 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cheque Bounce Charges</h3>
                <p className="text-sm text-gray-600">Find bank-wise cheque bounce penalties</p>
              </a>
              <a href="/calculators/emi-calculator" className="block p-6 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">EMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate loan EMIs and payments</p>
              </a>
              <a href="/missed-call-banking-directory" className="block p-6 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Missed Call Banking</h3>
                <p className="text-sm text-gray-600">Find bank missed call numbers</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankLockerFinder; 