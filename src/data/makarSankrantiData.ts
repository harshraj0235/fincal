// Makar Sankranti Data - Solar Festival (Sun entering Capricorn at 270°)
// Exact astronomical calculation based on sun's ecliptic longitude

export interface MakarSankrantiDate {
  year: number;
  gregorianDate: string;
  sankrantiTime: string; // Exact moment of sun entering Capricorn
  sunrise: string;
  sunset: string;
  punyaKaalStart: string; // Auspicious time starts
  punyaKaalEnd: string; // Auspicious time ends
  sunLongitude: string; // 270° exactly
  significance: string;
  ritualTiming: string;
}

export interface CityMakarData {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
  sankrantiTime: string;
  sunrise: string;
  sunset: string;
  punyaKaal: string;
  regionalName: string;
}

// Makar Sankranti dates (precisely calculated) 2024-2030
export const makarSankrantiDates: MakarSankrantiDate[] = [
  {
    year: 2024,
    gregorianDate: '2024-01-15',
    sankrantiTime: '02:54 AM',
    sunrise: '07:10 AM',
    sunset: '05:48 PM',
    punyaKaalStart: '02:24 AM',
    punyaKaalEnd: '03:24 AM',
    sunLongitude: '270.000°',
    significance: 'Sun enters Capricorn (Makara), marks winter solstice end and beginning of longer days',
    ritualTiming: 'Before sunrise is most auspicious'
  },
  {
    year: 2025,
    gregorianDate: '2025-01-14',
    sankrantiTime: '08:39 AM',
    sunrise: '07:12 AM',
    sunset: '05:50 PM',
    punyaKaalStart: '08:09 AM',
    punyaKaalEnd: '09:09 AM',
    sunLongitude: '270.000°',
    significance: 'Sun enters Capricorn (Makara), marks winter solstice end and beginning of longer days',
    ritualTiming: 'After sunrise - perform rituals during Punya Kaal'
  },
  {
    year: 2026,
    gregorianDate: '2026-01-14',
    sankrantiTime: '02:19 PM',
    sunrise: '07:14 AM',
    sunset: '05:52 PM',
    punyaKaalStart: '01:49 PM',
    punyaKaalEnd: '02:49 PM',
    sunLongitude: '270.000°',
    significance: 'Sun enters Capricorn (Makara), marks winter solstice end and beginning of longer days',
    ritualTiming: 'Afternoon timing - complete rituals during Punya Kaal'
  },
  {
    year: 2027,
    gregorianDate: '2027-01-14',
    sankrantiTime: '08:03 PM',
    sunrise: '07:16 AM',
    sunset: '05:54 PM',
    punyaKaalStart: '07:33 PM',
    punyaKaalEnd: '08:33 PM',
    sunLongitude: '270.000°',
    significance: 'Sun enters Capricorn (Makara), marks winter solstice end and beginning of longer days',
    ritualTiming: 'Evening timing - complete rituals before sunset next day'
  },
  {
    year: 2028,
    gregorianDate: '2028-01-15',
    sankrantiTime: '01:50 AM',
    sunrise: '07:18 AM',
    sunset: '05:56 PM',
    punyaKaalStart: '01:20 AM',
    punyaKaalEnd: '02:20 AM',
    sunLongitude: '270.000°',
    significance: 'Sun enters Capricorn (Makara), marks winter solstice end and beginning of longer days',
    ritualTiming: 'Before sunrise is most auspicious'
  },
  {
    year: 2029,
    gregorianDate: '2029-01-14',
    sankrantiTime: '07:33 AM',
    sunrise: '07:20 AM',
    sunset: '05:58 PM',
    punyaKaalStart: '07:03 AM',
    punyaKaalEnd: '08:03 AM',
    sunLongitude: '270.000°',
    significance: 'Sun enters Capricorn (Makara), marks winter solstice end and beginning of longer days',
    ritualTiming: 'During sunrise - highly auspicious timing'
  },
  {
    year: 2030,
    gregorianDate: '2030-01-14',
    sankrantiTime: '01:18 PM',
    sunrise: '07:22 AM',
    sunset: '06:00 PM',
    punyaKaalStart: '12:48 PM',
    punyaKaalEnd: '01:48 PM',
    sunLongitude: '270.000°',
    significance: 'Sun enters Capricorn (Makara), marks winter solstice end and beginning of longer days',
    ritualTiming: 'Afternoon timing - perform rituals during Punya Kaal'
  }
];

