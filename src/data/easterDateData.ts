// Easter & Good Friday Dates - Western (Gregorian) and Orthodox (Julian)
// Calculated using Meeus/Jones algorithm for Western Easter
// Orthodox Easter uses Julian calendar calculation

export interface EasterDate {
  year: number;
  westernEaster: string; // Gregorian Easter (Western churches)
  westernGoodFriday: string;
  westernMaundyThursday: string;
  westernHolySaturday: string;
  westernEasterMonday: string;
  orthodoxEaster: string; // Orthodox Easter (Eastern churches)
  orthodoxGoodFriday: string;
  daysDifference: number; // Days between Western and Orthodox Easter
  significance: string;
}

export interface HolyWeekDay {
  name: string;
  description: string;
  observance: string;
  icon: string;
}

// Easter dates calculated using Meeus algorithm (2024-2035)
export const easterDates: EasterDate[] = [
  {
    year: 2024,
    westernEaster: '2024-03-31',
    westernGoodFriday: '2024-03-29',
    westernMaundyThursday: '2024-03-28',
    westernHolySaturday: '2024-03-30',
    westernEasterMonday: '2024-04-01',
    orthodoxEaster: '2024-05-05',
    orthodoxGoodFriday: '2024-05-03',
    daysDifference: 35,
    significance: 'Resurrection of Jesus Christ from the dead'
  },
  {
    year: 2025,
    westernEaster: '2025-04-20',
    westernGoodFriday: '2025-04-18',
    westernMaundyThursday: '2025-04-17',
    westernHolySaturday: '2025-04-19',
    westernEasterMonday: '2025-04-21',
    orthodoxEaster: '2025-04-20',
    orthodoxGoodFriday: '2025-04-18',
    daysDifference: 0,
    significance: 'Resurrection of Jesus Christ from the dead'
  },
  {
    year: 2026,
    westernEaster: '2026-04-05',
    westernGoodFriday: '2026-04-03',
    westernMaundyThursday: '2026-04-02',
    westernHolySaturday: '2026-04-04',
    westernEasterMonday: '2026-04-06',
    orthodoxEaster: '2026-04-12',
    orthodoxGoodFriday: '2026-04-10',
    daysDifference: 7,
    significance: 'Resurrection of Jesus Christ from the dead'
  },
  {
    year: 2027,
    westernEaster: '2027-03-28',
    westernGoodFriday: '2027-03-26',
    westernMaundyThursday: '2027-03-25',
    westernHolySaturday: '2027-03-27',
    westernEasterMonday: '2027-03-29',
    orthodoxEaster: '2027-05-02',
    orthodoxGoodFriday: '2027-04-30',
    daysDifference: 35,
    significance: 'Resurrection of Jesus Christ from the dead'
  },
  {
    year: 2028,
    westernEaster: '2028-04-16',
    westernGoodFriday: '2028-04-14',
    westernMaundyThursday: '2028-04-13',
    westernHolySaturday: '2028-04-15',
    westernEasterMonday: '2028-04-17',
    orthodoxEaster: '2028-04-16',
    orthodoxGoodFriday: '2028-04-14',
    daysDifference: 0,
    significance: 'Resurrection of Jesus Christ from the dead'
  },
  {
    year: 2029,
    westernEaster: '2029-04-01',
    westernGoodFriday: '2029-03-30',
    westernMaundyThursday: '2029-03-29',
    westernHolySaturday: '2029-03-31',
    westernEasterMonday: '2029-04-02',
    orthodoxEaster: '2029-04-08',
    orthodoxGoodFriday: '2029-04-06',
    daysDifference: 7,
    significance: 'Resurrection of Jesus Christ from the dead'
  },
  {
    year: 2030,
    westernEaster: '2030-04-21',
    westernGoodFriday: '2030-04-19',
    westernMaundyThursday: '2030-04-18',
    westernHolySaturday: '2030-04-20',
    westernEasterMonday: '2030-04-22',
    orthodoxEaster: '2030-04-28',
    orthodoxGoodFriday: '2030-04-26',
    daysDifference: 7,
    significance: 'Resurrection of Jesus Christ from the dead'
  }
];

// Holy Week days
export const holyWeekDays: HolyWeekDay[] = [
  {
    name: 'Palm Sunday',
    description: 'Celebrates Jesus\' triumphant entry into Jerusalem. People waved palm branches as He entered the city.',
    observance: 'Week before Easter Sunday',
    icon: '🌿'
  },
  {
    name: 'Maundy Thursday',
    description: 'Commemorates the Last Supper of Jesus with His apostles. Includes foot washing ceremony.',
    observance: '3 days before Easter',
    icon: '🍞'
  },
  {
    name: 'Good Friday',
    description: 'Observes the crucifixion of Jesus Christ and His death at Calvary. A solemn day of fasting and prayer.',
    observance: '2 days before Easter',
    icon: '✝️'
  },
  {
    name: 'Holy Saturday',
    description: 'The day between Good Friday and Easter Sunday. Commemorates Jesus in the tomb.',
    observance: '1 day before Easter',
    icon: '🕯️'
  },
  {
    name: 'Easter Sunday',
    description: 'Celebrates the resurrection of Jesus Christ from the dead. The most important Christian festival.',
    observance: 'Movable feast',
    icon: '🌅'
  },
  {
    name: 'Easter Monday',
    description: 'Day after Easter Sunday. In many countries, it is a public holiday extending the Easter celebration.',
    observance: '1 day after Easter',
    icon: '🎉'
  }
];

