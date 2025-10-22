// Eid Date Data - Hijri to Gregorian Calendar Conversion
// Dates based on Umm al-Qura calendar (Saudi Arabia standard)
// Note: Actual dates may vary by 1-2 days based on moon sighting in different regions

export interface EidDate {
  year: number; // Hijri year
  gregorianYear: number;
  eidType: 'Eid-ul-Fitr' | 'Eid-ul-Adha';
  hijriDate: string;
  hijriMonth: string;
  hijriDay: number;
  gregorianDate: string;
  ramadanStart?: string; // For Eid-ul-Fitr
  dhuAlHijjahStart?: string; // For Eid-ul-Adha
  significance: string;
  moonSightingNote: string;
}

export interface CityEidTiming {
  city: string;
  state: string;
  eidPrayerTime: string;
  sunrise: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

// Eid-ul-Fitr dates (1st Shawwal) - 2024-2030
export const eidUlFitrDates: EidDate[] = [
  {
    year: 1445,
    gregorianYear: 2024,
    eidType: 'Eid-ul-Fitr',
    hijriDate: '1 Shawwal 1445 AH',
    hijriMonth: 'Shawwal',
    hijriDay: 1,
    gregorianDate: '2024-04-10',
    ramadanStart: '2024-03-11',
    significance: 'Festival of Breaking the Fast after Ramadan',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1446,
    gregorianYear: 2025,
    eidType: 'Eid-ul-Fitr',
    hijriDate: '1 Shawwal 1446 AH',
    hijriMonth: 'Shawwal',
    hijriDay: 1,
    gregorianDate: '2025-03-30',
    ramadanStart: '2025-03-01',
    significance: 'Festival of Breaking the Fast after Ramadan',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1447,
    gregorianYear: 2026,
    eidType: 'Eid-ul-Fitr',
    hijriDate: '1 Shawwal 1447 AH',
    hijriMonth: 'Shawwal',
    hijriDay: 1,
    gregorianDate: '2026-03-20',
    ramadanStart: '2026-02-18',
    significance: 'Festival of Breaking the Fast after Ramadan',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1448,
    gregorianYear: 2027,
    eidType: 'Eid-ul-Fitr',
    hijriDate: '1 Shawwal 1448 AH',
    hijriMonth: 'Shawwal',
    hijriDay: 1,
    gregorianDate: '2027-03-09',
    ramadanStart: '2027-02-08',
    significance: 'Festival of Breaking the Fast after Ramadan',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1449,
    gregorianYear: 2028,
    eidType: 'Eid-ul-Fitr',
    hijriDate: '1 Shawwal 1449 AH',
    hijriMonth: 'Shawwal',
    hijriDay: 1,
    gregorianDate: '2028-02-26',
    ramadanStart: '2028-01-28',
    significance: 'Festival of Breaking the Fast after Ramadan',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1450,
    gregorianYear: 2029,
    eidType: 'Eid-ul-Fitr',
    hijriDate: '1 Shawwal 1450 AH',
    hijriMonth: 'Shawwal',
    hijriDay: 1,
    gregorianDate: '2029-02-14',
    ramadanStart: '2029-01-16',
    significance: 'Festival of Breaking the Fast after Ramadan',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1451,
    gregorianYear: 2030,
    eidType: 'Eid-ul-Fitr',
    hijriDate: '1 Shawwal 1451 AH',
    hijriMonth: 'Shawwal',
    hijriDay: 1,
    gregorianDate: '2030-02-04',
    ramadanStart: '2030-01-06',
    significance: 'Festival of Breaking the Fast after Ramadan',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  }
];

// Eid-ul-Adha dates (10th Dhu al-Hijjah) - 2024-2030
export const eidUlAdhaDates: EidDate[] = [
  {
    year: 1445,
    gregorianYear: 2024,
    eidType: 'Eid-ul-Adha',
    hijriDate: '10 Dhu al-Hijjah 1445 AH',
    hijriMonth: 'Dhu al-Hijjah',
    hijriDay: 10,
    gregorianDate: '2024-06-17',
    dhuAlHijjahStart: '2024-06-08',
    significance: 'Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1446,
    gregorianYear: 2025,
    eidType: 'Eid-ul-Adha',
    hijriDate: '10 Dhu al-Hijjah 1446 AH',
    hijriMonth: 'Dhu al-Hijjah',
    hijriDay: 10,
    gregorianDate: '2025-06-06',
    dhuAlHijjahStart: '2025-05-28',
    significance: 'Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1447,
    gregorianYear: 2026,
    eidType: 'Eid-ul-Adha',
    hijriDate: '10 Dhu al-Hijjah 1447 AH',
    hijriMonth: 'Dhu al-Hijjah',
    hijriDay: 10,
    gregorianDate: '2026-05-27',
    dhuAlHijjahStart: '2026-05-18',
    significance: 'Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1448,
    gregorianYear: 2027,
    eidType: 'Eid-ul-Adha',
    hijriDate: '10 Dhu al-Hijjah 1448 AH',
    hijriMonth: 'Dhu al-Hijjah',
    hijriDay: 10,
    gregorianDate: '2027-05-16',
    dhuAlHijjahStart: '2027-05-07',
    significance: 'Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1449,
    gregorianYear: 2028,
    eidType: 'Eid-ul-Adha',
    hijriDate: '10 Dhu al-Hijjah 1449 AH',
    hijriMonth: 'Dhu al-Hijjah',
    hijriDay: 10,
    gregorianDate: '2028-05-05',
    dhuAlHijjahStart: '2028-04-26',
    significance: 'Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1450,
    gregorianYear: 2029,
    eidType: 'Eid-ul-Adha',
    hijriDate: '10 Dhu al-Hijjah 1450 AH',
    hijriMonth: 'Dhu al-Hijjah',
    hijriDay: 10,
    gregorianDate: '2029-04-24',
    dhuAlHijjahStart: '2029-04-15',
    significance: 'Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  },
  {
    year: 1451,
    gregorianYear: 2030,
    eidType: 'Eid-ul-Adha',
    hijriDate: '10 Dhu al-Hijjah 1451 AH',
    hijriMonth: 'Dhu al-Hijjah',
    hijriDay: 10,
    gregorianDate: '2030-04-13',
    dhuAlHijjahStart: '2030-04-04',
    significance: 'Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son',
    moonSightingNote: 'Date may vary by 1 day based on local moon sighting'
  }
];

// All Eid dates combined
export const allEidDates = [...eidUlFitrDates, ...eidUlAdhaDates].sort((a, b) => 
  new Date(a.gregorianDate).getTime() - new Date(b.gregorianDate).getTime()
);

// Major Indian cities with Eid prayer timings
export const indianCitiesEid: CityEidTiming[] = [
  {
    city: 'Delhi',
    state: 'Delhi',
    eidPrayerTime: '06:30 AM',
    sunrise: '05:45 AM',
    timezone: 'Asia/Kolkata',
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    eidPrayerTime: '06:45 AM',
    sunrise: '06:15 AM',
    timezone: 'Asia/Kolkata',
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    eidPrayerTime: '06:15 AM',
    sunrise: '05:50 AM',
    timezone: 'Asia/Kolkata',
    latitude: 17.3850,
    longitude: 78.4867
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    eidPrayerTime: '06:20 AM',
    sunrise: '06:00 AM',
    timezone: 'Asia/Kolkata',
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    eidPrayerTime: '05:45 AM',
    sunrise: '05:00 AM',
    timezone: 'Asia/Kolkata',
    latitude: 22.5726,
    longitude: 88.3639
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    eidPrayerTime: '06:10 AM',
    sunrise: '05:30 AM',
    timezone: 'Asia/Kolkata',
    latitude: 26.8467,
    longitude: 80.9462
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    eidPrayerTime: '06:50 AM',
    sunrise: '06:20 AM',
    timezone: 'Asia/Kolkata',
    latitude: 23.0225,
    longitude: 72.5714
  },
  {
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    eidPrayerTime: '06:00 AM',
    sunrise: '05:15 AM',
    timezone: 'Asia/Kolkata',
    latitude: 34.0837,
    longitude: 74.7973
  },
  {
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    eidPrayerTime: '06:25 AM',
    sunrise: '05:55 AM',
    timezone: 'Asia/Kolkata',
    latitude: 23.2599,
    longitude: 77.4126
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    eidPrayerTime: '06:10 AM',
    sunrise: '05:50 AM',
    timezone: 'Asia/Kolkata',
    latitude: 13.0827,
    longitude: 80.2707
  }
];

// Eid FAQs
export const eidFAQs = [
  {
    question: 'What is Eid-ul-Fitr?',
    answer: 'Eid-ul-Fitr, also known as the "Festival of Breaking the Fast," is celebrated on the 1st of Shawwal (10th month) in the Islamic Hijri calendar. It marks the end of Ramadan, the holy month of fasting, and is one of the two major Islamic festivals.'
  },
  {
    question: 'What is Eid-ul-Adha?',
    answer: 'Eid-ul-Adha, the "Festival of Sacrifice," is celebrated on the 10th of Dhu al-Hijjah (12th month) in the Hijri calendar. It honors Prophet Ibrahim\'s willingness to sacrifice his son as an act of obedience to God. It coincides with the Hajj pilgrimage.'
  },
  {
    question: 'When is Eid 2025 in India?',
    answer: 'Eid-ul-Fitr 2025 is expected on March 30, 2025 (1 Shawwal 1446 AH). Eid-ul-Adha 2025 is expected on June 6, 2025 (10 Dhu al-Hijjah 1446 AH). Dates may vary by 1 day based on moon sighting.'
  },
  {
    question: 'Why does Eid date change every year?',
    answer: 'Eid follows the Islamic Hijri lunar calendar, which is about 10-11 days shorter than the Gregorian solar calendar. This causes Eid to shift earlier by approximately 10-11 days each year in the Gregorian calendar.'
  },
  {
    question: 'How is Eid date determined?',
    answer: 'Eid date is determined by the sighting of the crescent moon. In most countries, astronomical calculations are used alongside traditional moon sighting. The date may vary by 1-2 days between regions based on local moon visibility.'
  },
  {
    question: 'Is Eid a public holiday in India?',
    answer: 'Yes, both Eid-ul-Fitr and Eid-ul-Adha are gazetted public holidays in India. Government offices, post offices, and banks remain closed. Schools and most private offices also observe these holidays.'
  },
  {
    question: 'What is the difference between Eid-ul-Fitr and Eid-ul-Adha?',
    answer: 'Eid-ul-Fitr celebrates the end of Ramadan fasting and is on 1st Shawwal. Eid-ul-Adha celebrates Prophet Ibrahim\'s sacrifice and is on 10th Dhu al-Hijjah, coinciding with Hajj. Both involve prayers, charity, and festive meals.'
  },
  {
    question: 'What is the Hijri calendar?',
    answer: 'The Hijri calendar, also called the Islamic or Lunar calendar, is a purely lunar calendar of 12 months totaling 354-355 days. It begins from the year of Prophet Muhammad\'s migration (Hijra) from Mecca to Medina in 622 CE.'
  },
  {
    question: 'How to convert Hijri date to Gregorian date?',
    answer: 'Use our Eid Date Converter tool to instantly convert any Hijri date to its Gregorian equivalent. The tool uses the Umm al-Qura calendar (Saudi Arabia standard) for accurate conversions.'
  },
  {
    question: 'Can I download Eid 2025 calendar?',
    answer: 'Yes! Our tool provides a downloadable .ics calendar file that you can add to Google Calendar, Apple Calendar, Outlook, or any other calendar app. Never miss Eid celebrations!'
  }
];

// Hijri months
export const hijriMonths = [
  { number: 1, arabic: 'Muharram', english: 'Muharram' },
  { number: 2, arabic: 'Safar', english: 'Safar' },
  { number: 3, arabic: 'Rabi\' al-Awwal', english: 'Rabi\' al-Awwal' },
  { number: 4, arabic: 'Rabi\' al-Thani', english: 'Rabi\' al-Thani' },
  { number: 5, arabic: 'Jumada al-Awwal', english: 'Jumada al-Awwal' },
  { number: 6, arabic: 'Jumada al-Thani', english: 'Jumada al-Thani' },
  { number: 7, arabic: 'Rajab', english: 'Rajab' },
  { number: 8, arabic: 'Sha\'ban', english: 'Sha\'ban' },
  { number: 9, arabic: 'Ramadan', english: 'Ramadan' },
  { number: 10, arabic: 'Shawwal', english: 'Shawwal' },
  { number: 11, arabic: 'Dhu al-Qi\'dah', english: 'Dhu al-Qi\'dah' },
  { number: 12, arabic: 'Dhu al-Hijjah', english: 'Dhu al-Hijjah' }
];

// Eid traditions
export const eidTraditions = [
  {
    title: 'Eid Prayer (Salat al-Eid)',
    description: 'Special congregational prayer performed in the morning at mosques or open grounds. Muslims gather in large numbers wearing new or best clothes.'
  },
  {
    title: 'Zakat al-Fitr (Charity)',
    description: 'Mandatory charity given before Eid prayer (Eid-ul-Fitr) to help the poor celebrate. Typically food items or monetary equivalent.'
  },
  {
    title: 'Festive Meals & Sweets',
    description: 'Special dishes like biryani, sheer khurma (vermicelli pudding), kebabs, and various sweets are prepared and shared with family, friends, and neighbors.'
  },
  {
    title: 'Eid Greetings (Eid Mubarak)',
    description: 'Exchanging greetings of "Eid Mubarak" (Blessed Eid) and hugging three times. Visiting relatives and friends to celebrate together.'
  },
  {
    title: 'Gifts & Eidi',
    description: 'Giving gifts and Eidi (money) to children and loved ones. Adults also exchange presents and sweets.'
  },
  {
    title: 'Qurbani (Sacrifice) - Eid-ul-Adha',
    description: 'Sacrificing an animal (goat, sheep, cow, or camel) and distributing meat in three parts: family, relatives, and the poor.'
  }
];





