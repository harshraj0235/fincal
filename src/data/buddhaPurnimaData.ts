// Buddha Purnima Data - Vaisakha Purnima (Full Moon in May)
// Dates calculated astronomically for Purnima in Vaisakha month

export interface BuddhaPurnimaDate {
  year: number;
  gregorianDate: string;
  hinduMonth: string;
  bengaliDate: string;
  tamilDate: string;
  malayalamDate: string;
  marathiDate: string;
  purnimaTithiStart: string;
  purnimaTithiEnd: string;
  moonriseTime: string;
  significance: string;
}

export interface CityTiming {
  city: string;
  state: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

// Buddha Purnima dates for 2020-2035 (Vaisakha Purnima)
export const buddhaPurnimaDates: BuddhaPurnimaDate[] = [
  {
    year: 2020,
    gregorianDate: "2020-05-07",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1427",
    tamilDate: "Vaikasi Pournami 2051",
    malayalamDate: "Vaisakha Purnima 1195",
    marathiDate: "Vaishakh Pournima 1942",
    purnimaTithiStart: "05:42 AM",
    purnimaTithiEnd: "06:18 PM",
    moonriseTime: "06:15 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2021,
    gregorianDate: "2021-05-26",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1428",
    tamilDate: "Vaikasi Pournami 2052",
    malayalamDate: "Vaisakha Purnima 1196",
    marathiDate: "Vaishakh Pournima 1943",
    purnimaTithiStart: "04:47 PM",
    purnimaTithiEnd: "07:18 PM (Next day)",
    moonriseTime: "06:45 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2022,
    gregorianDate: "2022-05-16",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1429",
    tamilDate: "Vaikasi Pournami 2053",
    malayalamDate: "Vaisakha Purnima 1197",
    marathiDate: "Vaishakh Pournima 1944",
    purnimaTithiStart: "12:14 AM",
    purnimaTithiEnd: "09:52 PM",
    moonriseTime: "06:30 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2023,
    gregorianDate: "2023-05-05",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1430",
    tamilDate: "Vaikasi Pournami 2054",
    malayalamDate: "Vaisakha Purnima 1198",
    marathiDate: "Vaishakh Pournima 1945",
    purnimaTithiStart: "09:22 PM (Prev day)",
    purnimaTithiEnd: "06:01 PM",
    moonriseTime: "06:20 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2024,
    gregorianDate: "2024-05-23",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1431",
    tamilDate: "Vaikasi Pournami 2055",
    malayalamDate: "Vaisakha Purnima 1199",
    marathiDate: "Vaishakh Pournima 1946",
    purnimaTithiStart: "03:53 PM",
    purnimaTithiEnd: "11:19 PM (Next day)",
    moonriseTime: "06:35 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2025,
    gregorianDate: "2025-05-12",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1432",
    tamilDate: "Vaikasi Pournami 2056",
    malayalamDate: "Vaisakha Purnima 1200",
    marathiDate: "Vaishakh Pournima 1947",
    purnimaTithiStart: "08:12 AM",
    purnimaTithiEnd: "03:45 PM (Next day)",
    moonriseTime: "06:25 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2026,
    gregorianDate: "2026-05-31",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1433",
    tamilDate: "Vaikasi Pournami 2057",
    malayalamDate: "Vaisakha Purnima 1201",
    marathiDate: "Vaishakh Pournima 1948",
    purnimaTithiStart: "11:25 PM (Prev day)",
    purnimaTithiEnd: "07:52 PM",
    moonriseTime: "06:50 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2027,
    gregorianDate: "2027-05-20",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1434",
    tamilDate: "Vaikasi Pournami 2058",
    malayalamDate: "Vaisakha Purnima 1202",
    marathiDate: "Vaishakh Pournima 1949",
    purnimaTithiStart: "06:18 AM",
    purnimaTithiEnd: "01:25 PM (Next day)",
    moonriseTime: "06:40 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2028,
    gregorianDate: "2028-05-09",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1435",
    tamilDate: "Vaikasi Pournami 2059",
    malayalamDate: "Vaisakha Purnima 1203",
    marathiDate: "Vaishakh Pournima 1950",
    purnimaTithiStart: "02:45 PM",
    purnimaTithiEnd: "08:15 PM",
    moonriseTime: "06:28 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2029,
    gregorianDate: "2029-05-27",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1436",
    tamilDate: "Vaikasi Pournami 2060",
    malayalamDate: "Vaisakha Purnima 1204",
    marathiDate: "Vaishakh Pournima 1951",
    purnimaTithiStart: "07:35 PM (Prev day)",
    purnimaTithiEnd: "02:12 PM",
    moonriseTime: "06:48 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  },
  {
    year: 2030,
    gregorianDate: "2030-05-16",
    hinduMonth: "Vaisakha Shukla Purnima",
    bengaliDate: "Baisakh Purnima 1437",
    tamilDate: "Vaikasi Pournami 2061",
    malayalamDate: "Vaisakha Purnima 1205",
    marathiDate: "Vaishakh Pournima 1952",
    purnimaTithiStart: "11:18 PM (Prev day)",
    purnimaTithiEnd: "06:45 PM",
    moonriseTime: "06:35 PM",
    significance: "Birth, Enlightenment & Mahaparinirvana of Gautama Buddha"
  }
];

// Major Indian cities with timing data
export const indianCities: CityTiming[] = [
  {
    city: "Delhi",
    state: "Delhi",
    sunrise: "05:32 AM",
    sunset: "07:15 PM",
    moonrise: "06:25 PM",
    moonset: "05:15 AM",
    timezone: "Asia/Kolkata",
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    sunrise: "06:05 AM",
    sunset: "07:20 PM",
    moonrise: "06:30 PM",
    moonset: "05:25 AM",
    timezone: "Asia/Kolkata",
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    sunrise: "06:00 AM",
    sunset: "06:45 PM",
    moonrise: "06:20 PM",
    moonset: "05:10 AM",
    timezone: "Asia/Kolkata",
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    sunrise: "05:50 AM",
    sunset: "06:30 PM",
    moonrise: "06:15 PM",
    moonset: "05:05 AM",
    timezone: "Asia/Kolkata",
    latitude: 13.0827,
    longitude: 80.2707
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    sunrise: "05:00 AM",
    sunset: "06:15 PM",
    moonrise: "06:10 PM",
    moonset: "04:55 AM",
    timezone: "Asia/Kolkata",
    latitude: 22.5726,
    longitude: 88.3639
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    sunrise: "05:55 AM",
    sunset: "06:40 PM",
    moonrise: "06:22 PM",
    moonset: "05:12 AM",
    timezone: "Asia/Kolkata",
    latitude: 17.3850,
    longitude: 78.4867
  },
  {
    city: "Pune",
    state: "Maharashtra",
    sunrise: "06:10 AM",
    sunset: "07:10 PM",
    moonrise: "06:28 PM",
    moonset: "05:20 AM",
    timezone: "Asia/Kolkata",
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    sunrise: "06:20 AM",
    sunset: "07:25 PM",
    moonrise: "06:35 PM",
    moonset: "05:28 AM",
    timezone: "Asia/Kolkata",
    latitude: 23.0225,
    longitude: 72.5714
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    sunrise: "05:42 AM",
    sunset: "07:18 PM",
    moonrise: "06:30 PM",
    moonset: "05:22 AM",
    timezone: "Asia/Kolkata",
    latitude: 26.9124,
    longitude: 75.7873
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
    sunrise: "05:25 AM",
    sunset: "07:05 PM",
    moonrise: "06:20 PM",
    moonset: "05:15 AM",
    timezone: "Asia/Kolkata",
    latitude: 26.8467,
    longitude: 80.9462
  }
];

export const buddhaPurnimaFAQs = [
  {
    question: "What is Buddha Purnima?",
    answer: "Buddha Purnima (also called Vesak) celebrates the birth, enlightenment (Nirvana), and death (Parinirvana) of Gautama Buddha. It falls on the full moon day (Purnima) of the Vaisakha month in the Hindu lunar calendar."
  },
  {
    question: "When is Buddha Purnima 2025?",
    answer: "Buddha Purnima 2025 falls on Monday, May 12, 2025. The Purnima Tithi starts at 08:12 AM and ends at 03:45 PM the next day."
  },
  {
    question: "Why does Buddha Purnima date change every year?",
    answer: "Buddha Purnima follows the lunar calendar, specifically the full moon (Purnima) of Vaisakha month. Since lunar months don't align with the Gregorian calendar, the date shifts by 10-11 days each year."
  },
  {
    question: "Which month is Buddha Purnima in Hindu calendar?",
    answer: "Buddha Purnima occurs in the Vaisakha month (also spelled Vaishakha), which is the second month of the Hindu lunar calendar, typically falling in April-May of the Gregorian calendar."
  },
  {
    question: "Is Buddha Purnima a public holiday in India?",
    answer: "Yes, Buddha Purnima is a gazetted public holiday in India. Government offices, post offices, and banks remain closed on this day."
  },
  {
    question: "How is Buddha Purnima celebrated in India?",
    answer: "Buddha Purnima is celebrated with prayers, meditation, reading Buddhist scriptures, offering kheer (rice pudding), decorating homes and temples, visiting Bodh Gaya and Buddhist monasteries, and practicing acts of kindness and charity."
  },
  {
    question: "What is the difference between Buddha Purnima and Vaisakhi?",
    answer: "Buddha Purnima celebrates Lord Buddha's birth on the full moon of Vaisakha month, while Vaisakhi (April 13-14) is a harvest festival and marks the Sikh New Year. They occur in the same month but on different days."
  },
  {
    question: "Can I download Buddha Purnima 2025 calendar?",
    answer: "Yes! Our tool provides a downloadable .ics calendar file that you can add to Google Calendar, Apple Calendar, Outlook, or any other calendar app."
  },
  {
    question: "What are the regional names for Buddha Purnima?",
    answer: "Buddha Purnima is known as Baisakh Purnima in Bengali, Vaikasi Pournami in Tamil, Vaishakh Purnima in Hindi/Marathi, and Buddha Jayanti in many parts of North India."
  },
  {
    question: "What is Purnima Tithi timing?",
    answer: "Purnima Tithi is the lunar day when the moon is exactly opposite the sun (full moon). It has a specific start and end time based on astronomical calculations, usually lasting 19-24 hours."
  }
];

export const buddhaTeachings = [
  {
    title: "Four Noble Truths",
    description: "Life involves suffering; suffering arises from attachment; suffering can cease; the path to the cessation of suffering is the Eightfold Path."
  },
  {
    title: "Noble Eightfold Path",
    description: "Right Understanding, Right Thought, Right Speech, Right Action, Right Livelihood, Right Effort, Right Mindfulness, Right Concentration."
  },
  {
    title: "Three Universal Truths",
    description: "Everything is impermanent and changing; impermanence leads to suffering; all things have no inherent existence (Anatta)."
  },
  {
    title: "Five Precepts",
    description: "Refrain from killing, stealing, sexual misconduct, lying, and intoxication."
  }
];

