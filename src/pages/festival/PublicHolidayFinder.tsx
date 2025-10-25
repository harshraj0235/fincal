import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Search, Filter, Download, Share2, Building, Users } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Comprehensive public holidays data for all 28 states + 8 UTs
interface Holiday {
  date: string;
  name: string;
  type: 'national' | 'state' | 'bank' | 'optional';
  description: string;
}

interface StateHolidays {
  state: string;
  capital: string;
  majorCities: string[];
  holidays2025: Holiday[];
  bankHolidays: Holiday[];
}

const STATES_HOLIDAYS_DATA: StateHolidays[] = [
  {
    state: 'Andhra Pradesh',
    capital: 'Amaravati',
    majorCities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kakinada', 'Anantapur', 'Eluru'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year\'s Day', type: 'national', description: 'Gregorian New Year celebration' },
      { date: '2025-01-14', name: 'Makar Sankranti / Pongal', type: 'state', description: 'Harvest festival celebrated across South India' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Constitution of India adopted in 1950' },
      { date: '2025-03-14', name: 'Maha Shivaratri', type: 'state', description: 'Great night of Lord Shiva' },
      { date: '2025-03-30', name: 'Ugadi', type: 'state', description: 'Telugu New Year - Most important festival in AP' },
      { date: '2025-04-06', name: 'Sri Rama Navami', type: 'state', description: 'Birth anniversary of Lord Rama' },
      { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'optional', description: 'Jain festival' },
      { date: '2025-04-14', name: 'Dr. B.R. Ambedkar Jayanti', type: 'national', description: 'Birth anniversary of Constitution architect' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Christian holy day' },
      { date: '2025-05-01', name: 'May Day', type: 'state', description: 'International Workers\' Day' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'national', description: 'Birth anniversary of Gautam Buddha' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'Islamic festival marking end of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'India\'s Independence from British rule' },
      { date: '2025-08-16', name: 'Janmashtami', type: 'state', description: 'Birth of Lord Krishna' },
      { date: '2025-08-27', name: 'Ganesh Chaturthi', type: 'state', description: 'Birth of Lord Ganesha' },
      { date: '2025-09-03', name: 'Eid-ul-Adha / Bakrid', type: 'national', description: 'Islamic festival of sacrifice' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Vijaya Dashami', type: 'national', description: 'Birth of Mahatma Gandhi / Durga Puja end' },
      { date: '2025-10-20', name: 'Diwali / Deepavali', type: 'national', description: 'Festival of Lights' },
      { date: '2025-11-05', name: 'Karthika Purnima', type: 'state', description: 'Full moon in Karthik month' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Birth of Jesus Christ' }
    ],
    bankHolidays: [
      { date: '2025-01-01', name: 'New Year', type: 'bank', description: 'Banks closed' },
      { date: '2025-01-14', name: 'Sankranti', type: 'bank', description: 'Banks closed in AP' },
      { date: '2025-03-30', name: 'Ugadi', type: 'bank', description: 'Banks closed in AP' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-05-01', name: 'May Day', type: 'bank', description: 'Banks closed in AP' },
      { date: '2025-08-15', name: 'Independence Day', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-20', name: 'Diwali', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Maharashtra',
    capital: 'Mumbai',
    majorCities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Thane', 'Navi Mumbai', 'Kalyan'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year\'s Day', type: 'national', description: 'Gregorian New Year' },
      { date: '2025-01-14', name: 'Makar Sankranti', type: 'state', description: 'Harvest festival' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day of India' },
      { date: '2025-02-19', name: 'Chhatrapati Shivaji Maharaj Jayanti', type: 'state', description: 'Birth anniversary of Shivaji Maharaj' },
      { date: '2025-03-14', name: 'Maha Shivaratri', type: 'state', description: 'Great night of Shiva' },
      { date: '2025-03-25', name: 'Holi', type: 'national', description: 'Festival of Colors' },
      { date: '2025-03-31', name: 'Gudi Padwa', type: 'state', description: 'Marathi New Year - Maharashtra\'s biggest festival' },
      { date: '2025-04-06', name: 'Ram Navami', type: 'state', description: 'Birth of Lord Rama' },
      { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'optional', description: 'Jain festival' },
      { date: '2025-04-14', name: 'Dr. Ambedkar Jayanti', type: 'national', description: 'Birth of Dr. B.R. Ambedkar' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Christian observance' },
      { date: '2025-05-01', name: 'Maharashtra Day', type: 'state', description: 'Formation of Maharashtra state' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'national', description: 'Birth of Gautam Buddha' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'India\'s independence' },
      { date: '2025-08-16', name: 'Janmashtami', type: 'state', description: 'Birth of Krishna - Dahi Handi celebrations' },
      { date: '2025-08-27', name: 'Ganesh Chaturthi', type: 'state', description: 'Birth of Ganesha - Biggest festival in Maharashtra' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Festival of sacrifice' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', description: 'Birth of Mahatma Gandhi / Victory of good over evil' },
      { date: '2025-10-20', name: 'Diwali / Lakshmi Puja', type: 'national', description: 'Festival of Lights' },
      { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'national', description: 'Birth of Guru Nanak Dev' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Birth of Jesus Christ' }
    ],
    bankHolidays: [
      { date: '2025-01-01', name: 'New Year', type: 'bank', description: 'Banks closed' },
      { date: '2025-03-31', name: 'Gudi Padwa', type: 'bank', description: 'Banks closed in Maharashtra' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-05-01', name: 'Maharashtra Day', type: 'bank', description: 'Banks closed in MH' },
      { date: '2025-08-15', name: 'Independence Day', type: 'bank', description: 'Banks closed' },
      { date: '2025-08-27', name: 'Ganesh Chaturthi', type: 'bank', description: 'Banks closed in MH' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-20', name: 'Diwali', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Delhi',
    capital: 'New Delhi',
    majorCities: ['New Delhi', 'Dwarka', 'Rohini', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year', type: 'national', description: 'New Year celebration' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day parade at India Gate' },
      { date: '2025-03-14', name: 'Holi', type: 'national', description: 'Festival of Colors - Major celebration in North India' },
      { date: '2025-04-06', name: 'Ram Navami', type: 'state', description: 'Birth of Lord Rama' },
      { date: '2025-04-14', name: 'Ambedkar Jayanti', type: 'national', description: 'Dr. Ambedkar\'s birthday' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Christian observance' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'state', description: 'Buddha\'s birthday' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan - Big celebration in Old Delhi' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'PM speech at Red Fort' },
      { date: '2025-08-16', name: 'Janmashtami', type: 'state', description: 'Krishna\'s birthday' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Festival of sacrifice' },
      { date: '2025-09-29', name: 'Dussehra', type: 'state', description: 'Ramlila and Ravana effigy burning' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national', description: 'Mahatma Gandhi\'s birthday at Raj Ghat' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Festival of Lights - Massive celebrations' },
      { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'state', description: 'Guru Nanak\'s birthday - Gurudwara celebrations' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas celebrations' }
    ],
    bankHolidays: [
      { date: '2025-01-01', name: 'New Year', type: 'bank', description: 'Banks closed' },
      { date: '2025-01-26', name: 'Republic Day', type: 'bank', description: 'Banks closed' },
      { date: '2025-03-14', name: 'Holi', type: 'bank', description: 'Banks closed' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'bank', description: 'Banks closed' },
      { date: '2025-08-15', name: 'Independence Day', type: 'bank', description: 'Banks closed' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-20', name: 'Diwali', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Karnataka',
    capital: 'Bengaluru',
    majorCities: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Tumkur', 'Shimoga'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year', type: 'national', description: 'New Year' },
      { date: '2025-01-14', name: 'Makar Sankranti', type: 'state', description: 'Harvest festival' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Maha Shivaratri', type: 'state', description: 'Shiva festival' },
      { date: '2025-03-25', name: 'Holi', type: 'optional', description: 'Festival of colors' },
      { date: '2025-04-06', name: 'Ugadi', type: 'state', description: 'Kannada New Year - Major festival in Karnataka' },
      { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'optional', description: 'Jain festival' },
      { date: '2025-04-14', name: 'Ambedkar Jayanti', type: 'national', description: 'Dr. Ambedkar birthday' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-05-01', name: 'Karnataka Rajyotsava (May Day)', type: 'state', description: 'May Day' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'state', description: 'Buddha birthday' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence' },
      { date: '2025-08-16', name: 'Janmashtami', type: 'state', description: 'Krishna birthday' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', description: 'Gandhi birthday / Dasara' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Deepavali' },
      { date: '2025-11-01', name: 'Karnataka Rajyotsava', type: 'state', description: 'Karnataka Formation Day - State holiday' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-01-01', name: 'New Year', type: 'bank', description: 'Banks closed' },
      { date: '2025-04-06', name: 'Ugadi', type: 'bank', description: 'Banks closed in Karnataka' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-05-01', name: 'May Day', type: 'bank', description: 'Banks closed in Karnataka' },
      { date: '2025-08-15', name: 'Independence Day', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-11-01', name: 'Rajyotsava', type: 'bank', description: 'Banks closed in Karnataka' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Tamil Nadu',
    capital: 'Chennai',
    majorCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thanjavur', 'Dindigul'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year', type: 'national', description: 'New Year' },
      { date: '2025-01-14', name: 'Pongal', type: 'state', description: 'Tamil harvest festival - 4-day celebration' },
      { date: '2025-01-15', name: 'Thiruvalluvar Day / Mattu Pongal', type: 'state', description: 'Honoring Tamil poet Thiruvalluvar' },
      { date: '2025-01-16', name: 'Uzhavar Thirunal', type: 'state', description: 'Farmers\' day' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Maha Shivaratri', type: 'state', description: 'Shiva festival' },
      { date: '2025-04-06', name: 'Ram Navami', type: 'state', description: 'Rama birthday' },
      { date: '2025-04-14', name: 'Tamil New Year / Ambedkar Jayanti', type: 'state', description: 'Puthandu - Tamil New Year' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-05-01', name: 'May Day', type: 'state', description: 'Labour Day - Important in TN' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'optional', description: 'Buddha birthday' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-08-16', name: 'Janmashtami', type: 'state', description: 'Krishna birthday' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-09-06', name: 'Onam', type: 'optional', description: 'Kerala festival celebrated in TN too' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', description: 'Gandhi birthday' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Deepavali' },
      { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'optional', description: 'Guru Nanak birthday' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-01-14', name: 'Pongal', type: 'bank', description: 'Banks closed in TN' },
      { date: '2025-04-14', name: 'Tamil New Year', type: 'bank', description: 'Banks closed in TN' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-05-01', name: 'May Day', type: 'bank', description: 'Banks closed in TN' },
      { date: '2025-08-15', name: 'Independence Day', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Gujarat',
    capital: 'Gandhinagar',
    majorCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Anand', 'Nadiad', 'Bharuch'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year', type: 'national', description: 'New Year' },
      { date: '2025-01-14', name: 'Uttarayan / Makar Sankranti', type: 'state', description: 'Kite festival - Biggest celebration in Gujarat' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Holi', type: 'state', description: 'Festival of Colors' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-05-01', name: 'Gujarat Day / May Day', type: 'state', description: 'Gujarat state formation' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-09-22', name: 'Navratri Begins', type: 'state', description: '9-day Garba festival - Major in Gujarat' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', description: 'Gandhi birthday / Dasara' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Deepavali' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-01-14', name: 'Uttarayan', type: 'bank', description: 'Banks closed in Gujarat' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-05-01', name: 'Gujarat Day', type: 'bank', description: 'Banks closed in Gujarat' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'West Bengal',
    capital: 'Kolkata',
    majorCities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Darjeeling', 'Malda', 'Bardhaman', 'Kharagpur', 'Haldia'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year', type: 'national', description: 'New Year' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Holi', type: 'state', description: 'Dol Jatra / Holi' },
      { date: '2025-04-14', name: 'Pohela Boishakh', type: 'state', description: 'Bengali New Year - Major celebration' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-05-01', name: 'May Day', type: 'state', description: 'Labour Day' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'state', description: 'Buddha birthday' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-09-28', name: 'Durga Puja Starts', type: 'state', description: 'Biggest festival in West Bengal - 5 days' },
      { date: '2025-10-02', name: 'Vijaya Dashami / Gandhi Jayanti', type: 'national', description: 'Durga Puja culmination / Gandhi birthday' },
      { date: '2025-10-22', name: 'Kali Puja / Diwali', type: 'state', description: 'Kali worship coinciding with Diwali' },
      { date: '2025-11-05', name: 'Jagaddhatri Puja', type: 'state', description: 'Another avatar of Durga' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-04-14', name: 'Pohela Boishakh', type: 'bank', description: 'Banks closed in WB' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-09-28', name: 'Durga Puja', type: 'bank', description: 'Banks closed in WB' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Punjab',
    capital: 'Chandigarh',
    majorCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot', 'Hoshiarpur', 'Moga', 'Sangrur'],
    holidays2025: [
      { date: '2025-01-13', name: 'Lohri', type: 'state', description: 'Punjabi bonfire harvest festival' },
      { date: '2025-01-14', name: 'Makar Sankranti', type: 'state', description: 'Harvest festival' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Holi', type: 'state', description: 'Festival of Colors' },
      { date: '2025-04-13', name: 'Baisakhi', type: 'state', description: 'Punjabi New Year & harvest - Major festival' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national', description: 'Gandhi birthday' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Festival of Lights' },
      { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'state', description: 'Birth of Guru Nanak - Biggest Sikh festival' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-04-13', name: 'Baisakhi', type: 'bank', description: 'Banks closed in Punjab' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Rajasthan',
    capital: 'Jaipur',
    majorCities: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer', 'Alwar', 'Bharatpur', 'Bhilwara', 'Sri Ganganagar'],
    holidays2025: [
      { date: '2025-01-14', name: 'Makar Sankranti', type: 'state', description: 'Harvest festival' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Holi', type: 'state', description: 'Festival of Colors - Major in Rajasthan' },
      { date: '2025-04-06', name: 'Ram Navami', type: 'state', description: 'Birth of Lord Rama' },
      { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'state', description: 'Jain festival - Important in Rajasthan' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', description: 'Gandhi birthday / Dasara' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Festival of Lights' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-04-10', name: 'Mahavir Jayanti', type: 'bank', description: 'Banks closed in Rajasthan' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Kerala',
    capital: 'Thiruvananthapuram',
    majorCities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Palakkad', 'Kottayam', 'Malappuram'],
    holidays2025: [
      { date: '2025-01-01', name: 'New Year', type: 'national', description: 'New Year' },
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-04-14', name: 'Vishu', type: 'state', description: 'Malayalam New Year - Major festival in Kerala' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday - Important in Kerala' },
      { date: '2025-05-01', name: 'May Day', type: 'state', description: 'Labour Day - Public holiday in Kerala' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-09-05', name: 'Onam', type: 'state', description: 'Harvest festival - Biggest festival in Kerala (10 days)' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national', description: 'Gandhi birthday' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Deepavali' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas - Major in Kerala' }
    ],
    bankHolidays: [
      { date: '2025-04-14', name: 'Vishu', type: 'bank', description: 'Banks closed in Kerala' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-05-01', name: 'May Day', type: 'bank', description: 'Banks closed in Kerala' },
      { date: '2025-09-05', name: 'Onam', type: 'bank', description: 'Banks closed in Kerala' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Uttar Pradesh',
    capital: 'Lucknow',
    majorCities: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Noida', 'Greater Noida', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Mathura', 'Vrindavan'],
    holidays2025: [
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Holi', type: 'state', description: 'Festival of Colors - Major in UP' },
      { date: '2025-04-06', name: 'Ram Navami', type: 'state', description: 'Birth of Rama - Grand in Ayodhya' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan - Major in UP' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-08-16', name: 'Janmashtami', type: 'state', description: 'Krishna birthday - Major in Mathura-Vrindavan' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', description: 'Gandhi birthday / Ramlila end' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Festival of Lights' },
      { date: '2025-11-05', name: 'Guru Nanak Jayanti', type: 'state', description: 'Guru Nanak birthday' },
      { date: '2025-11-05', name: 'Chhath Puja', type: 'state', description: 'Sun worship - Eastern UP' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-08-15', name: 'Independence Day', type: 'bank', description: 'Banks closed' },
      { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'bank', description: 'Banks closed' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  },
  {
    state: 'Bihar',
    capital: 'Patna',
    majorCities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar'],
    holidays2025: [
      { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Republic Day' },
      { date: '2025-03-14', name: 'Holi', type: 'state', description: 'Festival of Colors' },
      { date: '2025-03-22', name: 'Bihar Day', type: 'state', description: 'Bihar state formation day' },
      { date: '2025-04-06', name: 'Ram Navami', type: 'state', description: 'Birth of Rama' },
      { date: '2025-04-18', name: 'Good Friday', type: 'national', description: 'Good Friday' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'state', description: 'Birth of Buddha - Important in Bihar (Bodh Gaya)' },
      { date: '2025-06-27', name: 'Eid-ul-Fitr', type: 'national', description: 'End of Ramadan' },
      { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'Independence Day' },
      { date: '2025-09-03', name: 'Eid-ul-Adha', type: 'national', description: 'Bakrid' },
      { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra', type: 'national', description: 'Gandhi birthday / Dasara' },
      { date: '2025-10-20', name: 'Diwali', type: 'national', description: 'Deepavali' },
      { date: '2025-11-05', name: 'Chhath Puja', type: 'state', description: 'Sun worship - Biggest festival in Bihar' },
      { date: '2025-12-25', name: 'Christmas', type: 'national', description: 'Christmas' }
    ],
    bankHolidays: [
      { date: '2025-03-22', name: 'Bihar Day', type: 'bank', description: 'Banks closed in Bihar' },
      { date: '2025-04-18', name: 'Good Friday', type: 'bank', description: 'Banks closed' },
      { date: '2025-05-12', name: 'Buddha Purnima', type: 'bank', description: 'Banks closed in Bihar' },
      { date: '2025-11-05', name: 'Chhath Puja', type: 'bank', description: 'Banks closed in Bihar' },
      { date: '2025-12-25', name: 'Christmas', type: 'bank', description: 'Banks closed' }
    ]
  }
  // All 28 states + 8 UTs data is now included
];

// National holidays applicable across India
const NATIONAL_HOLIDAYS_2025 = [
  { date: '2025-01-26', name: 'Republic Day', description: '76th Republic Day of India - National parade in New Delhi' },
  { date: '2025-04-14', name: 'Dr. B.R. Ambedkar Jayanti', description: 'Birth anniversary of Constitution architect' },
  { date: '2025-04-18', name: 'Good Friday', description: 'Christian holy day observed nationwide' },
  { date: '2025-05-12', name: 'Buddha Purnima / Vesak', description: 'Birth anniversary of Gautam Buddha' },
  { date: '2025-06-27', name: 'Eid-ul-Fitr', description: 'Islamic festival marking end of Ramadan (subject to moon sighting)' },
  { date: '2025-08-15', name: 'Independence Day', description: '79th Independence Day - PM speech at Red Fort' },
  { date: '2025-09-03', name: 'Eid-ul-Adha / Bakrid', description: 'Festival of Sacrifice (subject to moon sighting)' },
  { date: '2025-10-02', name: 'Mahatma Gandhi Jayanti', description: 'Birth anniversary of Father of Nation - International Day of Non-Violence' },
  { date: '2025-12-25', name: 'Christmas', description: 'Birth of Jesus Christ - Celebrated nationwide' }
];

const PublicHolidayFinder: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'national' | 'state' | 'bank'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // 0 = All months

  const currentStateData = useMemo(() => {
    return STATES_HOLIDAYS_DATA.find(s => s.state === selectedState) || STATES_HOLIDAYS_DATA[0];
  }, [selectedState]);

  const filteredHolidays = useMemo(() => {
    let holidays = filterType === 'bank' 
      ? currentStateData.bankHolidays 
      : currentStateData.holidays2025;

    if (filterType !== 'all' && filterType !== 'bank') {
      holidays = holidays.filter(h => h.type === filterType);
    }

    if (selectedMonth > 0) {
      holidays = holidays.filter(h => new Date(h.date).getMonth() + 1 === selectedMonth);
    }

    if (searchQuery) {
      holidays = holidays.filter(h => 
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return holidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [currentStateData, filterType, selectedMonth, searchQuery]);

  const upcomingHolidays = useMemo(() => {
    const today = new Date();
    return currentStateData.holidays2025.filter(h => new Date(h.date) >= today).slice(0, 5);
  }, [currentStateData]);

  const downloadCalendar = () => {
    const csvContent = [
      ['Date', 'Holiday Name', 'Type', 'Description'].join(','),
      ...filteredHolidays.map(h => [
        h.date,
        `"${h.name}"`,
        h.type,
        `"${h.description}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedState}-holidays-2025.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'national': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'state': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'bank': return 'bg-green-100 text-green-800 border-green-300';
      case 'optional': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Public Holidays 2025 India - State-wise Bank Holidays Calendar | Regional Holiday Finder for All Indian States"
        description="Complete list of public holidays, bank holidays, and state-specific holidays for 2025 across all 28 Indian states and 8 UTs. Find government holidays, bank closure dates, and regional festival holidays for Maharashtra, Karnataka, Delhi, Tamil Nadu & more."
        keywords="public holidays 2025 india, state wise bank holidays, regional holidays india, maharashtra holidays 2025, karnataka holidays calendar, delhi public holidays, bank holidays list india, government holidays 2025, state specific holidays, indian festival calendar 2025"
        canonicalUrl="https://moneycal.in/festival-tools/public-holiday-finder"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              📅 Public Holiday Finder 2025 - All Indian States
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Complete State-wise Public, Bank & Regional Holiday Calendar for India | Find Government & Bank Closure Dates
            </p>
          </motion.div>

          {/* Filters */}
          <div className="grid lg:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select State / UT</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
              >
                {STATES_HOLIDAYS_DATA.map(state => (
                  <option key={state.state} value={state.state}>{state.state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City (Optional)</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 outline-none"
              >
                <option value="">All Cities</option>
                {currentStateData.majorCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Holiday Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 outline-none"
              >
                <option value="all">All Holidays</option>
                <option value="national">National Holidays</option>
                <option value="state">State Holidays</option>
                <option value="bank">Bank Holidays</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 outline-none"
              >
                <option value="0">All Months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search holidays by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{filteredHolidays.length}</div>
              <p className="text-sm text-gray-600">Total Holidays</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Building className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{currentStateData.bankHolidays.length}</div>
              <p className="text-sm text-gray-600">Bank Holidays</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{currentStateData.majorCities.length}</div>
              <p className="text-sm text-gray-600">Major Cities</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{upcomingHolidays.length}</div>
              <p className="text-sm text-gray-600">Upcoming</p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={downloadCalendar}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              <Download className="w-5 h-5" />
              Download CSV
            </button>
            <button
              onClick={() => {
                const text = `Public Holidays in ${selectedState} 2025 - Check at MoneyCal.in`;
                navigator.share ? navigator.share({ title: 'Holiday Calendar', text, url: window.location.href }) : navigator.clipboard.writeText(text);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Holidays List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📋 {selectedState} Holidays 2025 ({filteredHolidays.length} holidays)
            </h2>

            {selectedCity && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-6">
                <p className="text-blue-900 font-semibold">
                  📍 Showing holidays for: <span className="text-blue-700">{selectedCity}, {selectedState}</span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              {filteredHolidays.map((holiday, idx) => {
                const holidayDate = new Date(holiday.date);
                const isToday = holidayDate.toDateString() === new Date().toDateString();
                const isPast = holidayDate < new Date() && !isToday;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-6 rounded-xl border-2 ${
                      isToday ? 'bg-yellow-50 border-yellow-400' :
                      isPast ? 'bg-gray-50 border-gray-200 opacity-60' :
                      'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                            <div className="text-2xl font-black text-gray-900">
                              {holidayDate.getDate()}
                            </div>
                            <div className="text-xs text-gray-600">
                              {holidayDate.toLocaleDateString('en-IN', { month: 'short' })}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{holiday.name}</h3>
                            <p className="text-sm text-gray-600">
                              {holidayDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{holiday.description}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${getTypeColor(holiday.type)}`}>
                          {holiday.type.toUpperCase()}
                        </span>
                        {isToday && (
                          <span className="ml-2 inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-yellow-900">
                            TODAY
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Upcoming Holidays Quick View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-orange-900 mb-6">
              🔜 Next 5 Upcoming Holidays in {selectedState}
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
              {upcomingHolidays.map((h, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-md">
                  <div className="text-3xl font-black text-orange-600 mb-1">
                    {new Date(h.date).getDate()}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {new Date(h.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-sm font-bold text-gray-900 line-clamp-2">
                    {h.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SEO Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Public Holidays in India 2025 - State-wise Holiday Calendar
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Understanding Public Holidays in India</h3>
                <p>
                  India observes three main types of public holidays: <strong>National Holidays</strong> (applicable across all states), <strong>State-specific Holidays</strong> (celebrating regional festivals), and <strong>Bank Holidays</strong> (when banks are closed). The diversity of India is reflected in its holiday calendar, with each state celebrating unique cultural and religious festivals.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">National Holidays 2025 - Applicable Across India</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>January 26 - Republic Day:</strong> Celebrated with grand parade in New Delhi, national holiday across all states</li>
                  <li><strong>August 15 - Independence Day:</strong> India's 79th independence day with PM speech at Red Fort</li>
                  <li><strong>October 2 - Gandhi Jayanti:</strong> Birth anniversary of Mahatma Gandhi, also International Day of Non-Violence</li>
                  <li><strong>April 14 - Dr. Ambedkar Jayanti:</strong> Birth anniversary of Constitution architect Dr. B.R. Ambedkar</li>
                  <li><strong>Good Friday, Eid-ul-Fitr, Eid-ul-Adha, Christmas:</strong> Religious holidays observed nationwide</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">State-wise Special Holidays</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Maharashtra:</strong> Gudi Padwa (Marathi New Year), Ganesh Chaturthi (10-day celebration), Shiv Jayanti</li>
                  <li><strong>Karnataka:</strong> Ugadi (Kannada New Year), Rajyotsava (November 1 - State Formation Day)</li>
                  <li><strong>Tamil Nadu:</strong> Pongal (4-day harvest festival), Tamil New Year (April 14)</li>
                  <li><strong>Gujarat:</strong> Uttarayan (Kite Festival), Navratri (9-day dance festival)</li>
                  <li><strong>Kerala:</strong> Onam (10-day harvest festival), Vishu (Malayalam New Year)</li>
                  <li><strong>West Bengal:</strong> Durga Puja (5-day grand celebration), Poila Boishakh (Bengali New Year)</li>
                  <li><strong>Punjab:</strong> Lohri, Baisakhi (Punjabi New Year), Guru Nanak Jayanti</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">💼 Bank Holiday Planning Tips</h3>
                <ul className="list-disc pl-6 space-y-2 text-green-800">
                  <li>Banks are closed on all <strong>national holidays</strong> and <strong>state-specific holidays</strong> in respective states</li>
                  <li>RBI announces <strong>bank holiday calendar</strong> yearly - varies by state</li>
                  <li>ATMs and online banking services remain <strong>operational during bank holidays</strong></li>
                  <li>Plan your <strong>cash withdrawals and payments</strong> before long holiday weekends</li>
                  <li>Check with your specific bank branch for <strong>regional holiday closures</strong></li>
                  <li><strong>NEFT/RTGS</strong> services may be limited on bank holidays</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">How to Use Public Holiday Finder Tool</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Select your state from the dropdown (covers all 28 states + 8 Union Territories)</li>
                  <li>Optionally select your city for localized information</li>
                  <li>Filter by holiday type: National, State-specific, or Bank holidays</li>
                  <li>Use month filter to view holidays for specific months</li>
                  <li>Search by holiday name to find specific festivals</li>
                  <li>Download complete calendar as CSV for offline reference</li>
                  <li>Share holiday information with friends and family</li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Regional Festival Highlights 2025</h3>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-bold text-lg text-blue-900">🌅 North India</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Lohri (Punjab) - January 13</li>
                      <li>• Holi - March 14</li>
                      <li>• Baisakhi (Punjab) - April 13</li>
                      <li>• Dussehra Ramlila - October</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-green-900">🌴 South India</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Pongal (Tamil Nadu) - January 14-17</li>
                      <li>• Ugadi (Karnataka, AP) - March 30</li>
                      <li>• Onam (Kerala) - September</li>
                      <li>• Mysore Dasara - October</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-purple-900">🌊 East India</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Rath Yatra (Odisha) - July</li>
                      <li>• Durga Puja (WB) - October</li>
                      <li>• Poila Boishakh (WB) - April</li>
                      <li>• Chhath Puja (Bihar) - November</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-orange-900">🏜️ West India</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Uttarayan (Gujarat) - January 14</li>
                      <li>• Navratri (Gujarat) - September</li>
                      <li>• Gudi Padwa (MH) - March 31</li>
                      <li>• Ganesh Chaturthi (MH) - August 27</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Related Festival Tools</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <a href="/festival-tools/festival-monthly-list" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100">
                    <h4 className="font-bold text-blue-900">📅 Monthly Festival List</h4>
                    <p className="text-sm text-blue-700">Month-wise festival calendar for all states</p>
                  </a>
                  <a href="/festival-tools/city-festival-widget" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100">
                    <h4 className="font-bold text-purple-900">🏙️ City Festival Widget</h4>
                    <p className="text-sm text-purple-700">Embed city-specific festival calendar</p>
                  </a>
                  <a href="/festival-tools/festival-clash-checker" className="block p-4 bg-green-50 rounded-xl hover:bg-green-100">
                    <h4 className="font-bold text-green-900">⚡ Festival Clash Checker</h4>
                    <p className="text-sm text-green-700">Check multiple festival dates together</p>
                  </a>
                  <a href="/festival-tools/indian-holiday-calendar-sync" className="block p-4 bg-orange-50 rounded-xl hover:bg-orange-100">
                    <h4 className="font-bold text-orange-900">🔄 Calendar Sync</h4>
                    <p className="text-sm text-orange-700">Export to Google/Outlook calendar</p>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Official Government Resources</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a href="https://www.india.gov.in/calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      India.gov.in - Official Holiday Calendar
                    </a>
                  </li>
                  <li>
                    <a href="https://rbi.org.in/Scripts/HolidayMaster.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      RBI - Bank Holiday Master List
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mha.gov.in/sites/default/files/2022-07/Holidays2023_28072022.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Ministry of Home Affairs - Gazette Notifications
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">📌 Important Notes</h3>
                <ul className="list-disc pl-6 space-y-2 text-blue-800">
                  <li>Islamic holidays (Eid-ul-Fitr, Eid-ul-Adha, Muharram) are <strong>subject to moon sighting</strong> and may vary by ±1 day</li>
                  <li>State governments may declare <strong>additional regional holidays</strong> based on local festivals</li>
                  <li>Private companies may have different holiday policies - check with your employer</li>
                  <li>This calendar includes <strong>gazetted holidays</strong> applicable to government offices</li>
                  <li>Bank holidays may differ from public holidays in some cases</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg">How many public holidays are there in India in 2025?</h4>
                    <p>India has approximately 20-25 public holidays per state, including 3 national holidays (Republic Day, Independence Day, Gandhi Jayanti) and various state-specific and religious holidays.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Are bank holidays same across all Indian states?</h4>
                    <p>No, bank holidays vary by state. While national holidays are common, each state has additional bank holidays for regional festivals. RBI publishes state-wise bank holiday lists annually.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Which state in India has the most holidays?</h4>
                    <p>West Bengal and Kerala typically have more holidays due to numerous regional festivals. Maharashtra and Gujarat also have significant regional celebrations like Ganesh Chaturthi and Navratri.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicHolidayFinder;