// Easter traditions
export const easterTraditions = [
  {
    title: 'Easter Eggs',
    description: 'Decorated eggs symbolize new life and resurrection. Children participate in Easter egg hunts and egg rolling activities.',
    icon: '🥚'
  },
  {
    title: 'Easter Bunny',
    description: 'The Easter Bunny brings baskets filled with colored eggs, candy, and gifts to children on Easter morning.',
    icon: '🐰'
  },
  {
    title: 'Church Services',
    description: 'Special sunrise services, Mass, and prayers celebrate Christ\'s resurrection. Churches are decorated with lilies and crosses.',
    icon: '⛪'
  },
  {
    title: 'Easter Lily',
    description: 'White lilies symbolize purity and resurrection. They are used to decorate churches and homes during Easter.',
    icon: '🌸'
  },
  {
    title: 'Hot Cross Buns',
    description: 'Sweet spiced buns marked with a cross, traditionally eaten on Good Friday to commemorate the crucifixion.',
    icon: '🍞'
  },
  {
    title: 'Easter Parade',
    description: 'People wear new spring clothes and bonnets. Easter parades and bonnet festivals are held in many cities.',
    icon: '👒'
  }
];

// Easter FAQs
export const easterFAQs = [
  {
    question: 'When is Easter 2025?',
    answer: 'Easter Sunday 2025 (Western) falls on Sunday, April 20, 2025. Good Friday 2025 is on Friday, April 18, 2025.'
  },
  {
    question: 'Why does Easter date change every year?',
    answer: 'Easter is a movable feast calculated as the first Sunday after the Paschal Full Moon (first full moon on or after March 21, the spring equinox). This formula causes Easter to fall on different dates each year.'
  },
  {
    question: 'What is Good Friday?',
    answer: 'Good Friday is the Friday before Easter Sunday. It commemorates the crucifixion of Jesus Christ and His death at Calvary. It is observed with fasting, prayer, and reflection.'
  },
  {
    question: 'What is the difference between Western and Orthodox Easter?',
    answer: 'Western Easter uses the Gregorian calendar, while Orthodox Easter uses the Julian calendar for calculations. This often results in different dates, though sometimes they coincide.'
  },
  {
    question: 'Can Easter fall in March?',
    answer: 'Yes! Easter can fall between March 22 and April 25. The earliest possible Easter is March 22, and the latest is April 25.'
  },
  {
    question: 'Is Good Friday a public holiday?',
    answer: 'Yes, Good Friday is a public holiday in many countries including India, UK, Australia, Canada, and most Christian-majority nations. Government offices and many businesses remain closed.'
  },
  {
    question: 'What is Holy Week?',
    answer: 'Holy Week is the week before Easter, starting with Palm Sunday and including Maundy Thursday, Good Friday, and Holy Saturday. It commemorates Jesus\' final week in Jerusalem.'
  },
  {
    question: 'What is Maundy Thursday?',
    answer: 'Maundy Thursday (3 days before Easter) commemorates the Last Supper of Jesus with His disciples. It includes foot washing ceremonies in many churches.'
  },
  {
    question: 'Why is it called "Good" Friday if Jesus died?',
    answer: 'Despite the somber nature, it\'s called "Good" because Jesus\' sacrifice brought salvation and redemption to humanity. His death is seen as the ultimate good deed for mankind.'
  },
  {
    question: 'Can I download Easter 2025 calendar?',
    answer: 'Yes! Our tool provides downloadable .ics calendar files for Easter Sunday, Good Friday, and the entire Holy Week that you can add to Google Calendar, Apple Calendar, or Outlook.'
  }
];

// Why Easter date changes explanation
export const easterCalculationExplanation = {
  title: 'How is Easter Date Calculated?',
  summary: 'Easter is the first Sunday after the Paschal Full Moon occurring on or after March 21 (the ecclesiastical spring equinox).',
  details: [
    'Step 1: Find the Paschal Full Moon - the first full moon on or after March 21',
    'Step 2: Find the first Sunday after that full moon',
    'Step 3: That Sunday is Easter',
    'Step 4: Good Friday is 2 days before Easter Sunday'
  ],
  note: 'This formula was established by the Council of Nicaea in 325 AD to ensure Easter falls in spring and after Passover.'
};



