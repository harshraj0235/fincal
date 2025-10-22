// Bihu Festival Data - Three Assamese Harvest Festivals
// Bohag Bihu (Rongali), Kati Bihu (Kongali), Magh Bihu (Bhogali)

export interface BihuDate {
  year: number;
  bohagBihu: {
    startDate: string; // Rongali Bihu (April 14-15)
    endDate: string;
    assamName: string;
    significance: string;
    timing: string;
  };
  katiBihu: {
    date: string; // Kongali Bihu (Oct 15-16)
    assamName: string;
    significance: string;
    timing: string;
  };
  maghBihu: {
    startDate: string; // Bhogali Bihu (Jan 14-15)
    endDate: string;
    assamName: string;
    significance: string;
    timing: string;
  };
}

export interface CityBihuData {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
  sunrise: string;
  sunset: string;
  bohagBihuDate: string;
}

// Bihu dates for 2024-2030
export const bihuDates: BihuDate[] = [
  {
    year: 2024,
    bohagBihu: {
      startDate: '2024-04-14',
      endDate: '2024-04-20',
      assamName: 'ব\'হাগ বিহু (Bohag Bihu)',
      significance: 'Rongali Bihu - Spring harvest festival, Assamese New Year',
      timing: 'April 14-20 (7 days)'
    },
    katiBihu: {
      date: '2024-10-16',
      assamName: 'কাতি বিহু (Kati Bihu)',
      significance: 'Kongali Bihu - Festival of prayers for good harvest',
      timing: 'October 16 (1 day)'
    },
    maghBihu: {
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      assamName: 'মাঘ বিহু (Magh Bihu)',
      significance: 'Bhogali Bihu - Harvest thanksgiving festival',
      timing: 'January 15-16 (2 days)'
    }
  },
  {
    year: 2025,
    bohagBihu: {
      startDate: '2025-04-14',
      endDate: '2025-04-20',
      assamName: 'ব\'হাগ বিহু (Bohag Bihu)',
      significance: 'Rongali Bihu - Spring harvest festival, Assamese New Year',
      timing: 'April 14-20 (7 days)'
    },
    katiBihu: {
      date: '2025-10-16',
      assamName: 'কাতি বিহু (Kati Bihu)',
      significance: 'Kongali Bihu - Festival of prayers for good harvest',
      timing: 'October 16 (1 day)'
    },
    maghBihu: {
      startDate: '2025-01-15',
      endDate: '2025-01-16',
      assamName: 'মাঘ বিহু (Magh Bihu)',
      significance: 'Bhogali Bihu - Harvest thanksgiving festival',
      timing: 'January 15-16 (2 days)'
    }
  },
  {
    year: 2026,
    bohagBihu: {
      startDate: '2026-04-14',
      endDate: '2026-04-20',
      assamName: 'ব\'হাগ বিহু (Bohag Bihu)',
      significance: 'Rongali Bihu - Spring harvest festival, Assamese New Year',
      timing: 'April 14-20 (7 days)'
    },
    katiBihu: {
      date: '2026-10-16',
      assamName: 'কাতি বিহু (Kati Bihu)',
      significance: 'Kongali Bihu - Festival of prayers for good harvest',
      timing: 'October 16 (1 day)'
    },
    maghBihu: {
      startDate: '2026-01-14',
      endDate: '2026-01-15',
      assamName: 'মাঘ বিহু (Magh Bihu)',
      significance: 'Bhogali Bihu - Harvest thanksgiving festival',
      timing: 'January 14-15 (2 days)'
    }
  },
  {
    year: 2027,
    bohagBihu: {
      startDate: '2027-04-14',
      endDate: '2027-04-20',
      assamName: 'ব\'হাগ বিহু (Bohag Bihu)',
      significance: 'Rongali Bihu - Spring harvest festival, Assamese New Year',
      timing: 'April 14-20 (7 days)'
    },
    katiBihu: {
      date: '2027-10-16',
      assamName: 'কাতি বিহু (Kati Bihu)',
      significance: 'Kongali Bihu - Festival of prayers for good harvest',
      timing: 'October 16 (1 day)'
    },
    maghBihu: {
      startDate: '2027-01-14',
      endDate: '2027-01-15',
      assamName: 'মাঘ বিহু (Magh Bihu)',
      significance: 'Bhogali Bihu - Harvest thanksgiving festival',
      timing: 'January 14-15 (2 days)'
    }
  },
  {
    year: 2028,
    bohagBihu: {
      startDate: '2028-04-14',
      endDate: '2028-04-20',
      assamName: 'ব\'হাগ বিহু (Bohag Bihu)',
      significance: 'Rongali Bihu - Spring harvest festival, Assamese New Year',
      timing: 'April 14-20 (7 days)'
    },
    katiBihu: {
      date: '2028-10-16',
      assamName: 'কাতি বিহু (Kati Bihu)',
      significance: 'Kongali Bihu - Festival of prayers for good harvest',
      timing: 'October 16 (1 day)'
    },
    maghBihu: {
      startDate: '2028-01-15',
      endDate: '2028-01-16',
      assamName: 'মাঘ বিহু (Magh Bihu)',
      significance: 'Bhogali Bihu - Harvest thanksgiving festival',
      timing: 'January 15-16 (2 days)'
    }
  },
  {
    year: 2029,
    bohagBihu: {
      startDate: '2029-04-14',
      endDate: '2029-04-20',
      assamName: 'ব\'হাগ বিহু (Bohag Bihu)',
      significance: 'Rongali Bihu - Spring harvest festival, Assamese New Year',
      timing: 'April 14-20 (7 days)'
    },
    katiBihu: {
      date: '2029-10-16',
      assamName: 'কাতি বিহু (Kati Bihu)',
      significance: 'Kongali Bihu - Festival of prayers for good harvest',
      timing: 'October 16 (1 day)'
    },
    maghBihu: {
      startDate: '2029-01-14',
      endDate: '2029-01-15',
      assamName: 'মাঘ বিহু (Magh Bihu)',
      significance: 'Bhogali Bihu - Harvest thanksgiving festival',
      timing: 'January 14-15 (2 days)'
    }
  },
  {
    year: 2030,
    bohagBihu: {
      startDate: '2030-04-14',
      endDate: '2030-04-20',
      assamName: 'ব\'হাগ বিহু (Bohag Bihu)',
      significance: 'Rongali Bihu - Spring harvest festival, Assamese New Year',
      timing: 'April 14-20 (7 days)'
    },
    katiBihu: {
      date: '2030-10-16',
      assamName: 'কাতি বিহু (Kati Bihu)',
      significance: 'Kongali Bihu - Festival of prayers for good harvest',
      timing: 'October 16 (1 day)'
    },
    maghBihu: {
      startDate: '2030-01-14',
      endDate: '2030-01-15',
      assamName: 'মাঘ বিহু (Magh Bihu)',
      significance: 'Bhogali Bihu - Harvest thanksgiving festival',
      timing: 'January 14-15 (2 days)'
    }
  }
];

