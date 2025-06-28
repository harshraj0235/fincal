
import React, { useState } from 'react';
import { Search, Filter, Download, Share2, AlertCircle, Calculator, Building2, CreditCard, Shield, Clock } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

export const BankChargesAnalyzer: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedAccountType, setSelectedAccountType] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const banks = [
    // Public Sector Banks
    'State Bank of India',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'Bank of India',
    'Central Bank of India',
    'Indian Overseas Bank',
    'UCO Bank',
    'Bank of Maharashtra',
    'Punjab & Sind Bank',
    'Indian Bank',
    
    // Private Sector Banks
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'Yes Bank',
    'IDFC First Bank',
    'Federal Bank',
    'South Indian Bank',
    'Karnataka Bank',
    'City Union Bank',
    'DCB Bank',
    'RBL Bank',
    'Tamilnad Mercantile Bank',
    'Lakshmi Vilas Bank',
    'Dhanlaxmi Bank',
    'Karur Vysya Bank',
    'Nainital Bank',
    'Catholic Syrian Bank',
    
    // Foreign Banks
    'Citibank',
    'Standard Chartered Bank',
    'HSBC Bank',
    'Deutsche Bank',
    'Barclays Bank',
    'American Express Banking Corp',
    'Bank of America',
    'Royal Bank of Scotland',
    'DBS Bank',
    'Mizuho Bank',
    'MUFG Bank',
    'Sumitomo Mitsui Banking Corporation',
    'BNP Paribas',
    'Credit Suisse',
    'JPMorgan Chase Bank',
    'Bank of Bahrain and Kuwait',
    'Emirates NBD Bank',
    'First Abu Dhabi Bank',
    'Mashreq Bank',
    'Qatar National Bank',
    'National Bank of Kuwait',
    'Abu Dhabi Commercial Bank',
    'Doha Bank',
    'Commercial Bank of Qatar',
    'Ahli United Bank',
    
    // Small Finance Banks
    'AU Small Finance Bank',
    'Equitas Small Finance Bank',
    'Ujjivan Small Finance Bank',
    'Jana Small Finance Bank',
    'Suryoday Small Finance Bank',
    'Capital Small Finance Bank',
    'Fincare Small Finance Bank',
    'ESAF Small Finance Bank',
    'North East Small Finance Bank',
    'Utkarsh Small Finance Bank',
    'Unity Small Finance Bank',
    'Shivalik Small Finance Bank',
    
    // Payment Banks
    'Paytm Payments Bank',
    'Airtel Payments Bank',
    'India Post Payments Bank',
    'Fino Payments Bank',
    'NSDL Payments Bank',
    'Aditya Birla Idea Payments Bank',
    'Jio Payments Bank',
    
    // Regional Rural Banks
    'Andhra Pradesh Grameena Vikas Bank',
    'Andhra Pragathi Grameena Bank',
    'Chaitanya Godavari Grameena Bank',
    'Saptagiri Grameena Bank',
    'Telangana Grameena Bank',
    'Assam Gramin Vikash Bank',
    'Arunachal Pradesh Rural Bank',
    'Manipur Rural Bank',
    'Meghalaya Rural Bank',
    'Mizoram Rural Bank',
    'Nagaland Rural Bank',
    'Tripura Gramin Bank',
    'Bihar Gramin Bank',
    'Uttar Bihar Gramin Bank',
    'Dakshin Bihar Gramin Bank',
    'Chhattisgarh Rajya Gramin Bank',
    'Goa State Co-operative Bank',
    'Saurashtra Gramin Bank',
    'Dena Gujarat Gramin Bank',
    'Baroda Gujarat Gramin Bank',
    'Sarva Haryana Gramin Bank',
    'Haryana Gramin Bank',
    'Himachal Pradesh Gramin Bank',
    'Jammu & Kashmir Grameen Bank',
    'Jharkhand Rajya Gramin Bank',
    'Karnataka Vikas Grameena Bank',
    'Pragathi Krishna Gramin Bank',
    'Kerala Gramin Bank',
    'Madhya Pradesh Gramin Bank',
    'Narmada Jhabua Gramin Bank',
    'Maharashtra Gramin Bank',
    'Vidharbha Konkan Gramin Bank',
    'Odisha Gramya Bank',
    'Punjab Gramin Bank',
    'Rajasthan Marudhara Gramin Bank',
    'Baroda Rajasthan Kshetriya Gramin Bank',
    'Tamil Nadu Grama Bank',
    'Pandyan Grama Bank',
    'Uttarakhand Gramin Bank',
    'Uttar Pradesh Gramin Bank',
    'Purvanchal Bank',
    'Kashi Gomti Samyut Gramin Bank',
    'Prathama UP Gramin Bank',
    'Aryavart Bank',
    'Sarva UP Gramin Bank',
    'Paschim Banga Gramin Bank',
    
    // Cooperative Banks
    'NKGSB Co-operative Bank',
    'Saraswat Cooperative Bank',
    'Shamrao Vithal Co-operative Bank',
    'Thane Janata Sahakari Bank',
    'Cosmos Co-operative Bank',
    'Bassein Catholic Co-operative Bank',
    'Mumbai District Central Co-operative Bank',
    'Pune District Central Co-operative Bank',
    'Nashik District Central Co-operative Bank',
    'Ahmednagar District Central Co-operative Bank',
    'Kolhapur District Central Co-operative Bank',
    'Sangli District Central Co-operative Bank',
    'Satara District Central Co-operative Bank',
    'Solapur District Central Co-operative Bank',
    'Aurangabad District Central Co-operative Bank',
    
    // Others
    'Bandhan Bank',
    'CSB Bank',
    'Jammu & Kashmir Bank',
    'Tamil Nadu State Apex Cooperative Bank',
    'Rajkot Nagarik Sahakari Bank',
    'Gujarat State Co-operative Bank',
    'Karnataka State Co-operative Apex Bank',
    'Kerala State Co-operative Bank',
    'Andhra Pradesh State Co-operative Bank',
    'Telangana State Co-operative Apex Bank',
    'Haryana State Co-operative Apex Bank',
    'Punjab State Co-operative Bank',
    'Uttar Pradesh Co-operative Bank',
    'Madhya Pradesh State Co-operative Bank',
    'Chhattisgarh State Co-operative Bank',
    'Odisha State Co-operative Bank',
    'West Bengal State Co-operative Bank',
    'Assam State Co-operative Apex Bank',
    'Tripura State Co-operative Bank',
    'Manipur State Co-operative Bank',
    'Nagaland State Co-operative Bank',
    'Mizoram State Co-operative Bank',
    'Arunachal Pradesh State Co-operative Apex Bank',
    'Sikkim State Co-operative Bank',
    'Himachal Pradesh State Co-operative Bank',
    'Jammu & Kashmir State Co-operative Bank',
    'Delhi State Co-operative Bank',
    'Rajasthan State Co-operative Bank',
    'Bihar State Co-operative Bank',
    'Jharkhand State Co-operative Bank'
  ];

  const accountTypes = [
    'Savings Account',
    'Current Account',
    'Salary Account',
    'Senior Citizen Account',
    'Premium Account',
    'Zero Balance Account',
    'Women Savings Account',
    'Student Savings Account',
    'NRI Account',
    'Joint Account'
  ];

  const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

  const cities = [
    // Tier 1 Cities
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune',
    
    // Tier 2 & Major Cities
    'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot',
    'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Dhanbad', 'Jodhpur', 'Amritsar', 'Raipur',
    'Allahabad', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Madurai', 'Guwahati', 'Chandigarh',
    'Hubli-Dharwad', 'Amroha', 'Moradabad', 'Gurgaon', 'Aligarh', 'Solapur', 'Ranchi', 'Jalandhar',
    'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Warangal', 'Mira-Bhayandar', 'Thiruvananthapuram',
    'Bhiwandi', 'Saharanpur', 'Guntur', 'Amravati', 'Bikaner', 'Noida', 'Jamshedpur', 'Bhilai Nagar',
    'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol',
    'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni',
    'Siliguri', 'Jhansi', 'Ulhasnagar', 'Nellore', 'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore',
    'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur',
    'Maheshtala', 'Davanagere', 'Kozhikode', 'Kurnool', 'Rajpur Sonarpur', 'Rajahmundry', 'Bokaro',
    'South Dumdum', 'Bellary', 'Patiala', 'Gopalpur', 'Agartala', 'Bhagalpur', 'Muzaffarnagar',
    'Bhatpara', 'Panihati', 'Latur', 'Dhule', 'Rohtak', 'Korba', 'Bhilwara', 'Berhampur', 'Muzaffarpur',
    'Ahmednagar', 'Mathura', 'Kollam', 'Avadi', 'Kadapa', 'Kamarhati', 'Sambalpur', 'Bilaspur',
    'Shahjahanpur', 'Satara', 'Bijapur', 'Rampur', 'Shivamogga', 'Chandrapur', 'Junagadh', 'Thrissur',
    'Alwar', 'Bardhaman', 'Kulti', 'Kakinada', 'Nizamabad', 'Parbhani', 'Tumkur', 'Khammam',
    'Ozhukarai', 'Bihar Sharif', 'Panipat', 'Darbhanga', 'Bally', 'Aizawl', 'Dewas', 'Ichalkaranji',
    'Karnal', 'Bathinda', 'Jalna', 'Eluru', 'Kirari Suleman Nagar', 'Barabanki', 'Purnia', 'Satna',
    'Mau', 'Sonipat', 'Farrukhabad', 'Sagar', 'Rourkela', 'Durg', 'Imphal', 'Ratlam', 'Hapur',
    'Arrah', 'Karimnagar', 'Anantapur', 'Etawah', 'Ambernath', 'North Dumdum', 'Bharatpur', 'Begusarai',
    'New Delhi', 'Gandhidham', 'Baranagar', 'Tiruvottiyur', 'Puducherry', 'Sikar', 'Thoothukudi',
    'Rewa', 'Mirzapur', 'Raichur', 'Pali', 'Ramagundam', 'Haridwar', 'Vijayanagaram', 'Katihar',
    'Nagarcoil', 'Sri Ganganagar', 'Karawal Nagar', 'Mango', 'Thanjavur', 'Bulandshahr', 'Uluberia',
    'Murwara', 'Sambhal', 'Singrauli', 'Nadiad', 'Secunderabad', 'Naihati', 'Yamunanagar', 'Bidhan Nagar',
    'Pallavaram', 'Bidar', 'Munger', 'Panchkula', 'Burhanpur', 'Raurkela Industrial Township', 'Kharagpur',
    'Dindigul', 'Gandhinagar', 'Hospet', 'Nangloi Jat', 'Malda', 'Ongole', 'Deoghar', 'Chapra',
    'Haldia', 'Khandwa', 'Nandyal', 'Chittoor', 'Morena', 'Amroha', 'Anand', 'Bhind', 'Bhalswa Jahangir Pur',
    'Madhyamgram', 'Bhiwani', 'Navi Mumbai', 'Baharampur', 'Ambala', 'Morbi', 'Fatehpur', 'Rae Bareli',
    'Khora, Ghaziabad', 'Bhusawal', 'Orai', 'Bahraich', 'Vellore', 'Mahesana', 'Sambalpur', 'Raiganj',
    'Sirsa', 'Danapur', 'Serampore', 'Sultan Pur Majra', 'Guna', 'Jaunpur', 'Panvel', 'Shivpuri',
    'Surendranagar Dudhrej', 'Unnao', 'Hugli and Chinsurah', 'Alappuzha', 'Kottayam', 'Machilipatnam',
    'Shimla', 'Adoni', 'Tenali', 'Proddatur', 'Saharsa', 'Hindupur', 'Sasaram', 'Hajipur', 'Bhimavaram',
    'Dehri', 'Madanapalle', 'Siwan', 'Bettiah', 'Guntakal', 'Srikakulam', 'Motihari', 'Dharmavaram',
    'Gudivada', 'Narasaraopet', 'Bagaha', 'Miryalaguda', 'Tadipatri', 'Kishanganj', 'Karaikudi',
    'Suryapet', 'Jamalpur', 'Kavali', 'Tadepalligudem', 'Amaravati', 'Buxar', 'Jehanabad', 'Aurangabad',
    'Palakkad', 'Malappuram', 'Tinsukia', 'Jorhat', 'Nalbari', 'Golaghat', 'Silchar', 'Dibrugarh',
    'North Lakhimpur', 'Nagaon', 'Mangaldoi', 'Sivasagar', 'Bongaigaon', 'Dhubri', 'Diphu', 'Goalpara',
    'Barpeta', 'Karimganj', 'Hailakandi', 'Haflong', 'Bokakhat', 'Hojai', 'Morigaon', 'Lumding',
    'Itanagar', 'Naharlagun', 'Pasighat', 'Tezu', 'Along', 'Bomdila', 'Ziro', 'Seppa', 'Khonsa',
    'Aalo', 'Yingkiong', 'Anini', 'Daporijo', 'Koloriang', 'Basar', 'Mechuka', 'Tato', 'Pangin'
  ];

  const handleAnalyze = () => {
    if (selectedBank && selectedAccountType) {
      setShowComparison(true);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Bank Charges Analyzer - Compare Hidden Fees & Penalties Across Indian Banks"
        description="Free bank charges comparison tool for India. Compare minimum balance penalties, ATM fees, locker charges, and hidden banking costs across SBI, HDFC, ICICI, Axis, Kotak and more. Get personalized analysis to avoid unnecessary fees."
        keywords="bank charges comparison india, minimum balance penalty calculator, ATM withdrawal fees, hidden bank charges, bank locker charges, cheque bounce penalty, SMS charges, digital banking fees, bank charges analyzer, banking cost comparison, avoid bank penalties, bank fee calculator india"
        url="/calculators/bank-charges-analyzer"
        tags={["bank charges", "minimum balance penalty", "ATM fees", "banking costs", "hidden charges", "bank comparison"]}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header Section */}
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Unified Multi-Bank Charges & Penalty Analyzer
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Compare hidden charges, penalties, and fees across all major Indian banks. 
                Get personalized analysis to avoid unnecessary banking costs and make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Selection Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Select Your Preferences
                </h2>

                {/* Bank Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Bank ({banks.length} Banks Available)
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a bank</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>

                {/* Account Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Account Type
                  </label>
                  <select
                    value={selectedAccountType}
                    onChange={(e) => setSelectedAccountType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose account type</option>
                    {accountTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Location Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    State ({states.length} States/UTs Available)
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    City ({cities.length} Cities Available)
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Analyze Charges
                </button>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {!showComparison ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Ready to Analyze Bank Charges?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Select your bank, account type, and location to get a comprehensive analysis of all charges and penalties.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <Building2 className="w-4 h-4 mr-2 text-gray-600" />
                        <span>{banks.length}+ Banks</span>
                      </div>
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                        <span>All Account Types</span>
                      </div>
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-4 h-4 mr-2 text-gray-600" />
                        <span>Real-time Data</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // ... keep existing code (comparison results section)
                <div className="space-y-6">
                  {/* Charges Summary */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Charges Analysis for {selectedBank}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">{selectedBank}</h3>
                          <span className="text-xs text-gray-500">2024-01-15</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Minimum Balance:</span>
                            <span className="font-medium">₹3,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Penalty Amount:</span>
                            <span className="font-medium text-red-600">₹10</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">ATM Fee:</span>
                            <span className="font-medium text-green-600">Free</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">SMS Charges:</span>
                            <span className="font-medium">₹15</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Locker Fee:</span>
                            <span className="font-medium">₹1,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comparison Table */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Side-by-Side Comparison
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Charge Type</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">SBI</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">HDFC</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">ICICI</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-4">Minimum Balance</td>
                            <td className="py-3 px-4">₹3,000</td>
                            <td className="py-3 px-4">₹10,000</td>
                            <td className="py-3 px-4">₹10,000</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-4">Penalty</td>
                            <td className="py-3 px-4 text-red-600">₹10</td>
                            <td className="py-3 px-4 text-red-600">₹300</td>
                            <td className="py-3 px-4 text-red-600">₹300</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-4">ATM Fee</td>
                            <td className="py-3 px-4 text-green-600">Free</td>
                            <td className="py-3 px-4">₹20</td>
                            <td className="py-3 px-4">₹20</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Compare Bank Charges?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hidden charges can significantly impact your banking costs. Our analyzer helps you make informed decisions and avoid unnecessary penalties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avoid Hidden Charges</h3>
                <p className="text-gray-600">
                  Discover all hidden fees and penalties that banks don't prominently display.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculate Total Costs</h3>
                <p className="text-gray-600">
                  Get a complete picture of your banking costs including all recurring charges.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Make Informed Decisions</h3>
                <p className="text-gray-600">
                  Compare multiple banks side-by-side to choose the most cost-effective option.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What are the common hidden charges in Indian banks?
                </h3>
                <p className="text-gray-600">
                  Common hidden charges include minimum balance penalties (₹100-500), ATM withdrawal fees (₹20-25), 
                  SMS charges (₹15-30), cheque bounce penalties (₹200-500), locker fees (₹1000-5000), and annual card fees (₹200-1000).
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How to avoid minimum balance penalty?
                </h3>
                <p className="text-gray-600">
                  To avoid minimum balance penalty, maintain the required average monthly balance in your account. 
                  Different banks have different requirements: SBI (₹3000), HDFC (₹10000), ICICI (₹10000), Axis (₹10000), and Kotak (₹10000).
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Which bank has the lowest charges in India?
                </h3>
                <p className="text-gray-600">
                  Public sector banks like SBI generally have lower charges compared to private banks. 
                  SBI has no ATM withdrawal fees, lower minimum balance requirements, and competitive charges for most services.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What are the charges for digital transactions?
                </h3>
                <p className="text-gray-600">
                  Digital transaction charges vary: IMPS (₹5-25), NEFT (₹2.5-25), RTGS (₹25-50), 
                  UPI (usually free), and card transactions (0.5-2% for credit cards, free for debit cards at most places).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Related Financial Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="/calculators/emi-calculator" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">EMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate loan EMIs and payment schedules</p>
              </a>
              
              <a href="/calculators/sip-calculator" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">SIP Calculator</h3>
                <p className="text-sm text-gray-600">Plan your mutual fund investments</p>
              </a>
              
              <a href="/calculators/income-tax-calculator" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Income Tax Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your tax liability</p>
              </a>
              
              <a href="/calculators/loan-comparison-calculator" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Loan Comparison</h3>
                <p className="text-sm text-gray-600">Compare different loan offers</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankChargesAnalyzer;
