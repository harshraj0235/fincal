// Onam Festival Data - 10-Day Malayalam Harvest Celebration
// Thiruvonam (Shravana Nakshatra) dates calculated astronomically

export interface OnamDate {
  year: number;
  thiruvonamDate: string; // Main Onam day (Shravana nakshatra)
  athamDate: string; // First day of Onam (10 days before Thiruvonam)
  malayalamYear: number;
  chingamMonth: string;
  significance: string;
}

export interface OnamDay {
  day: number;
  name: string;
  malayalamName: string;
  date: string;
  nakshatra: string;
  activity: string;
  pookalamTheme: string;
  icon: string;
}

export interface CityOnamData {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
  thiruvonamDate: string;
  sunrise: string;
  sunset: string;
}

// Onam dates for 2024-2030 (Thiruvonam in Chingam month - Aug-Sep)
export const onamDates: OnamDate[] = [
  {
    year: 2024,
    thiruvonamDate: '2024-09-15',
    athamDate: '2024-09-06',
    malayalamYear: 1200,
    chingamMonth: 'Chingam (August-September)',
    significance: 'King Mahabali returns to Kerala to visit his subjects'
  },
  {
    year: 2025,
    thiruvonamDate: '2025-09-05',
    athamDate: '2025-08-27',
    malayalamYear: 1201,
    chingamMonth: 'Chingam (August-September)',
    significance: 'King Mahabali returns to Kerala to visit his subjects'
  },
  {
    year: 2026,
    thiruvonamDate: '2026-08-25',
    athamDate: '2026-08-16',
    malayalamYear: 1202,
    chingamMonth: 'Chingam (August-September)',
    significance: 'King Mahabali returns to Kerala to visit his subjects'
  },
  {
    year: 2027,
    thiruvonamDate: '2027-09-14',
    athamDate: '2027-09-05',
    malayalamYear: 1203,
    chingamMonth: 'Chingam (August-September)',
    significance: 'King Mahabali returns to Kerala to visit his subjects'
  },
  {
    year: 2028,
    thiruvonamDate: '2028-09-02',
    athamDate: '2028-08-24',
    malayalamYear: 1204,
    chingamMonth: 'Chingam (August-September)',
    significance: 'King Mahabali returns to Kerala to visit his subjects'
  },
  {
    year: 2029,
    thiruvonamDate: '2029-08-22',
    athamDate: '2029-08-13',
    malayalamYear: 1205,
    chingamMonth: 'Chingam (August-September)',
    significance: 'King Mahabali returns to Kerala to visit his subjects'
  },
  {
    year: 2030,
    thiruvonamDate: '2030-09-11',
    athamDate: '2030-09-02',
    malayalamYear: 1206,
    chingamMonth: 'Chingam (August-September)',
    significance: 'King Mahabali returns to Kerala to visit his subjects'
  }
];

