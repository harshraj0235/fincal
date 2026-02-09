import React, { useState } from 'react';
import { Search, MapPin, Copy, Check, ExternalLink } from 'lucide-react';

interface BankBranch {
  bank: string;
  branch: string;
  ifsc: string;
  micr: string;
  address: string;
  city: string;
  state: string;
  phone: string;
}

export const BankIfscFinder: React.FC = () => {
  const [searchType, setSearchType] = useState<'bank' | 'branch' | 'ifsc'>('bank');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<BankBranch[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Sample data for demonstration
  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank',
    'Bank of Baroda', 'Kotak Mahindra Bank', 'IndusInd Bank', 'Yes Bank', 'Canara Bank'
  ];
  
  const states = [
    'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 
    'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];
  
  const cities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
    'Delhi': ['New Delhi', 'Delhi NCR'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar']
  };

  // Sample branch data
  const sampleBranches: BankBranch[] = [
    {
      bank: 'State Bank of India',
      branch: 'Andheri East',
      ifsc: 'SBIN0001234',
      micr: '400002123',
      address: '123, Andheri East, Mumbai - 400069',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '022-12345678'
    },
    {
      bank: 'HDFC Bank',
      branch: 'Bandra West',
      ifsc: 'HDFC0001234',
      micr: '400002456',
      address: '456, Linking Road, Bandra West, Mumbai - 400050',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '022-23456789'
    },
    {
      bank: 'ICICI Bank',
      branch: 'Powai',
      ifsc: 'ICIC0001234',
      micr: '400002789',
      address: '789, Hiranandani Gardens, Powai, Mumbai - 400076',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '022-34567890'
    }
  ];

  const handleSearch = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real application, this would be an API call to fetch results
      setSearchResults(sampleBranches);
      setLoading(false);
    }, 1000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Bank IFSC/MICR Code Finder</h2>
        <p className="text-neutral-600">
          Find IFSC (Indian Financial System Code) and MICR (Magnetic Ink Character Recognition) codes for any bank branch in India. These codes are essential for NEFT, RTGS, IMPS transactions and cheque processing.
        </p>
      </div>

      {/* Search Options */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Search By</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSearchType('bank')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                searchType === 'bank'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Bank & Branch
            </button>
            <button
              onClick={() => setSearchType('ifsc')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                searchType === 'ifsc'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              IFSC Code
            </button>
            <button
              onClick={() => setSearchType('branch')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                searchType === 'branch'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Branch Name
            </button>
          </div>
        </div>

        {searchType === 'bank' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="bank" className="block text-sm font-medium text-neutral-700 mb-1">
                Select Bank
              </label>
              <select
                id="bank"
                className="input"
                value={selectedBank || ''}
                onChange={(e) => setSelectedBank(e.target.value || null)}
              >
                <option value="">Select a bank</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                Select State
              </label>
              <select
                id="state"
                className="input"
                value={selectedState || ''}
                onChange={(e) => {
                  setSelectedState(e.target.value || null);
                  setSelectedCity(null);
                }}
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {selectedState && (
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                  Select City
                </label>
                <select
                  id="city"
                  className="input"
                  value={selectedCity || ''}
                  onChange={(e) => setSelectedCity(e.target.value || null)}
                >
                  <option value="">Select a city</option>
                  {cities[selectedState as keyof typeof cities]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {searchType === 'ifsc' && (
          <div>
            <label htmlFor="ifsc" className="block text-sm font-medium text-neutral-700 mb-1">
              Enter IFSC Code
            </label>
            <div className="relative">
              <input
                type="text"
                id="ifsc"
                className="input pl-10"
                placeholder="e.g., SBIN0001234"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              IFSC code is an 11-character code with first 4 alphabetic characters representing the bank, the 5th character is 0 (zero), and the last 6 characters represent the branch.
            </p>
          </div>
        )}

        {searchType === 'branch' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="bank" className="block text-sm font-medium text-neutral-700 mb-1">
                Select Bank
              </label>
              <select
                id="bank"
                className="input"
                value={selectedBank || ''}
                onChange={(e) => setSelectedBank(e.target.value || null)}
              >
                <option value="">Select a bank</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-neutral-700 mb-1">
                Enter Branch Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="branch"
                  className="input pl-10"
                  placeholder="e.g., Andheri East"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleSearch}
            className="btn btn-primary w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Find Bank Codes'}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Search Results</h3>
          
          <div className="space-y-6">
            {searchResults.map((branch, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">{branch.bank}</h4>
                    <p className="text-neutral-600">{branch.branch} Branch</p>
                  </div>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[--primary-600] hover:text-[--primary-800] flex items-center text-sm"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    View on Map
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-neutral-700">IFSC Code</span>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-neutral-900 mr-2">{branch.ifsc}</span>
                        <button 
                          onClick={() => handleCopy(branch.ifsc)}
                          className="text-neutral-400 hover:text-[--primary-600]"
                          title="Copy IFSC Code"
                        >
                          {copied === branch.ifsc ? <Check className="h-4 w-4 text-[--success-600]" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-neutral-700">MICR Code</span>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-neutral-900 mr-2">{branch.micr}</span>
                        <button 
                          onClick={() => handleCopy(branch.micr)}
                          className="text-neutral-400 hover:text-[--primary-600]"
                          title="Copy MICR Code"
                        >
                          {copied === branch.micr ? <Check className="h-4 w-4 text-[--success-600]" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-2">
                      <span className="text-sm font-medium text-neutral-700">Address</span>
                      <p className="text-sm text-neutral-900">{branch.address}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700">Phone</span>
                      <span className="text-sm text-neutral-900">{branch.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-neutral-200 flex justify-between items-center">
                  <div className="text-sm text-neutral-500">
                    {branch.city}, {branch.state}
                  </div>
                  <a 
                    href={`https://www.${branch.bank.toLowerCase().replace(/\s+/g, '')}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[--primary-600] hover:text-[--primary-800] flex items-center text-sm"
                  >
                    Visit Bank Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">About IFSC and MICR Codes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">IFSC Code</h4>
            <p className="text-sm text-[--primary-700] mb-2">
              IFSC (Indian Financial System Code) is an 11-character code used for electronic fund transfers like NEFT, RTGS, and IMPS.
            </p>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li>First 4 characters: Bank code (e.g., SBIN for SBI)</li>
              <li>5th character: Always '0' (zero)</li>
              <li>Last 6 characters: Branch code</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">MICR Code</h4>
            <p className="text-sm text-[--primary-700] mb-2">
              MICR (Magnetic Ink Character Recognition) is a 9-digit code used primarily for processing cheques.
            </p>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li>First 3 digits: City code</li>
              <li>Middle 3 digits: Bank code</li>
              <li>Last 3 digits: Branch code</li>
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
              <h4 className="text-neutral-900 font-medium">Where can I find my bank's IFSC code?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>You can find your bank's IFSC code in several places:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>On your cheque book (usually printed on the bottom of each leaf)</li>
                <li>On your bank passbook or account statement</li>
                <li>Through your bank's official website or mobile app</li>
                <li>By calling your bank's customer care</li>
                <li>Using our IFSC finder tool above</li>
              </ul>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">What happens if I use an incorrect IFSC code for a transaction?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Using an incorrect IFSC code can lead to several outcomes:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>The transaction may fail immediately and the amount will remain in your account</li>
                <li>The transaction might be processed but sent to the wrong branch, causing delays</li>
                <li>In some cases, the money might be credited to a wrong account if the account number exists at the incorrect branch</li>
              </ul>
              <p className="mt-2">If your transaction fails due to an incorrect IFSC code, the amount is typically refunded within 1-3 business days. For misdirected transfers, you'll need to contact your bank immediately to initiate the recovery process.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Is IFSC code the same for all branches of a bank?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>No, each branch of a bank has its own unique IFSC code. While the first 4 characters (representing the bank) remain the same across all branches of a particular bank, the last 6 characters (representing the branch) are unique to each branch.</p>
              <p className="mt-2">For example, all State Bank of India branches will have IFSC codes starting with "SBIN", but the remaining characters will differ for each branch.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">When do I need to use MICR code instead of IFSC?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>MICR codes are primarily used for cheque processing, while IFSC codes are used for electronic fund transfers like NEFT, RTGS, and IMPS. You'll typically need to use:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>IFSC code:</strong> For online transfers, mobile banking transfers, and when setting up direct debits or standing instructions</li>
                <li><strong>MICR code:</strong> When dealing with cheque transactions or when specifically asked by certain financial institutions for verification purposes</li>
              </ul>
              <p className="mt-2">In most modern banking scenarios, IFSC codes are more commonly used than MICR codes for day-to-day transactions.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default BankIfscFinder;