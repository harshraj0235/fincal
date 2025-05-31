import React, { useState } from 'react';
import { MapPin, Search, Filter, Clock, CreditCard, DollarSign, Banknote, Armchair as Wheelchair, Check } from 'lucide-react';

interface ATM {
  id: string;
  bank: string;
  location: string;
  address: string;
  city: string;
  distance: number;
  status: 'operational' | 'limited' | 'out-of-service';
  cashAvailability: 'available' | 'limited' | 'unavailable';
  features: string[];
  lastUpdated: string;
}

export const AtmLocator: React.FC = () => {
  const [location, setLocation] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [radius, setRadius] = useState(5);
  const [filters, setFilters] = useState({
    operational: true,
    cashAvailable: true,
    twentyFourHours: false,
    cardless: false,
    wheelchair: false,
    depositEnabled: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<ATM[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample data for demonstration
  const banks = [
    'All Banks', 'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 
    'Punjab National Bank', 'Bank of Baroda', 'Kotak Mahindra Bank', 'IndusInd Bank'
  ];

  // Sample ATM data
  const sampleATMs: ATM[] = [
    {
      id: 'atm1',
      bank: 'HDFC Bank',
      location: 'Andheri East',
      address: '123, Andheri East, Mumbai - 400069',
      city: 'Mumbai',
      distance: 0.8,
      status: 'operational',
      cashAvailability: 'available',
      features: ['24/7', 'cardless', 'deposit'],
      lastUpdated: '10 minutes ago'
    },
    {
      id: 'atm2',
      bank: 'State Bank of India',
      location: 'Bandra West',
      address: '456, Linking Road, Bandra West, Mumbai - 400050',
      city: 'Mumbai',
      distance: 1.2,
      status: 'operational',
      cashAvailability: 'limited',
      features: ['24/7', 'wheelchair'],
      lastUpdated: '25 minutes ago'
    },
    {
      id: 'atm3',
      bank: 'ICICI Bank',
      location: 'Powai',
      address: '789, Hiranandani Gardens, Powai, Mumbai - 400076',
      city: 'Mumbai',
      distance: 2.5,
      status: 'limited',
      cashAvailability: 'available',
      features: ['deposit', 'cardless'],
      lastUpdated: '1 hour ago'
    },
    {
      id: 'atm4',
      bank: 'Axis Bank',
      location: 'Juhu',
      address: '101, Juhu Beach Road, Juhu, Mumbai - 400049',
      city: 'Mumbai',
      distance: 3.1,
      status: 'out-of-service',
      cashAvailability: 'unavailable',
      features: ['wheelchair'],
      lastUpdated: '2 hours ago'
    },
    {
      id: 'atm5',
      bank: 'Kotak Mahindra Bank',
      location: 'Malad West',
      address: '202, Infinity Mall, Malad West, Mumbai - 400064',
      city: 'Mumbai',
      distance: 4.7,
      status: 'operational',
      cashAvailability: 'available',
      features: ['24/7', 'deposit', 'wheelchair', 'cardless'],
      lastUpdated: '30 minutes ago'
    }
  ];

  const handleSearch = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Filter ATMs based on selected filters
      let filteredATMs = [...sampleATMs];
      
      if (selectedBank && selectedBank !== 'All Banks') {
        filteredATMs = filteredATMs.filter(atm => atm.bank === selectedBank);
      }
      
      if (filters.operational) {
        filteredATMs = filteredATMs.filter(atm => atm.status === 'operational');
      }
      
      if (filters.cashAvailable) {
        filteredATMs = filteredATMs.filter(atm => atm.cashAvailability === 'available' || atm.cashAvailability === 'limited');
      }
      
      if (filters.twentyFourHours) {
        filteredATMs = filteredATMs.filter(atm => atm.features.includes('24/7'));
      }
      
      if (filters.cardless) {
        filteredATMs = filteredATMs.filter(atm => atm.features.includes('cardless'));
      }
      
      if (filters.wheelchair) {
        filteredATMs = filteredATMs.filter(atm => atm.features.includes('wheelchair'));
      }
      
      if (filters.depositEnabled) {
        filteredATMs = filteredATMs.filter(atm => atm.features.includes('deposit'));
      }
      
      // Filter by radius
      filteredATMs = filteredATMs.filter(atm => atm.distance <= radius);
      
      // Sort by distance
      filteredATMs.sort((a, b) => a.distance - b.distance);
      
      setSearchResults(filteredATMs);
      setLoading(false);
    }, 1000);
  };

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const getStatusColor = (status: ATM['status']) => {
    switch (status) {
      case 'operational':
        return 'text-[--success-600]';
      case 'limited':
        return 'text-[--warning-600]';
      case 'out-of-service':
        return 'text-[--error-600]';
      default:
        return 'text-neutral-600';
    }
  };

  const getStatusText = (status: ATM['status']) => {
    switch (status) {
      case 'operational':
        return 'Fully Operational';
      case 'limited':
        return 'Limited Service';
      case 'out-of-service':
        return 'Out of Service';
      default:
        return 'Unknown';
    }
  };

  const getCashAvailabilityColor = (availability: ATM['cashAvailability']) => {
    switch (availability) {
      case 'available':
        return 'text-[--success-600]';
      case 'limited':
        return 'text-[--warning-600]';
      case 'unavailable':
        return 'text-[--error-600]';
      default:
        return 'text-neutral-600';
    }
  };

  const getCashAvailabilityText = (availability: ATM['cashAvailability']) => {
    switch (availability) {
      case 'available':
        return 'Cash Available';
      case 'limited':
        return 'Limited Cash';
      case 'unavailable':
        return 'No Cash';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">ATM Locator</h2>
        <p className="text-neutral-600">
          Find ATMs near you with real-time information on cash availability and operational status. Filter by bank, distance, and features to find the most convenient ATM for your needs.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
              Your Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                className="input pl-10"
                placeholder="Enter area, locality, or landmark"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-neutral-400" />
              </div>
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[--primary-600] hover:text-[--primary-800]"
                title="Use current location"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="1"></circle>
                  <line x1="12" y1="2" x2="12" y2="4"></line>
                  <line x1="12" y1="20" x2="12" y2="22"></line>
                  <line x1="2" y1="12" x2="4" y2="12"></line>
                  <line x1="20" y1="12" x2="22" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="bank" className="block text-sm font-medium text-neutral-700 mb-1">
              Select Bank
            </label>
            <select
              id="bank"
              className="input"
              value={selectedBank || 'All Banks'}
              onChange={(e) => setSelectedBank(e.target.value === 'All Banks' ? null : e.target.value)}
            >
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <label htmlFor="radius" className="block text-sm font-medium text-neutral-700 mb-1">
              Search Radius: {radius} km
            </label>
            <input
              type="range"
              id="radius"
              min="1"
              max="10"
              step="1"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-48 slider"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 sm:mt-0 flex items-center text-[--primary-600] hover:text-[--primary-800]"
          >
            <Filter className="h-4 w-4 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => toggleFilter('operational')}
              className={`flex items-center p-2 rounded-lg text-sm ${
                filters.operational
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <Check className={`h-4 w-4 mr-2 ${filters.operational ? 'opacity-100' : 'opacity-0'}`} />
              Operational ATMs
            </button>
            
            <button
              onClick={() => toggleFilter('cashAvailable')}
              className={`flex items-center p-2 rounded-lg text-sm ${
                filters.cashAvailable
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <Check className={`h-4 w-4 mr-2 ${filters.cashAvailable ? 'opacity-100' : 'opacity-0'}`} />
              Cash Available
            </button>
            
            <button
              onClick={() => toggleFilter('twentyFourHours')}
              className={`flex items-center p-2 rounded-lg text-sm ${
                filters.twentyFourHours
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <Check className={`h-4 w-4 mr-2 ${filters.twentyFourHours ? 'opacity-100' : 'opacity-0'}`} />
              24/7 ATMs
            </button>
            
            <button
              onClick={() => toggleFilter('cardless')}
              className={`flex items-center p-2 rounded-lg text-sm ${
                filters.cardless
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <Check className={`h-4 w-4 mr-2 ${filters.cardless ? 'opacity-100' : 'opacity-0'}`} />
              Cardless Withdrawal
            </button>
            
            <button
              onClick={() => toggleFilter('wheelchair')}
              className={`flex items-center p-2 rounded-lg text-sm ${
                filters.wheelchair
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <Check className={`h-4 w-4 mr-2 ${filters.wheelchair ? 'opacity-100' : 'opacity-0'}`} />
              Wheelchair Accessible
            </button>
            
            <button
              onClick={() => toggleFilter('depositEnabled')}
              className={`flex items-center p-2 rounded-lg text-sm ${
                filters.depositEnabled
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <Check className={`h-4 w-4 mr-2 ${filters.depositEnabled ? 'opacity-100' : 'opacity-0'}`} />
              Cash Deposit
            </button>
          </div>
        )}
        
        <button
          onClick={handleSearch}
          className="btn btn-primary w-full"
          disabled={loading || !location}
        >
          {loading ? 'Searching...' : 'Find ATMs Near Me'}
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Found {searchResults.length} ATMs near {location}
          </h3>
          
          <div className="space-y-6">
            {searchResults.map((atm) => (
              <div key={atm.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                <div className="bg-neutral-50 p-4 flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">{atm.bank}</h4>
                    <p className="text-neutral-600">{atm.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-[--primary-600]">{atm.distance} km away</span>
                    <p className="text-xs text-neutral-500">Updated {atm.lastUpdated}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <MapPin className="h-5 w-5 text-neutral-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-neutral-700">{atm.address}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className={`flex items-center ${getStatusColor(atm.status)}`}>
                      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        atm.status === 'operational' ? 'bg-[--success-500]' : 
                        atm.status === 'limited' ? 'bg-[--warning-500]' : 
                        'bg-[--error-500]'
                      }`}></div>
                      <span>{getStatusText(atm.status)}</span>
                    </div>
                    
                    <div className={`flex items-center ${getCashAvailabilityColor(atm.cashAvailability)}`}>
                      <Banknote className="h-4 w-4 mr-2" />
                      <span>{getCashAvailabilityText(atm.cashAvailability)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {atm.features.includes('24/7') && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        <Clock className="h-3 w-3 mr-1" />
                        24/7
                      </span>
                    )}
                    
                    {atm.features.includes('cardless') && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        <CreditCard className="h-3 w-3 mr-1" />
                        Cardless
                      </span>
                    )}
                    
                    {atm.features.includes('deposit') && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Deposit
                      </span>
                    )}
                    
                    {atm.features.includes('wheelchair') && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        <Wheelchair className="h-3 w-3 mr-1" />
                        Accessible
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center">
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(atm.address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[--primary-600] hover:text-[--primary-800] text-sm font-medium"
                    >
                      Get Directions
                    </a>
                    
                    <button className="text-neutral-600 hover:text-neutral-800 text-sm">
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">About ATM Locator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">Features</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li>Find ATMs from all major banks in India</li>
              <li>Real-time cash availability status</li>
              <li>Filter by distance, bank, and features</li>
              <li>Get directions to the nearest ATM</li>
              <li>Report issues with ATMs to help others</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">ATM Status Information</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li><span className="text-[--success-600] font-medium">Fully Operational:</span> All services working</li>
              <li><span className="text-[--warning-600] font-medium">Limited Service:</span> Some features may not be working</li>
              <li><span className="text-[--error-600] font-medium">Out of Service:</span> ATM is currently not working</li>
              <li><span className="text-[--success-600] font-medium">Cash Available:</span> ATM has sufficient cash</li>
              <li><span className="text-[--warning-600] font-medium">Limited Cash:</span> ATM may run out of cash soon</li>
              <li><span className="text-[--error-600] font-medium">No Cash:</span> ATM is out of cash</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frequently Asked Questions</h3>
        
        <div className="space-y-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">How accurate is the cash availability information?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Cash availability information is updated regularly based on data from banks and user reports. While we strive for accuracy, there might be occasional delays in updates, especially during high-demand periods or bank holidays.</p>
              <p className="mt-2">The information is typically refreshed in the following ways:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Direct feeds from bank systems (updated every 1-2 hours)</li>
                <li>User reports (real-time updates)</li>
                <li>ATM maintenance schedules provided by banks</li>
              </ul>
              <p className="mt-2">The "last updated" timestamp shows when the information was last refreshed for each ATM.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">What are the daily ATM withdrawal limits?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>ATM withdrawal limits vary by bank and account type. Here are the typical daily limits for major Indian banks:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>SBI:</strong> ₹20,000 - ₹1,00,000 (depending on card type)</li>
                <li><strong>HDFC Bank:</strong> ₹25,000 - ₹1,00,000</li>
                <li><strong>ICICI Bank:</strong> ₹20,000 - ₹1,50,000</li>
                <li><strong>Axis Bank:</strong> ₹20,000 - ₹2,00,000</li>
                <li><strong>PNB:</strong> ₹10,000 - ₹50,000</li>
              </ul>
              <p className="mt-2">These limits apply to withdrawals from ATMs. Different limits may apply for other transaction types. Check with your bank for your specific account's limits.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">What is cardless cash withdrawal?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Cardless cash withdrawal allows you to withdraw money from an ATM without using your physical debit card. This feature is available at select ATMs and works differently across banks:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Mobile Banking App:</strong> Generate a temporary PIN or QR code through your bank's mobile app</li>
                <li><strong>UPI:</strong> Some ATMs support UPI-based withdrawals</li>
                <li><strong>OTP-based:</strong> Receive an OTP on your registered mobile number to authenticate the withdrawal</li>
              </ul>
              <p className="mt-2">Cardless withdrawal is useful if you've forgotten your card, want to avoid card skimming risks, or need to send money to someone who doesn't have a bank account.</p>
              <p className="mt-2">The ATMs in our database that support cardless withdrawal are marked with the "Cardless" feature tag.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Are there any charges for using ATMs?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>ATM usage charges depend on whether you're using your own bank's ATM or another bank's ATM:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Own Bank ATMs:</strong> Usually free for unlimited transactions</li>
                <li><strong>Other Bank ATMs (Metro Cities):</strong> First 3 financial transactions per month are free, after which ₹20 + GST per transaction</li>
                <li><strong>Other Bank ATMs (Non-Metro Cities):</strong> First 5 financial transactions per month are free, after which ₹20 + GST per transaction</li>
                <li><strong>Non-financial transactions:</strong> ₹8 + GST after free limit is exhausted</li>
              </ul>
              <p className="mt-2">These are the standard RBI guidelines, but some banks may have different policies. Premium account holders often get higher or unlimited free transaction limits.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default AtmLocator;