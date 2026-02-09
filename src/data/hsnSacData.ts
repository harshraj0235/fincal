// Comprehensive HSN/SAC Code Database for GST
export interface HSNSACItem {
  code: string;
  description: string;
  type: 'HSN' | 'SAC';
  gstRate: number;
  category: string;
  examples?: string[];
}

export const hsnSacDatabase: HSNSACItem[] = [
  // Chapter 01-05: Live Animals & Products
  { code: '0101', description: 'Live horses, asses, mules and hinnies', type: 'HSN', gstRate: 0, category: 'Live Animals' },
  { code: '0102', description: 'Live bovine animals (cattle)', type: 'HSN', gstRate: 0, category: 'Live Animals' },
  { code: '0103', description: 'Live swine (pigs)', type: 'HSN', gstRate: 0, category: 'Live Animals' },
  { code: '0104', description: 'Live sheep and goats', type: 'HSN', gstRate: 0, category: 'Live Animals' },
  { code: '0105', description: 'Live poultry (chickens, ducks, etc.)', type: 'HSN', gstRate: 0, category: 'Live Animals' },
  { code: '0201', description: 'Meat of bovine animals, fresh or chilled', type: 'HSN', gstRate: 0, category: 'Meat Products' },
  { code: '0202', description: 'Meat of bovine animals, frozen', type: 'HSN', gstRate: 0, category: 'Meat Products' },
  { code: '0401', description: 'Milk and cream, not concentrated', type: 'HSN', gstRate: 0, category: 'Dairy Products', examples: ['Fresh milk', 'Pasteurized milk'] },
  { code: '0402', description: 'Milk and cream, concentrated or with sugar', type: 'HSN', gstRate: 5, category: 'Dairy Products', examples: ['Milk powder', 'Condensed milk'] },
  { code: '0403', description: 'Buttermilk, curd, yogurt, kephir', type: 'HSN', gstRate: 5, category: 'Dairy Products', examples: ['Curd', 'Lassi', 'Yogurt'] },
  { code: '0404', description: 'Whey and products of milk', type: 'HSN', gstRate: 5, category: 'Dairy Products' },
  { code: '0405', description: 'Butter and dairy spreads', type: 'HSN', gstRate: 12, category: 'Dairy Products', examples: ['Butter', 'Ghee'] },
  { code: '0406', description: 'Cheese and curd', type: 'HSN', gstRate: 12, category: 'Dairy Products', examples: ['Paneer', 'Cheese'] },
  { code: '0407', description: 'Birds eggs, in shell', type: 'HSN', gstRate: 0, category: 'Eggs' },
  { code: '0408', description: 'Birds eggs, not in shell', type: 'HSN', gstRate: 5, category: 'Eggs' },
  
  // Chapter 07-14: Vegetables, Fruits, Cereals
  { code: '0701', description: 'Potatoes, fresh or chilled', type: 'HSN', gstRate: 0, category: 'Vegetables', examples: ['Fresh potatoes'] },
  { code: '0702', description: 'Tomatoes, fresh or chilled', type: 'HSN', gstRate: 0, category: 'Vegetables', examples: ['Fresh tomatoes'] },
  { code: '0703', description: 'Onions, shallots, garlic, leeks', type: 'HSN', gstRate: 0, category: 'Vegetables', examples: ['Onions', 'Garlic'] },
  { code: '0704', description: 'Cabbages, cauliflowers, kohlrabi', type: 'HSN', gstRate: 0, category: 'Vegetables', examples: ['Cabbage', 'Cauliflower'] },
  { code: '0705', description: 'Lettuce and chicory', type: 'HSN', gstRate: 0, category: 'Vegetables' },
  { code: '0706', description: 'Carrots, turnips, salad beetroot', type: 'HSN', gstRate: 0, category: 'Vegetables' },
  { code: '0707', description: 'Cucumbers and gherkins', type: 'HSN', gstRate: 0, category: 'Vegetables' },
  { code: '0708', description: 'Leguminous vegetables', type: 'HSN', gstRate: 0, category: 'Vegetables', examples: ['Peas', 'Beans'] },
  { code: '0709', description: 'Other vegetables', type: 'HSN', gstRate: 0, category: 'Vegetables', examples: ['Spinach', 'Brinjal'] },
  { code: '0801', description: 'Coconuts, Brazil nuts, cashew nuts', type: 'HSN', gstRate: 5, category: 'Fruits & Nuts', examples: ['Coconut', 'Cashew'] },
  { code: '0802', description: 'Other nuts', type: 'HSN', gstRate: 5, category: 'Fruits & Nuts', examples: ['Almonds', 'Walnuts'] },
  { code: '0803', description: 'Bananas', type: 'HSN', gstRate: 0, category: 'Fruits', examples: ['Fresh bananas'] },
  { code: '0804', description: 'Dates, figs, pineapples, avocados', type: 'HSN', gstRate: 0, category: 'Fruits' },
  { code: '0805', description: 'Citrus fruit', type: 'HSN', gstRate: 0, category: 'Fruits', examples: ['Oranges', 'Lemons'] },
  { code: '0806', description: 'Grapes', type: 'HSN', gstRate: 0, category: 'Fruits' },
  { code: '0807', description: 'Melons and papaws', type: 'HSN', gstRate: 0, category: 'Fruits', examples: ['Watermelon', 'Papaya'] },
  { code: '0808', description: 'Apples, pears and quinces', type: 'HSN', gstRate: 0, category: 'Fruits' },
  { code: '0809', description: 'Apricots, cherries, peaches, plums', type: 'HSN', gstRate: 0, category: 'Fruits' },
  { code: '0810', description: 'Other fruit', type: 'HSN', gstRate: 0, category: 'Fruits', examples: ['Strawberries', 'Mangoes'] },
  
  // Chapter 09: Coffee, Tea, Spices
  { code: '0901', description: 'Coffee, roasted or not', type: 'HSN', gstRate: 5, category: 'Beverages', examples: ['Coffee beans', 'Instant coffee'] },
  { code: '0902', description: 'Tea', type: 'HSN', gstRate: 5, category: 'Beverages', examples: ['Black tea', 'Green tea'] },
  { code: '0904', description: 'Pepper', type: 'HSN', gstRate: 5, category: 'Spices', examples: ['Black pepper'] },
  { code: '0905', description: 'Vanilla', type: 'HSN', gstRate: 5, category: 'Spices' },
  { code: '0906', description: 'Cinnamon and cinnamon-tree flowers', type: 'HSN', gstRate: 5, category: 'Spices' },
  { code: '0907', description: 'Cloves', type: 'HSN', gstRate: 5, category: 'Spices' },
  { code: '0908', description: 'Nutmeg, mace and cardamoms', type: 'HSN', gstRate: 5, category: 'Spices', examples: ['Cardamom', 'Nutmeg'] },
  { code: '0909', description: 'Seeds of anise, badian, fennel, coriander', type: 'HSN', gstRate: 5, category: 'Spices', examples: ['Coriander seeds', 'Fennel'] },
  { code: '0910', description: 'Ginger, saffron, turmeric, thyme, bay leaves', type: 'HSN', gstRate: 5, category: 'Spices', examples: ['Turmeric', 'Ginger'] },
  
  // Chapter 17: Sugars
  { code: '1701', description: 'Cane or beet sugar', type: 'HSN', gstRate: 5, category: 'Sugar', examples: ['White sugar', 'Brown sugar'] },
  
  // Chapter 19: Prepared foods
  { code: '1901', description: 'Malt extract, food preparations', type: 'HSN', gstRate: 18, category: 'Prepared Foods' },
  { code: '1902', description: 'Pasta, noodles, couscous', type: 'HSN', gstRate: 18, category: 'Prepared Foods', examples: ['Pasta', 'Noodles', 'Macaroni'] },
  { code: '1904', description: 'Cereals in grain form, pre-cooked', type: 'HSN', gstRate: 18, category: 'Prepared Foods', examples: ['Cornflakes', 'Oats'] },
  { code: '1905', description: 'Bread, pastry, cakes, biscuits', type: 'HSN', gstRate: 18, category: 'Prepared Foods', examples: ['Biscuits', 'Cakes', 'Pastries'] },
  
  // Chapter 20-22: Beverages
  { code: '2009', description: 'Fruit juices and vegetable juices', type: 'HSN', gstRate: 12, category: 'Beverages', examples: ['Orange juice', 'Mango juice'] },
  { code: '2105', description: 'Ice cream and edible ice', type: 'HSN', gstRate: 18, category: 'Prepared Foods', examples: ['Ice cream', 'Frozen desserts'] },
  { code: '2106', description: 'Food preparations not elsewhere specified', type: 'HSN', gstRate: 18, category: 'Prepared Foods', examples: ['Namkeen', 'Ready to eat'] },
  { code: '2202', description: 'Waters, including mineral and aerated', type: 'HSN', gstRate: 28, category: 'Beverages', examples: ['Soft drinks', 'Aerated water'] },
  
  // Chapter 25-27: Minerals, Fuels
  { code: '2523', description: 'Portland cement, aluminous cement', type: 'HSN', gstRate: 28, category: 'Construction', examples: ['Cement'] },
  { code: '2701', description: 'Coal, briquettes, ovoids', type: 'HSN', gstRate: 5, category: 'Fuels' },
  { code: '2709', description: 'Petroleum oils, crude', type: 'HSN', gstRate: 5, category: 'Fuels' },
  { code: '2710', description: 'Petroleum oils, other than crude', type: 'HSN', gstRate: 18, category: 'Fuels', examples: ['Petrol', 'Diesel'] },
  
  // Chapter 30-33: Pharmaceuticals, Cosmetics
  { code: '3003', description: 'Medicaments (not in dosage)', type: 'HSN', gstRate: 12, category: 'Pharmaceuticals', examples: ['Bulk medicines', 'Ayurvedic'] },
  { code: '3004', description: 'Medicaments (in dosage)', type: 'HSN', gstRate: 12, category: 'Pharmaceuticals', examples: ['Tablets', 'Capsules'] },
  { code: '3303', description: 'Perfumes and toilet waters', type: 'HSN', gstRate: 28, category: 'Cosmetics', examples: ['Perfumes', 'Eau de toilette'] },
  { code: '3304', description: 'Beauty or makeup preparations', type: 'HSN', gstRate: 28, category: 'Cosmetics', examples: ['Lipstick', 'Foundation', 'Cream'] },
  { code: '3305', description: 'Preparations for hair', type: 'HSN', gstRate: 28, category: 'Cosmetics', examples: ['Shampoo', 'Hair oil', 'Hair gel'] },
  { code: '3306', description: 'Preparations for oral or dental hygiene', type: 'HSN', gstRate: 18, category: 'Healthcare', examples: ['Toothpaste', 'Mouthwash'] },
  { code: '3307', description: 'Shaving preparations, deodorants', type: 'HSN', gstRate: 28, category: 'Cosmetics', examples: ['Deodorant', 'Shaving cream'] },
  
  // Chapter 39-40: Plastics, Rubber
  { code: '3923', description: 'Articles for conveyance of goods, of plastics', type: 'HSN', gstRate: 18, category: 'Plastics' },
  { code: '4011', description: 'New pneumatic tyres, of rubber', type: 'HSN', gstRate: 28, category: 'Rubber Products', examples: ['Car tyres', 'Bike tyres'] },
  
  // Chapter 48-49: Paper, Printed Books
  { code: '4820', description: 'Exercise books', type: 'HSN', gstRate: 12, category: 'Stationery', examples: ['Notebooks', 'School copies'] },
  { code: '4901', description: 'Printed books, brochures', type: 'HSN', gstRate: 0, category: 'Books' },
  { code: '4902', description: 'Newspapers, journals, periodicals', type: 'HSN', gstRate: 0, category: 'Publications' },
  
  // Chapter 61-64: Apparel & Textiles
  { code: '6101', description: 'Mens overcoats, cloaks, anoraks', type: 'HSN', gstRate: 12, category: 'Apparel', examples: ['Jackets', 'Coats'] },
  { code: '6102', description: 'Womens overcoats, cloaks, anoraks', type: 'HSN', gstRate: 12, category: 'Apparel' },
  { code: '6103', description: 'Mens suits, ensembles, jackets', type: 'HSN', gstRate: 12, category: 'Apparel' },
  { code: '6104', description: 'Womens suits, ensembles, jackets', type: 'HSN', gstRate: 12, category: 'Apparel' },
  { code: '6105', description: 'Mens shirts', type: 'HSN', gstRate: 12, category: 'Apparel', examples: ['T-shirts', 'Formal shirts'] },
  { code: '6106', description: 'Womens blouses and shirts', type: 'HSN', gstRate: 12, category: 'Apparel' },
  { code: '6203', description: 'Mens suits, jackets, trousers (woven)', type: 'HSN', gstRate: 12, category: 'Apparel', examples: ['Pants', 'Trousers'] },
  { code: '6204', description: 'Womens suits, jackets, dresses (woven)', type: 'HSN', gstRate: 12, category: 'Apparel', examples: ['Sarees', 'Dresses'] },
  
  // Chapter 64: Footwear
  { code: '6401', description: 'Waterproof footwear', type: 'HSN', gstRate: 18, category: 'Footwear', examples: ['Rain boots'] },
  { code: '6402', description: 'Other footwear with outer soles of rubber/plastics', type: 'HSN', gstRate: 18, category: 'Footwear', examples: ['Sports shoes', 'Sandals'] },
  { code: '6403', description: 'Footwear with outer soles of rubber/plastics/leather', type: 'HSN', gstRate: 18, category: 'Footwear', examples: ['Leather shoes'] },
  { code: '6404', description: 'Footwear with outer soles of rubber/plastics/textile', type: 'HSN', gstRate: 18, category: 'Footwear' },
  { code: '6405', description: 'Other footwear', type: 'HSN', gstRate: 18, category: 'Footwear' },
  
  // Chapter 84-85: Machinery, Electrical Equipment
  { code: '8415', description: 'Air conditioning machines', type: 'HSN', gstRate: 28, category: 'Electrical', examples: ['AC units', 'Split AC'] },
  { code: '8418', description: 'Refrigerators, freezers', type: 'HSN', gstRate: 18, category: 'Electrical', examples: ['Fridge', 'Freezer'] },
  { code: '8422', description: 'Dish washing machines', type: 'HSN', gstRate: 28, category: 'Electrical', examples: ['Dishwasher'] },
  { code: '8443', description: 'Printing machinery', type: 'HSN', gstRate: 18, category: 'Electronics', examples: ['Printers', 'Scanners'] },
  { code: '8450', description: 'Household washing machines', type: 'HSN', gstRate: 28, category: 'Electrical', examples: ['Washing machine'] },
  { code: '8471', description: 'Automatic data processing machines', type: 'HSN', gstRate: 18, category: 'IT Equipment', examples: ['Computers', 'Laptops'] },
  { code: '8508', description: 'Vacuum cleaners', type: 'HSN', gstRate: 28, category: 'Electrical', examples: ['Vacuum cleaner'] },
  { code: '8516', description: 'Electric instantaneous water heaters', type: 'HSN', gstRate: 18, category: 'Electrical', examples: ['Geysers', 'Water heaters'] },
  { code: '8517', description: 'Telephone sets, smartphones', type: 'HSN', gstRate: 12, category: 'Electronics', examples: ['Mobile phones', 'Smartphones'] },
  { code: '8518', description: 'Microphones, loudspeakers, headphones', type: 'HSN', gstRate: 18, category: 'Electronics', examples: ['Speakers', 'Headphones'] },
  { code: '8525', description: 'Transmission apparatus', type: 'HSN', gstRate: 18, category: 'Electronics', examples: ['Cameras', 'Broadcasting equipment'] },
  { code: '8528', description: 'Monitors, projectors, televisions', type: 'HSN', gstRate: 28, category: 'Electronics', examples: ['TV', 'LED TV', 'Smart TV'] },
  
  // Chapter 87: Vehicles
  { code: '8701', description: 'Tractors', type: 'HSN', gstRate: 12, category: 'Vehicles' },
  { code: '8702', description: 'Motor vehicles for transport of 10+ persons', type: 'HSN', gstRate: 28, category: 'Vehicles', examples: ['Buses'] },
  { code: '8703', description: 'Motor cars and vehicles for persons', type: 'HSN', gstRate: 28, category: 'Vehicles', examples: ['Cars', 'SUVs'] },
  { code: '8704', description: 'Motor vehicles for transport of goods', type: 'HSN', gstRate: 28, category: 'Vehicles', examples: ['Trucks', 'Commercial vehicles'] },
  { code: '8711', description: 'Motorcycles and cycles with motor', type: 'HSN', gstRate: 28, category: 'Vehicles', examples: ['Motorcycles', 'Scooters'] },
  { code: '8712', description: 'Bicycles', type: 'HSN', gstRate: 12, category: 'Vehicles' },
  
  // Chapter 90-94: Optical, Medical, Furniture
  { code: '9004', description: 'Spectacles, goggles', type: 'HSN', gstRate: 12, category: 'Optical', examples: ['Eyeglasses', 'Sunglasses'] },
  { code: '9018', description: 'Medical instruments and appliances', type: 'HSN', gstRate: 12, category: 'Medical Equipment' },
  { code: '9401', description: 'Seats', type: 'HSN', gstRate: 18, category: 'Furniture', examples: ['Chairs', 'Sofas'] },
  { code: '9403', description: 'Other furniture', type: 'HSN', gstRate: 18, category: 'Furniture', examples: ['Tables', 'Cabinets'] },
  
  // SAC Codes - Services
  { code: '995411', description: 'Advertising services', type: 'SAC', gstRate: 18, category: 'Business Services' },
  { code: '996311', description: 'Hotel accommodation services', type: 'SAC', gstRate: 18, category: 'Hospitality', examples: ['Hotel rooms'] },
  { code: '996312', description: 'Restaurant and food serving services', type: 'SAC', gstRate: 5, category: 'Hospitality', examples: ['Restaurant without AC'] },
  { code: '996331', description: 'Restaurant and food serving services (AC)', type: 'SAC', gstRate: 18, category: 'Hospitality', examples: ['AC restaurant', 'Fine dining'] },
  { code: '997131', description: 'Banking and related services', type: 'SAC', gstRate: 18, category: 'Financial Services', examples: ['Bank charges', 'Fees'] },
  { code: '997132', description: 'Insurance and related services', type: 'SAC', gstRate: 18, category: 'Financial Services', examples: ['Life insurance', 'General insurance'] },
  { code: '997212', description: 'IT design and development services', type: 'SAC', gstRate: 18, category: 'IT Services', examples: ['Software development'] },
  { code: '997331', description: 'Telecommunications services', type: 'SAC', gstRate: 18, category: 'Telecom', examples: ['Mobile services', 'Internet'] },
  { code: '998314', description: 'IT consultancy and support services', type: 'SAC', gstRate: 18, category: 'IT Services', examples: ['IT consulting'] },
  { code: '9965', description: 'Passenger transport services', type: 'SAC', gstRate: 5, category: 'Transport', examples: ['Bus', 'Train'] },
  { code: '9973', description: 'Air transport services of passengers', type: 'SAC', gstRate: 5, category: 'Transport', examples: ['Flights'] },
  { code: '9992', description: 'Educational services', type: 'SAC', gstRate: 0, category: 'Education', examples: ['School', 'College'] },
  { code: '9993', description: 'Healthcare services', type: 'SAC', gstRate: 0, category: 'Healthcare', examples: ['Doctor', 'Hospital'] },
  { code: '9996', description: 'Entertainment services', type: 'SAC', gstRate: 28, category: 'Entertainment', examples: ['Cinema', 'Amusement parks'] },
  { code: '9997', description: 'Other services', type: 'SAC', gstRate: 18, category: 'Miscellaneous' },
];

// Helper functions
export const searchHSNSAC = (query: string): HSNSACItem[] => {
  const lowerQuery = query.toLowerCase();
  return hsnSacDatabase.filter(item =>
    item.code.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery) ||
    item.examples?.some(ex => ex.toLowerCase().includes(lowerQuery))
  );
};

export const getByCode = (code: string): HSNSACItem | undefined => {
  return hsnSacDatabase.find(item => item.code === code);
};

export const getByCategory = (category: string): HSNSACItem[] => {
  return hsnSacDatabase.filter(item => item.category === category);
};

export const getByGSTRate = (rate: number): HSNSACItem[] => {
  return hsnSacDatabase.filter(item => item.gstRate === rate);
};

export const getAllCategories = (): string[] => {
  return [...new Set(hsnSacDatabase.map(item => item.category))].sort();
};

export const getAllGSTRates = (): number[] => {
  return [...new Set(hsnSacDatabase.map(item => item.gstRate))].sort((a, b) => a - b);
};