// Major Assam cities
export const assamCities: CityBihuData[] = [
  {
    city: 'Guwahati',
    state: 'Assam',
    latitude: 26.1445,
    longitude: 91.7362,
    timezone: 'Asia/Kolkata',
    sunrise: '05:35 AM',
    sunset: '05:52 PM',
    bohagBihuDate: '2025-04-14'
  },
  {
    city: 'Dibrugarh',
    state: 'Assam',
    latitude: 27.4728,
    longitude: 94.9120,
    timezone: 'Asia/Kolkata',
    sunrise: '05:15 AM',
    sunset: '05:35 PM',
    bohagBihuDate: '2025-04-14'
  },
  {
    city: 'Jorhat',
    state: 'Assam',
    latitude: 26.7509,
    longitude: 94.2037,
    timezone: 'Asia/Kolkata',
    sunrise: '05:20 AM',
    sunset: '05:40 PM',
    bohagBihuDate: '2025-04-14'
  },
  {
    city: 'Silchar',
    state: 'Assam',
    latitude: 24.8333,
    longitude: 92.7789,
    timezone: 'Asia/Kolkata',
    sunrise: '05:25 AM',
    sunset: '05:45 PM',
    bohagBihuDate: '2025-04-14'
  },
  {
    city: 'Tezpur',
    state: 'Assam',
    latitude: 26.6338,
    longitude: 92.8000,
    timezone: 'Asia/Kolkata',
    sunrise: '05:28 AM',
    sunset: '05:48 PM',
    bohagBihuDate: '2025-04-14'
  },
  {
    city: 'Nagaon',
    state: 'Assam',
    latitude: 26.3473,
    longitude: 92.6869,
    timezone: 'Asia/Kolkata',
    sunrise: '05:30 AM',
    sunset: '05:50 PM',
    bohagBihuDate: '2025-04-14'
  }
];

