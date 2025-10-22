// Parsi New Year (Navroz) Data - Zoroastrian Calendar Systems
// Three calendar types: Shahenshahi, Kadmi, and Fasli

export interface NavrozDate {
  year: number;
  shahenshahiNavroz: string; // Shahenshahi calendar (most common in India)
  kadmiNavroz: string; // Kadmi calendar (30 days earlier)
  fasliNavroz: string; // Fasli calendar (aligned with spring equinox ~March 21)
  zoroastrianYear: number;
  significance: string;
}

export interface CityNavrozData {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
  parsiPopulation: string;
  navrozDate: string;
  sunrise: string;
  sunset: string;
}

// Navroz dates for different calendar systems (2024-2030)
export const navrozDates: NavrozDate[] = [
  {
    year: 2024,
    shahenshahiNavroz: '2024-08-16',
    kadmiNavroz: '2024-07-17',
    fasliNavroz: '2024-03-21',
    zoroastrianYear: 1393,
    significance: 'Zoroastrian New Year celebrating creation and spring'
  },
  {
    year: 2025,
    shahenshahiNavroz: '2025-08-16',
    kadmiNavroz: '2025-07-17',
    fasliNavroz: '2025-03-21',
    zoroastrianYear: 1394,
    significance: 'Zoroastrian New Year celebrating creation and spring'
  },
  {
    year: 2026,
    shahenshahiNavroz: '2026-08-16',
    kadmiNavroz: '2026-07-17',
    fasliNavroz: '2026-03-21',
    zoroastrianYear: 1395,
    significance: 'Zoroastrian New Year celebrating creation and spring'
  },
  {
    year: 2027,
    shahenshahiNavroz: '2027-08-16',
    kadmiNavroz: '2027-07-17',
    fasliNavroz: '2027-03-21',
    zoroastrianYear: 1396,
    significance: 'Zoroastrian New Year celebrating creation and spring'
  },
  {
    year: 2028,
    shahenshahiNavroz: '2028-08-16',
    kadmiNavroz: '2028-07-17',
    fasliNavroz: '2028-03-20',
    zoroastrianYear: 1397,
    significance: 'Zoroastrian New Year celebrating creation and spring'
  },
  {
    year: 2029,
    shahenshahiNavroz: '2029-08-16',
    kadmiNavroz: '2029-07-17',
    fasliNavroz: '2029-03-20',
    zoroastrianYear: 1398,
    significance: 'Zoroastrian New Year celebrating creation and spring'
  },
  {
    year: 2030,
    shahenshahiNavroz: '2030-08-16',
    kadmiNavroz: '2030-07-17',
    fasliNavroz: '2030-03-21',
    zoroastrianYear: 1399,
    significance: 'Zoroastrian New Year celebrating creation and spring'
  }
];

// Major cities with Parsi population
export const parsiCities: CityNavrozData[] = [
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata',
    parsiPopulation: '45,000+ (largest Parsi community)',
    navrozDate: '2025-08-16',
    sunrise: '06:25 AM',
    sunset: '07:10 PM'
  },
  {
    city: 'Surat',
    state: 'Gujarat',
    latitude: 21.1702,
    longitude: 72.8311,
    timezone: 'Asia/Kolkata',
    parsiPopulation: '12,000+',
    navrozDate: '2025-08-16',
    sunrise: '06:18 AM',
    sunset: '07:05 PM'
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    latitude: 18.5204,
    longitude: 73.8567,
    timezone: 'Asia/Kolkata',
    parsiPopulation: '8,000+',
    navrozDate: '2025-08-16',
    sunrise: '06:28 AM',
    sunset: '07:12 PM'
  },
  {
    city: 'Delhi',
    state: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'Asia/Kolkata',
    parsiPopulation: '3,500+',
    navrozDate: '2025-08-16',
    sunrise: '05:50 AM',
    sunset: '07:20 PM'
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    parsiPopulation: '2,000+',
    navrozDate: '2025-08-16',
    sunrise: '06:10 AM',
    sunset: '06:35 PM'
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    latitude: 22.5726,
    longitude: 88.3639,
    timezone: 'Asia/Kolkata',
    parsiPopulation: '1,500+',
    navrozDate: '2025-08-16',
    sunrise: '05:15 AM',
    sunset: '06:05 PM'
  }
];

// Calendar type explanations
export const calendarTypes = [
  {
    name: 'Shahenshahi Calendar',
    description: 'Most commonly followed by Parsis in India. Does not account for leap years, causing drift. Navroz falls in August.',
    observedBy: 'Majority of Indian Parsis (Mumbai, Surat, Pune)',
    navrozMonth: 'August 16',
    popular: true
  },
  {
    name: 'Kadmi Calendar',
    description: 'Followed by some Parsi communities. 30 days earlier than Shahenshahi. Navroz falls in July.',
    observedBy: 'Some communities in Gujarat and Iran',
    navrozMonth: 'July 17',
    popular: false
  },
  {
    name: 'Fasli Calendar',
    description: 'Reform calendar aligned with spring equinox. Astronomically accurate, Navroz on vernal equinox (March 20-21).',
    observedBy: 'Modernist Parsi communities',
    navrozMonth: 'March 20-21',
    popular: true
  }
];

