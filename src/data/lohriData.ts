// Lohri Festival Data - Punjabi Harvest & Bonfire Festival
// Celebrated on January 13 (fixed date before Makar Sankranti)

export interface LohriDate {
  year: number;
  lohriDate: string; // Always January 13
  makarSankrantiDate: string; // Next day usually
  significance: string;
  bonfireTime: string;
}

export interface CityLohriData {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
  sunrise: string;
  sunset: string;
  civilDusk: string; // End of civil twilight
  bonfireStart: string; // Recommended bonfire start (10-30 min after sunset)
  bonfireEnd: string; // Recommended bonfire end
  moonrise?: string;
  moonset?: string;
}

// Lohri dates (Always January 13)
export const lohriDates: LohriDate[] = [
  {
    year: 2024,
    lohriDate: '2024-01-13',
    makarSankrantiDate: '2024-01-15',
    significance: 'Harvest festival marking the end of winter and welcoming longer days',
    bonfireTime: 'After sunset (around 5:30-6:00 PM)'
  },
  {
    year: 2025,
    lohriDate: '2025-01-13',
    makarSankrantiDate: '2025-01-14',
    significance: 'Harvest festival marking the end of winter and welcoming longer days',
    bonfireTime: 'After sunset (around 5:30-6:00 PM)'
  },
  {
    year: 2026,
    lohriDate: '2026-01-13',
    makarSankrantiDate: '2026-01-14',
    significance: 'Harvest festival marking the end of winter and welcoming longer days',
    bonfireTime: 'After sunset (around 5:30-6:00 PM)'
  },
  {
    year: 2027,
    lohriDate: '2027-01-13',
    makarSankrantiDate: '2027-01-14',
    significance: 'Harvest festival marking the end of winter and welcoming longer days',
    bonfireTime: 'After sunset (around 5:30-6:00 PM)'
  },
  {
    year: 2028,
    lohriDate: '2028-01-13',
    makarSankrantiDate: '2028-01-15',
    significance: 'Harvest festival marking the end of winter and welcoming longer days',
    bonfireTime: 'After sunset (around 5:30-6:00 PM)'
  },
  {
    year: 2029,
    lohriDate: '2029-01-13',
    makarSankrantiDate: '2029-01-14',
    significance: 'Harvest festival marking the end of winter and welcoming longer days',
    bonfireTime: 'After sunset (around 5:30-6:00 PM)'
  },
  {
    year: 2030,
    lohriDate: '2030-01-13',
    makarSankrantiDate: '2030-01-14',
    significance: 'Harvest festival marking the end of winter and welcoming longer days',
    bonfireTime: 'After sunset (around 5:30-6:00 PM)'
  }
];

// Major North Indian cities (Lohri is primarily celebrated in Punjab, Haryana, Delhi)
export const lohriCities: CityLohriData[] = [
  {
    city: 'Chandigarh',
    state: 'Punjab/Haryana',
    latitude: 30.7333,
    longitude: 76.7794,
    timezone: 'Asia/Kolkata',
    sunrise: '07:18 AM',
    sunset: '05:42 PM',
    civilDusk: '06:08 PM',
    bonfireStart: '05:52 PM',
    bonfireEnd: '07:22 PM',
    moonrise: '08:15 PM',
    moonset: '09:20 AM'
  },
  {
    city: 'Delhi',
    state: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'Asia/Kolkata',
    sunrise: '07:15 AM',
    sunset: '05:45 PM',
    civilDusk: '06:12 PM',
    bonfireStart: '05:55 PM',
    bonfireEnd: '07:25 PM',
    moonrise: '08:20 PM',
    moonset: '09:25 AM'
  },
  {
    city: 'Amritsar',
    state: 'Punjab',
    latitude: 31.6340,
    longitude: 74.8723,
    timezone: 'Asia/Kolkata',
    sunrise: '07:25 AM',
    sunset: '05:38 PM',
    civilDusk: '06:05 PM',
    bonfireStart: '05:48 PM',
    bonfireEnd: '07:18 PM',
    moonrise: '08:10 PM',
    moonset: '09:15 AM'
  },
  {
    city: 'Ludhiana',
    state: 'Punjab',
    latitude: 30.9010,
    longitude: 75.8573,
    timezone: 'Asia/Kolkata',
    sunrise: '07:20 AM',
    sunset: '05:40 PM',
    civilDusk: '06:07 PM',
    bonfireStart: '05:50 PM',
    bonfireEnd: '07:20 PM',
    moonrise: '08:12 PM',
    moonset: '09:18 AM'
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    latitude: 26.9124,
    longitude: 75.7873,
    timezone: 'Asia/Kolkata',
    sunrise: '07:15 AM',
    sunset: '05:48 PM',
    civilDusk: '06:14 PM',
    bonfireStart: '05:58 PM',
    bonfireEnd: '07:28 PM',
    moonrise: '08:18 PM',
    moonset: '09:22 AM'
  },
  {
    city: 'Patiala',
    state: 'Punjab',
    latitude: 30.3398,
    longitude: 76.3869,
    timezone: 'Asia/Kolkata',
    sunrise: '07:20 AM',
    sunset: '05:41 PM',
    civilDusk: '06:08 PM',
    bonfireStart: '05:51 PM',
    bonfireEnd: '07:21 PM',
    moonrise: '08:14 PM',
    moonset: '09:19 AM'
  },
  {
    city: 'Jalandhar',
    state: 'Punjab',
    latitude: 31.3260,
    longitude: 75.5762,
    timezone: 'Asia/Kolkata',
    sunrise: '07:22 AM',
    sunset: '05:40 PM',
    civilDusk: '06:06 PM',
    bonfireStart: '05:50 PM',
    bonfireEnd: '07:20 PM',
    moonrise: '08:11 PM',
    moonset: '09:17 AM'
  },
  {
    city: 'Gurugram',
    state: 'Haryana',
    latitude: 28.4595,
    longitude: 77.0266,
    timezone: 'Asia/Kolkata',
    sunrise: '07:16 AM',
    sunset: '05:46 PM',
    civilDusk: '06:13 PM',
    bonfireStart: '05:56 PM',
    bonfireEnd: '07:26 PM',
    moonrise: '08:21 PM',
    moonset: '09:26 AM'
  }
];

