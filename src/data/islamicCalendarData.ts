// Islamic Calendar Sync Data - Hijri to Gregorian Conversion
// Supports multiple calculation methods: Astronomical, Umm al-Qura

export interface IslamicEvent {
  id: string;
  name: string;
  hijriDate: string; // e.g., "1 Muharram"
  hijriMonth: number;
  hijriDay: number;
  gregorianDate2024: string;
  gregorianDate2025: string;
  gregorianDate2026: string;
  significance: string;
  category: 'Major' | 'Important' | 'Recommended';
  fasting?: boolean;
}

export interface HijriMonth {
  number: number;
  arabicName: string;
  englishName: string;
  significance?: string;
  days: 29 | 30;
}

export interface ConversionMethod {
  id: string;
  name: string;
  description: string;
  accuracy: string;
  recommended: boolean;
}

export interface IslamicCalendarYear {
  hijriYear: number;
  gregorianStart: string;
  gregorianEnd: string;
  description: string;
}

// Hijri months (12 lunar months)
export const hijriMonths: HijriMonth[] = [
  {
    number: 1,
    arabicName: 'المحرم',
    englishName: 'Muharram',
    significance: 'Sacred month, fasting on Ashura (10th)',
    days: 30
  },
  {
    number: 2,
    arabicName: 'صفر',
    englishName: 'Safar',
    days: 29
  },
  {
    number: 3,
    arabicName: 'ربيع الأول',
    englishName: "Rabi' al-Awwal",
    significance: "Prophet Muhammad's (PBUH) birth month",
    days: 30
  },
  {
    number: 4,
    arabicName: 'ربيع الثاني',
    englishName: "Rabi' al-Thani",
    days: 29
  },
  {
    number: 5,
    arabicName: 'جمادى الأولى',
    englishName: 'Jumada al-Awwal',
    days: 30
  },
  {
    number: 6,
    arabicName: 'جمادى الآخرة',
    englishName: 'Jumada al-Thani',
    days: 29
  },
  {
    number: 7,
    arabicName: 'رجب',
    englishName: 'Rajab',
    significance: 'Sacred month, Isra and Miraj (27th)',
    days: 30
  },
  {
    number: 8,
    arabicName: 'شعبان',
    englishName: "Sha'ban",
    significance: 'Month before Ramadan',
    days: 29
  },
  {
    number: 9,
    arabicName: 'رمضان',
    englishName: 'Ramadan',
    significance: 'Fasting month, Laylat al-Qadr',
    days: 30
  },
  {
    number: 10,
    arabicName: 'شوال',
    englishName: 'Shawwal',
    significance: 'Eid al-Fitr (1st), 6 days fasting recommended',
    days: 29
  },
  {
    number: 11,
    arabicName: 'ذو القعدة',
    englishName: "Dhu al-Qi'dah",
    significance: 'Sacred month',
    days: 30
  },
  {
    number: 12,
    arabicName: 'ذو الحجة',
    englishName: 'Dhu al-Hijjah',
    significance: 'Sacred month, Hajj, Eid al-Adha (10th), Day of Arafah (9th)',
    days: 29
  }
];

