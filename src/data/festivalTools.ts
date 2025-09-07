export type FestivalToolType =
  | 'budget'
  | 'travel'
  | 'electricity'
  | 'fastingDuration'
  | 'zakat'
  | 'discount'
  | 'emi'
  | 'cashback'
  | 'priceDrop'
  | 'monthlyGoal'
  | 'quantity'
  | 'donation'
  | 'calorie'
  | 'wishCard'
  | 'makingCharges'
  | 'valueMetal'
  | 'muhurat';

export interface FestivalToolConfig {
  slug: string;
  name: string;
  type: FestivalToolType;
  description: string;
  defaultItems?: Array<{ name: string; qty?: number; price?: number; note?: string }>;
  seo?: { title?: string; description?: string; keywords?: string[] };
}

export interface FestivalConfig {
  slug: string;
  name: string;
  blurb: string;
  keywords: string[];
  tools: FestivalToolConfig[];
}

export const festivalList: FestivalConfig[] = [
  {
    slug: 'diwali',
    name: 'Diwali (Deepavali)',
    blurb: 'Festival of lights – plan budgets, sweets, gifts, and lighting costs.',
    keywords: ['diwali tools', 'diwali budget', 'electricity lights calculator'],
    tools: [
      {
        slug: 'diwali-budget-calculator',
        name: 'Diwali Budget Calculator',
        type: 'budget',
        description: 'Plan gifts, sweets, lights, and puja samagri expenses.',
        defaultItems: [
          { name: 'Gifts', qty: 5, price: 500 },
          { name: 'Sweets', qty: 2, price: 800 },
          { name: 'Diyas/Lamps', qty: 20, price: 15 },
          { name: 'Puja Samagri', qty: 1, price: 700 }
        ]
      },
      {
        slug: 'diwali-lights-electricity-cost',
        name: 'Electricity Cost Calculator for Diwali Lights',
        type: 'electricity',
        description: 'Estimate power cost for serial lights and decorative lighting.'
      },
      { slug: 'diwali-gift-budget-splitter', name: 'Diwali Gift Budget Splitter', type: 'budget', description: 'Split gift budget across family and friends.', defaultItems: [ { name: 'Parents', qty: 2, price: 1500 }, { name: 'Siblings', qty: 2, price: 800 }, { name: 'Friends', qty: 4, price: 500 } ] },
      { slug: 'diwali-discount-offer-savings', name: 'Discount/Offer Savings Calculator', type: 'discount', description: 'Stack bank/coupon offers on sale price and estimate final price.' },
      { slug: 'diwali-emi-calculator', name: 'EMI Calculator for Festive Shopping', type: 'emi', description: 'Monthly EMI and interest for festival purchases.' },
      { slug: 'dhanteras-gold-silver-value', name: 'Gold/Silver Price Estimator (Dhanteras)', type: 'valueMetal', description: 'Estimate value by metal, weight and price per gram.' },
      { slug: 'sweet-calorie-calculator', name: 'Sweet Calorie Calculator (Ladoo, Barfi, etc.)', type: 'calorie', description: 'Estimate calories for popular Diwali sweets.' },
      { slug: 'firecracker-budget-splitter', name: 'Firecracker Budget Splitter', type: 'budget', description: 'Allocate budget across different crackers.', defaultItems: [ { name: 'Sparklers', qty: 5, price: 50 }, { name: 'Flower Pots', qty: 3, price: 120 }, { name: 'Anars', qty: 2, price: 250 } ] },
      { slug: 'diwali-wish-card-generator', name: 'Diwali Card/Wish Generator (Image + Text)', type: 'wishCard', description: 'Generate a festive card with your message and export.' },
      { slug: 'puja-samagri-checklist', name: 'Puja Samagri Checklist Tool', type: 'budget', description: 'Checklist and budget for samagri.', defaultItems: [ { name: 'Agarbatti', qty: 2, price: 40 }, { name: 'Ghee', qty: 1, price: 200 } ] },
      { slug: 'diwali-decoration-budget', name: 'Diwali Decoration Budget Estimator', type: 'budget', description: 'Rangoli, toran, lights and decor.', defaultItems: [ { name: 'Rangoli', qty: 1, price: 200 }, { name: 'Toran', qty: 2, price: 150 } ] },
      { slug: 'festival-loan-emi-planner', name: 'Festival Loan EMI Planner', type: 'emi', description: 'Compare EMIs for festival loans.' },
      { slug: 'gold-making-charges-calculator', name: 'Gold Making Charges Calculator', type: 'makingCharges', description: 'Estimate jewellery invoice with making, wastage and GST.' },
      { slug: 'shopping-cart-price-drop-tracker', name: 'Diwali Shopping Cart Price Drop Tracker', type: 'priceDrop', description: 'Track and compare current vs sale price.' },
      { slug: 'diwali-2026-goal-tracker', name: 'Personal Finance Goal Tracker (Save for Diwali 2026)', type: 'monthlyGoal', description: 'Monthly saving required to reach your goal.' },
      { slug: 'credit-card-cashback-calculator', name: 'Credit Card Cashback Calculator (Festival Offers)', type: 'cashback', description: 'Cashback estimate on festival transactions.' },
      { slug: 'lakshmi-puja-muhurat-finder', name: 'Best Muhurat Finder (Lakshmi Puja)', type: 'muhurat', description: 'Find auspicious time window (user inputs city/date).'},
      { slug: 'diwali-holiday-travel-expense', name: 'Diwali Holiday Travel Expense Calculator', type: 'travel', description: 'Trip cost with fuel, tolls and per-head split.' },
      { slug: 'sweet-quantity-estimator', name: 'Sweet Quantity Estimator for Guests', type: 'quantity', description: 'Estimate sweets quantity for expected guests.' },
      { slug: 'festival-dress-budget-planner', name: 'Festival Dress Budget Planner', type: 'budget', description: 'Plan outfits and accessories.', defaultItems: [ { name: 'Outfit', qty: 2, price: 2500 }, { name: 'Accessories', qty: 2, price: 600 } ] },
      { slug: 'charity-donation-splitter', name: 'Charity/Donation Splitter', type: 'donation', description: 'Split donations across causes with visual share.' }
    ]
  },
  {
    slug: 'holi',
    name: 'Holi',
    blurb: 'Festival of colors – DIY natural color costs and party budgets.',
    keywords: ['holi budget', 'natural color cost', 'holi party planner'],
    tools: [
      {
        slug: 'natural-color-cost-calculator',
        name: 'Natural Color Cost Calculator',
        type: 'budget',
        description: 'DIY Holi colors – turmeric, beetroot, henna costs.',
        defaultItems: [
          { name: 'Turmeric (Haldi) 100g', qty: 5, price: 40 },
          { name: 'Beetroot (for dye)', qty: 4, price: 30 },
          { name: 'Henna Powder 100g', qty: 3, price: 60 }
        ]
      },
      {
        slug: 'holi-party-budget-planner',
        name: 'Holi Party Budget Planner',
        type: 'budget',
        description: 'Plan water balloons, snacks, drinks, and music.',
        defaultItems: [
          { name: 'Water Balloons Pack', qty: 4, price: 80 },
          { name: 'Snacks', qty: 10, price: 100 },
          { name: 'Drinks', qty: 10, price: 60 }
        ]
      }
    ]
  },
  {
    slug: 'navratri',
    name: 'Navratri',
    blurb: 'Nine nights of devotion – fasting meals and garba outfits.',
    keywords: ['navratri fasting', 'garba outfit budget'],
    tools: [
      {
        slug: 'navratri-fasting-meal-planner',
        name: 'Fasting Meal Planner (9-Day)',
        type: 'budget',
        description: 'Plan sattvik meals and ingredients for nine days.',
        defaultItems: [
          { name: 'Sabudana 1kg', qty: 1, price: 150 },
          { name: 'Kuttu Atta 1kg', qty: 1, price: 120 },
          { name: 'Fruits (per day)', qty: 9, price: 120 }
        ]
      },
      {
        slug: 'garba-outfit-budget',
        name: 'Garba/Dandiya Outfit Budget',
        type: 'budget',
        description: 'Chaniya choli/kurta, accessories, and footwear.',
        defaultItems: [
          { name: 'Outfit', qty: 1, price: 2500 },
          { name: 'Accessories', qty: 1, price: 600 },
          { name: 'Footwear', qty: 1, price: 900 }
        ]
      }
    ]
  },
  {
    slug: 'durga-puja',
    name: 'Durga Puja',
    blurb: 'Pandal hopping and decorations – plan travel and decor budgets.',
    keywords: ['durga puja pandal travel', 'puja decoration budget'],
    tools: [
      {
        slug: 'pandal-hopping-travel-cost',
        name: 'Pandal Hopping Travel Cost Estimator',
        type: 'travel',
        description: 'Estimate fuel and transit costs for pandal routes.'
      },
      {
        slug: 'puja-decoration-budget',
        name: 'Puja Decoration Budget Planner',
        type: 'budget',
        description: 'Flowers, lights, and backdrop decor.',
        defaultItems: [
          { name: 'Flowers', qty: 5, price: 100 },
          { name: 'Lights', qty: 2, price: 600 },
          { name: 'Backdrops', qty: 1, price: 1500 }
        ]
      }
    ]
  },
  {
    slug: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    blurb: 'Eco-friendly idol choices and visarjan routes.',
    keywords: ['eco idol cost', 'visarjan route fuel'],
    tools: [
      {
        slug: 'eco-ganpati-idol-cost',
        name: 'Eco-Friendly Ganpati Idol Cost Calculator',
        type: 'budget',
        description: 'Clay, paper mache, natural colors.',
        defaultItems: [
          { name: 'Clay (kg)', qty: 5, price: 60 },
          { name: 'Natural Colors', qty: 1, price: 300 }
        ]
      },
      {
        slug: 'visarjan-route-fuel-travel',
        name: 'Visarjan Route Fuel & Travel Calculator',
        type: 'travel',
        description: 'Distance, mileage, and fuel price estimator.'
      }
    ]
  },
  {
    slug: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    blurb: 'Rakhi festivities – plan gifts and deliveries.',
    keywords: ['rakhi budget', 'courier cost'],
    tools: [
      {
        slug: 'rakhi-gift-budget',
        name: 'Rakhi Gift Budget Planner',
        type: 'budget',
        description: 'Rakhi, sweets, gifts, and wrapping.',
        defaultItems: [
          { name: 'Rakhi(s)', qty: 3, price: 120 },
          { name: 'Sweets', qty: 1, price: 600 },
          { name: 'Gifts', qty: 2, price: 800 }
        ]
      },
      {
        slug: 'rakhi-delivery-cost',
        name: 'Rakhi Delivery Cost Estimator',
        type: 'travel',
        description: 'Courier charges by weight and distance.'
      }
    ]
  },
  {
    slug: 'janmashtami',
    name: 'Janmashtami',
    blurb: 'Dahi Handi events and fasting meals.',
    keywords: ['dahi handi cost', 'janmashtami fasting'],
    tools: [
      {
        slug: 'dahi-handi-event-cost',
        name: 'Dahi Handi Event Cost Calculator',
        type: 'budget',
        description: 'Rope, handi, team t-shirts, prize.',
        defaultItems: [
          { name: 'Handi & Rope', qty: 1, price: 1200 },
          { name: 'Team T-shirts', qty: 10, price: 250 },
          { name: 'Prize', qty: 1, price: 5000 }
        ]
      },
      {
        slug: 'janmashtami-fasting-meal-planner',
        name: 'Fasting Meal Planner for Janmashtami',
        type: 'budget',
        description: 'Plan simple fast-friendly meals.',
        defaultItems: [
          { name: 'Fruits (per day)', qty: 1, price: 120 },
          { name: 'Sabudana 500g', qty: 1, price: 90 }
        ]
      }
    ]
  },
  {
    slug: 'eid-ul-fitr',
    name: 'Eid-ul-Fitr',
    blurb: 'Charity (Zakat) and feasts after Ramadan.',
    keywords: ['zakat calculator', 'eid sweets cost'],
    tools: [
      {
        slug: 'zakat-charity-calculator',
        name: 'Zakat / Charity Calculator',
        type: 'zakat',
        description: 'Estimate zakat @ 2.5% as applicable.'
      },
      {
        slug: 'eid-food-sweet-expense',
        name: 'Eid Food & Sweet Expense Calculator',
        type: 'budget',
        description: 'Sheer khurma, sevai, biryani, and more.',
        defaultItems: [
          { name: 'Sevai/Sheer Khurma', qty: 1, price: 400 },
          { name: 'Biryani', qty: 1, price: 1200 }
        ]
      }
    ]
  },
  {
    slug: 'eid-ul-adha',
    name: 'Eid-ul-Adha (Bakrid)',
    blurb: 'Qurbani and charity planning.',
    keywords: ['qurbani cost calculator', 'charity planner'],
    tools: [
      {
        slug: 'qurbani-animal-cost',
        name: 'Qurbani Animal Cost Calculator',
        type: 'budget',
        description: 'Goat, sheep, cow – plan allocations.',
        defaultItems: [
          { name: 'Goat', qty: 1, price: 12000 },
          { name: 'Sheep', qty: 1, price: 10000 }
        ]
      },
      {
        slug: 'eid-charity-donation-planner',
        name: 'Charity / Donation Planner',
        type: 'budget',
        description: 'Allocate donations to causes.',
        defaultItems: [
          { name: 'Community Help', qty: 1, price: 2000 },
          { name: 'Food Kits', qty: 5, price: 300 }
        ]
      }
    ]
  },
  {
    slug: 'christmas',
    name: 'Christmas',
    blurb: 'Gifts, decorations, lighting – plan it all.',
    keywords: ['christmas gift budget', 'lights cost'],
    tools: [
      {
        slug: 'christmas-gift-budget',
        name: 'Christmas Gift Budget Planner',
        type: 'budget',
        description: 'Gifts, wrapping, cards.',
        defaultItems: [
          { name: 'Gifts', qty: 5, price: 700 },
          { name: 'Wrapping', qty: 5, price: 50 }
        ]
      },
      {
        slug: 'christmas-decoration-lighting-cost',
        name: 'Decoration & Lighting Cost Calculator',
        type: 'electricity',
        description: 'Power usage and cost for decorative lights.'
      }
    ]
  },
  {
    slug: 'new-year',
    name: 'New Year (1 Jan)',
    blurb: 'Parties and travel – budget it right.',
    keywords: ['new year party budget', 'holiday cost estimator'],
    tools: [
      {
        slug: 'new-year-party-budget',
        name: 'New Year Party Budget Planner',
        type: 'budget',
        description: 'Decor, snacks, drinks, DJ.',
        defaultItems: [
          { name: 'Decor', qty: 1, price: 1500 },
          { name: 'Snacks & Drinks', qty: 20, price: 120 }
        ]
      },
      {
        slug: 'travel-holiday-cost-estimator',
        name: 'Travel & Holiday Cost Estimator',
        type: 'travel',
        description: 'Trip distance, mileage, and fuel prices.'
      }
    ]
  },
  {
    slug: 'makar-sankranti',
    name: 'Makar Sankranti / Pongal / Lohri / Bihu',
    blurb: 'Kites and harvest feasts.',
    keywords: ['kite manjha budget', 'harvest food cost'],
    tools: [
      {
        slug: 'kite-manjha-budget',
        name: 'Kite & Manjha Budget Calculator',
        type: 'budget',
        description: 'Kites, manjha, spools.',
        defaultItems: [
          { name: 'Kites', qty: 10, price: 30 },
          { name: 'Manjha', qty: 1, price: 300 }
        ]
      },
      {
        slug: 'harvest-festival-food-cost',
        name: 'Harvest Festival Food Cost Estimator',
        type: 'budget',
        description: 'Tilgul, pongal, sarson da saag, pitha.',
        defaultItems: [
          { name: 'Tilgul', qty: 1, price: 400 },
          { name: 'Ingredients', qty: 1, price: 1200 }
        ]
      }
    ]
  },
  {
    slug: 'karva-chauth',
    name: 'Karva Chauth',
    blurb: 'Fasting and gifting essentials.',
    keywords: ['karva fasting calculator', 'gift outfit budget'],
    tools: [
      {
        slug: 'karva-chauth-fasting-hours',
        name: 'Fasting Hours Calculator (Moonrise)',
        type: 'fastingDuration',
        description: 'Compute fasting hours using sunrise and moonrise inputs.'
      },
      {
        slug: 'karva-chauth-gift-outfit-budget',
        name: 'Gift & Outfit Budget Planner',
        type: 'budget',
        description: 'Outfit, cosmetics, gifts.',
        defaultItems: [
          { name: 'Outfit', qty: 1, price: 2500 },
          { name: 'Gifts', qty: 1, price: 1500 }
        ]
      }
    ]
  },
  {
    slug: 'onam',
    name: 'Onam',
    blurb: 'Onam sadhya and pookalam flowers.',
    keywords: ['onam sadhya cost', 'pookalam budget'],
    tools: [
      {
        slug: 'onam-sadhya-ingredient-cost',
        name: 'Onam Sadhya Ingredient & Cost',
        type: 'budget',
        description: 'Banana leaves, vegetables, spices.',
        defaultItems: [
          { name: 'Banana Leaves', qty: 10, price: 10 },
          { name: 'Veg & Spices', qty: 1, price: 1500 }
        ]
      },
      {
        slug: 'flower-pookalam-budget',
        name: 'Flower Pookalam Decoration Budget',
        type: 'budget',
        description: 'Marigold, lotus, roses.',
        defaultItems: [
          { name: 'Flowers Mix', qty: 5, price: 200 }
        ]
      }
    ]
  },
  {
    slug: 'independence-day',
    name: 'Independence Day (15 Aug)',
    blurb: 'Flag hoisting and events.',
    keywords: ['flag hoisting budget', 'parade travel cost'],
    tools: [
      {
        slug: 'flag-hoisting-event-budget',
        name: 'Flag Hoisting Event Budget',
        type: 'budget',
        description: 'Flags, sweets, sound system.',
        defaultItems: [
          { name: 'Flags', qty: 10, price: 80 },
          { name: 'Sweets', qty: 100, price: 10 },
          { name: 'Sound System', qty: 1, price: 2000 }
        ]
      },
      {
        slug: 'parade-travel-cost',
        name: 'Travel Cost to Parade / Event',
        type: 'travel',
        description: 'Fuel and travel cost estimator.'
      }
    ]
  },
  {
    slug: 'republic-day',
    name: 'Republic Day (26 Jan)',
    blurb: 'Parade and flag events planning.',
    keywords: ['republic day event budget', 'travel accommodation cost'],
    tools: [
      {
        slug: 'parade-flag-event-cost-planner',
        name: 'Parade / Flag Event Cost Planner',
        type: 'budget',
        description: 'Seating, banners, hospitality.',
        defaultItems: [
          { name: 'Seating', qty: 50, price: 30 },
          { name: 'Banners', qty: 5, price: 400 }
        ]
      },
      {
        slug: 'republic-day-travel-accommodation',
        name: 'Travel & Accommodation Budget',
        type: 'budget',
        description: 'Travel fares and hotel stays.',
        defaultItems: [
          { name: 'Travel', qty: 2, price: 1500 },
          { name: 'Hotel', qty: 1, price: 3000 }
        ]
      }
    ]
  },
  {
    slug: 'valentines-day',
    name: "Valentine’s Day (14 Feb)",
    blurb: 'Date and gift budgets.',
    keywords: ['valentine budget', 'date dinner cost'],
    tools: [
      {
        slug: 'couple-date-gift-budget',
        name: 'Couple Date & Gift Budget',
        type: 'budget',
        description: 'Dinner, flowers, gifts.',
        defaultItems: [
          { name: 'Dinner', qty: 1, price: 1500 },
          { name: 'Flowers', qty: 1, price: 400 },
          { name: 'Gift', qty: 1, price: 1200 }
        ]
      },
      {
        slug: 'trip-dinner-cost-estimator',
        name: 'Trip / Dinner Cost Estimator',
        type: 'travel',
        description: 'Travel distance, mileage, and fuel.'
      }
    ]
  },
  {
    slug: 'baisakhi',
    name: 'Baisakhi',
    blurb: 'Harvest celebration budgets.',
    keywords: ['baisakhi budget', 'outfit cost'],
    tools: [
      {
        slug: 'harvest-food-festival-budget',
        name: 'Harvest Food Festival Budget',
        type: 'budget',
        description: 'Community meal and sweets.',
        defaultItems: [
          { name: 'Langar / Community Meal', qty: 1, price: 5000 }
        ]
      },
      {
        slug: 'traditional-outfit-cost',
        name: 'Traditional Outfit Cost',
        type: 'budget',
        description: 'Phulkari/kurta-pajama and accessories.',
        defaultItems: [
          { name: 'Outfit', qty: 1, price: 2000 },
          { name: 'Accessories', qty: 1, price: 600 }
        ]
      }
    ]
  },
  {
    slug: 'mahashivratri',
    name: 'Mahashivratri',
    blurb: 'Fasting meals and puja samagri.',
    keywords: ['shivratri fasting', 'puja samagri budget'],
    tools: [
      {
        slug: 'fasting-meal-cost-calculator',
        name: 'Fasting Meal Cost Calculator',
        type: 'budget',
        description: 'Milk, fruits, nuts, kuttu atta.',
        defaultItems: [
          { name: 'Milk', qty: 5, price: 60 },
          { name: 'Fruits', qty: 5, price: 100 }
        ]
      },
      {
        slug: 'puja-samagri-checklist-budget',
        name: 'Puja Samagri Checklist & Budget',
        type: 'budget',
        description: 'Belpatra, flowers, incense, ghee.',
        defaultItems: [
          { name: 'Belpatra', qty: 20, price: 5 },
          { name: 'Incense & Ghee', qty: 1, price: 300 }
        ]
      }
    ]
  },
  {
    slug: 'chhath-puja',
    name: 'Chhath Puja',
    blurb: 'Arghya puja items and prasad planning.',
    keywords: ['chhath arghya items', 'prasad planner'],
    tools: [
      {
        slug: 'arghya-puja-items-cost',
        name: 'Arghya Puja Items Cost Calculator',
        type: 'budget',
        description: 'Arghya thali, fruits, sweets.',
        defaultItems: [
          { name: 'Thali Set', qty: 1, price: 600 },
          { name: 'Fruits', qty: 10, price: 50 }
        ]
      },
      {
        slug: 'fasting-prasad-meal-planner',
        name: 'Fasting & Prasad Meal Planner',
        type: 'budget',
        description: 'Ingredients for the offerings.',
        defaultItems: [
          { name: 'Thekua Ingredients', qty: 1, price: 400 }
        ]
      }
    ]
  },
  {
    slug: 'gudi-padwa',
    name: 'Gudi Padwa',
    blurb: 'Decoration and festive foods.',
    keywords: ['gudi padwa budget', 'festival food ingredients'],
    tools: [
      {
        slug: 'gudi-padwa-celebration-decoration',
        name: 'Celebration & Decoration Budget',
        type: 'budget',
        description: 'Gudi setup, toran, marigold.',
        defaultItems: [
          { name: 'Gudi Setup', qty: 1, price: 800 },
          { name: 'Toran & Flowers', qty: 1, price: 600 }
        ]
      },
      {
        slug: 'festival-food-ingredients-cost',
        name: 'Festival Food Ingredients Estimator',
        type: 'budget',
        description: 'Puran poli/ shrikhand ingredients.',
        defaultItems: [
          { name: 'Ingredients', qty: 1, price: 1200 }
        ]
      }
    ]
  },
  {
    slug: 'ugadi',
    name: 'Ugadi',
    blurb: 'Recipes and puja expenses.',
    keywords: ['ugadi recipe calculator', 'ugadi puja expenses'],
    tools: [
      {
        slug: 'ugadi-recipe-ingredient-calculator',
        name: 'Festival Recipe Ingredient Calculator',
        type: 'budget',
        description: 'Ugadi pachadi/holiday recipes ingredients.',
        defaultItems: [
          { name: 'Ugadi Pachadi Items', qty: 1, price: 800 }
        ]
      },
      {
        slug: 'ugadi-celebration-puja-expense',
        name: 'Celebration & Puja Expense Planner',
        type: 'budget',
        description: 'Puja items, decor, family meal.',
        defaultItems: [
          { name: 'Puja Items', qty: 1, price: 700 },
          { name: 'Family Meal', qty: 1, price: 1500 }
        ]
      }
    ]
  }
];

export function findFestival(slug: string): FestivalConfig | undefined {
  return festivalList.find((f) => f.slug === slug);
}

export function findFestivalTool(festivalSlug: string, toolSlug: string): { festival: FestivalConfig; tool: FestivalToolConfig } | undefined {
  const festival = findFestival(festivalSlug);
  if (!festival) return undefined;
  const tool = festival.tools.find((t) => t.slug === toolSlug);
  if (!tool) return undefined;
  return { festival, tool };
}


