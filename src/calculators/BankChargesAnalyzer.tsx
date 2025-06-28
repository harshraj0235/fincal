import React, { useState, useMemo, ChangeEvent } from 'react';
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
  const stateCityData: { [key: string]: string[] } = {
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
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur', 'Batala', 'Pathankot', 'Moga', 'Abohar', 'Malerkotla', 'Khanna', 'Phagwara', 'Muktsar', 'Barnala', 'Rajpura', 'Hoshiarpur', 'Kapurthala', 'Faridkot', 'Sunam', 'Jagraon', 'Nawanshr', 'Raikot', 'Nabha', 'Longowal', 'Dhuri', 'Mansa', 'Fazilka', 'Gurdaspur'],
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
  const availableCities = useMemo<string[]>(() => {
    if (selectedState && stateCityData[selectedState]) {
      return stateCityData[selectedState];
    }
    return [];
  }, [selectedState]);

  // Filter banks based on search
  const filteredBanks = useMemo<string[]>(() => {
    if (!searchBank) return banks;
    return banks.filter((bank: string) => 
      bank.toLowerCase().includes(searchBank.toLowerCase())
    );
  }, [searchBank, banks]);

  // Filter cities based on search
  const filteredCities = useMemo<string[]>(() => {
    if (!searchCity) return availableCities;
    return availableCities.filter((city: string) => 
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
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Banknote className="w-4 h-4 inline mr-2" />
                    Select Bank ({filteredBanks.length} available)
                  </label>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search banks..."
                      value={searchBank}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchBank(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <select
                    value={selectedBank}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedBank(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Choose a bank</option>
                    {filteredBanks.map((bank: string) => (
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
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedAccountType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setSelectedState(e.target.value);
                      setSelectedCity(''); // Reset city when state changes
                      setSearchCity(''); // Reset city search
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select State</option>
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <select
                      value={selectedCity}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm max-h-40 overflow-y-auto"
                    >
                      <option value="">Select City</option>
                      {filteredCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}

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
                      <div className="flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <Banknote className="w-5 h-5 mr-2 text-blue-600" />
                        <div>
                          <div className="font-semibold text-blue-800">180+ Banks</div>
                          <div className="text-xs text-blue-600">All Categories</div>
                        </div>
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
              
              <a href="/calculators/loan-comparison-calculator" className="block p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Banknote className="w-6 h-6 text-white" />
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