// 10 days of Onam with nakshatras
export const onamDayNames = [
  {
    day: 1,
    name: 'Atham',
    malayalamName: 'അത്തം',
    nakshatra: 'Hasta',
    activity: 'Start Pookalam (flower rangoli), clean house, shopping begins',
    pookalamTheme: 'Small circular design with yellow flowers',
    icon: '🌼'
  },
  {
    day: 2,
    name: 'Chithira',
    malayalamName: 'ചിത്തിര',
    nakshatra: 'Chitra',
    activity: 'Continue Pookalam, add more layers, prepare for celebrations',
    pookalamTheme: 'Expand design, add orange and red flowers',
    icon: '🌺'
  },
  {
    day: 3,
    name: 'Chodhi',
    malayalamName: 'ചോധി',
    nakshatra: 'Swati',
    activity: 'Shopping for new clothes, jewelry, household items',
    pookalamTheme: 'Colorful patterns with mixed flowers',
    icon: '🛍️'
  },
  {
    day: 4,
    name: 'Vishakam',
    malayalamName: 'വിശാകം',
    nakshatra: 'Vishakha',
    activity: 'Preparations intensify, vegetable shopping for Sadya',
    pookalamTheme: 'Traditional Kerala motifs with jasmine',
    icon: '🌿'
  },
  {
    day: 5,
    name: 'Anizham',
    malayalamName: 'അനിഴം',
    nakshatra: 'Anuradha',
    activity: 'Vallamkali (snake boat races) begin in some regions',
    pookalamTheme: 'Boat designs, elongated patterns',
    icon: '🚣'
  },
  {
    day: 6,
    name: 'Thriketa',
    malayalamName: 'തൃക്കേട്ട',
    nakshatra: 'Jyeshtha',
    activity: 'Family gatherings, visiting relatives',
    pookalamTheme: 'Elaborate multi-layered designs',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    day: 7,
    name: 'Moolam',
    malayalamName: 'മൂലം',
    nakshatra: 'Mula',
    activity: 'Onasadya preparations begin, temple visits',
    pookalamTheme: 'Sacred symbols, temple-inspired patterns',
    icon: '🛕'
  },
  {
    day: 8,
    name: 'Pooradam',
    malayalamName: 'പൂരാടം',
    nakshatra: 'Purva Ashadha',
    activity: 'Traditional dances (Thiruvathira), music performances',
    pookalamTheme: 'Musical instruments, dance motifs',
    icon: '💃'
  },
  {
    day: 9,
    name: 'Uthradom',
    malayalamName: 'ഉത്രാടം',
    nakshatra: 'Uttara Ashadha',
    activity: 'King Mahabali prepares to arrive, final Sadya preparations',
    pookalamTheme: 'Grand designs, royal themes',
    icon: '👑'
  },
  {
    day: 10,
    name: 'Thiruvonam',
    malayalamName: 'തിരുവോണം',
    nakshatra: 'Shravana',
    activity: 'Main Onam day! Onasadya feast, new clothes, family celebrations',
    pookalamTheme: 'Most elaborate Pookalam, all colors',
    icon: '🎉'
  }
];

// Major Kerala and Malayali cities
export const keralaCities: CityOnamData[] = [
  {
    city: 'Kochi',
    state: 'Kerala',
    latitude: 9.9312,
    longitude: 76.2673,
    timezone: 'Asia/Kolkata',
    thiruvonamDate: '2025-09-05',
    sunrise: '06:10 AM',
    sunset: '06:25 PM'
  },
  {
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    latitude: 8.5241,
    longitude: 76.9366,
    timezone: 'Asia/Kolkata',
    thiruvonamDate: '2025-09-05',
    sunrise: '06:15 AM',
    sunset: '06:30 PM'
  },
  {
    city: 'Kozhikode',
    state: 'Kerala',
    latitude: 11.2588,
    longitude: 75.7804,
    timezone: 'Asia/Kolkata',
    thiruvonamDate: '2025-09-05',
    sunrise: '06:20 AM',
    sunset: '06:30 PM'
  },
  {
    city: 'Thrissur',
    state: 'Kerala',
    latitude: 10.5276,
    longitude: 76.2144,
    timezone: 'Asia/Kolkata',
    thiruvonamDate: '2025-09-05',
    sunrise: '06:12 AM',
    sunset: '06:28 PM'
  },
  {
    city: 'Kollam',
    state: 'Kerala',
    latitude: 8.8932,
    longitude: 76.6141,
    timezone: 'Asia/Kolkata',
    thiruvonamDate: '2025-09-05',
    sunrise: '06:13 AM',
    sunset: '06:28 PM'
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    thiruvonamDate: '2025-09-05',
    sunrise: '06:10 AM',
    sunset: '06:25 PM'
  }
];

// Onam traditions
export const onamTraditions = [
  {
    title: 'Pookalam (Flower Rangoli)',
    description: 'Intricate circular flower arrangements made daily in front of homes. Designs grow larger each day leading to Thiruvonam.',
    icon: '🌸'
  },
  {
    title: 'Onasadya (Grand Feast)',
    description: '26-course vegetarian feast served on banana leaf. Includes rice, sambar, avial, olan, thoran, payasam, and more.',
    icon: '🍛'
  },
  {
    title: 'Vallamkali (Boat Race)',
    description: 'Traditional snake boat races in backwaters. Teams of 100+ rowers compete in synchronized rowing.',
    icon: '🚣'
  },
  {
    title: 'Thiruvathira Kali',
    description: 'Traditional group dance performed by women in a circle, clapping hands rhythmically.',
    icon: '💃'
  },
  {
    title: 'Pulikali (Tiger Dance)',
    description: 'Men paint themselves as tigers and hunters, dancing through streets in colorful processions.',
    icon: '🐅'
  },
  {
    title: 'Onam Shopping',
    description: 'Buying new clothes (especially Kasavu saree and mundu), gold jewelry, and gifts for family.',
    icon: '👗'
  }
];

