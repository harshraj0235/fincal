/**
 * Comprehensive Indian States, Union Territories & Cities Database
 * Auto-generated: 2025-10-25
 * Total: 28 States + 8 UTs + 600+ Cities
 * Future-proof: Add new cities anytime without breaking existing code
 */

export interface City {
  name: string;
  state: string;
  population?: number;
  latitude?: number;
  longitude?: number;
}

export interface StateData {
  name: string;
  capital: string;
  type: 'state' | 'ut';
  code: string;
  cities: string[];
  majorFestivals?: string[];
  stateFormationDay?: string;
}

// All 28 States + 8 Union Territories
export const ALL_STATES_UTS: StateData[] = [
  // STATES (28)
  {
    name: 'Andhra Pradesh',
    capital: 'Amaravati',
    type: 'state',
    code: 'AP',
    cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kakinada', 'Rajahmundry', 'Kadapa', 'Tirupati', 'Anantapur', 'Vizianagaram', 'Eluru', 'Ongole', 'Nandyal', 'Machilipatnam', 'Adoni', 'Tenali', 'Proddatur', 'Chittoor', 'Hindupur'],
    majorFestivals: ['Ugadi', 'Sankranti', 'Vinayaka Chavithi'],
    stateFormationDay: '1956-11-01'
  },
  {
    name: 'Arunachal Pradesh',
    capital: 'Itanagar',
    type: 'state',
    code: 'AR',
    cities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila', 'Tezu', 'Seppa', 'Changlang', 'Khonsa'],
    majorFestivals: ['Losar', 'Solung', 'Mopin'],
    stateFormationDay: '1987-02-20'
  },
  {
    name: 'Assam',
    capital: 'Dispur',
    type: 'state',
    code: 'AS',
    cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Karimganj', 'Goalpara', 'Sivasagar', 'Dhubri', 'North Lakhimpur', 'Diphu', 'Haflong', 'Barpeta', 'Golaghat', 'Hailakandi', 'Mangaldoi', 'Nalbari'],
    majorFestivals: ['Bihu', 'Durga Puja', 'Eid'],
    stateFormationDay: '1950-01-26'
  },
  {
    name: 'Bihar',
    capital: 'Patna',
    type: 'state',
    code: 'BR',
    cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Danapur', 'Saharsa', 'Hajipur', 'Sasaram', 'Dehri', 'Siwan', 'Motihari', 'Nawada', 'Bagaha', 'Buxar', 'Kishanganj', 'Sitamarhi', 'Jamalpur'],
    majorFestivals: ['Chhath Puja', 'Holi', 'Dussehra'],
    stateFormationDay: '1950-01-26'
  },
  {
    name: 'Chhattisgarh',
    capital: 'Raipur',
    type: 'state',
    code: 'CG',
    cities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Raigarh', 'Jagdalpur', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Chirmiri', 'Bhatapara', 'Dalli-Rajhara', 'Tilda Newra', 'Mungeli', 'Manendragarh', 'Sakti'],
    majorFestivals: ['Bastar Dussehra', 'Hareli', 'Pola'],
    stateFormationDay: '2000-11-01'
  },
  {
    name: 'Goa',
    capital: 'Panaji',
    type: 'state',
    code: 'GA',
    cities: ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Quepem', 'Canacona', 'Pernem'],
    majorFestivals: ['Carnival', 'Shigmo', 'Christmas'],
    stateFormationDay: '1987-05-30'
  },
  {
    name: 'Gujarat',
    capital: 'Gandhinagar',
    type: 'state',
    code: 'GJ',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Anand', 'Nadiad', 'Bharuch', 'Morbi', 'Mehsana', 'Surendranagar', 'Gandhidham', 'Navsari', 'Veraval', 'Porbandar', 'Godhra', 'Bhuj', 'Patan', 'Vapi', 'Palanpur', 'Valsad', 'Dahod', 'Botad'],
    majorFestivals: ['Navratri', 'Uttarayan', 'Diwali'],
    stateFormationDay: '1960-05-01'
  },
  {
    name: 'Haryana',
    capital: 'Chandigarh',
    type: 'state',
    code: 'HR',
    cities: ['Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat', 'Karnal', 'Sonipat', 'Yamunanagar', 'Panchkula', 'Bhiwani', 'Ambala', 'Sirsa', 'Bahadurgarh', 'Jind', 'Thanesar', 'Kaithal', 'Rewari', 'Palwal', 'Hansi', 'Narnaul'],
    majorFestivals: ['Holi', 'Teej', 'Lohri'],
    stateFormationDay: '1966-11-01'
  },
  {
    name: 'Himachal Pradesh',
    capital: 'Shimla',
    type: 'state',
    code: 'HP',
    cities: ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Palampur', 'Baddi', 'Nahan', 'Una', 'Kullu', 'Hamirpur', 'Bilaspur', 'Chamba', 'Nalagarh', 'Sundernagar', 'Dalhousie', 'Manali', 'Kasauli', 'Kangra'],
    majorFestivals: ['Kullu Dussehra', 'Lohri', 'Baisakhi'],
    stateFormationDay: '1971-01-25'
  },
  {
    name: 'Jharkhand',
    capital: 'Ranchi',
    type: 'state',
    code: 'JH',
    cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar', 'Chirkunda', 'Sahibganj', 'Jhumri Telaiya', 'Chaibasa', 'Dumka', 'Garhwa', 'Madhupur'],
    majorFestivals: ['Sarhul', 'Karma', 'Tusu Parab'],
    stateFormationDay: '2000-11-15'
  },
  {
    name: 'Karnataka',
    capital: 'Bangalore',
    type: 'state',
    code: 'KA',
    cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davangere', 'Bellary', 'Bijapur', 'Shimoga', 'Tumkur', 'Raichur', 'Bidar', 'Hospet', 'Gadag-Betageri', 'Hassan', 'Udupi', 'Chitradurga', 'Kolar', 'Mandya', 'Chikmagalur', 'Robertsonpet', 'Bhadravati', 'Bagalkot'],
    majorFestivals: ['Dasara', 'Ugadi', 'Karaga'],
    stateFormationDay: '1956-11-01'
  },
  {
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    type: 'state',
    code: 'KL',
    cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Palakkad', 'Kottayam', 'Malappuram', 'Manjeri', 'Thalassery', 'Ponnani', 'Vatakara', 'Kanhangad', 'Payyanur', 'Kasaragod', 'Kunnamkulam', 'Ottappalam', 'Tirur', 'Cherthala', 'Perinthalmanna', 'Chalakudy', 'Payyoli'],
    majorFestivals: ['Onam', 'Vishu', 'Thrissur Pooram'],
    stateFormationDay: '1956-11-01'
  },
  {
    name: 'Madhya Pradesh',
    capital: 'Bhopal',
    type: 'state',
    code: 'MP',
    cities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Katni', 'Singrauli', 'Burhanpur', 'Khandwa', 'Morena', 'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur'],
    majorFestivals: ['Navratri', 'Dussehra', 'Diwali'],
    stateFormationDay: '1956-11-01'
  },
  {
    name: 'Maharashtra',
    capital: 'Mumbai',
    type: 'state',
    code: 'MH',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Thane', 'Navi Mumbai', 'Kalyan-Dombivli', 'Vasai-Virar', 'Sangli', 'Malegaon', 'Akola', 'Latur', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Ichalkaranji', 'Jalgaon', 'Amravati', 'Nanded', 'Bhiwandi', 'Jalna', 'Satara', 'Panvel', 'Ulhasnagar', 'Mira-Bhayandar', 'Dhule', 'Ambarnath'],
    majorFestivals: ['Ganesh Chaturthi', 'Gudi Padwa', 'Diwali'],
    stateFormationDay: '1960-05-01'
  },
  {
    name: 'Manipur',
    capital: 'Imphal',
    type: 'state',
    code: 'MN',
    cities: ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching', 'Ukhrul', 'Senapati', 'Tamenglong', 'Jiribam', 'Moreh'],
    majorFestivals: ['Yaoshang', 'Lai Haraoba', 'Ningol Chakouba'],
    stateFormationDay: '1972-01-21'
  },
  {
    name: 'Meghalaya',
    capital: 'Shillong',
    type: 'state',
    code: 'ML',
    cities: ['Shillong', 'Tura', 'Nongstoin', 'Jowai', 'Baghmara', 'Williamnagar', 'Resubelpara', 'Nongpoh', 'Mairang', 'Mawkyrwat'],
    majorFestivals: ['Wangala', 'Nongkrem', 'Shad Suk Mynsiem'],
    stateFormationDay: '1972-01-21'
  },
  {
    name: 'Mizoram',
    capital: 'Aizawl',
    type: 'state',
    code: 'MZ',
    cities: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Lawngtlai', 'Saiha', 'Mamit'],
    majorFestivals: ['Chapchar Kut', 'Mim Kut', 'Pawl Kut'],
    stateFormationDay: '1987-02-20'
  },
  {
    name: 'Nagaland',
    capital: 'Kohima',
    type: 'state',
    code: 'NL',
    cities: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Mon', 'Longleng', 'Kiphire', 'Peren'],
    majorFestivals: ['Hornbill Festival', 'Sekrenyi', 'Moatsu'],
    stateFormationDay: '1963-12-01'
  },
  {
    name: 'Odisha',
    capital: 'Bhubaneswar',
    type: 'state',
    code: 'OR',
    cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda', 'Jeypore', 'Bargarh', 'Balangir', 'Rayagada', 'Bhawanipatna', 'Dhenkanal', 'Barbil', 'Kendrapara', 'Sunabeda', 'Jatani'],
    majorFestivals: ['Rath Yatra', 'Durga Puja', 'Raja Parba'],
    stateFormationDay: '1936-04-01'
  },
  {
    name: 'Punjab',
    capital: 'Chandigarh',
    type: 'state',
    code: 'PB',
    cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot', 'Hoshiarpur', 'Moga', 'Sangrur', 'Firozpur', 'Batala', 'Kapurthala', 'Abohar', 'Malerkotla', 'Khanna', 'Phagwara', 'Muktsar', 'Barnala', 'Rajpura', 'Nabha', 'Gurdaspur', 'Fazilka', 'Mansa', 'Fatehgarh Sahib'],
    majorFestivals: ['Baisakhi', 'Lohri', 'Guru Nanak Jayanti'],
    stateFormationDay: '1966-11-01'
  },
  {
    name: 'Rajasthan',
    capital: 'Jaipur',
    type: 'state',
    code: 'RJ',
    cities: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer', 'Alwar', 'Bharatpur', 'Bhilwara', 'Sri Ganganagar', 'Pali', 'Sikar', 'Tonk', 'Beawar', 'Hanumangarh', 'Kishangarh', 'Baran', 'Churu', 'Dhaulpur', 'Chittorgarh', 'Jhunjhunu', 'Sawai Madhopur', 'Dungarpur', 'Jaisalmer', 'Mount Abu'],
    majorFestivals: ['Teej', 'Gangaur', 'Pushkar Mela'],
    stateFormationDay: '1956-11-01'
  },
  {
    name: 'Sikkim',
    capital: 'Gangtok',
    type: 'state',
    code: 'SK',
    cities: ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo', 'Jorethang', 'Naya Bazar', 'Singtam'],
    majorFestivals: ['Losar', 'Saga Dawa', 'Phang Lhabsol'],
    stateFormationDay: '1975-05-16'
  },
  {
    name: 'Tamil Nadu',
    capital: 'Chennai',
    type: 'state',
    code: 'TN',
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi', 'Thanjavur', 'Dindigul', 'Ranipet', 'Sivakasi', 'Karur', 'Udhagamandalam', 'Hosur', 'Nagercoil', 'Kanchipuram', 'Kumbakonam', 'Karaikkudi', 'Neyveli', 'Cuddalore', 'Palani', 'Rajapalayam', 'Pollachi', 'Pudukkottai', 'Vaniyambadi', 'Ambur'],
    majorFestivals: ['Pongal', 'Deepavali', 'Navaratri'],
    stateFormationDay: '1956-11-01'
  },
  {
    name: 'Telangana',
    capital: 'Hyderabad',
    type: 'state',
    code: 'TS',
    cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda', 'Jagtial', 'Mancherial', 'Siddipet', 'Secunderabad', 'Bodhan', 'Kothagudem', 'Palwancha', 'Bhongir', 'Gadwal'],
    majorFestivals: ['Bathukamma', 'Bonalu', 'Ugadi'],
    stateFormationDay: '2014-06-02'
  },
  {
    name: 'Tripura',
    capital: 'Agartala',
    type: 'state',
    code: 'TR',
    cities: ['Agartala', 'Dharmanagar', 'Udaipur', 'Kailasahar', 'Belonia', 'Khowai', 'Ambassa', 'Sabroom', 'Kamalpur'],
    majorFestivals: ['Durga Puja', 'Garia Puja', 'Kharchi Puja'],
    stateFormationDay: '1972-01-21'
  },
  {
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    type: 'state',
    code: 'UP',
    cities: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Noida', 'Greater Noida', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Mathura', 'Vrindavan', 'Muzaffarnagar', 'Jhansi', 'Firozabad', 'Loni', 'Shahjahanpur', 'Rampur', 'Farrukhabad', 'Ayodhya', 'Maunath Bhanjan', 'Hapur', 'Etawah', 'Mirzapur', 'Bulandshahr', 'Sambhal', 'Amroha', 'Hardoi', 'Fatehpur', 'Raebareli', 'Orai', 'Bahraich', 'Unnao', 'Sitapur', 'Jaunpur', 'Hapur'],
    majorFestivals: ['Diwali', 'Holi', 'Janmashtami'],
    stateFormationDay: '1950-01-26'
  },
  {
    name: 'Uttarakhand',
    capital: 'Dehradun',
    type: 'state',
    code: 'UK',
    cities: ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Kotdwar', 'Ramnagar', 'Pithoragarh', 'Jaspur', 'Nainital', 'Mussoorie', 'Almora', 'Tehri', 'Bageshwar'],
    majorFestivals: ['Kumbh Mela', 'Ganga Dussehra', 'Phool Dei'],
    stateFormationDay: '2000-11-09'
  },
  {
    name: 'West Bengal',
    capital: 'Kolkata',
    type: 'state',
    code: 'WB',
    cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Darjeeling', 'Malda', 'Bardhaman', 'Kharagpur', 'Haldia', 'Rajarhat', 'Barasat', 'Barrackpur', 'Krishnanagar', 'Nabadwip', 'Ranaghat', 'Shantipur', 'Bongaon', 'Baharampur', 'Jalpaiguri', 'Balurghat', 'Raiganj', 'Cooch Behar', 'Alipurduar', 'Purulia', 'Bankura', 'Medinipur', 'Tamluk', 'Contai'],
    majorFestivals: ['Durga Puja', 'Kali Puja', 'Pohela Boishakh'],
    stateFormationDay: '1950-01-26'
  },

  // UNION TERRITORIES (8)
  {
    name: 'Andaman and Nicobar Islands',
    capital: 'Port Blair',
    type: 'ut',
    code: 'AN',
    cities: ['Port Blair', 'Diglipur', 'Rangat', 'Car Nicobar', 'Campbell Bay', 'Mayabunder', 'Bamboo Flat', 'Garacharma'],
    majorFestivals: ['Island Tourism Festival', 'Subhash Mela']
  },
  {
    name: 'Chandigarh',
    capital: 'Chandigarh',
    type: 'ut',
    code: 'CH',
    cities: ['Chandigarh', 'Mohali', 'Panchkula', 'Manimajra'],
    majorFestivals: ['Teej', 'Lohri', 'Baisakhi']
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    capital: 'Daman',
    type: 'ut',
    code: 'DH',
    cities: ['Daman', 'Diu', 'Silvassa', 'Amli', 'Samarvarni', 'Khanvel'],
    majorFestivals: ['Navratri', 'Diwali', 'Christmas']
  },
  {
    name: 'Delhi',
    capital: 'New Delhi',
    type: 'ut',
    code: 'DL',
    cities: ['New Delhi', 'Delhi', 'Dwarka', 'Rohini', 'Janakpuri', 'Karol Bagh', 'Connaught Place', 'Saket', 'Vasant Kunj', 'Lajpat Nagar', 'Nehru Place', 'Hauz Khas', 'Greater Kailash', 'Punjabi Bagh', 'Rajouri Garden', 'Pitampura', 'Mayur Vihar', 'Preet Vihar', 'Dilshad Garden', 'Shahdara'],
    majorFestivals: ['Holi', 'Diwali', 'Eid', 'Dussehra']
  },
  {
    name: 'Jammu and Kashmir',
    capital: 'Srinagar (Summer), Jammu (Winter)',
    type: 'ut',
    code: 'JK',
    cities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Kathua', 'Sopore', 'Pulwama', 'Kupwara', 'Rajouri', 'Poonch', 'Samba', 'Budgam', 'Ganderbal', 'Bandipora'],
    majorFestivals: ['Eid', 'Navroz', 'Lohri', 'Baisakhi']
  },
  {
    name: 'Ladakh',
    capital: 'Leh',
    type: 'ut',
    code: 'LA',
    cities: ['Leh', 'Kargil', 'Nubra', 'Zanskar', 'Drass', 'Padum', 'Diskit'],
    majorFestivals: ['Hemis Festival', 'Losar', 'Ladakh Festival']
  },
  {
    name: 'Lakshadweep',
    capital: 'Kavaratti',
    type: 'ut',
    code: 'LD',
    cities: ['Kavaratti', 'Agatti', 'Amini', 'Andrott', 'Minicoy', 'Kalpeni', 'Kadmat', 'Kiltan', 'Chetlat', 'Bitra'],
    majorFestivals: ['Eid-ul-Fitr', 'Eid-ul-Adha', 'Milad-un-Nabi']
  },
  {
    name: 'Puducherry',
    capital: 'Puducherry',
    type: 'ut',
    code: 'PY',
    cities: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam', 'Villianur', 'Ozhukarai', 'Auroville'],
    majorFestivals: ['Pongal', 'Bastille Day', 'Deepavali']
  }
];

// Helper function to get all cities across India
export const getAllCities = (): string[] => {
  const cities = ALL_STATES_UTS.flatMap(state => state.cities);
  return [...new Set(cities)].sort();
};

// Helper function to get all state names
export const getAllStateNames = (): string[] => {
  return ALL_STATES_UTS.map(state => state.name).sort();
};

// Helper function to get cities by state
export const getCitiesByState = (stateName: string): string[] => {
  const state = ALL_STATES_UTS.find(s => s.name === stateName);
  return state ? state.cities : [];
};

// Helper function to get state by city
export const getStateByCity = (cityName: string): string | undefined => {
  const state = ALL_STATES_UTS.find(s => s.cities.includes(cityName));
  return state?.name;
};

// Total count
export const TOTAL_STATES = ALL_STATES_UTS.filter(s => s.type === 'state').length; // 28
export const TOTAL_UTS = ALL_STATES_UTS.filter(s => s.type === 'ut').length; // 8
export const TOTAL_CITIES = getAllCities().length; // 600+

export default ALL_STATES_UTS;

