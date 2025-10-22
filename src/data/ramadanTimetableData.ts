// Ramadan Timetable Data - Sehri (Imsak) & Iftar Times
// Multiple calculation methods supported: MWL, ISNA, Karachi, Umm al-Qura, Egypt

export interface RamadanDate {
  year: number; // Hijri year
  gregorianYear: number;
  ramadanStart: string; // 1st Ramadan
  ramadanEnd: string; // 29th/30th Ramadan
  eidUlFitr: string; // 1st Shawwal
  significance: string;
  moonSightingNote: string;
}

export interface PrayerTimes {
  date: string;
  sehriImsak: string; // 10 minutes before Fajr (recommended)
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghribIftar: string;
  isha: string;
  method: string;
}

export interface CityPrayerData {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
  // Sample times (will be calculated dynamically in real implementation)
  sehriTime: string;
  iftarTime: string;
}

export interface CalculationMethod {
  id: string;
  name: string;
  description: string;
  region: string;
  fajrAngle: number;
  ishaAngle: number;
  popular: boolean;
}

// Ramadan dates for 2024-2030
export const ramadanDates: RamadanDate[] = [
  {
    year: 1445,
    gregorianYear: 2024,
    ramadanStart: '2024-03-11',
    ramadanEnd: '2024-04-09',
    eidUlFitr: '2024-04-10',
    significance: 'Month of fasting, Quran revelation, and spiritual reflection',
    moonSightingNote: 'Ramadan start date may vary by 1 day based on moon sighting'
  },
  {
    year: 1446,
    gregorianYear: 2025,
    ramadanStart: '2025-03-01',
    ramadanEnd: '2025-03-29',
    eidUlFitr: '2025-03-30',
    significance: 'Month of fasting, Quran revelation, and spiritual reflection',
    moonSightingNote: 'Ramadan start date may vary by 1 day based on moon sighting'
  },
  {
    year: 1447,
    gregorianYear: 2026,
    ramadanStart: '2026-02-18',
    ramadanEnd: '2026-03-19',
    eidUlFitr: '2026-03-20',
    significance: 'Month of fasting, Quran revelation, and spiritual reflection',
    moonSightingNote: 'Ramadan start date may vary by 1 day based on moon sighting'
  },
  {
    year: 1448,
    gregorianYear: 2027,
    ramadanStart: '2027-02-08',
    ramadanEnd: '2027-03-08',
    eidUlFitr: '2027-03-09',
    significance: 'Month of fasting, Quran revelation, and spiritual reflection',
    moonSightingNote: 'Ramadan start date may vary by 1 day based on moon sighting'
  },
  {
    year: 1449,
    gregorianYear: 2028,
    ramadanStart: '2028-01-28',
    ramadanEnd: '2028-02-25',
    eidUlFitr: '2028-02-26',
    significance: 'Month of fasting, Quran revelation, and spiritual reflection',
    moonSightingNote: 'Ramadan start date may vary by 1 day based on moon sighting'
  },
  {
    year: 1450,
    gregorianYear: 2029,
    ramadanStart: '2029-01-16',
    ramadanEnd: '2029-02-13',
    eidUlFitr: '2029-02-14',
    significance: 'Month of fasting, Quran revelation, and spiritual reflection',
    moonSightingNote: 'Ramadan start date may vary by 1 day based on moon sighting'
  },
  {
    year: 1451,
    gregorianYear: 2030,
    ramadanStart: '2030-01-06',
    ramadanEnd: '2030-02-03',
    eidUlFitr: '2030-02-04',
    significance: 'Month of fasting, Quran revelation, and spiritual reflection',
    moonSightingNote: 'Ramadan start date may vary by 1 day based on moon sighting'
  }
];