// Navroz traditions
export const navrozTraditions = [
  {
    title: 'Haft-Sin Table',
    description: 'Set up a table with 7 items starting with "S" (Persian): Sabzeh (sprouts), Samanu (pudding), Senjed (dried fruit), Sir (garlic), Sib (apple), Somaq (sumac), Serkeh (vinegar).',
    icon: '🍎'
  },
  {
    title: 'New Clothes (Jamva Chalavu)',
    description: 'Wear new clothes, preferably white, symbolizing purity and new beginnings. Visit Fire Temple (Agiary) for prayers.',
    icon: '👗'
  },
  {
    title: 'Visit Fire Temple',
    description: 'Attend prayers at Agiary (Fire Temple), offer sandalwood to the sacred fire, and seek blessings from priests.',
    icon: '🔥'
  },
  {
    title: 'Festive Feast',
    description: 'Prepare traditional Parsi dishes like Dhansak, Patra ni Machhi, Ravo, Sev, and Lagan nu Custard.',
    icon: '🍽️'
  },
  {
    title: 'Spring Cleaning',
    description: 'Thorough house cleaning before Navroz, discarding old items, representing fresh starts and renewal.',
    icon: '🧹'
  },
  {
    title: 'Exchanging Greetings',
    description: 'Visit relatives and friends, exchange "Navroz Mubarak" greetings, sweets, and gifts.',
    icon: '🎁'
  }
];

// Parsi traditional foods
export const parsiFood = [
  {
    name: 'Dhansak',
    description: 'Lentils and vegetables with meat, served with brown rice',
    category: 'Main Course'
  },
  {
    name: 'Patra ni Machhi',
    description: 'Fish steamed in banana leaf with green chutney',
    category: 'Main Course'
  },
  {
    name: 'Lagan nu Custard',
    description: 'Rich caramelized custard, signature Parsi dessert',
    category: 'Dessert'
  },
  {
    name: 'Ravo',
    description: 'Semolina pudding with cardamom, nuts, and saffron',
    category: 'Sweet'
  },
  {
    name: 'Sev',
    description: 'Sweet vermicelli with dry fruits and nuts',
    category: 'Sweet'
  },
  {
    name: 'Falooda',
    description: 'Rose-flavored milk drink with vermicelli and basil seeds',
    category: 'Beverage'
  }
];

// Navroz FAQs
export const navrozFAQs = [
  {
    question: 'When is Parsi New Year 2025?',
    answer: 'Parsi New Year 2025 (Navroz) is celebrated on August 16, 2025 according to the Shahenshahi calendar (most common in India). Fasli calendar observes it on March 21, 2025 (spring equinox).'
  },
  {
    question: 'What is Navroz?',
    answer: 'Navroz is the Zoroastrian New Year celebrated by Parsis. It marks the beginning of spring and the first day of Farvardin (first month). The word means "new day" in Persian.'
  },
  {
    question: 'Why are there different Navroz dates?',
    answer: 'Three Zoroastrian calendars exist: Shahenshahi (August, no leap year adjustment), Kadmi (July, 30 days earlier), and Fasli (March, spring equinox aligned). Indian Parsis mainly follow Shahenshahi.'
  },
  {
    question: 'Which Navroz calendar should I follow?',
    answer: 'Most Indian Parsis follow the Shahenshahi calendar (August 16). Check with your local Agiary (Fire Temple) for community preference. Fasli (March 21) is astronomically accurate.'
  },
  {
    question: 'What is Haft-Sin table?',
    answer: 'Haft-Sin is a traditional table setting with 7 items starting with "S" in Persian: Sabzeh, Samanu, Senjed, Sir, Sib, Somaq, Serkeh. It symbolizes prosperity, health, and renewal.'
  },
  {
    question: 'Is Parsi New Year a public holiday?',
    answer: 'Parsi New Year is a restricted holiday in India. Government offices and most businesses remain open, but Parsi community institutions may be closed.'
  },
  {
    question: 'How do Parsis celebrate Navroz?',
    answer: 'Parsis celebrate by wearing new clothes, visiting Fire Temples, setting up Haft-Sin tables, spring cleaning homes, preparing festive meals (Dhansak, Ravo), and exchanging "Navroz Mubarak" greetings with family.'
  },
  {
    question: 'What is the Zoroastrian year for 2025?',
    answer: 'The Zoroastrian year 1394 YZ (Yazdegerdi) corresponds to Gregorian 2025. The Zoroastrian calendar starts from the coronation of Yazdegerd III in 632 CE.'
  },
  {
    question: 'Can I download Navroz 2025 calendar?',
    answer: 'Yes! Our tool provides a downloadable .ics calendar file for all three calendar types (Shahenshahi, Kadmi, Fasli) that you can add to Google Calendar, Apple Calendar, or Outlook.'
  },
  {
    question: 'What is the difference between Navroz and Nowruz?',
    answer: 'Navroz (Parsi/Zoroastrian) and Nowruz (Persian/Iranian) celebrate the same event - the New Year. Nowruz follows the spring equinox (March), while Indian Parsis often celebrate in August (Shahenshahi calendar).'
  }
];