// Onasadya menu items
export const onasadyaItems = [
  'Rice (Chorum)', 'Parippu (Dal)', 'Sambar', 'Rasam', 'Avial', 'Thoran', 
  'Olan', 'Kaalan', 'Erissery', 'Pulissery', 'Pachadi', 'Kichadi', 
  'Koottucurry', 'Moru (Buttermilk)', 'Pickle (Upperi)', 'Chips (Sharkara Upperi)', 
  'Pappadam', 'Banana', 'Payasam (3 types)', 'Ada Pradhaman'
];

// Onam FAQs
export const onamFAQs = [
  {
    question: 'When is Onam 2025?',
    answer: 'Onam 2025 celebrations start on August 27 (Atham) and the main day Thiruvonam falls on September 5, 2025. The 10-day festival is celebrated in the Malayalam month of Chingam.'
  },
  {
    question: 'What is Thiruvonam in Onam?',
    answer: 'Thiruvonam is the 10th and most important day of Onam when the Shravana nakshatra occurs. This is when King Mahabali is believed to visit Kerala. Grand Onasadya feast and celebrations happen on this day.'
  },
  {
    question: 'How many days is Onam celebrated?',
    answer: 'Onam is celebrated for 10 days from Atham (Day 1) to Thiruvonam (Day 10). Each day has a specific nakshatra, ritual, and Pookalam design.'
  },
  {
    question: 'What is Pookalam in Onam?',
    answer: 'Pookalam is a traditional circular flower rangoli made in front of homes during Onam. It starts small on Atham and grows larger each day, becoming most elaborate on Thiruvonam.'
  },
  {
    question: 'What is Onasadya?',
    answer: 'Onasadya is the grand vegetarian feast served on banana leaves during Onam, especially on Thiruvonam. It consists of 26+ dishes including rice, sambar, avial, payasam, and traditional Kerala delicacies.'
  },
  {
    question: 'Why is Onam celebrated?',
    answer: 'Onam celebrates the annual visit of King Mahabali, a legendary demon king who ruled Kerala with prosperity and equality. Despite being sent to the underworld by Lord Vishnu, he returns once a year during Onam.'
  },
  {
    question: 'Is Onam a public holiday in Kerala?',
    answer: 'Yes, Thiruvonam is a public holiday in Kerala and government offices, banks, and schools remain closed. Many private companies also observe this holiday.'
  },
  {
    question: 'What is the story of King Mahabali and Onam?',
    answer: 'King Mahabali was a benevolent Asura king who ruled Kerala prosperously. Lord Vishnu as Vamana (dwarf) sent him to the underworld but granted him permission to visit his people once yearly during Onam.'
  },
  {
    question: 'Can I download Onam 2025 calendar?',
    answer: 'Yes! Our tool provides a downloadable .ics calendar file with all 10 days of Onam that you can add to Google Calendar, Apple Calendar, or Outlook.'
  },
  {
    question: 'What are the 10 days of Onam called?',
    answer: 'The 10 days are: Atham, Chithira, Chodhi, Vishakam, Anizham, Thriketa, Moolam, Pooradam, Uthradom, and Thiruvonam. Each corresponds to a specific nakshatra in Malayalam astrology.'
  }
];

// Onam special dishes
export const onamDishes = [
  {
    name: 'Avial',
    description: 'Mixed vegetables in coconut and yogurt gravy',
    category: 'Main Dish'
  },
  {
    name: 'Olan',
    description: 'Pumpkin and red beans in coconut milk',
    category: 'Main Dish'
  },
  {
    name: 'Thoran',
    description: 'Stir-fried vegetables with coconut',
    category: 'Side Dish'
  },
  {
    name: 'Ada Pradhaman',
    description: 'Rice ada cooked in jaggery and coconut milk',
    category: 'Dessert (Payasam)'
  },
  {
    name: 'Parippu (Dal)',
    description: 'Yellow moong dal with ghee',
    category: 'Dal'
  },
  {
    name: 'Banana Chips',
    description: 'Crispy fried banana slices',
    category: 'Snack'
  }
];