// Lohri traditions
export const lohriTraditions = [
  {
    title: 'Bonfire (Lohri Da Aag)',
    description: 'Light a large bonfire after sunset, throw peanuts, popcorn, sesame seeds, gur, and rewri into the fire as offerings.',
    timing: 'After sunset',
    icon: '🔥'
  },
  {
    title: 'Parikrama (Circling)',
    description: 'People walk around the bonfire in circles, singing traditional Lohri songs and folk songs.',
    timing: 'During bonfire',
    icon: '🎵'
  },
  {
    title: 'Throwing Offerings',
    description: 'Throw popcorn (phulley), peanuts (mungphali), rewri, and gur into the fire while saying "Aadar aye dilather jaye" (Honor comes, poverty goes)',
    timing: 'During bonfire',
    icon: '🥜'
  },
  {
    title: 'Festive Feast',
    description: 'Enjoy traditional foods like Sarson da Saag, Makki di Roti, gur (jaggery), til (sesame), peanuts, and rewri.',
    timing: 'After bonfire',
    icon: '🍽️'
  },
  {
    title: 'Folk Songs & Dance',
    description: 'Sing Lohri folk songs, perform Gidda (women) and Bhangra (men) dances around the bonfire.',
    timing: 'During celebrations',
    icon: '💃'
  },
  {
    title: 'Distributing Prasad',
    description: 'Distribute til, gur, peanuts, popcorn, and gajak to family, friends, and neighbors.',
    timing: 'After bonfire',
    icon: '🎁'
  }
];

// Lohri FAQs
export const lohriFAQs = [
  {
    question: 'What time should I light the Lohri bonfire?',
    answer: 'Light the Lohri bonfire 10-30 minutes after sunset when it gets dark enough. The recommended window is from sunset to 1.5 hours after sunset for safe and auspicious bonfire timing.'
  },
  {
    question: 'When is Lohri 2025?',
    answer: 'Lohri is always celebrated on January 13. Lohri 2025 falls on Monday, January 13, 2025, one day before Makar Sankranti.'
  },
  {
    question: 'Why is Lohri celebrated on January 13?',
    answer: 'Lohri is celebrated on January 13 (last day of Paush month) as it marks the end of winter solstice. It falls one day before Makar Sankranti when the sun enters Capricorn.'
  },
  {
    question: 'What is the significance of Lohri bonfire?',
    answer: 'The Lohri bonfire symbolizes the sun\'s energy returning, burning away negativity, and welcoming warmth. People offer harvest produce to the fire god Agni as gratitude.'
  },
  {
    question: 'What should I throw in the Lohri bonfire?',
    answer: 'Throw popcorn (phulley), peanuts (mungphali), rewri, gur (jaggery), sesame seeds (til), and gajak into the Lohri bonfire while singing traditional songs.'
  },
  {
    question: 'Is Lohri a public holiday?',
    answer: 'Lohri is an optional holiday in Punjab and Haryana. Government offices may remain open, but most people celebrate in the evening after sunset.'
  },
  {
    question: 'What is the best time for Lohri bonfire in Delhi?',
    answer: 'In Delhi, the best time for Lohri bonfire is between 5:55 PM to 7:25 PM (10-30 minutes after sunset at 5:45 PM). This ensures darkness for proper bonfire visibility.'
  },
  {
    question: 'Can I celebrate Lohri in the morning?',
    answer: 'No, Lohri is traditionally celebrated in the evening after sunset with bonfire, singing, and dancing. Morning celebrations are not part of traditional Lohri observance.'
  },
  {
    question: 'What is Lohri Prasad?',
    answer: 'Lohri Prasad consists of til (sesame), gur (jaggery), peanuts, popcorn, gajak, and rewri. These are distributed to family and friends after the bonfire ritual.'
  },
  {
    question: 'Should I check weather before Lohri bonfire?',
    answer: 'Yes! Check weather forecast for wind conditions and rain. Strong winds can make bonfires unsafe. Light the bonfire in an open, safe area away from buildings.'
  }
];

// Lohri traditional foods
export const lohriFood = [
  {
    name: 'Sarson da Saag & Makki di Roti',
    description: 'Mustard greens curry with corn flour flatbread - iconic Punjabi dish',
    category: 'Main Course'
  },
  {
    name: 'Til (Sesame) & Gur (Jaggery)',
    description: 'Sesame seeds and jaggery - traditional Lohri offerings and sweets',
    category: 'Sweets'
  },
  {
    name: 'Rewri',
    description: 'Crunchy sesame and jaggery brittle candy',
    category: 'Sweets'
  },
  {
    name: 'Gajak',
    description: 'Crispy sesame or peanut candy bars with jaggery',
    category: 'Sweets'
  },
  {
    name: 'Peanuts & Popcorn',
    description: 'Roasted peanuts and popped corn - thrown in fire and eaten',
    category: 'Snacks'
  },
  {
    name: 'Gur ki Pinni',
    description: 'Wheat flour balls with jaggery and dry fruits',
    category: 'Sweets'
  }
];