// Calculation methods for prayer times
export const calculationMethods: CalculationMethod[] = [
  {
    id: 'MWL',
    name: 'Muslim World League',
    description: 'Fajr: 18°, Isha: 17° - Widely used in Europe, Middle East, parts of India',
    region: 'Global',
    fajrAngle: 18,
    ishaAngle: 17,
    popular: true
  },
  {
    id: 'ISNA',
    name: 'Islamic Society of North America',
    description: 'Fajr: 15°, Isha: 15° - Popular in North America and some parts of India',
    region: 'North America',
    fajrAngle: 15,
    ishaAngle: 15,
    popular: true
  },
  {
    id: 'Karachi',
    name: 'University of Islamic Sciences, Karachi',
    description: 'Fajr: 18°, Isha: 18° - Widely followed in Pakistan and parts of North India',
    region: 'South Asia',
    fajrAngle: 18,
    ishaAngle: 18,
    popular: true
  },
  {
    id: 'UmmAlQura',
    name: 'Umm al-Qura University, Makkah',
    description: 'Fajr: 18.5°, Isha: 90 min after Maghrib - Official Saudi Arabia method',
    region: 'Saudi Arabia',
    fajrAngle: 18.5,
    ishaAngle: 0,
    popular: true
  },
  {
    id: 'Egypt',
    name: 'Egyptian General Authority of Survey',
    description: 'Fajr: 19.5°, Isha: 17.5° - Used in Egypt and some African countries',
    region: 'Egypt/Africa',
    fajrAngle: 19.5,
    ishaAngle: 17.5,
    popular: false
  },
  {
    id: 'Tehran',
    name: 'Institute of Geophysics, University of Tehran',
    description: 'Fajr: 17.7°, Isha: 14° - Used in Iran and surrounding regions',
    region: 'Iran',
    fajrAngle: 17.7,
    ishaAngle: 14,
    popular: false
  }
];

// Major Indian cities with prayer timing data
export const indianCitiesPrayer: CityPrayerData[] = [
  {
    city: 'Delhi',
    state: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'Asia/Kolkata',
    sehriTime: '04:45 AM',
    iftarTime: '06:55 PM'
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata',
    sehriTime: '05:15 AM',
    iftarTime: '07:10 PM'
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.3850,
    longitude: 78.4867,
    timezone: 'Asia/Kolkata',
    sehriTime: '05:05 AM',
    iftarTime: '06:50 PM'
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    sehriTime: '05:10 AM',
    iftarTime: '06:45 PM'
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    latitude: 22.5726,
    longitude: 88.3639,
    timezone: 'Asia/Kolkata',
    sehriTime: '04:15 AM',
    iftarTime: '06:15 PM'
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    latitude: 26.8467,
    longitude: 80.9462,
    timezone: 'Asia/Kolkata',
    sehriTime: '04:40 AM',
    iftarTime: '06:50 PM'
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    latitude: 23.0225,
    longitude: 72.5714,
    timezone: 'Asia/Kolkata',
    sehriTime: '05:30 AM',
    iftarTime: '07:15 PM'
  },
  {
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    latitude: 34.0837,
    longitude: 74.7973,
    timezone: 'Asia/Kolkata',
    sehriTime: '04:20 AM',
    iftarTime: '07:30 PM'
  },
  {
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    latitude: 23.2599,
    longitude: 77.4126,
    timezone: 'Asia/Kolkata',
    sehriTime: '05:00 AM',
    iftarTime: '07:00 PM'
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 'Asia/Kolkata',
    sehriTime: '05:00 AM',
    iftarTime: '06:35 PM'
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    latitude: 26.9124,
    longitude: 75.7873,
    timezone: 'Asia/Kolkata',
    sehriTime: '04:55 AM',
    iftarTime: '07:05 PM'
  },
  {
    city: 'Patna',
    state: 'Bihar',
    latitude: 25.5941,
    longitude: 85.1376,
    timezone: 'Asia/Kolkata',
    sehriTime: '04:30 AM',
    iftarTime: '06:40 PM'
  }
];

// Ramadan FAQs
export const ramadanFAQs = [
  {
    question: 'What is Sehri (Suhoor) time in Ramadan?',
    answer: 'Sehri or Suhoor is the pre-dawn meal eaten before Fajr prayer. Muslims must stop eating at Imsak time (typically 10 minutes before Fajr) to begin the daily fast. Sehri time varies by city and calculation method.'
  },
  {
    question: 'What is Iftar time in Ramadan?',
    answer: 'Iftar is the meal eaten immediately after sunset to break the fast. The Iftar time is at Maghrib prayer, which occurs when the sun sets below the horizon. This time varies daily and differs by location.'
  },
  {
    question: 'When is Ramadan 2025?',
    answer: 'Ramadan 2025 (1446 AH) is expected to start on March 1, 2025 and end on March 29, 2025, with Eid-ul-Fitr on March 30, 2025. Dates may vary by 1 day based on moon sighting.'
  },
  {
    question: 'What is the difference between Imsak and Fajr?',
    answer: 'Imsak is the recommended time to stop eating (typically 10 minutes before Fajr prayer). Fajr is the dawn prayer time. Some communities use Fajr as Imsak, while others add a safety margin.'
  },
  {
    question: 'Why do Sehri and Iftar times differ by city?',
    answer: 'Prayer times depend on the sun\'s position relative to your location. Cities at different latitudes and longitudes have different sunrise and sunset times, so Sehri and Iftar times vary accordingly.'
  },
  {
    question: 'Which calculation method should I use for Ramadan timings?',
    answer: 'Common methods in India include MWL (Muslim World League), ISNA, and Karachi. Check with your local mosque for their preferred method. Our tool lets you compare all methods.'
  },
  {
    question: 'Can I download Ramadan timetable for the entire month?',
    answer: 'Yes! Our tool provides a downloadable .ics calendar file with all Sehri and Iftar times for the entire Ramadan month. You can add it to Google Calendar, Apple Calendar, or Outlook.'
  },
  {
    question: 'What is Taraweeh prayer timing?',
    answer: 'Taraweeh is the special nightly prayer performed after Isha during Ramadan. It is typically performed 15-30 minutes after Isha prayer time at mosques.'
  },
  {
    question: 'Is Ramadan a public holiday in India?',
    answer: 'The first day of Ramadan is not a public holiday, but Eid-ul-Fitr (the last day/celebration) is a gazetted public holiday in India. Government offices, banks, and most businesses remain closed.'
  },
  {
    question: 'How many days is Ramadan?',
    answer: 'Ramadan lasts 29 or 30 days, depending on the moon sighting. The Islamic lunar calendar month is determined by the visibility of the new crescent moon.'
  }
];