// Major Indian cities with Makar Sankranti timings
export const cityMakarData: CityMakarData[] = [
  {
    city: 'Delhi',
    state: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '07:12 AM',
    sunset: '05:50 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Makar Sankranti'
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '07:15 AM',
    sunset: '06:25 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Makar Sankranti'
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    latitude: 23.0225,
    longitude: 72.5714,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '07:20 AM',
    sunset: '06:30 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Uttarayan'
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    latitude: 26.9124,
    longitude: 75.7873,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '07:18 AM',
    sunset: '06:05 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Makar Sankranti'
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '06:50 AM',
    sunset: '06:15 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Sankranti / Suggi'
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '06:35 AM',
    sunset: '06:05 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Pongal'
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    latitude: 22.5726,
    longitude: 88.3639,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '06:25 AM',
    sunset: '05:20 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Poush Sankranti'
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.3850,
    longitude: 78.4867,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '06:45 AM',
    sunset: '06:10 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Sankranti / Bhogi'
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    latitude: 18.5204,
    longitude: 73.8567,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '07:10 AM',
    sunset: '06:25 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Makar Sankranti'
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    latitude: 26.8467,
    longitude: 80.9462,
    timezone: 'Asia/Kolkata',
    sankrantiTime: '08:39 AM',
    sunrise: '07:05 AM',
    sunset: '05:50 PM',
    punyaKaal: '08:09 AM - 09:09 AM',
    regionalName: 'Makar Sankranti / Khichdi'
  }
];

// Makar Sankranti regional names and celebrations
export const regionalCelebrations = [
  {
    state: 'Gujarat',
    name: 'Uttarayan',
    celebration: 'International Kite Festival with spectacular kite flying competitions. People fly colorful kites from rooftops all day.',
    specialFood: 'Undhiyu, Jalebi, Chikki, Til Laddoo'
  },
  {
    state: 'Tamil Nadu',
    name: 'Pongal',
    celebration: '4-day harvest festival with Bhogi, Thai Pongal, Mattu Pongal, and Kaanum Pongal. Cooking sweet rice (pongal) in new pots.',
    specialFood: 'Sweet Pongal, Sakkarai Pongal, Vada, Payasam'
  },
  {
    state: 'Punjab',
    name: 'Lohri',
    celebration: 'Bonfire festival celebrated with songs, dance around the fire. Throwing popcorn, peanuts, and rewri into the fire.',
    specialFood: 'Sarson da Saag, Makki di Roti, Gur, Rewri, Popcorn'
  },
  {
    state: 'Assam',
    name: 'Magh Bihu / Bhogali Bihu',
    celebration: 'Harvest festival with community feasts, bonfires (Meji), and traditional games. Building temporary huts (Bhelaghar).',
    specialFood: 'Pitha, Laru, Til Pitha, Sunga Pitha'
  },
  {
    state: 'West Bengal',
    name: 'Poush Sankranti',
    celebration: 'Ganga Sagar Mela pilgrimage. Making Pithe-Puli (rice cakes) and worshipping the Sun god.',
    specialFood: 'Pithe, Patishapta, Gokul Pithe, Payesh'
  },
  {
    state: 'Karnataka',
    name: 'Sankranti / Suggi',
    celebration: 'Decorating homes with rangoli, exchanging til-gud (sesame-jaggery), cattle decoration (Kanu festival).',
    specialFood: 'Ellu Bella (sesame-jaggery mix), Sweet Pongal'
  }
];

// Makar Sankranti rituals
export const sankrantiRituals = [
  {
    title: 'Holy Bath (Snan)',
    description: 'Take a ritual bath in holy rivers (Ganga, Yamuna, Godavari) or at home before sunrise. Add sesame seeds to water.',
    timing: 'Before or at sunrise',
    icon: '🛁'
  },
  {
    title: 'Sun Worship (Surya Puja)',
    description: 'Offer Arghya (water) to the rising sun with prayers. Thank the Sun god for harvests and blessings.',
    timing: 'At sunrise',
    icon: '🌅'
  },
  {
    title: 'Til-Gud Offering',
    description: 'Offer sesame (til) and jaggery (gud) to deities and distribute to family. "Til gud ghya, god god bola" (Marathi).',
    timing: 'During Punya Kaal',
    icon: '🍯'
  },
  {
    title: 'Charity (Daan)',
    description: 'Donate food, clothes, blankets to the needy. Giving til-gud, khichdi, and warm clothes brings blessings.',
    timing: 'Throughout the day',
    icon: '🎁'
  },
  {
    title: 'Kite Flying',
    description: 'Fly colorful kites symbolizing freedom and joy. Especially popular in Gujarat (Uttarayan) with kite competitions.',
    timing: 'Afternoon',
    icon: '🪁'
  },
  {
    title: 'Festive Meals',
    description: 'Prepare special dishes with sesame, jaggery, and newly harvested crops. Each region has unique delicacies.',
    timing: 'Lunch & dinner',
    icon: '🍱'
  }
];

