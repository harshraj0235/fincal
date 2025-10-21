// Comprehensive Puja Vidhi Database - Free Resource
// Data compiled from Wikipedia, DrikPanchang, Hindu scriptures, and verified sources

export interface MantraData {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

export interface PujaStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
  tips?: string;
}

export interface SamagriItem {
  name: string;
  quantity: string;
  optional?: boolean;
  purpose: string;
}

export interface PujaVidhiData {
  id: string;
  deity: string;
  festival: string;
  description: string;
  significance: string;
  duration: string;
  bestTime: string;
  samagri: SamagriItem[];
  steps: PujaStep[];
  mantras: MantraData[];
  offerings: string[];
  regionalVariations: { [key: string]: string };
  dos: string[];
  donts: string[];
  benefits: string[];
}

export const PUJA_VIDHI_DATABASE: PujaVidhiData[] = [
  {
    id: 'lakshmi-diwali',
    deity: 'Goddess Lakshmi',
    festival: 'Diwali',
    description: 'Lakshmi Puja performed on Diwali night to invite wealth, prosperity, and blessings of Goddess Lakshmi into the home.',
    significance: 'Diwali night is considered the most auspicious time to worship Goddess Lakshmi. She visits homes that are clean, well-lit, and filled with devotion.',
    duration: '45-60 minutes',
    bestTime: 'Pradosh Kaal (after sunset)',
    samagri: [
      { name: 'Lakshmi Idol/Picture', quantity: '1', optional: false, purpose: 'Main deity for worship' },
      { name: 'Ganesha Idol/Picture', quantity: '1', optional: false, purpose: 'Remove obstacles' },
      { name: 'Red Cloth', quantity: '1 piece', optional: false, purpose: 'Base for altar' },
      { name: 'Diyas (Oil Lamps)', quantity: '11-21', optional: false, purpose: 'Light and positive energy' },
      { name: 'Flowers (Red/Yellow)', quantity: '2 handfuls', optional: false, purpose: 'Offering to deity' },
      { name: 'Incense Sticks', quantity: '5-11', optional: false, purpose: 'Fragrance and purification' },
      { name: 'Camphor', quantity: '2-3 pieces', optional: false, purpose: 'For aarti' },
      { name: 'Kumkum & Turmeric', quantity: '1 small bowl each', optional: false, purpose: 'Tilak and decoration' },
      { name: 'Rice (Akshat)', quantity: '1 bowl', optional: false, purpose: 'Offering' },
      { name: 'Coins (New)', quantity: '11-21', optional: false, purpose: 'Symbol of wealth' },
      { name: 'Sweets (Ladoo/Barfi)', quantity: '250g', optional: false, purpose: 'Prasad' },
      { name: 'Fruits', quantity: '5 varieties', optional: false, purpose: 'Offering' },
      { name: 'Betel Leaves', quantity: '11-21', optional: false, purpose: 'Offering' },
      { name: 'Supari (Areca Nut)', quantity: '11-21', optional: false, purpose: 'Offering' },
      { name: 'Kalash (Water Pot)', quantity: '1', optional: false, purpose: 'Sacred water' },
      { name: 'Coconut', quantity: '1', optional: false, purpose: 'Offering' },
      { name: 'Ghee', quantity: '100ml', optional: false, purpose: 'For diyas' },
      { name: 'Cotton Wicks', quantity: '21-51', optional: false, purpose: 'For lighting diyas' },
      { name: 'Lotus/Rose Garland', quantity: '1', optional: true, purpose: 'Decoration' },
      { name: 'Silver Coin', quantity: '1', optional: true, purpose: 'Special offering' }
    ],
    steps: [
      {
        step: 1,
        title: 'Preparation & Cleaning',
        description: 'Clean your home thoroughly, especially the puja area. Take a bath and wear fresh, clean clothes. Traditional red, yellow, or white clothes are preferred.',
        duration: '30 mins',
        tips: 'Start cleaning in the morning. Declutter the space where you will perform puja.'
      },
      {
        step: 2,
        title: 'Setup the Altar',
        description: 'Spread the red cloth on a clean platform. Place Ganesha idol on the right and Lakshmi idol/picture in the center. Arrange a small kalash filled with water and mango leaves.',
        duration: '10 mins',
        tips: 'Face the altar towards North or East direction for maximum positive energy.'
      },
      {
        step: 3,
        title: 'Light the Diyas',
        description: 'Light all the diyas with ghee and cotton wicks. Place them around the altar, in the entrance, and in all corners of the house.',
        duration: '10 mins',
        tips: 'Keep at least one diya burning throughout the night to welcome Goddess Lakshmi.'
      },
      {
        step: 4,
        title: 'Ganesh Puja First',
        description: 'Begin by worshipping Lord Ganesha to remove obstacles. Offer flowers, kumkum, rice, and sweets while chanting "Om Gan Ganapataye Namah".',
        duration: '5 mins',
        tips: 'Always worship Ganesha before starting any puja to ensure obstacle-free proceedings.'
      },
      {
        step: 5,
        title: 'Invoke Goddess Lakshmi',
        description: 'Sprinkle water around the altar for purification. Invoke Goddess Lakshmi by chanting her mantras and requesting her presence.',
        duration: '5 mins',
        tips: 'Maintain a calm and devotional mindset. Close your eyes and visualize the goddess.'
      },
      {
        step: 6,
        title: 'Offer Samagri',
        description: 'Offer kumkum, turmeric, flowers, rice, coins, fruits, sweets, betel leaves, and supari to Goddess Lakshmi one by one while chanting mantras.',
        duration: '15 mins',
        tips: 'Offer each item with both hands and pure devotion. Keep chanting mantras throughout.'
      },
      {
        step: 7,
        title: 'Chant Lakshmi Mantras',
        description: 'Chant the Lakshmi mantra "Om Shreem Mahalakshmiyei Namah" 108 times using a mala (rosary) for counting.',
        duration: '15 mins',
        tips: 'You can also recite Lakshmi Chalisa or Lakshmi Stotra if you know them.'
      },
      {
        step: 8,
        title: 'Perform Aarti',
        description: 'Light camphor and perform aarti by rotating it clockwise in front of the deities. Ring the bell and sing Lakshmi aarti.',
        duration: '5 mins',
        tips: 'Popular aarti: "Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata..."'
      },
      {
        step: 9,
        title: 'Distribute Prasad',
        description: 'Offer the prasad (sweets) to the deity first, then distribute among all family members.',
        duration: '5 mins',
        tips: 'Keep some prasad aside for Goddess Lakshmi to be consumed the next day.'
      },
      {
        step: 10,
        title: 'Conclude with Prayer',
        description: 'Fold your hands and pray to Goddess Lakshmi for wealth, health, prosperity, and happiness. Keep the diyas burning all night.',
        duration: '5 mins',
        tips: 'Leave some sweets and flowers at the altar overnight as offering.'
      }
    ],
    mantras: [
      {
        sanskrit: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः',
        transliteration: 'Om Shreem Hreem Kleem Mahalakshmyai Namah',
        meaning: 'I bow to Goddess Mahalakshmi, the embodiment of all wealth and prosperity'
      },
      {
        sanskrit: 'ॐ ह्रीं श्रीं क्रीं श्रीं क्लीं वित्तेश्वर्याय नमः',
        transliteration: 'Om Hreem Shreem Kreem Shreem Kleem Vitteshvaryai Namah',
        meaning: 'Salutations to the Goddess of Wealth and Prosperity'
      },
      {
        sanskrit: 'ॐ श्रीं श्रीं श्रीं महालक्ष्मी नमः',
        transliteration: 'Om Shreem Shreem Shreem Mahalakshmi Namah',
        meaning: 'I bow to Goddess Mahalakshmi, the supreme mother of wealth'
      }
    ],
    offerings: ['Red/Yellow flowers', 'Lotus', 'Sweets (especially ladoos)', 'Fruits', 'New coins', 'Silver items', 'Betel leaves', 'Coconut'],
    regionalVariations: {
      'North India': 'Perform puja after sunset during Pradosh Kaal. Focus on lighting maximum diyas.',
      'South India': 'Abhishek (holy bath) of Lakshmi idol with milk, honey, and panchamrit is common.',
      'West India': 'Draw Rangoli with Lakshmi footprints leading to the house entrance.',
      'East India': 'Goddess Kali puja is also performed along with Lakshmi puja in Bengal.'
    },
    dos: [
      'Keep your home clean and well-lit',
      'Wear new or freshly washed clothes',
      'Use ghee diyas for purity',
      'Keep windows and doors open to welcome Lakshmi',
      'Donate to the needy for blessings',
      'Keep some lights on throughout the night',
      'Place Lakshmi footprints at entrance'
    ],
    donts: [
      'Don\'t keep dirty or broken items in the house',
      'Avoid non-vegetarian food on puja day',
      'Don\'t wear black clothes',
      'Don\'t let the main diya extinguish',
      'Avoid anger, negative thoughts, or conflicts',
      'Don\'t use plastic flowers or artificial items',
      'Don\'t perform puja during Rahu Kaal'
    ],
    benefits: [
      'Attracts wealth and prosperity',
      'Removes financial obstacles',
      'Brings peace and harmony to the home',
      'Blesses with success in business and career',
      'Protects from poverty and debts',
      'Grants mental peace and contentment',
      'Fulfills material and spiritual desires'
    ]
  },
  {
    id: 'ganesh-chaturthi',
    deity: 'Lord Ganesha',
    festival: 'Ganesh Chaturthi',
    description: 'Ganesh Chaturthi puja celebrates the birth of Lord Ganesha and is performed to seek his blessings for wisdom, prosperity, and removal of obstacles.',
    significance: 'Lord Ganesha is the remover of obstacles and the god of beginnings. His blessings ensure success in all new ventures.',
    duration: '30-45 minutes',
    bestTime: 'Madhyahna Kaal (11 AM - 1 PM)',
    samagri: [
      { name: 'Ganesha Idol (Eco-friendly)', quantity: '1', optional: false, purpose: 'Main deity' },
      { name: 'Wooden Platform', quantity: '1', optional: false, purpose: 'Base for idol' },
      { name: 'Red/Yellow Cloth', quantity: '1', optional: false, purpose: 'Decoration' },
      { name: 'Flowers (Red Hibiscus)', quantity: '21', optional: false, purpose: 'Ganesha\'s favorite' },
      { name: 'Durva Grass', quantity: '21 blades', optional: false, purpose: 'Sacred offering' },
      { name: 'Modak (Sweet)', quantity: '21', optional: false, purpose: 'Ganesha\'s favorite prasad' },
      { name: 'Coconut', quantity: '1', optional: false, purpose: 'Offering' },
      { name: 'Betel Leaves', quantity: '21', optional: false, purpose: 'Offering' },
      { name: 'Turmeric & Kumkum', quantity: '1 bowl each', optional: false, purpose: 'Tilak' },
      { name: 'Incense Sticks', quantity: '11', optional: false, purpose: 'Fragrance' },
      { name: 'Camphor', quantity: '2-3', optional: false, purpose: 'Aarti' },
      { name: 'Diyas', quantity: '5-11', optional: false, purpose: 'Light' },
      { name: 'Sandalwood Paste', quantity: '1 small bowl', optional: false, purpose: 'Abhishek' },
      { name: 'Panchamrit', quantity: '1 bowl', optional: false, purpose: 'Holy bath' },
      { name: 'Sacred Thread (Kalava)', quantity: '1', optional: true, purpose: 'Tying to idol' }
    ],
    steps: [
      { step: 1, title: 'Welcome Ganesha', description: 'Bring the Ganesha idol home with family. Chant "Ganpati Bappa Morya" while entering.', duration: '10 mins', tips: 'Choose eco-friendly clay idols for environmental consciousness.' },
      { step: 2, title: 'Prana Pratishtha', description: 'Install the idol on a clean platform. Invoke life into the idol by chanting mantras and offerings.', duration: '10 mins', tips: 'Face the idol towards North or East.' },
      { step: 3, title: 'Abhishek (Holy Bath)', description: 'Bathe the idol with water, milk, honey, ghee, and panchamrit while chanting mantras.', duration: '10 mins', tips: 'Use a small kalash or bowl for abhishek.' },
      { step: 4, title: 'Decoration', description: 'Apply sandalwood paste, kumkum, and turmeric. Dress the idol with flowers and offer durva grass.', duration: '5 mins', tips: 'Durva grass is very auspicious for Ganesha.' },
      { step: 5, title: 'Offering Modak', description: 'Offer 21 modaks (Ganesha\'s favorite sweet) to the deity. You can offer other sweets too.', duration: '5 mins', tips: 'Homemade modaks are considered more auspicious.' },
      { step: 6, title: 'Chant Mantras', description: 'Chant "Om Gan Ganapataye Namah" 108 times. Recite Ganesha Atharvashirsha or Ganesha Chalisa.', duration: '15 mins', tips: 'Use a mala (rosary) for counting mantras.' },
      { step: 7, title: 'Perform Aarti', description: 'Light camphor and perform aarti while ringing bell. Sing "Sukhkarta Dukhharta" aarti.', duration: '5 mins', tips: 'Involve all family members in aarti.' },
      { step: 8, title: 'Distribute Prasad', description: 'Offer modak and other sweets to Ganesha first, then distribute to everyone.', duration: '5 mins', tips: 'Keep prasad covered until offering time.' },
      { step: 9, title: 'Daily Worship', description: 'For the duration of the festival (1.5, 3, 5, 7, or 11 days), offer flowers and perform aarti twice daily.', tips: 'Maintain cleanliness around the idol.' },
      { step: 10, title: 'Visarjan (Immersion)', description: 'On the last day, bid farewell with "Ganpati Bappa Morya, Pudchya Varshi Lavkar Ya" and immerse the idol in water.', duration: '30 mins', tips: 'Choose eco-friendly visarjan methods to protect water bodies.' }
    ],
    mantras: [
      { sanskrit: 'ॐ गं गणपतये नमः', transliteration: 'Om Gan Ganapataye Namah', meaning: 'Salutations to Lord Ganesha' },
      { sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥', transliteration: 'Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarva Karyeshu Sarvada', meaning: 'O Lord with curved trunk and massive body, whose brilliance is equal to millions of suns, please remove all obstacles from all my endeavors always' },
      { sanskrit: 'गजाननं भूतगणादि सेवितं कपित्थ जम्बूफलसार भक्षितम्', transliteration: 'Gajananam Bhuta Ganadi Sevitam Kapittha Jambu Phalasara Bhakshitam', meaning: 'One who has an elephant face and is served by celestial beings' }
    ],
    offerings: ['Modak', 'Durva grass', 'Red hibiscus flowers', 'Coconut', 'Jaggery', 'Betel leaves', 'Ladoo', 'Fresh fruits'],
    regionalVariations: {
      'Maharashtra': 'Elaborate 10-day celebration with public pandals and grand visarjan processions.',
      'Karnataka': 'Called "Gowri Ganesha Habba". Goddess Gauri is worshipped before Ganesha.',
      'Tamil Nadu': 'Known as "Vinayaka Chaturthi". Clay idols and traditional sweets like kozhukattai (modak) are offered.',
      'Gujarat': 'Celebrated with great enthusiasm. People make elaborate decorations and rangoli.'
    },
    dos: [
      'Use eco-friendly clay idols',
      'Offer 21 durva grass blades',
      'Make or buy fresh modaks',
      'Perform aarti morning and evening',
      'Keep the area clean',
      'Involve children in puja',
      'Donate to charity during the festival'
    ],
    donts: [
      'Don\'t look at the moon on Chaturthi day (Chandra Darshan Dosha)',
      'Don\'t use plastic or PoP idols',
      'Avoid immersing idols in polluted water',
      'Don\'t consume prasad before offering',
      'Avoid breaking coconut aggressively',
      'Don\'t let the idol face South',
      'Avoid performing puja during eclipse'
    ],
    benefits: [
      'Removes all obstacles and difficulties',
      'Grants wisdom and intelligence',
      'Brings success in education and career',
      'Blesses with prosperity and wealth',
      'Protects from evil and negative energies',
      'Ensures smooth beginnings of new ventures',
      'Grants mental peace and happiness'
    ]
  },
  {
    id: 'satyanarayan-puja',
    deity: 'Lord Vishnu (Satyanarayan)',
    festival: 'Satyanarayan Puja',
    description: 'Satyanarayan Puja is dedicated to Lord Vishnu in his form as Satyanarayan (the embodiment of truth). It can be performed on any auspicious day.',
    significance: 'This puja brings happiness, prosperity, and fulfillment of wishes. It is often performed on Purnima (full moon), after childbirth, housewarming, or achievement of goals.',
    duration: '60-90 minutes',
    bestTime: 'Evening (after sunset) or Morning (after sunrise)',
    samagri: [
      { name: 'Vishnu/Satyanarayan Picture', quantity: '1', optional: false, purpose: 'Main deity' },
      { name: 'Yellow Cloth', quantity: '1', optional: false, purpose: 'Base for altar' },
      { name: 'Kalash (Copper/Brass pot)', quantity: '1', optional: false, purpose: 'Sacred water vessel' },
      { name: 'Mango Leaves', quantity: '5-7', optional: false, purpose: 'Kalash decoration' },
      { name: 'Coconut', quantity: '1', optional: false, purpose: 'Kalash top' },
      { name: 'Flowers (Yellow/White)', quantity: '2 handfuls', optional: false, purpose: 'Offering' },
      { name: 'Tulsi Leaves', quantity: '21-51', optional: false, purpose: 'Vishnu\'s favorite' },
      { name: 'Banana', quantity: '5', optional: false, purpose: 'Prasad ingredient' },
      { name: 'Jaggery/Sugar', quantity: '250g', optional: false, purpose: 'Prasad sweet' },
      { name: 'Dry Fruits', quantity: '100g', optional: false, purpose: 'Prasad enhancement' },
      { name: 'Wheat Flour', quantity: '250g', optional: false, purpose: 'Prasad base' },
      { name: 'Ghee', quantity: '100ml', optional: false, purpose: 'Cooking and diyas' },
      { name: 'Panchamrit', quantity: '1 bowl', optional: false, purpose: 'Holy mixture' },
      { name: 'Incense & Camphor', quantity: '11 & 3', optional: false, purpose: 'Aarti' },
      { name: 'Satyanarayan Katha Book', quantity: '1', optional: false, purpose: 'Reading the story' }
    ],
    steps: [
      { step: 1, title: 'Preparation', description: 'Clean the puja area. Keep all samagri ready. Prepare Satyanarayan prasad (sheera/halwa).', duration: '30 mins' },
      { step: 2, title: 'Kalash Sthapana', description: 'Fill kalash with water, place mango leaves, and put coconut on top. Place it near the deity.', duration: '5 mins' },
      { step: 3, title: 'Ganesh Puja', description: 'Begin with Ganesha worship for obstacle-free puja. Offer flowers and modak.', duration: '5 mins' },
      { step: 4, title: 'Sankalp', description: 'Take water in your hand and make a vow (sankalp) stating your name, location, and purpose of puja.', duration: '5 mins' },
      { step: 5, title: 'Vishnu Puja', description: 'Offer flowers, tulsi, fruits, and panchamrit to Lord Satyanarayan while chanting Vishnu mantras.', duration: '15 mins' },
      { step: 6, title: 'Katha Reading', description: 'Read or listen to the Satyanarayan Katha (5 chapters). This is the most important part.', duration: '30-45 mins' },
      { step: 7, title: 'Prasad Offering', description: 'Offer the prepared prasad (banana sheera/halwa) to the deity.', duration: '5 mins' },
      { step: 8, title: 'Aarti', description: 'Perform aarti with camphor while singing Vishnu/Satyanarayan aarti.', duration: '5 mins' },
      { step: 9, title: 'Prasad Distribution', description: 'Distribute prasad to all family members and neighbors. Feed a cow if possible.', duration: '10 mins' },
      { step: 10, title: 'Conclusion', description: 'Conclude with prayers for fulfillment of wishes and well-being of all.', duration: '5 mins' }
    ],
    mantras: [
      { sanskrit: 'ॐ नमो भगवते वासुदेवाय', transliteration: 'Om Namo Bhagavate Vasudevaya', meaning: 'Salutations to Lord Vasudeva (Vishnu)' },
      { sanskrit: 'ॐ सत्यनारायणाय नमः', transliteration: 'Om Satyanrayanaya Namah', meaning: 'Salutations to Lord Satyanarayan' },
      { sanskrit: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्', transliteration: 'Shantakaram Bhujagashayanam Padmanabham Suresham', meaning: 'The peaceful one who rests on serpent, with lotus from navel, lord of gods' }
    ],
    offerings: ['Banana', 'Tulsi leaves', 'Yellow flowers', 'Panchamrit', 'Dry fruits', 'Satyanarayan prasad', 'Betel leaves'],
    regionalVariations: {
      'North India': 'Prasad made with wheat flour, banana, jaggery, and ghee (banana sheera).',
      'South India': 'Prasad called "Appam" made with rice flour, jaggery, and coconut.',
      'West India': 'Grand celebration with community participation. Prasad distributed widely.',
      'East India': 'Often combined with Lakshmi puja. Coconut and banana prasad is common.'
    },
    dos: [
      'Sit throughout the katha reading',
      'Keep fast on puja day (optional)',
      'Share prasad with everyone',
      'Feed a cow after puja',
      'Perform on Purnima for maximum benefits',
      'Read all 5 chapters of katha'
    ],
    donts: [
      'Don\'t skip the katha reading',
      'Don\'t stand or move during katha',
      'Don\'t eat prasad before offering',
      'Avoid performing during eclipse',
      'Don\'t throw away leftover prasad'
    ],
    benefits: [
      'Fulfills wishes and desires',
      'Brings prosperity to family',
      'Removes obstacles in life',
      'Blesses with children',
      'Ensures success in business',
      'Grants peace and happiness',
      'Protects from misfortunes'
    ]
  }
];

// Festival Calendar with Dates (Approximate - use for dynamic calculation)
export const FESTIVAL_DATES = {
  2025: {
    'Diwali': '2025-10-20',
    'Ganesh Chaturthi': '2025-08-27',
    'Navratri': '2025-09-22',
    'Dussehra': '2025-10-02',
    'Raksha Bandhan': '2025-08-09',
    'Janmashtami': '2025-08-16',
    'Maha Shivratri': '2025-02-26',
    'Holi': '2025-03-14',
    'Ram Navami': '2025-04-06',
    'Hanuman Jayanti': '2025-04-13'
  },
  2026: {
    'Diwali': '2026-11-08',
    'Ganesh Chaturthi': '2026-09-15',
    'Navratri': '2026-10-11',
    'Dussehra': '2026-10-21',
    'Raksha Bandhan': '2026-07-30',
    'Janmashtami': '2026-09-05',
    'Maha Shivratri': '2026-02-15',
    'Holi': '2026-03-04',
    'Ram Navami': '2026-03-26',
    'Hanuman Jayanti': '2026-04-03'
  }
};

// Deity Information
export const DEITY_INFO = {
  'Ganesha': {
    name: 'Lord Ganesha',
    title: 'Vighnaharta (Remover of Obstacles)',
    color: 'Red/Orange',
    day: 'Wednesday',
    favoriteFood: 'Modak',
    mantra: 'Om Gan Ganapataye Namah'
  },
  'Lakshmi': {
    name: 'Goddess Lakshmi',
    title: 'Goddess of Wealth and Prosperity',
    color: 'Red/Yellow',
    day: 'Friday',
    favoriteFood: 'Kheer/Sweets',
    mantra: 'Om Shreem Mahalakshmiyei Namah'
  },
  'Vishnu': {
    name: 'Lord Vishnu',
    title: 'Preserver of the Universe',
    color: 'Yellow',
    day: 'Thursday',
    favoriteFood: 'Tulsi, Panchamrit',
    mantra: 'Om Namo Bhagavate Vasudevaya'
  },
  'Shiva': {
    name: 'Lord Shiva',
    title: 'The Destroyer and Transformer',
    color: 'White',
    day: 'Monday',
    favoriteFood: 'Bilva leaves, Milk',
    mantra: 'Om Namah Shivaya'
  },
  'Durga': {
    name: 'Goddess Durga',
    title: 'Divine Mother and Warrior Goddess',
    color: 'Red',
    day: 'Tuesday',
    favoriteFood: 'Bhog (various sweets)',
    mantra: 'Om Dum Durgayei Namah'
  }
};

// Common Puja Items and their significance
export const COMMON_SAMAGRI_INFO = {
  'Kumkum': 'Red vermillion powder symbolizing auspiciousness and divine energy',
  'Turmeric': 'Yellow powder representing purity and prosperity',
  'Flowers': 'Symbol of devotion, beauty, and impermanence',
  'Incense': 'Purifies the environment and creates sacred atmosphere',
  'Camphor': 'Represents ego dissolution and pure consciousness',
  'Diya': 'Light symbolizing knowledge dispelling ignorance',
  'Coconut': 'Symbol of divine consciousness and selfless offering',
  'Betel Leaves': 'Represents freshness and auspiciousness',
  'Rice': 'Symbol of fertility, prosperity, and abundance',
  'Water': 'Purification and life-giving element'
};

