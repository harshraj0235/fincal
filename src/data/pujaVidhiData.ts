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
    deity: 'Goddess Lakshmi / लक्ष्मी माता',
    festival: 'Diwali / दीवाली',
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
  },
  {
    id: 'shiva-shivratri',
    deity: 'Lord Shiva / भगवान शिव',
    festival: 'Maha Shivratri / महाशिवरात्रि',
    description: 'महाशिवरात्रि की पूजा भगवान शिव को समर्पित है। यह रात्रि पूजा अत्यंत शुभ मानी जाती है।',
    significance: 'Maha Shivratri celebrates the marriage of Shiva and Parvati and the night when Shiva performed the cosmic Tandava dance.',
    duration: '2-3 hours (all-night vigil optional)',
    bestTime: 'Night time (4 prahars)',
    samagri: [
      { name: 'शिवलिंग / Shivling', quantity: '1', optional: false, purpose: 'Main deity' },
      { name: 'बेल पत्र / Bel Patra', quantity: '21-51', optional: false, purpose: 'Shiva\'s favorite offering' },
      { name: 'Milk / दूध', quantity: '1 liter', optional: false, purpose: 'Abhishek' },
      { name: 'Honey / शहद', quantity: '100ml', optional: false, purpose: 'Abhishek' },
      { name: 'Curd / दही', quantity: '500ml', optional: false, purpose: 'Abhishek' },
      { name: 'Ghee / घी', quantity: '100ml', optional: false, purpose: 'Abhishek & diyas' },
      { name: 'White Flowers / सफेद फूल', quantity: '2 handfuls', optional: false, purpose: 'Offering' },
      { name: 'Datura / धतूरा', quantity: '5', optional: true, purpose: 'Special offering' },
      { name: 'Bhang / भांग', quantity: '50g', optional: true, purpose: 'Traditional offering' },
      { name: 'Rice / चावल', quantity: '1 bowl', optional: false, purpose: 'Offering' },
      { name: 'Rudraksha Mala', quantity: '1', optional: true, purpose: 'For japa' }
    ],
    steps: [
      { step: 1, title: 'उपवास और शुद्धि / Fasting & Purification', description: 'Keep fast throughout the day. Take bath in evening before puja. Wear clean white or saffron clothes.', duration: 'Full day' },
      { step: 2, title: 'शिवलिंग की सफाई / Clean the Shivling', description: 'Clean the Shivling with water and place it on a clean platform.', duration: '5 mins' },
      { step: 3, title: 'प्रथम प्रहर पूजा / First Prahar Worship', description: 'Perform abhishek with milk while chanting Om Namah Shivaya. Offer bel patra.', duration: '30 mins' },
      { step: 4, title: 'द्वितीय प्रहर पूजा / Second Prahar', description: 'Abhishek with curd and honey. Offer white flowers and fruits.', duration: '30 mins' },
      { step: 5, title: 'तृतीय प्रहर पूजा / Third Prahar', description: 'Abhishek with ghee and gangajal. Offer bel patra and datura.', duration: '30 mins' },
      { step: 6, title: 'चतुर्थ प्रहर पूजा / Fourth Prahar', description: 'Final abhishek with panchamrit. Chant Maha Mrityunjaya Mantra 108 times.', duration: '30 mins' },
      { step: 7, title: 'Aarti & Prasad', description: 'Perform aarti with camphor. Distribute prasad to all family members.', duration: '10 mins' }
    ],
    mantras: [
      { sanskrit: 'ॐ नमः शिवाय', transliteration: 'Om Namah Shivaya', meaning: 'I bow to Lord Shiva' },
      { sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्', transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat', meaning: 'Maha Mrityunjaya Mantra for protection and liberation' }
    ],
    offerings: ['Bel patra', 'Milk', 'Honey', 'White flowers', 'Fruits', 'Bhang (optional)', 'Datura (optional)'],
    regionalVariations: {
      'North India': 'All-night vigil (jagaran) is common with continuous chanting.',
      'South India': 'Special abhishek with 11 different items including sandal paste.',
      'Kashmir': 'Known as Herath. Special walnut-based dishes are prepared.',
      'Maharashtra': 'Pradosh vrat and temple visits are emphasized.'
    },
    dos: ['Keep fast', 'Stay awake all night', 'Chant Om Namah Shivaya', 'Visit Shiva temple', 'Offer bel patra', 'Maintain celibacy'],
    donts: ['Consume non-veg', 'Sleep during night', 'Use broken bel patra', 'Offer tulsi to Shiva', 'Be angry or negative'],
    benefits: ['Removes sins and past karma', 'Grants moksha (liberation)', 'Protects from untimely death', 'Fulfills desires', 'Brings peace and prosperity']
  },
  {
    id: 'krishna-janmashtami',
    deity: 'Lord Krishna / भगवान कृष्ण',
    festival: 'Janmashtami / जन्माष्टमी',
    description: 'भगवान कृष्ण के जन्मोत्सव की पूजा। मध्यरात्रि में विशेष आरती और भजन का आयोजन।',
    significance: 'Celebrates the birth of Lord Krishna at midnight. The festival includes fasting, singing bhajans, and Dahi Handi celebrations.',
    duration: '6-8 hours (till midnight)',
    bestTime: 'Evening till midnight (Krishna birth time)',
    samagri: [
      { name: 'Krishna Idol / कृष्ण की मूर्ति', quantity: '1', optional: false, purpose: 'Main deity' },
      { name: 'Butter / माखन', quantity: '200g', optional: false, purpose: 'Krishna\'s favorite' },
      { name: 'Panchamrit', quantity: '1 bowl', optional: false, purpose: 'Abhishek' },
      { name: 'Yellow Flowers / पीले फूल', quantity: '2 handfuls', optional: false, purpose: 'Offering' },
      { name: 'Peacock Feather / मोर पंख', quantity: '1', optional: false, purpose: 'Decoration' },
      { name: 'Flute / बांसुरी', quantity: '1 small', optional: true, purpose: 'Symbol of Krishna' },
      { name: 'Fruits / फल', quantity: '5 varieties', optional: false, purpose: 'Offering' },
      { name: 'Sweets / मिठाई', quantity: '500g', optional: false, purpose: 'Prasad' },
      { name: 'Milk / दूध', quantity: '1 liter', optional: false, purpose: 'Abhishek' },
      { name: 'Tulsi Leaves / तुलसी पत्ते', quantity: '51', optional: false, purpose: 'Sacred offering' }
    ],
    steps: [
      { step: 1, title: 'उपवास / Fasting', description: 'Keep nirjala (waterless) or phalahar fast throughout the day till midnight.', duration: 'Full day' },
      { step: 2, title: 'Jhula Decoration / झूला सजाना', description: 'Decorate a small cradle (jhula) with flowers and place baby Krishna idol in it.', duration: '30 mins' },
      { step: 3, title: 'Abhishek', description: 'Bathe the idol with panchamrit (milk, curd, honey, ghee, sugar) while chanting mantras.', duration: '15 mins' },
      { step: 4, title: 'Shringar / श्रृंगार', description: 'Dress the idol in yellow clothes, apply tilak, and decorate with peacock feather.', duration: '10 mins' },
      { step: 5, title: 'Bhajan Kirtan / भजन कीर्तन', description: 'Sing Krishna bhajans and kirtans from evening till midnight.', duration: '3-4 hours' },
      { step: 6, title: 'Midnight Birth Celebration', description: 'At midnight (Krishna birth time), ring bells, blow conch, and perform special aarti.', duration: '30 mins', tips: 'This is the most important moment!' },
      { step: 7, title: 'Prasad Distribution', description: 'Break fast with Krishna prasad - butter, sweets, fruits, and milk-based items.', duration: '15 mins' }
    ],
    mantras: [
      { sanskrit: 'ॐ नमो भगवते वासुदेवाय', transliteration: 'Om Namo Bhagavate Vasudevaya', meaning: 'Salutations to Lord Vasudeva (Krishna)' },
      { sanskrit: 'कृष्णाय वासुदेवाय हरये परमात्मने प्रणत क्लेश नाशाय गोविन्दाय नमो नमः', transliteration: 'Krishnaya Vasudevaya Haraye Paramatmane Pranata Klesha Nashaya Govindaya Namo Namah', meaning: 'Salutations to Krishna, destroyer of all suffering' }
    ],
    offerings: ['Butter (माखन)', 'Milk sweets', 'Yellow flowers', 'Tulsi', 'Fruits', 'Panchamrit'],
    regionalVariations: {
      'Maharashtra': 'Dahi Handi - breaking pot of curd tied at height by forming human pyramid',
      'Mathura-Vrindavan': 'Grand celebrations with Raslila performances depicting Krishna\'s life',
      'South India': 'Drawing small footprints (Krishna\'s) with rice flour from entrance to puja room',
      'Gujarat': 'All-night Garba and Dandiya celebrations'
    },
    dos: ['Keep fast', 'Sing bhajans', 'Stay awake till midnight', 'Offer butter to Krishna', 'Read Bhagavad Gita', 'Decorate with yellow flowers'],
    donts: ['Sleep before midnight', 'Eat non-veg', 'Consume onion/garlic', 'Be negative or angry', 'Skip midnight aarti'],
    benefits: ['Grants devotion and bhakti', 'Removes obstacles', 'Brings joy and happiness', 'Protects from evil', 'Fulfills wishes', 'Blesses with Krishna consciousness']
  },
  {
    id: 'navratri-durga',
    deity: 'Goddess Durga / माँ दुर्गा',
    festival: 'Navratri / नवरात्रि',
    description: 'नौ दिनों तक माँ दुर्गा के नौ रूपों की पूजा। प्रतिदिन अलग रंग और भोग।',
    significance: 'Nine nights dedicated to nine forms of Goddess Durga. Each day has specific color, goddess form, and offerings.',
    duration: '9 days (30-45 mins daily)',
    bestTime: 'Morning and Evening',
    samagri: [
      { name: 'Kalash / कलश', quantity: '1', optional: false, purpose: 'Sacred pot for goddess' },
      { name: 'Coconut / नारियल', quantity: '1', optional: false, purpose: 'Kalash top' },
      { name: 'Mango Leaves / आम के पत्ते', quantity: '7', optional: false, purpose: 'Kalash decoration' },
      { name: 'Red Cloth / लाल कपड़ा', quantity: '1', optional: false, purpose: 'Altar base' },
      { name: 'Flowers (9 colors)', quantity: '9 varieties', optional: false, purpose: 'Different color each day' },
      { name: 'Durga Idol/Picture', quantity: '1', optional: false, purpose: 'Main deity' },
      { name: 'Diyas / दीये', quantity: '11', optional: false, purpose: 'Light' },
      { name: 'Incense / अगरबत्ती', quantity: '18', optional: false, purpose: 'Fragrance' },
      { name: 'Chunari / चुनरी', quantity: '1 red', optional: false, purpose: 'Offering to goddess' },
      { name: 'Sindoor / सिंदूर', quantity: '1 small box', optional: false, purpose: 'Tilak' }
    ],
    steps: [
      { step: 1, title: 'Day 1: Shailputri Puja / शैलपुत्री', description: 'Color: Orange. Worship Maa Shailputri. Offer orange flowers. Keep Navratri fast.', duration: '30 mins' },
      { step: 2, title: 'Day 2: Brahmacharini / ब्रह्मचारिणी', description: 'Color: White. Worship Maa Brahmacharini. Offer white flowers and kheer.', duration: '30 mins' },
      { step: 3, title: 'Day 3: Chandraghanta / चंद्रघंटा', description: 'Color: Red. Worship Maa Chandraghanta. Offer red flowers and sweets.', duration: '30 mins' },
      { step: 4, title: 'Day 4: Kushmanda / कूष्मांडा', description: 'Color: Royal Blue. Worship Maa Kushmanda. Offer blue flowers and malpua.', duration: '30 mins' },
      { step: 5, title: 'Day 5: Skandamata / स्कंदमाता', description: 'Color: Yellow. Worship Maa Skandamata. Offer yellow flowers and bananas.', duration: '30 mins' },
      { step: 6, title: 'Day 6: Katyayani / कात्यायनी', description: 'Color: Green. Worship Maa Katyayani. Offer green leaves and honey.', duration: '30 mins' },
      { step: 7, title: 'Day 7: Kalaratri / कालरात्रि', description: 'Color: Grey. Worship Maa Kalaratri. Offer jaggery and sesame.', duration: '30 mins' },
      { step: 8, title: 'Day 8: Mahagauri / महागौरी', description: 'Color: Purple. Worship Maa Mahagauri. Offer coconut and purple flowers.', duration: '30 mins' },
      { step: 9, title: 'Day 9: Siddhidatri / सिद्धिदात्री', description: 'Color: Peacock Green. Worship Maa Siddhidatri. Perform Kanya Puja. Break fast.', duration: '1 hour', tips: 'This is Navami - most important day!' }
    ],
    mantras: [
      { sanskrit: 'ॐ ऐं ह्रीं क्लीं चामुंडायै विच्चे', transliteration: 'Om Aim Hreem Kleem Chamundayai Vichche', meaning: 'Salutations to Goddess Chamunda (Durga)' },
      { sanskrit: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः', transliteration: 'Ya Devi Sarvabhuteshu Shakti Rupena Samsthita Namastasyai Namastasyai Namastasyai Namo Namah', meaning: 'Salutations to the Goddess who resides in all beings as power' }
    ],
    offerings: ['Different colored flowers each day', 'Seasonal fruits', 'Sweets', 'Coconut', 'Chunari', 'Sindoor'],
    regionalVariations: {
      'Gujarat': 'Garba and Dandiya Raas every night with traditional music and dance',
      'West Bengal': 'Durga Puja with grand pandals, cultural programs, and Sindoor Khela on Vijayadashami',
      'North India': 'Emphasis on fasting, Ram Lila performances, and Kanya Puja on Day 8',
      'South India': 'Golu (display of dolls), Saraswati Puja, and cultural performances'
    },
    dos: ['Keep fast for 9 days', 'Wear specific color each day', 'Offer bhog daily', 'Perform Kanya Puja on Day 8/9', 'Maintain celibacy', 'Read Durga Saptashati'],
    donts: ['Consume non-veg/alcohol', 'Eat onion/garlic', 'Cut hair/nails', 'Sleep during puja time', 'Wear black clothes'],
    benefits: ['Victory over evil', 'Grants all wishes', 'Removes obstacles', 'Brings prosperity', 'Protects from enemies', 'Blesses with children', 'Spiritual enlightenment']
  },
  {
    id: 'ram-navami',
    deity: 'Lord Rama / भगवान राम',
    festival: 'Ram Navami / राम नवमी',
    description: 'भगवान राम के जन्मोत्सव की पूजा। मध्याह्न काल में विशेष पूजा।',
    significance: 'Celebrates the birth of Lord Rama on Navami tithi of Chaitra month. Reading Ramayana is considered highly auspicious.',
    duration: '1-2 hours',
    bestTime: 'Madhyahna Kaal (11 AM - 1 PM)',
    samagri: [
      { name: 'Ram Darbar Idol / राम दरबार', quantity: '1', optional: false, purpose: 'Main deities (Ram, Sita, Lakshman, Hanuman)' },
      { name: 'Yellow/White Flowers', quantity: '2 handfuls', optional: false, purpose: 'Offering' },
      { name: 'Tulsi Leaves / तुलसी', quantity: '51', optional: false, purpose: 'Sacred offering' },
      { name: 'Fruits / फल', quantity: '5 varieties', optional: false, purpose: 'Offering' },
      { name: 'Panchamrit', quantity: '1 bowl', optional: false, purpose: 'Abhishek' },
      { name: 'Chandan / चंदन', quantity: '1 small', optional: false, purpose: 'Tilak' },
      { name: 'Yellow Cloth / पीला कपड़ा', quantity: '1', optional: false, purpose: 'Decoration' },
      { name: 'Diyas / दीये', quantity: '5', optional: false, purpose: 'Light' }
    ],
    steps: [
      { step: 1, title: 'Morning Preparation', description: 'Take bath early morning. Clean puja area and place Ram Darbar.', duration: '15 mins' },
      { step: 2, title: 'Kalash Sthapana', description: 'Install kalash with water, mango leaves, and coconut.', duration: '10 mins' },
      { step: 3, title: 'Abhishek', description: 'Bathe the deities with panchamrit and water.', duration: '10 mins' },
      { step: 4, title: 'Shringar / श्रृंगार', description: 'Dress the idols, apply chandan, offer flowers and tulsi.', duration: '15 mins' },
      { step: 5, title: 'Ramayana Paath / रामायण पाठ', description: 'Read or recite sections from Ramayana, especially Bal Kand.', duration: '30-45 mins' },
      { step: 6, title: 'Ram Mantra Japa', description: 'Chant "Om Shri Ramaya Namah" 108 times.', duration: '15 mins' },
      { step: 7, title: 'Aarti & Prasad', description: 'Perform aarti with camphor. Distribute prasad (panjiri, fruits).', duration: '10 mins' }
    ],
    mantras: [
      { sanskrit: 'ॐ श्री रामाय नमः', transliteration: 'Om Shri Ramaya Namah', meaning: 'Salutations to Lord Rama' },
      { sanskrit: 'श्री राम जय राम जय जय राम', transliteration: 'Shri Ram Jai Ram Jai Jai Ram', meaning: 'Victory to Lord Rama' }
    ],
    offerings: ['Tulsi leaves', 'Yellow flowers', 'Seasonal fruits', 'Panjiri (sweet made of wheat flour and jaggery)', 'Milk-based sweets'],
    regionalVariations: {
      'Ayodhya': 'Grand celebrations with Ram Barat procession and temple decorations',
      'North India': 'Akhand Paath of Ramcharitmanas, Shobha Yatra with Ram idols',
      'South India': 'Kalyanotsavam (wedding ceremony of Ram-Sita) is performed',
      'Andhra Pradesh': 'Panakam (jaggery water with pepper) and Kosambari are distributed'
    },
    dos: ['Keep fast', 'Read Ramayana', 'Visit Ram temple', 'Chant Ram Naam', 'Distribute prasad', 'Help the needy'],
    donts: ['Consume non-veg', 'Be dishonest', 'Speak ill of others', 'Skip puja', 'Waste food'],
    benefits: ['Grants righteousness (dharma)', 'Removes sins', 'Brings peace and prosperity', 'Protects from enemies', 'Blesses with ideal family life', 'Spiritual growth']
  },
  {
    id: 'hanuman-jayanti',
    deity: 'Lord Hanuman / हनुमान जी',
    festival: 'Hanuman Jayanti / हनुमान जयंती',
    description: 'हनुमान जी के जन्मोत्सव की पूजा। शक्ति और साहस के लिए विशेष।',
    significance: 'Celebrates the birth of Lord Hanuman. Known for granting strength, courage, and protection from evil spirits.',
    duration: '1-2 hours',
    bestTime: 'Morning (sunrise)',
    samagri: [
      { name: 'Hanuman Idol / हनुमान जी की मूर्ति', quantity: '1', optional: false, purpose: 'Main deity' },
      { name: 'Sindoor / सिंदूर', quantity: '1 box', optional: false, purpose: 'Hanuman\'s favorite' },
      { name: 'Red Flowers / लाल फूल', quantity: '2 handfuls', optional: false, purpose: 'Offering' },
      { name: 'Jasmine Oil / तेल', quantity: '100ml', optional: false, purpose: 'Lamp' },
      { name: 'Besan Ladoo / बेसन लड्डू', quantity: '11', optional: false, purpose: 'Hanuman\'s favorite prasad' },
      { name: 'Red Cloth / लाल कपड़ा', quantity: '1', optional: false, purpose: 'Offering' },
      { name: 'Chola (Garland) / माला', quantity: '1', optional: false, purpose: 'Decoration' }
    ],
    steps: [
      { step: 1, title: 'Early Morning Bath', description: 'Wake up before sunrise, take bath, and wear red/orange clothes.', duration: '15 mins' },
      { step: 2, title: 'Idol Preparation', description: 'Clean Hanuman idol and apply sindoor generously.', duration: '10 mins' },
      { step: 3, title: 'Offering', description: 'Offer red flowers, besan ladoo, and red cloth.', duration: '10 mins' },
      { step: 4, title: 'Hanuman Chalisa Paath', description: 'Recite Hanuman Chalisa 11 times or Sundarakanda from Ramayana.', duration: '45 mins' },
      { step: 5, title: 'Mantra Japa', description: 'Chant Hanuman mantras 108 times.', duration: '15 mins' },
      { step: 6, title: 'Aarti', description: 'Perform aarti and distribute prasad to all present.', duration: '10 mins' }
    ],
    mantras: [
      { sanskrit: 'ॐ हं हनुमते नमः', transliteration: 'Om Ham Hanumate Namah', meaning: 'Salutations to Lord Hanuman' },
      { sanskrit: 'बुद्धिर्बलं यशो धैर्यं निर्भयत्वमरोगता। अजाड्यं वाक्पटुत्वं च हनुमत्स्मरणात्भवेत्॥', transliteration: 'Buddhir Balam Yasho Dhairyam Nirbhayatvam Arogata, Ajaadyam Vaakpatuthvam Cha Hanumat Smaranaat Bhavet', meaning: 'By remembering Hanuman, one gets wisdom, strength, fame, courage, fearlessness, health, eloquence' }
    ],
    offerings: ['Sindoor', 'Besan ladoo', 'Red flowers', 'Bananas', 'Red cloth', 'Jasmine oil lamp'],
    regionalVariations: {
      'Karnataka-Andhra': 'Celebrated on Vaishakha Purnima with grand processions',
      'North India': 'Celebrated on Chaitra Purnima with Hanuman Chalisa recitation',
      'Maharashtra': 'Special Maruti puja with wrestling competitions (dangal)',
      'Odisha': 'Known as Pana Sankranti, combined with traditional Pana drink'
    },
    dos: ['Wake up early', 'Apply sindoor', 'Recite Hanuman Chalisa', 'Visit Hanuman temple', 'Feed monkeys', 'Help the weak'],
    donts: ['Be arrogant', 'Show cowardice', 'Disrespect elders', 'Consume non-veg', 'Be lazy'],
    benefits: ['Grants courage and strength', 'Removes fear and negative energy', 'Protection from black magic', 'Victory over enemies', 'Success in endeavors', 'Mental clarity']
  },
  {
    id: 'griha-pravesh',
    deity: 'Ganesha & Lakshmi / गणेश और लक्ष्मी',
    festival: 'Griha Pravesh / गृह प्रवेश',
    description: 'नए घर में प्रवेश की पूजा। वास्तु शांति और समृद्धि के लिए।',
    significance: 'Housewarming ceremony to purify and sanctify a new home. Invites positive energy and removes negative influences.',
    duration: '2-3 hours',
    bestTime: 'Shubh Muhurat (consult pandit)',
    samagri: [
      { name: 'Ganesha Idol', quantity: '1', optional: false, purpose: 'Remove obstacles' },
      { name: 'Lakshmi Idol', quantity: '1', optional: false, purpose: 'Wealth and prosperity' },
      { name: 'Kalash / कलश', quantity: '1', optional: false, purpose: 'Sacred pot' },
      { name: 'Navagraha items', quantity: '9 types', optional: false, purpose: 'Planetary peace' },
      { name: 'Havan Samagri / हवन सामग्री', quantity: '250g', optional: false, purpose: 'Fire ritual' },
      { name: 'Cow\'s Ghee / गाय का घी', quantity: '500ml', optional: false, purpose: 'Havan' },
      { name: 'Rice / चावल', quantity: '1 kg', optional: false, purpose: 'Various rituals' },
      { name: 'Turmeric & Kumkum', quantity: '100g each', optional: false, purpose: 'Decoration' },
      { name: 'Flowers / फूल', quantity: '5 kg', optional: false, purpose: 'Decoration & offering' },
      { name: 'Coconut / नारियल', quantity: '5', optional: false, purpose: 'Breaking at entrance' }
    ],
    steps: [
      { step: 1, title: 'Cleaning & Decoration', description: 'Thoroughly clean the house. Draw rangoli at entrance. Hang mango leaves and marigold garlands.', duration: '1-2 hours' },
      { step: 2, title: 'Vastu Puja', description: 'Perform Vastu Devta puja in the center of the house for peace and harmony.', duration: '30 mins' },
      { step: 3, title: 'Ganesh Puja', description: 'Install Ganesha at entrance and perform puja to remove obstacles.', duration: '20 mins' },
      { step: 4, title: 'Navagraha Puja', description: 'Worship all nine planets for their blessings and to ward off negative influences.', duration: '30 mins' },
      { step: 5, title: 'Havan / हवन', description: 'Perform havan with Vedic mantras by a qualified priest.', duration: '45 mins', tips: 'Most important ritual - purifies the home' },
      { step: 6, title: 'Kalash Sthapana', description: 'Place kalash at entrance or puja room as symbol of prosperity.', duration: '10 mins' },
      { step: 7, title: 'First Entry', description: 'Woman of the house enters first with a kalash of milk, boils it till it overflows (symbol of prosperity).', duration: '15 mins', tips: 'This is the auspicious first entry!' },
      { step: 8, title: 'Prasad Distribution', description: 'Distribute prasad to all guests and feed Brahmins.', duration: '30 mins' }
    ],
    mantras: [
      { sanskrit: 'वास्तोष्पते प्रतिजानीह्यस्मान् स्वावेशो अनमीवो भवा नः', transliteration: 'Vastoshpate Pratijanihasmanswavesho Anamivo Bhava Nah', meaning: 'O Vastu Devta, protect us and make our home prosperous' }
    ],
    offerings: ['Flowers', 'Fruits', 'Sweets', 'Coconut', 'Havan samagri'],
    regionalVariations: {
      'North India': 'Breaking coconut at threshold, feeding cows and Brahmins',
      'South India': 'Boiling milk till overflow, lighting lamp that should burn for 3 days',
      'Maharashtra': 'Satyanarayan Puja along with Griha Pravesh',
      'Gujarat': 'Breaking dahi-handi (pot of curd) at entrance'
    },
    dos: ['Choose auspicious muhurat', 'Perform havan', 'Feed Brahmins and cows', 'Boil milk', 'Light lamp', 'Invite friends and family'],
    donts: ['Enter on inauspicious day', 'Skip Vastu puja', 'Enter with empty hands', 'Be negative', 'Start without proper rituals'],
    benefits: ['Purifies the home', 'Removes Vastu doshas', 'Brings prosperity', 'Family peace and harmony', 'Protection from evil', 'Success and growth']
  },
  {
    id: 'karthik-puja',
    deity: 'Lord Vishnu & Lakshmi / विष्णु और लक्ष्मी',
    festival: 'Karthik Month Puja / कार्तिक मास पूजा',
    description: 'कार्तिक मास में तुलसी और दीपदान की विशेष पूजा। दीपावली के बाद का पवित्र महीना।',
    significance: 'The holiest month in Hindu calendar. Daily lamp lighting (Deepdan) and Tulsi worship brings immense spiritual merit.',
    duration: '30 days (daily 20-30 mins)',
    bestTime: 'Early morning and evening',
    samagri: [
      { name: 'Tulsi Plant / तुलसी का पौधा', quantity: '1', optional: false, purpose: 'Sacred plant' },
      { name: 'Earthen Lamps / मिट्टी के दीये', quantity: '100+', optional: false, purpose: 'Daily lighting' },
      { name: 'Mustard Oil / सरसों तेल', quantity: '2 liters', optional: false, purpose: 'For lamps' },
      { name: 'Cotton Wicks / रुई की बत्ती', quantity: '200', optional: false, purpose: 'For lamps' },
      { name: 'Flowers / फूल', quantity: 'Daily fresh', optional: false, purpose: 'Tulsi offering' },
      { name: 'Gangajal / गंगाजल', quantity: '1 liter', optional: false, purpose: 'Tulsi bath' }
    ],
    steps: [
      { step: 1, title: 'Early Morning Tulsi Puja', description: 'Wake up before sunrise. Bathe Tulsi plant with water. Offer flowers and lamp.', duration: '15 mins' },
      { step: 2, title: 'Deepdan / दीपदान', description: 'Light earthen lamps with mustard oil. Place them at temple, tulsi plant, riverside, and home entrance.', duration: '15 mins' },
      { step: 3, title: 'Vishnu Puja', description: 'Perform Lord Vishnu puja with tulsi leaves. Read Vishnu Sahasranama if possible.', duration: '30 mins' },
      { step: 4, title: 'Evening Deepdan', description: 'Again light lamps in evening. Circumambulate Tulsi plant 4 times.', duration: '10 mins' },
      { step: 5, title: 'Karthik Snan / स्नान', description: 'Take holy bath in river/pond during Brahma Muhurta (before sunrise). Highly meritorious.', duration: '30 mins', tips: 'If no river nearby, mix gangajal in bathing water' }
    ],
    mantras: [
      { sanskrit: 'ॐ तुलस्यै नमः', transliteration: 'Om Tulasyai Namah', meaning: 'Salutations to Tulsi Devi' },
      { sanskrit: 'ॐ नमो भगवते वासुदेवाय', transliteration: 'Om Namo Bhagavate Vasudevaya', meaning: 'Salutations to Lord Vasudeva' }
    ],
    offerings: ['Tulsi leaves to Vishnu', 'Daily lamps', 'Flowers', 'Fruits', 'Milk-based sweets'],
    regionalVariations: {
      'North India': 'Karthik Purnima - Dev Deepavali with thousands of lamps at Ganga ghats',
      'South India': 'Karthikai Deepam - lighting huge lamps on hills and temples',
      'Odisha': 'Boita Bandana - floating miniature boats in water bodies',
      'Gujarat': 'Tulsi Vivah on Ekadashi - ceremonial wedding of Tulsi with Vishnu'
    },
    dos: ['Light lamps daily', 'Worship Tulsi twice daily', 'Take holy bath', 'Keep celibacy', 'Be vegetarian', 'Do charity'],
    donts: ['Eat non-veg', 'Pluck Tulsi leaves on Sundays', 'Be negative', 'Skip daily puja', 'Waste oil/ghee'],
    benefits: ['Immense spiritual merit', 'All sins washed away', 'Equivalent to performing many yajnas', 'Grants moksha', 'Family prosperity', 'Vishnu\'s special blessings']
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