// Major Islamic events with approximate dates
export const islamicEvents: IslamicEvent[] = [
  {
    id: 'new-year',
    name: 'Islamic New Year',
    hijriDate: '1 Muharram',
    hijriMonth: 1,
    hijriDay: 1,
    gregorianDate2024: '2024-07-08',
    gregorianDate2025: '2025-06-27',
    gregorianDate2026: '2026-06-16',
    significance: 'First day of the Islamic calendar, marks the Hijrah (migration of Prophet Muhammad from Mecca to Medina)',
    category: 'Major'
  },
  {
    id: 'ashura',
    name: 'Day of Ashura',
    hijriDate: '10 Muharram',
    hijriMonth: 1,
    hijriDay: 10,
    gregorianDate2024: '2024-07-17',
    gregorianDate2025: '2025-07-06',
    gregorianDate2026: '2026-06-25',
    significance: 'Day when Prophet Moses (Musa) and the Israelites were saved from Pharaoh. Fasting is highly recommended.',
    category: 'Important',
    fasting: true
  },
  {
    id: 'mawlid',
    name: "Mawlid al-Nabi (Prophet's Birthday)",
    hijriDate: "12 Rabi' al-Awwal",
    hijriMonth: 3,
    hijriDay: 12,
    gregorianDate2024: '2024-09-16',
    gregorianDate2025: '2025-09-05',
    gregorianDate2026: '2026-08-25',
    significance: "Celebration of the birth of Prophet Muhammad (PBUH). Observed in many Muslim countries.",
    category: 'Important'
  },
  {
    id: 'isra-miraj',
    name: 'Isra and Miraj',
    hijriDate: '27 Rajab',
    hijriMonth: 7,
    hijriDay: 27,
    gregorianDate2024: '2025-02-06',
    gregorianDate2025: '2025-01-26',
    gregorianDate2026: '2026-01-15',
    significance: "Night Journey and Ascension of Prophet Muhammad (PBUH) from Mecca to Jerusalem and to the heavens.",
    category: 'Important'
  },
  {
    id: 'shaban-15',
    name: 'Mid-Sha\'ban',
    hijriDate: "15 Sha'ban",
    hijriMonth: 8,
    hijriDay: 15,
    gregorianDate2024: '2025-02-23',
    gregorianDate2025: '2025-02-13',
    gregorianDate2026: '2026-02-02',
    significance: 'Night of forgiveness. Many Muslims pray and seek forgiveness.',
    category: 'Recommended'
  },
  {
    id: 'ramadan-start',
    name: 'Start of Ramadan',
    hijriDate: '1 Ramadan',
    hijriMonth: 9,
    hijriDay: 1,
    gregorianDate2024: '2024-03-11',
    gregorianDate2025: '2025-03-01',
    gregorianDate2026: '2026-02-18',
    significance: 'Beginning of the holy month of fasting from dawn to sunset.',
    category: 'Major',
    fasting: true
  },
  {
    id: 'laylat-al-qadr',
    name: 'Laylat al-Qadr (Night of Power)',
    hijriDate: '27 Ramadan (approx)',
    hijriMonth: 9,
    hijriDay: 27,
    gregorianDate2024: '2024-04-06',
    gregorianDate2025: '2025-03-27',
    gregorianDate2026: '2026-03-16',
    significance: 'The night the Quran was first revealed. Better than a thousand months of worship. Seek it in the last 10 nights.',
    category: 'Major'
  },
  {
    id: 'eid-fitr',
    name: 'Eid al-Fitr',
    hijriDate: '1 Shawwal',
    hijriMonth: 10,
    hijriDay: 1,
    gregorianDate2024: '2024-04-10',
    gregorianDate2025: '2025-03-30',
    gregorianDate2026: '2026-03-20',
    significance: 'Festival of Breaking the Fast, celebrates the end of Ramadan.',
    category: 'Major'
  },
  {
    id: 'arafah',
    name: 'Day of Arafah',
    hijriDate: '9 Dhu al-Hijjah',
    hijriMonth: 12,
    hijriDay: 9,
    gregorianDate2024: '2024-06-16',
    gregorianDate2025: '2025-06-05',
    gregorianDate2026: '2026-05-26',
    significance: 'Pilgrims stand at Mount Arafat. Fasting highly recommended for non-pilgrims (forgives sins of 2 years).',
    category: 'Major',
    fasting: true
  },
  {
    id: 'eid-adha',
    name: 'Eid al-Adha',
    hijriDate: '10 Dhu al-Hijjah',
    hijriMonth: 12,
    hijriDay: 10,
    gregorianDate2024: '2024-06-17',
    gregorianDate2025: '2025-06-06',
    gregorianDate2026: '2026-05-27',
    significance: "Festival of Sacrifice, commemorates Prophet Ibrahim's willingness to sacrifice his son.",
    category: 'Major'
  },
  {
    id: 'tashriq-1',
    name: 'Days of Tashriq (Day 1)',
    hijriDate: '11 Dhu al-Hijjah',
    hijriMonth: 12,
    hijriDay: 11,
    gregorianDate2024: '2024-06-18',
    gregorianDate2025: '2025-06-07',
    gregorianDate2026: '2026-05-28',
    significance: 'Three days following Eid al-Adha. Pilgrims remain in Mina, stoning the pillars.',
    category: 'Recommended'
  },
  {
    id: 'tashriq-2',
    name: 'Days of Tashriq (Day 2)',
    hijriDate: '12 Dhu al-Hijjah',
    hijriMonth: 12,
    hijriDay: 12,
    gregorianDate2024: '2024-06-19',
    gregorianDate2025: '2025-06-08',
    gregorianDate2026: '2026-05-29',
    significance: 'Second day of Tashriq.',
    category: 'Recommended'
  },
  {
    id: 'tashriq-3',
    name: 'Days of Tashriq (Day 3)',
    hijriDate: '13 Dhu al-Hijjah',
    hijriMonth: 12,
    hijriDay: 13,
    gregorianDate2024: '2024-06-20',
    gregorianDate2025: '2025-06-09',
    gregorianDate2026: '2026-05-30',
    significance: 'Third and final day of Tashriq.',
    category: 'Recommended'
  }
];

