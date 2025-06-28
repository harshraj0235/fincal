import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Share2, AlertCircle, Calculator, Banknote, CreditCard, Shield, Clock, MapPin, Building2, Smartphone, Menu, X } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

export const BankChargesAnalyzer: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedAccountType, setSelectedAccountType] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [searchBank, setSearchBank] = useState<string>('');
  const [searchCity, setSearchCity] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Full stateCityData
  const stateCityData = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kadapa', 'Anantapur', 'Vizianagaram', 'Eluru', 'Ongole', 'Machilipatnam', 'Adoni', 'Tenali', 'Chittoor', 'Hindupur', 'Bhimavaram', 'Madanapalle', 'Guntakal'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tezpur', 'Bomdila', 'Ziro', 'Along', 'Basar', 'Khonsa', 'Namsai', 'Changlang', 'Tezu', 'Roing', 'Yingkiong', 'Anini'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur', 'Nagaon', 'Tinsukia', 'Bongaigaon', 'Karimganj', 'Dhubri', 'North Lakhimpur', 'Goalpara', 'Sivasagar', 'Diphu', 'Mangaldoi', 'Haflong', 'Hailakandi', 'Morigaon', 'Hojai', 'Lanka'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Purnia', 'Saharsa', 'Sasaram', 'Hajipur', 'Dehri', 'Siwan', 'Motihari', 'Nawada', 'Bagaha', 'Buxar', 'Kishanganj', 'Sitamarhi', 'Jamalpur', 'Jehanabad'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Mahasamund', 'Dhamtari', 'Chirmiri', 'Janjgir', 'Sakti', 'Tilda', 'Mungeli', 'Naila Janjgir', 'Champa', 'Akaltara', 'Dongargaon'],
    'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Quepem', 'Sanguem', 'Pernem', 'Cortalim', 'Aldona', 'Arambol'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari', 'Bharuch', 'Mehsana', 'Morbi', 'Surendranagar', 'Nadiad', 'Porbandar', 'Ankleshwar', 'Vapi', 'Veraval', 'Godhra', 'Patan', 'Kalol', 'Dahod', 'Botad', 'Amreli'],
    'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula', 'Bhiwani', 'Sirsa', 'Bahadurgarh', 'Jind', 'Thanesar', 'Kaithal', 'Rewari', 'Narnaul', 'Pundri', 'Kosli', 'Palwal', 'Hansi', 'Fatehabad', 'Gohana', 'Tohana'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Palampur', 'Baddi', 'Nahan', 'Paonta Sahib', 'Sundernagar', 'Chamba', 'Una', 'Kullu', 'Hamirpur', 'Bilaspur', 'Kangra', 'Manali', 'Dalhousie', 'Keylong', 'Reckong Peo', 'Kasauli'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar', 'Chirkunda', 'Pakaur', 'Chaibasa', 'Jhumri Telaiya', 'Sahibganj', 'Lohardaga', 'Godda', 'Dumka', 'Garhwa', 'Koderma', 'Mihijam', 'Patratu', 'Barhi', 'Chas', 'Baghmara'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Davanagere', 'Ballari', 'Vijayapura', 'Shivamogga', 'Tumakuru', 'Raichur', 'Bidar', 'Hosapete', 'Gadag', 'Udupi', 'Robertson Pet', 'Bhadravati', 'Chitradurga', 'Hassan', 'Mandya', 'Chikkamagaluru', 'Bagalkot', 'Ramanagara', 'Gokak', 'Yadgir', 'Rabkavi Banhatti', 'Shahabad', 'Siruguppa', 'Mudhol', 'Sidlaghatta'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Kollam', 'Thrissur', 'Alappuzha', 'Palakkad', 'Kannur', 'Payyanur', 'Kanhangad', 'Malappuram', 'Vatakara', 'Koyilandy', 'Neyyattinkara', 'Kayamkulam', 'Nedumangad', 'Kannur', 'Taliparamba', 'Kottayam', 'Changanassery', 'Pala', 'Cherthala', 'Kodungallur', 'Chittur-Thathamangalam', 'Muvattupuzha', 'Adoor', 'Mavelikkara', 'Mavoor', 'Perinthalmanna', 'Ottappalam'],
    'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Murwara', 'Singrauli', 'Burhanpur', 'Khandwa', 'Morena', 'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Chhatarpur', 'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur', 'Narmadapuram', 'Itarsi', 'Sehore', 'Betul'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli', 'Malegaon', 'Akola', 'Latur', 'Dhule', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Jalgaon', 'Bhiwandi', 'Nanded', 'Warangal', 'Ulhasnagar', 'Belgaum', 'Mira-Bhayandar', 'Vasai-Virar', 'Kalyan-Dombivli', 'Navi Mumbai', 'Raigad', 'Panvel', 'Badlapur', 'Ambarnath', 'Virar', 'Naigaon', 'Nalasopara', 'Bhayander', 'Kulgaon', 'Badlapur', 'Khopoli', 'Pen', 'Alibag', 'Murud', 'Shrivardhan'],
    'Manipur': ['Imphal', 'Thoubal', 'Lilong', 'Mayang Imphal', 'Kakching', 'Bishnupur', 'Churachandpur', 'Senapati', 'Ukhrul', 'Chandel', 'Tamenglong', 'Jiribam', 'Kangpokpi', 'Tengnoupal', 'Kamjong', 'Noney', 'Pherzawl'],
    'Meghalaya': ['Shillong', 'Tura', 'Cherrapunji', 'Jowai', 'Baghmara', 'Nongpoh', 'Mawkyrwat', 'Resubelpara', 'Ampati', 'Mairang', 'Nongstoin'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Serchhip', 'Mamit', 'Lawngtlai'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Kiphire', 'Longleng', 'Peren', 'Mon'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda', 'Jeypore', 'Barbil', 'Khordha', 'Balangir', 'Rayagada', 'Bhawanipatna', 'Dhenkanal', 'Kendrapara', 'Sunabeda', 'Rajgangpur', 'Paradip', 'Talcher', 'Kendujhar', 'Manabazar', 'Koraput'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur', 'Batala', 'Pathankot', 'Moga', 'Abohar', 'Malerkotla', 'Khanna', 'Phagwara', 'Muktsar', 'Barnala', 'Rajpura', 'Hoshiarpur', 'Kapurthala', 'Faridkot', 'Sunam', 'Jagraon', 'Nawanshahr', 'Raikot', 'Nabha', 'Longowal', 'Dhuri', 'Mansa', 'Fazilka', 'Gurdaspur'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar', 'Pali', 'Sri Ganganagar', 'Kishangarh', 'Baran', 'Dhaulpur', 'Tonk', 'Beawar', 'Hanumangarh', 'Gangapur City', 'Banswara', 'Makrana', 'Sujangarh', 'Sardarshahar', 'Ladnu', 'Ratangarh', 'Nokha', 'Nimbahera', 'Suratgarh', 'Rajsamand', 'Lachhmangarh', 'Rajgarh', 'Nasirabad', 'Nohar', 'Phalodi', 'Nathdwara', 'Pilani', 'Merta City', 'Sojat', 'Neem-Ka-Thana'],
    'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Jorethang', 'Nayabazar', 'Singtam', 'Rangpo'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Ranipet', 'Nagercoil', 'Thanjavur', 'Vellore', 'Kancheepuram', 'Erode', 'Tiruvannamalai', 'Pollachi', 'Rajapalayam', 'Sivakasi', 'Pudukkottai', 'Neyveli', 'Nagapattinam', 'Viluppuram', 'Tiruchengode', 'Vaniyambadi', 'Theni', 'Arakkonam', 'Kumarapalayam', 'Virudhunagar', 'Arni', 'Karaikudi', 'Kumbakonam', 'Dindigul', 'Oddanchatram', 'Palladam', 'Dindukkal', 'Tirupattur', 'Vaniyambadi', 'Gobichettipalayam', 'Bhavani', 'Hosur'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda', 'Jagtial', 'Mancherial', 'Nirmal', 'Kamareddy', 'Kothagudem', 'Bodhan', 'Sangareddy', 'Metpally', 'Zahirabad', 'MedChal', 'Jangaon', 'Mandamarri', 'Medak', 'Vikarabad'],
    'Tripura': ['Agartala', 'Dharmanagar', 'Udaipur', 'Kailasahar', 'Bishalgarh', 'Teliamura', 'Khowai', 'Belonia', 'Melaghar', 'Mohanpur', 'Ambassa', 'Ranirbazar', 'Santirbazar', 'Kumarghat', 'Sonamura', 'Panisagar', 'Amarpur', 'Jirania', 'Kamalpur', 'Sabroom'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Noida', 'Firozabad', 'Loni', 'Jhansi', 'Muzaffarnagar', 'Mathura', 'Budaun', 'Rampur', 'Shahjahanpur', 'Farrukhabad', 'Mau', 'Hapur', 'Etawah', 'Mirzapur', 'Bulandshahr', 'Sambhal', 'Amroha', 'Hardoi', 'Fatehpur', 'Raebareli', 'Orai', 'Sitapur', 'Bahraich', 'Modinagar', 'Unnao', 'Jaunpur', 'Lakhimpur', 'Hathras', 'Banda', 'Pilibhit', 'Barabanki', 'Khurja', 'Gonda', 'Mainpuri', 'Lalitpur', 'Etah', 'Deoria', 'Ujhani', 'Ghazipur', 'Sultanpur', 'Azamgarh', 'Bijnor', 'Sahaswan', 'Basti', 'Chandausi', 'Akbarpur', 'Ballia', 'Tanda', 'Greater Noida', 'Shikohabad', 'Shamli', 'Awagarh', 'Kasganj'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani-cum-Kathgodam', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Ramnagar', 'Pithoragarh', 'Jaspur', 'Kichha', 'Sitarganj', 'Bageshwar', 'Haldwani', 'Nainital', 'Almora', 'Baraut', 'Laksar', 'Landhaura', 'Mussoorie', 'Pauri', 'Tehri', 'Chamoli', 'Rudraprayag', 'Champawat', 'Bageshwar', 'Uttarkashi'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Baharampur', 'Habra', 'Kharagpur', 'Shantipur', 'Dankuni', 'Dhulian', 'Ranaghat', 'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip', 'Medinipur', 'Jalpaiguri', 'Balurghat', 'Basirhat', 'Bankura', 'Chakdaha', 'Darjeeling', 'Alipurduar', 'Purulia', 'Jangipur', 'Bolpur', 'Bangaon', 'Cooch Behar', 'Tamluk', 'Midnapore', 'Raghunathpur', 'Bidhannagar', 'Contai', 'Egra', 'Jhargram', 'Kalimpong', 'Mayurbhanj', 'Rampurhat', 'Suri', 'Tufanganj', 'Mainaguri'],
    'Andaman and Nicobar Islands': ['Port Blair', 'Bamboo Flat', 'Garacharma', 'Diglipur', 'Mayabunder', 'Rangat', 'Campbell Bay', 'Car Nicobar', 'Hut Bay'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
    'Delhi': ['New Delhi', 'Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'North East Delhi', 'North West Delhi', 'South East Delhi', 'South West Delhi', 'Shahdara', 'Najafgarh'],
    'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Baramulla', 'Anantnag', 'Sopore', 'KathuaUdhampur', 'Punch', 'Rajauri'],
    'Ladakh': ['Leh', 'Kargil', 'Nubra', 'Changthang', 'Zanskar'],
    'Lakshadweep': ['Kavaratti', 'Agatti', 'Minicoy', 'Amini', 'Andrott', 'Kalpeni', 'Kadmat', 'Kiltan', 'Chetlat', 'Bitra'],
    'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe']
  };

  // Full banks list (180+)
  const banks = [
    // Major Public Sector Banks
    'State Bank of India', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India',
    'Bank of India', 'Central Bank of India', 'Indian Overseas Bank', 'UCO Bank', 'Bank of Maharashtra',
    'Punjab & Sind Bank', 'Indian Bank',
    // Major Private Sector Banks
    'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Yes Bank', 'IndusInd Bank',
    'IDFC First Bank', 'Federal Bank', 'South Indian Bank', 'Karur Vysya Bank', 'Tamilnad Mercantile Bank',
    'City Union Bank', 'Dhanlaxmi Bank', 'Karnataka Bank', 'Lakshmi Vilas Bank', 'Nainital Bank',
    'RBL Bank', 'Jammu & Kashmir Bank', 'DCB Bank', 'Bandhan Bank',
    // Foreign Banks
    'Citibank', 'HSBC', 'Standard Chartered Bank', 'Deutsche Bank', 'Barclays Bank', 'Royal Bank of Scotland',
    'Bank of America', 'JPMorgan Chase Bank', 'Mizuho Bank', 'Sumitomo Mitsui Banking Corporation',
    'MUFG Bank', 'DBS Bank', 'Shinhan Bank', 'Woori Bank', 'BNP Paribas', 'Credit Suisse',
    'UBS AG', 'Societe Generale', 'Credit Agricole Corporate and Investment Bank',
    // Small Finance Banks
    'AU Small Finance Bank', 'Equitas Small Finance Bank', 'Ujjivan Small Finance Bank', 'Jana Small Finance Bank',
    'Suryoday Small Finance Bank', 'Capital Small Finance Bank', 'ESAF Small Finance Bank', 'North East Small Finance Bank',
    'Utkarsh Small Finance Bank', 'Fincare Small Finance Bank', 'Unity Small Finance Bank',
    // Payment Banks
    'Paytm Payments Bank', 'Airtel Payments Bank', 'India Post Payments Bank', 'Fino Payments Bank',
    'NSDL Payments Bank', 'Jio Payments Bank', 'Aditya Birla Idea Payments Bank',
    // Regional Rural Banks (Sample)
    'Andhra Pradesh Grameena Vikas Bank', 'Andhra Pragathi Grameena Bank', 'Telangana Grameena Bank',
    'Karnataka Vikas Grameena Bank', 'Pragathi Krishna Grameena Bank', 'Kerala Grameena Bank',
    'Puduvai Bharathiar Grama Bank', 'Tamil Nadu Grama Bank', 'Pandian Grama Bank', 'Pallavan Grama Bank',
    'Sarva Haryana Gramin Bank', 'Himachal Pradesh Gramin Bank', 'J&K Grameen Bank', 'Punjab Gramin Bank',
    'Rajasthan Marudhara Gramin Bank', 'Baroda Gujarat Gramin Bank', 'Saurashtra Gramin Bank',
    'Maharashtra Gramin Bank', 'Vidharbha Konkan Gramin Bank', 'Deccan Grameena Bank',
    'Chaitanya Godavari Grameena Bank', 'Saptagiri Grameena Bank', 'Tripura Gramin Bank',
    'Assam Gramin Vikash Bank', 'Arunachal Pradesh Rural Bank', 'Manipur Rural Bank', 'Meghalaya Rural Bank',
    'Mizoram Rural Bank', 'Nagaland Rural Bank', 'Sikkim State Cooperative Bank', 'Uttar Bihar Gramin Bank',
    'Bihar Gramin Bank', 'Jharkhand Rajya Gramin Bank', 'Uttarakhand Gramin Bank', 'Uttar Pradesh Gramin Bank',
    'Madhya Pradesh Gramin Bank', 'Chhattisgarh Rajya Gramin Bank', 'Odisha Gramya Bank', 'West Bengal Gramin Bank',
    // Cooperative Banks (Sample)
    'Saraswat Cooperative Bank', 'Cosmos Cooperative Bank', 'Abhyudaya Cooperative Bank', 'Mumbai District Central Cooperative Bank',
    'Thane Janata Sahakari Bank', 'NKGSB Cooperative Bank', 'Bassein Catholic Cooperative Bank', 'Jankalyan Sahakari Bank',
    'Mehsana Urban Cooperative Bank', 'Rajkot Nagarik Sahakari Bank', 'Surat District Cooperative Bank',
    'Delhi State Cooperative Bank', 'Punjab State Cooperative Bank', 'Haryana State Cooperative Bank',
    'Uttar Pradesh Cooperative Bank', 'Maharashtra State Cooperative Bank', 'Karnataka State Cooperative Bank',
    'Andhra Pradesh State Cooperative Bank', 'Tamil Nadu State Cooperative Bank', 'Kerala State Cooperative Bank',
    'West Bengal State Cooperative Bank', 'Odisha State Cooperative Bank', 'Assam State Cooperative Bank',
    'Bihar State Cooperative Bank', 'Madhya Pradesh State Cooperative Bank', 'Rajasthan State Cooperative Bank',
    'Gujarat State Cooperative Bank', 'Himachal Pradesh State Cooperative Bank', 'Jammu & Kashmir State Cooperative Bank',
    // Development Financial Institutions
    'Export-Import Bank of India', 'National Bank for Agriculture and Rural Development', 'Small Industries Development Bank of India',
    'National Housing Bank', 'Power Finance Corporation', 'Rural Electrification Corporation',
    'Indian Railway Finance Corporation', 'Tourism Finance Corporation of India', 'Technology Development Board'
  ];

  const accountTypes = [
    'Savings Account',
    'Current Account',
    'Salary Account',
    'Senior Citizen Account',
    'Premium Account',
    'Zero Balance Account',
    'Joint Account',
    'Minor Account',
    'NRI Account',
    'Student Account'
  ];

  const states = Object.keys(stateCityData);

  // Filter cities based on selected state
  const availableCities = useMemo(() => {
    if (selectedState && stateCityData[selectedState]) {
      return stateCityData[selectedState];
    }
    return [];
  }, [selectedState]);

  // Filter banks based on search
  const filteredBanks = useMemo(() => {
    if (!searchBank) return banks;
    return banks.filter(bank => 
      bank.toLowerCase().includes(searchBank.toLowerCase())
    );
  }, [searchBank, banks]);

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!searchCity) return availableCities;
    return availableCities.filter(city => 
      city.toLowerCase().includes(searchCity.toLowerCase())
    );
  }, [searchCity, availableCities]);

  const handleAnalyze = () => {
    if (selectedBank && selectedAccountType) {
      setShowComparison(true);
      setIsMobileMenuOpen(false);
    }
  };

  const resetForm = () => {
    setSelectedBank('');
    setSelectedAccountType('');
    setSelectedCity('');
    setSelectedState('');
    setSearchBank('');
    setSearchCity('');
    setShowComparison(false);
    setIsMobileMenuOpen(false);
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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Enhanced Header Section */}
        <div className="bg-white shadow-xl border-b-4 border-gradient-to-r from-blue-500 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mr-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Bank Charges Analyzer
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Compare hidden charges, penalties, and fees across <span className="font-semibold text-blue-600">180+ Indian banks</span>. 
                Get personalized analysis covering <span className="font-semibold text-purple-600">600+ cities</span> to avoid unnecessary banking costs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center bg-blue-100 px-4 py-2 rounded-full">
                  <Bank className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">180+ Banks</span>
                </div>
                <div className="flex items-center bg-purple-100 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">600+ Cities</span>
                </div>
                <div className="flex items-center bg-green-100 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Free Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
            >
              {isMobileMenuOpen ? (
                <>
                  <X className="w-5 h-5 mr-2" />
                  Close Filters
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 mr-2" />
                  Open Bank & Location Filters
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Enhanced Selection Panel */}
            <div className={`lg:col-span-1 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-blue-600" />
                    Selection Panel
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                {/* Bank Selection with Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Bank className="w-4 h-4 inline mr-2" />
                    Select Bank ({filteredBanks.length} available)
                  </label>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search banks..."
                      value={searchBank}
                      onChange={(e) => setSearchBank(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Choose a bank</option>
                    {filteredBanks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>

                {/* Account Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Account Type
                  </label>
                  <select
                    value={selectedAccountType}
                    onChange={(e) => setSelectedAccountType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Choose account type</option>
                    {accountTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* State Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    State/UT ({states.length} available)
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity(''); // Reset city when state changes
                      setSearchCity(''); // Reset city search
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select State/UT</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* City Selection with Search */}
                {selectedState && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      City ({availableCities.length} in {selectedState})
                    </label>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search cities..."
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm max-h-40 overflow-y-auto"
                    >
                      <option value="">Select City</option>
                      {filteredCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Enhanced Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedBank || !selectedAccountType}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {selectedBank && selectedAccountType ? 'Analyze Charges' : 'Select Bank & Account Type'}
                </button>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{banks.length}+</div>
                    <div className="text-xs text-blue-800">Banks Covered</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Object.values(stateCityData).flat().length}+
                    </div>
                    <div className="text-xs text-purple-800">Cities Covered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Results Panel */}
            <div className="lg:col-span-2">
              {!showComparison ? (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Analyze Bank Charges?
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Select your bank, account type, and location to get a comprehensive analysis of all charges and penalties across India's banking landscape.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <Bank className="w-5 h-5 mr-2 text-blue-600" />
                        <div>
                          <div className="font-semibold text-blue-800">180+ Banks</div>
                          <div className="text-xs text-blue-600">All Categories</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                        <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                        <div>
                          <div className="font-semibold text-purple-800">600+ Cities</div>
                          <div className="text-xs text-purple-600">Pan India</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <Clock className="w-5 h-5 mr-2 text-green-600" />
                        <div>
                          <div className="font-semibold text-green-800">Real-time</div>
                          <div className="text-xs text-green-600">Updated Data</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // ... keep existing code (charges analysis and comparison sections)
                <div className="space-y-6">
                  {/* Charges Summary */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Building2 className="w-6 h-6 mr-2 text-blue-600" />
                        Analysis for {selectedBank}
                      </h2>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {selectedCity && selectedState && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Analysis for <span className="font-semibold">{selectedCity}, {selectedState}</span>
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-gray-900">{selectedBank}</h3>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Updated</span>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Minimum Balance:</span>
                            <span className="font-semibold text-lg">₹3,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Penalty Amount:</span>
                            <span className="font-semibold text-lg text-red-600">₹10/month</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">ATM Fee (5th onward):</span>
                            <span className="font-semibold text-lg text-green-600">₹21</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">SMS Charges:</span>
                            <span className="font-semibold text-lg">₹15/month</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Cheque Book:</span>
                            <span className="font-semibold text-lg">₹40</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Locker Fee (Annual):</span>
                            <span className="font-semibold text-lg">₹1,500</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Comparison Alert */}
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">Cost-Saving Tip</h4>
                          <p className="text-sm text-yellow-700">
                            Based on your selection, you could save up to ₹2,400/year by switching to a zero-balance account or maintaining the minimum balance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Comparison Table */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Calculator className="w-5 h-5 mr-2 text-purple-600" />
                      Quick Comparison with Top Banks
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-4 px-4 font-bold text-gray-900">Charge Type</th>
                            <th className="text-left py-4 px-4 font-bold text-blue-600">SBI</th>
                            <th className="text-left py-4 px-4 font-bold text-orange-600">HDFC</th>
                            <th className="text-left py-4 px-4 font-bold text-red-600">ICICI</th>
                            <th className="text-left py-4 px-4 font-bold text-purple-600">Axis</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium">Minimum Balance</td>
                            <td className="py-4 px-4 text-green-600 font-semibold">₹3,000</td>
                            <td className="py-4 px-4">₹10,000</td>
                            <td className="py-4 px-4">₹10,000</td>
                            <td className="py-4 px-4">₹10,000</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium">Monthly Penalty</td>
                            <td className="py-4 px-4 text-green-600 font-semibold">₹10</td>
                            <td className="py-4 px-4 text-red-600">₹300</td>
                            <td className="py-4 px-4 text-red-600">₹300</td>
                            <td className="py-4 px-4 text-red-600">₹300</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium">ATM Fee (5th onwards)</td>
                            <td className="py-4 px-4 text-green-600 font-semibold">₹21</td>
                            <td className="py-4 px-4">₹21</td>
                            <td className="py-4 px-4">₹21</td>
                            <td className="py-4 px-4">₹21</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium">SMS Charges</td>
                            <td className="py-4 px-4 text-green-600 font-semibold">₹15</td>
                            <td className="py-4 px-4">₹30</td>
                            <td className="py-4 px-4">₹30</td>
                            <td className="py-4 px-4">₹30</td>
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

        {/* Enhanced Information Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Compare Bank Charges Across India?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Hidden charges can significantly impact your banking costs. Our comprehensive analyzer covers every major bank and city in India to help you make informed decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Avoid Hidden Charges</h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover all hidden fees and penalties that banks don't prominently display across 180+ banks in India.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Calculate Total Costs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get a complete picture of your banking costs including all recurring charges across all major Indian cities.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Make Informed Decisions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Compare multiple banks side-by-side with location-specific data to choose the most cost-effective option.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What are the common hidden charges in Indian banks?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Common hidden charges include minimum balance penalties (₹10-₹500/month), ATM withdrawal fees (₹21 after 5 free transactions), 
                  SMS charges (₹15-₹30/month), cheque bounce penalties (₹300-₹750), locker fees (₹1,000-₹15,000/year), and annual debit card fees (₹150-₹500).
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How to avoid minimum balance penalty across different cities?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Minimum balance requirements vary by location: Metro cities (₹3,000-₹10,000), Urban areas (₹2,000-₹5,000), 
                  Semi-urban (₹1,000-₹2,000), and Rural areas (₹500-₹1,000). Maintain quarterly average balance to avoid penalties.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Which type of banks have the lowest charges in India?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Public sector banks (SBI, PNB, BOI) generally have lower charges compared to private banks. 
                  Small finance banks and payment banks often offer zero-balance accounts with minimal charges.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How do banking charges vary across Indian cities?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Banking charges vary significantly: Metro cities have higher minimum balance requirements and service charges, 
                  while rural and semi-urban areas enjoy lower thresholds and better concessions under financial inclusion schemes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Related Tools Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Related Financial Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="/calculators/emi-calculator" className="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">EMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate loan EMIs and payment schedules</p>
              </a>
              
              <a href="/calculators/sip-calculator" className="block p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">SIP Calculator</h3>
                <p className="text-sm text-gray-600">Plan your mutual fund investments</p>
              </a>
              
              <a href="/calculators/income-tax-calculator" className="block p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Income Tax Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your tax liability</p>
              </a>
              
              <a href="/calculators/loan-comparison-calculator" className="block p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Bank className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Loan Comparison</h3>
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