// Bihu traditions
export const bihuTraditions = [
  {
    bihuType: 'Bohag Bihu',
    title: 'Bihu Dance & Husori',
    description: 'Young people perform traditional Bihu dance with dhol, pepa, and taal. Husori groups go door-to-door singing and dancing.',
    icon: '💃'
  },
  {
    bihuType: 'Bohag Bihu',
    title: 'Cattle Worship (Goru Bihu)',
    description: 'Wash and feed cattle with special food, tie colorful garlands around their necks to thank them for farming help.',
    icon: '🐄'
  },
  {
    bihuType: 'Magh Bihu',
    title: 'Meji & Bhelaghar',
    description: 'Build temporary huts (Bhelaghar) with bamboo and thatch, light bonfire (Meji) at dawn, feast around the fire.',
    icon: '🔥'
  },
  {
    bihuType: 'Magh Bihu',
    title: 'Community Feast',
    description: 'Prepare traditional dishes like Sunga Pitha, Til Pitha, Laru, and share with community members around Meji.',
    icon: '🍱'
  },
  {
    bihuType: 'Kati Bihu',
    title: 'Lighting Lamps (Akash Banti)',
    description: 'Light earthen lamps (akash banti) on bamboo poles in fields and homes to pray for good harvest and ward off pests.',
    icon: '🪔'
  },
  {
    bihuType: 'All Bihu',
    title: 'Traditional Attire',
    description: 'Wear traditional Mekhela Chador (women) and Dhoti-Kurta (men) with Gamosa (traditional towel).',
    icon: '👗'
  }
];

// Bihu traditional foods
export const bihuFood = [
  {
    name: 'Sunga Pitha',
    description: 'Rice cake cooked in bamboo tubes, unique smoky flavor',
    bihuType: 'Magh Bihu'
  },
  {
    name: 'Til Pitha',
    description: 'Sesame rice cakes, crispy and sweet',
    bihuType: 'Magh Bihu'
  },
  {
    name: 'Laru (Coconut Balls)',
    description: 'Sweet coconut and jaggery balls',
    bihuType: 'Magh Bihu'
  },
  {
    name: 'Pitha (Rice Cakes)',
    description: 'Various rice cakes - steamed, fried, or baked',
    bihuType: 'All Bihu'
  },
  {
    name: 'Jollpan',
    description: 'Assamese breakfast with curd, chira, muri, and fruits',
    bihuType: 'Bohag Bihu'
  },
  {
    name: 'Payox (Kheer)',
    description: 'Rice pudding with milk and jaggery',
    bihuType: 'All Bihu'
  }
];