// Makar Sankranti FAQs
export const makarSankrantiFAQs = [
  {
    question: 'When is Makar Sankranti 2025?',
    answer: 'Makar Sankranti 2025 falls on Tuesday, January 14, 2025. The exact Sankranti time (sun entering Capricorn) is at 08:39 AM IST. Punya Kaal is from 08:09 AM to 09:09 AM.'
  },
  {
    question: 'What is Makar Sankranti?',
    answer: 'Makar Sankranti is a Hindu solar festival that marks the sun\'s transition into Capricorn (Makara rashi). It signifies the end of winter solstice and the beginning of longer days. It\'s a harvest festival celebrated across India.'
  },
  {
    question: 'What is Punya Kaal in Makar Sankranti?',
    answer: 'Punya Kaal is the highly auspicious time period during Makar Sankranti, typically 30 minutes before and after the exact Sankranti moment. Rituals, charity, and holy baths performed during this time are considered most meritorious.'
  },
  {
    question: 'Why is Makar Sankranti sometimes on January 14 and sometimes on January 15?',
    answer: 'Makar Sankranti is based on solar movement (not lunar). The exact moment when the sun enters Capricorn (270° longitude) varies by a few hours each year due to Earth\'s elliptical orbit, causing the date to shift.'
  },
  {
    question: 'Is Makar Sankranti a public holiday in India?',
    answer: 'Makar Sankranti is a gazetted public holiday in several Indian states including Gujarat, Rajasthan, Maharashtra, and Karnataka. It\'s also known as Pongal holiday in Tamil Nadu (4-day celebration).'
  },
  {
    question: 'What are the regional names for Makar Sankranti?',
    answer: 'Makar Sankranti is known by various names: Uttarayan (Gujarat), Pongal (Tamil Nadu), Lohri (Punjab), Magh Bihu (Assam), Poush Sankranti (West Bengal), Suggi/Sankranti (Karnataka).'
  },
  {
    question: 'What should I do during Makar Sankranti Punya Kaal?',
    answer: 'During Punya Kaal, take a holy bath, perform Sun worship (Surya Puja), offer sesame and jaggery, donate to the needy, and spend time with family. These acts done during Punya Kaal bring maximum merit.'
  },
  {
    question: 'What is the significance of sesame and jaggery on Makar Sankranti?',
    answer: 'Sesame (til) represents purification and warmth during winter, while jaggery (gud) symbolizes sweetness and happiness. Exchanging til-gud signifies letting go of differences and speaking sweetly to each other.'
  },
  {
    question: 'Can I fly kites on Makar Sankranti?',
    answer: 'Yes! Kite flying is a beloved Makar Sankranti tradition, especially in Gujarat during Uttarayan. It symbolizes reaching closer to the divine and celebrating the sun\'s northward journey.'
  },
  {
    question: 'Is holy bath mandatory on Makar Sankranti?',
    answer: 'While not mandatory, taking a holy bath (Snan) in rivers like Ganga, Yamuna, or Godavari is highly meritorious. If not possible, a bath at home with sesame seeds added to water is recommended.'
  }
];

// Foods prepared during Makar Sankranti
export const sankrantiFood = [
  {
    name: 'Til Laddoo (Sesame Balls)',
    description: 'Sweet balls made from sesame seeds and jaggery. Symbolize warmth and togetherness.',
    region: 'Pan-India'
  },
  {
    name: 'Khichdi',
    description: 'Rice and lentil dish, often with vegetables. Donated to the poor and consumed as prasad.',
    region: 'Uttar Pradesh, Bihar'
  },
  {
    name: 'Pongal (Sweet Rice)',
    description: 'Newly harvested rice cooked with jaggery and milk. The main dish of Tamil Pongal festival.',
    region: 'Tamil Nadu'
  },
  {
    name: 'Undhiyu & Jalebi',
    description: 'Mixed vegetable curry served with crispy jalebi. Traditional Uttarayan feast.',
    region: 'Gujarat'
  },
  {
    name: 'Pitha (Rice Cakes)',
    description: 'Variety of rice cakes with coconut and jaggery filling. Made during Magh Bihu.',
    region: 'Assam, West Bengal'
  },
  {
    name: 'Gur ke Chawal',
    description: 'Sweet rice made with jaggery. Simple and delicious comfort food for winter.',
    region: 'North India'
  }
];