// Ramadan acts of worship
export const ramadanIbadah = [
  {
    title: 'Daily Fasting (Sawm)',
    description: 'Abstaining from food, drink, and intimate relations from Fajr (dawn) to Maghrib (sunset). One of the Five Pillars of Islam.',
    icon: '🌅'
  },
  {
    title: 'Five Daily Prayers (Salat)',
    description: 'Fajr (pre-dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), Isha (night). Extra emphasis on praying in congregation during Ramadan.',
    icon: '🕌'
  },
  {
    title: 'Taraweeh Prayer',
    description: 'Special nightly prayer performed after Isha. Typically 8-20 rakats, reciting the entire Quran over the month.',
    icon: '🌙'
  },
  {
    title: 'Quran Recitation',
    description: 'Reading and reflecting on the Quran. Many aim to complete the entire Quran (30 Juz) during Ramadan.',
    icon: '📖'
  },
  {
    title: 'Charity & Zakat',
    description: 'Increased giving to the poor and needy. Zakat al-Fitr (mandatory charity) must be paid before Eid prayer.',
    icon: '💝'
  },
  {
    title: 'Laylat al-Qadr',
    description: 'The Night of Power (last 10 nights), when the Quran was first revealed. Better than a thousand months of worship.',
    icon: '✨'
  }
];

// Ramadan health tips
export const ramadanHealthTips = [
  {
    title: 'Stay Hydrated',
    description: 'Drink plenty of water between Iftar and Sehri. Aim for 8-10 glasses to prevent dehydration.',
    category: 'Hydration'
  },
  {
    title: 'Balanced Sehri',
    description: 'Include complex carbs (oats, whole wheat), protein (eggs, yogurt), and fruits. Avoid salty and fried foods.',
    category: 'Nutrition'
  },
  {
    title: 'Break Fast Gently',
    description: 'Start Iftar with dates and water. Wait 10-15 minutes before the main meal to avoid overeating.',
    category: 'Eating Habits'
  },
  {
    title: 'Limit Caffeine',
    description: 'Reduce tea and coffee intake gradually before Ramadan to avoid withdrawal headaches during fasting.',
    category: 'Health'
  },
  {
    title: 'Light Exercise',
    description: 'Walk 30 minutes before Iftar or 2 hours after eating. Avoid intense workouts during fasting hours.',
    category: 'Fitness'
  },
  {
    title: 'Adequate Sleep',
    description: 'Get 7-8 hours of sleep. Take short naps if needed. Lack of sleep affects energy and mood.',
    category: 'Rest'
  }
];

// Important nights in Ramadan
export const importantNights = [
  {
    night: '27th Night',
    name: 'Laylat al-Qadr (Most Common)',
    description: 'The Night of Power is most commonly observed on the 27th night of Ramadan. Worship on this night is better than 1000 months.',
    significance: 'Extremely important - seek it in odd nights of last 10 days'
  },
  {
    night: '21st, 23rd, 25th, 29th Nights',
    name: 'Other Possible Laylat al-Qadr Nights',
    description: 'Prophet Muhammad (PBUH) said to seek Laylat al-Qadr in the odd nights of the last 10 days of Ramadan.',
    significance: 'Increase worship, Quran recitation, and dua'
  },
  {
    night: '15th Night',
    name: 'Mid-Ramadan',
    description: 'Marks the halfway point of Ramadan. A time for reflection on progress and renewed commitment.',
    significance: 'Assess spiritual goals and increase efforts'
  }
];