// Bihu FAQs
export const bihuFAQs = [
  {
    question: 'When is Bohag Bihu 2025?',
    answer: 'Bohag Bihu 2025 (Rongali Bihu) starts on Monday, April 14, 2025 and continues for 7 days until April 20, 2025. It marks the Assamese New Year and spring harvest.'
  },
  {
    question: 'What are the 3 types of Bihu?',
    answer: 'The three Bihus are: Bohag Bihu/Rongali Bihu (April - spring harvest), Kati Bihu/Kongali Bihu (October - prayers for crops), and Magh Bihu/Bhogali Bihu (January - winter harvest thanksgiving).'
  },
  {
    question: 'When is Magh Bihu celebrated?',
    answer: 'Magh Bihu (Bhogali Bihu) is celebrated on January 14-15 every year. It coincides with Makar Sankranti and marks the end of the harvesting season with community feasts and bonfires (Meji).'
  },
  {
    question: 'What is Kati Bihu?',
    answer: 'Kati Bihu (Kongali Bihu) is celebrated in mid-October when granaries are empty. People light lamps (Akash Banti) in fields and homes, praying for a good harvest without elaborate feasting.'
  },
  {
    question: 'Is Bihu a public holiday in Assam?',
    answer: 'Yes, Bohag Bihu is a public holiday in Assam. Government offices, schools, and banks remain closed for 2-3 days. Magh Bihu is also observed as a holiday.'
  },
  {
    question: 'What is the significance of Bohag Bihu?',
    answer: 'Bohag Bihu celebrates the Assamese New Year (Rongali = joyous), marks the start of spring, beginning of agricultural season, and thanksgiving for the harvest. It\'s the most important of the three Bihus.'
  },
  {
    question: 'What is Meji in Magh Bihu?',
    answer: 'Meji is a bonfire lit at dawn during Magh Bihu. People build temporary huts (Bhelaghar) around it, burn them at dawn, and have community feasts with traditional pithas and larus.'
  },
  {
    question: 'How long does Bohag Bihu last?',
    answer: 'Bohag Bihu lasts for 7 days from April 14 to April 20. The first 3 days have special names: Goru Bihu (cattle day), Manuh Bihu (people day), and Gosai Bihu (deity day).'
  },
  {
    question: 'What is Bihu dance?',
    answer: 'Bihu dance is a traditional Assamese folk dance performed during Bohag Bihu. Young men and women dance with energetic movements to the beats of dhol (drum), pepa (horn), and taal (cymbals).'
  },
  {
    question: 'Can I download Bihu 2025 calendar?',
    answer: 'Yes! Our tool provides a downloadable .ics calendar file with all three Bihu festivals (Bohag, Kati, Magh) that you can add to Google Calendar, Apple Calendar, or Outlook.'
  }
];

// 7 days of Bohag Bihu
export const bohagBihuDays = [
  {
    day: 1,
    name: 'Goru Bihu',
    assamName: 'গৰু বিহু',
    description: 'Cattle are washed, fed special food, and worshipped with garlands',
    activities: ['Wash cattle', 'Feed jaggery and vegetables', 'Tie colorful garlands']
  },
  {
    day: 2,
    name: 'Manuh Bihu',
    assamName: 'মানুহ বিহু',
    description: 'People take oil baths, wear new clothes, seek blessings from elders',
    activities: ['Holy bath', 'Wear new clothes', 'Touch elders\' feet', 'Exchange gifts']
  },
  {
    day: 3,
    name: 'Gosai Bihu',
    assamName: 'গোঁসাই বিহু',
    description: 'Deity worship day, visit temples, offer prayers',
    activities: ['Temple visits', 'Puja at home', 'Offerings to gods']
  },
  {
    day: 4,
    name: 'Kutum Bihu',
    assamName: 'কুটুম বিহু',
    description: 'Visit relatives and friends, exchange greetings',
    activities: ['Family visits', 'Exchange sweets', 'Bihu songs']
  },
  {
    day: 5,
    name: 'Senehi Bihu',
    assamName: 'চেনেহী বিহু',
    description: 'Day for lovers and friends to celebrate together',
    activities: ['Friend gatherings', 'Bihu dance', 'Music performances']
  },
  {
    day: 6,
    name: 'Mela Bihu',
    assamName: 'মেলা বিহু',
    description: 'Fair and market day, cultural programs',
    activities: ['Attend fairs', 'Shop for goods', 'Cultural shows']
  },
  {
    day: 7,
    name: 'Chera Bihu',
    assamName: 'চেৰা বিহু',
    description: 'Final day, farewell to Bihu season',
    activities: ['Final celebrations', 'Community gatherings', 'Farewell rituals']
  }
];