// Islamic calendar years
export const islamicYears: IslamicCalendarYear[] = [
  {
    hijriYear: 1445,
    gregorianStart: '2023-07-19',
    gregorianEnd: '2024-07-07',
    description: 'Islamic Year 1445 AH'
  },
  {
    hijriYear: 1446,
    gregorianStart: '2024-07-08',
    gregorianEnd: '2025-06-26',
    description: 'Islamic Year 1446 AH'
  },
  {
    hijriYear: 1447,
    gregorianStart: '2025-06-27',
    gregorianEnd: '2026-06-15',
    description: 'Islamic Year 1447 AH'
  },
  {
    hijriYear: 1448,
    gregorianStart: '2026-06-16',
    gregorianEnd: '2027-06-05',
    description: 'Islamic Year 1448 AH'
  }
];

// Conversion methods
export const conversionMethods: ConversionMethod[] = [
  {
    id: 'astronomical',
    name: 'Astronomical Calculation',
    description: 'Based on astronomical calculations of moon phases. Predictable and consistent across all locations.',
    accuracy: 'Fixed dates, no regional variation',
    recommended: true
  },
  {
    id: 'ummalqura',
    name: 'Umm al-Qura Calendar',
    description: 'Official civil calendar of Saudi Arabia. Used for Hajj and government purposes.',
    accuracy: 'Saudi Arabia standard',
    recommended: true
  },
  {
    id: 'observational',
    name: 'Moon Sighting (Observational)',
    description: 'Based on actual moon sighting by local authorities. May vary by 1-2 days between regions.',
    accuracy: 'Varies by location and weather',
    recommended: false
  }
];

// Islamic Calendar FAQs
export const islamicCalendarFAQs = [
  {
    question: 'What is the Islamic Hijri calendar?',
    answer: 'The Islamic Hijri calendar is a lunar calendar consisting of 12 months totaling 354-355 days. It begins from the year of Prophet Muhammad\'s migration (Hijrah) from Mecca to Medina in 622 CE.'
  },
  {
    question: 'How do I convert Hijri dates to Gregorian dates?',
    answer: 'Use our Islamic Calendar Sync tool to instantly convert any Hijri date to its Gregorian equivalent. The tool supports multiple calculation methods including astronomical and Umm al-Qura.'
  },
  {
    question: 'Why do Islamic dates change every year?',
    answer: 'The Islamic calendar is lunar-based (354-355 days), about 10-11 days shorter than the Gregorian solar calendar (365 days). This causes Islamic dates to shift earlier by approximately 10-11 days each year.'
  },
  {
    question: 'What is Umm al-Qura calendar?',
    answer: 'Umm al-Qura is the official civil Hijri calendar of Saudi Arabia, used for government and Hajj purposes. It is based on astronomical calculations rather than moon sighting.'
  },
  {
    question: 'What is the difference between astronomical and observational Islamic calendar?',
    answer: 'Astronomical calendars use calculated moon phases (fixed dates), while observational calendars depend on actual moon sighting (may vary by 1-2 days based on location and weather).'
  },
  {
    question: 'When is Ramadan 2025?',
    answer: 'Ramadan 2025 (1446 AH) is expected to start on March 1, 2025 and end on March 29, 2025 (astronomical calculation). Dates may vary by 1 day based on moon sighting.'
  },
  {
    question: 'Can I download Islamic calendar for the entire year?',
    answer: 'Yes! Our tool generates a downloadable .ics calendar file with all major Islamic events for the year. You can add it to Google Calendar, Apple Calendar, or Outlook.'
  },
  {
    question: 'What are the 4 sacred months in Islam?',
    answer: 'The 4 sacred months are Muharram (1st), Rajab (7th), Dhu al-Qi\'dah (11th), and Dhu al-Hijjah (12th). During these months, warfare is forbidden and good deeds are more rewarding.'
  },
  {
    question: 'How many days are in a Hijri month?',
    answer: 'Hijri months are either 29 or 30 days, depending on the moon cycle. The Islamic year alternates between months of 29 and 30 days, totaling 354 days (355 in leap years).'
  },
  {
    question: 'Is today an Islamic holiday?',
    answer: 'Use our Islamic Calendar Sync tool to check today\'s Hijri date and see if it matches any major Islamic event. The tool automatically highlights current Islamic dates and upcoming events.'
  }
];

// Islamic calendar features
export const calendarFeatures = [
  {
    title: 'Hijri ↔ Gregorian Converter',
    description: 'Instantly convert between Islamic Hijri and Gregorian calendars with multiple calculation methods.',
    icon: '🔄'
  },
  {
    title: 'Download Full Year Calendar',
    description: 'Get a complete .ics calendar file with all major Islamic events. Sync with Google, Apple, or Outlook.',
    icon: '📅'
  },
  {
    title: 'Multiple Calculation Methods',
    description: 'Choose between Astronomical, Umm al-Qura, or Observational (moon sighting) methods.',
    icon: '🌙'
  },
  {
    title: 'City-Specific Timings',
    description: 'Get accurate prayer times and Islamic dates adjusted for your city\'s timezone.',
    icon: '🌍'
  },
  {
    title: 'Major Islamic Events',
    description: 'Track Ramadan, Eid al-Fitr, Eid al-Adha, Ashura, Mawlid, and all important Islamic dates.',
    icon: '⭐'
  },
  {
    title: 'Moon Phase Predictions',
    description: 'See predicted moon sighting dates based on astronomical calculations.',
    icon: '🌒'
  }
];

// Why Islamic calendar is different
export const calendarDifferences = [
  {
    title: 'Lunar vs Solar',
    gregorian: 'Solar calendar (365 days)',
    islamic: 'Lunar calendar (354-355 days)',
    difference: '10-11 days shorter'
  },
  {
    title: 'Year Length',
    gregorian: '365.25 days (leap year every 4 years)',
    islamic: '354.37 days (leap day every 2-3 years)',
    difference: 'Islamic year shifts ~11 days earlier annually'
  },
  {
    title: 'Month Determination',
    gregorian: 'Fixed dates (Jan always has 31 days)',
    islamic: 'Moon sighting (months are 29 or 30 days)',
    difference: 'Islamic dates can vary by 1-2 days'
  },
  {
    title: 'Starting Point',
    gregorian: 'Birth of Jesus Christ (estimated)',
    islamic: 'Hijrah (622 CE migration to Medina)',
    difference: '622 year offset'
  }
];



