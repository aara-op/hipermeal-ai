/**
 * Global World Food & Nutritional Decomposition Database
 * Covers major authentic dietary traditions across all 7 continents:
 * - South Asian (Indian Subcontinent)
 * - East Asian (Japanese, Chinese, Korean)
 * - Southeast Asian (Thai, Vietnamese, Indonesian)
 * - Mediterranean & Middle Eastern (Levantine, Greek, Turkish, North African)
 * - European & Italian (Traditional Continental)
 * - North American & Contemporary Athletic Nutrition
 * - Latin American & Caribbean
 * - Sub-Saharan African
 *
 * Each item contains:
 * - Calories, Protein, Net Carbs, Fat, Fiber, Sodium, Potassium
 * - Nutri-Score (A through E)
 * - NOVA Processing Group (1 to 4)
 * - Glycemic Index (Low, Medium, High)
 * - Eco-Score (Carbon/Water footprint A through E)
 * - Common Allergens
 * - Smart Dietitian Swap recommendations
 */

export const WORLD_CUISINES = [
  { id: 'all', name: 'Global All-Cuisines', icon: '🌍', count: '4.8M+ Open Food Facts' },
  { id: 'south-asian', name: 'South Asian (Indian)', icon: '🍛', staple: 'Lentils, Rice, Ghee, Roti, Spices' },
  { id: 'east-asian', name: 'East Asian (JP/CN/KR)', icon: '🥢', staple: 'Ramen, Tofu, Rice, Fish, Kimchi' },
  { id: 'southeast-asian', name: 'Southeast Asian', icon: '🍜', staple: 'Pad Thai, Pho, Coconut, Satay' },
  { id: 'mediterranean', name: 'Mediterranean & Middle Eastern', icon: '🫒', staple: 'Olive Oil, Hummus, Shawarma, Feta' },
  { id: 'european', name: 'European & Italian', icon: '🍕', staple: 'Pasta, Bread, Cheese, Olive Oils' },
  { id: 'americas', name: 'Americas & Fitness', icon: '🥑', staple: 'Lean Meats, Avocado, Oats, Quinoa' },
  { id: 'latin-american', name: 'Latin American', icon: '🌮', staple: 'Beans, Corn, Guacamole, Grilled Meats' },
  { id: 'african', name: 'African Traditional', icon: '🍲', staple: 'Jollof, Yams, Tagine, Injera, Suya' }
];

export const WORLD_FOOD_ITEMS = [
  // ==========================================
  // SOUTH ASIAN (INDIAN SUBCONTINENT)
  // ==========================================
  {
    id: 'wf-ind-biryani',
    name: 'Dum Hyderabadi Chicken Biryani',
    cuisine: 'south-asian',
    category: 'Main Dish',
    defaultServingGrams: 320,
    caloriesPer100g: 178,
    proteinPer100g: 8.8,
    carbsPer100g: 22.4,
    fatPer100g: 6.2,
    fiberPer100g: 1.4,
    sodiumMgPer100g: 340,
    nutriScore: 'B',
    novaGroup: 3,
    glycemicIndex: 'Medium',
    giScore: 62,
    ecoScore: 'C',
    allergens: ['Dairy'],
    tags: ['High Protein', 'Halal', 'Spiced'],
    swapSuggestion: 'Pair with cucumber raita to slow glycemic absorption and add dietary probiotics.'
  },
  {
    id: 'wf-ind-paneer-butter',
    name: 'Paneer Butter Masala',
    cuisine: 'south-asian',
    category: 'Curry / Gravy',
    defaultServingGrams: 220,
    caloriesPer100g: 195,
    proteinPer100g: 7.2,
    carbsPer100g: 6.8,
    fatPer100g: 15.5,
    fiberPer100g: 1.8,
    sodiumMgPer100g: 410,
    nutriScore: 'C',
    novaGroup: 3,
    glycemicIndex: 'Low',
    giScore: 38,
    ecoScore: 'D',
    allergens: ['Dairy', 'Cashews'],
    tags: ['Vegetarian', 'Keto Friendly', 'Rich Calcium'],
    swapSuggestion: 'Substitute half the heavy cream with hung Greek yogurt to cut 8g of saturated fat.'
  },
  {
    id: 'wf-ind-masala-dosa',
    name: 'Crispy Masala Dosa with Potato Filling',
    cuisine: 'south-asian',
    category: 'Breakfast / Snack',
    defaultServingGrams: 200,
    caloriesPer100g: 165,
    proteinPer100g: 3.9,
    carbsPer100g: 27.8,
    fatPer100g: 4.2,
    fiberPer100g: 2.1,
    sodiumMgPer100g: 290,
    nutriScore: 'B',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 58,
    ecoScore: 'B',
    allergens: ['Mustard Seeds'],
    tags: ['Vegetarian', 'Naturally Fermented', 'Gut Friendly'],
    swapSuggestion: 'Increase sambhar portion (lentils & drumsticks) for a 2x boost in lean protein and fiber.'
  },
  {
    id: 'wf-ind-dal-tadka',
    name: 'Yellow Toor Dal Tadka (Cumin & Garlic)',
    cuisine: 'south-asian',
    category: 'Legumes / Dal',
    defaultServingGrams: 200,
    caloriesPer100g: 104,
    proteinPer100g: 6.8,
    carbsPer100g: 14.6,
    fatPer100g: 2.1,
    fiberPer100g: 3.8,
    sodiumMgPer100g: 260,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 32,
    ecoScore: 'A',
    allergens: [],
    tags: ['Vegan', 'High Fiber', 'Diabetic Friendly', 'Heart Healthy'],
    swapSuggestion: 'Already a gold-standard staple! Excellent protein-to-fiber ratio.'
  },
  {
    id: 'wf-ind-samosa',
    name: 'Crispy Spiced Potato & Pea Samosa',
    cuisine: 'south-asian',
    category: 'Street Snack',
    defaultServingGrams: 90,
    caloriesPer100g: 285,
    proteinPer100g: 4.8,
    carbsPer100g: 33.2,
    fatPer100g: 15.1,
    fiberPer100g: 2.6,
    sodiumMgPer100g: 460,
    nutriScore: 'D',
    novaGroup: 3,
    glycemicIndex: 'High',
    giScore: 71,
    ecoScore: 'B',
    allergens: ['Gluten'],
    tags: ['Vegetarian', 'Fried'],
    swapSuggestion: 'Air-fry or bake at 200°C to eliminate 60% of oil without sacrificing flaky crunch.'
  },
  {
    id: 'wf-ind-roti',
    name: 'Whole Wheat Phulka / Roti',
    cuisine: 'south-asian',
    category: 'Bread',
    defaultServingGrams: 45,
    caloriesPer100g: 260,
    proteinPer100g: 9.4,
    carbsPer100g: 52.0,
    fatPer100g: 2.8,
    fiberPer100g: 8.5,
    sodiumMgPer100g: 180,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Medium',
    giScore: 54,
    ecoScore: 'A',
    allergens: ['Gluten'],
    tags: ['Whole Grain', 'Vegetarian', 'High Fiber', 'Desi Staple'],
    swapSuggestion: 'Add 20% chickpea (besan) or sattu flour to the dough for +4g protein per roti.'
  },
  {
    id: 'wf-ind-sabji',
    name: 'Homestyle Aloo Gobi & Mixed Vegetable Sabji',
    cuisine: 'south-asian',
    category: 'Curry / Sabji',
    defaultServingGrams: 160,
    caloriesPer100g: 95,
    proteinPer100g: 2.8,
    carbsPer100g: 11.2,
    fatPer100g: 4.5,
    fiberPer100g: 3.2,
    sodiumMgPer100g: 240,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 42,
    ecoScore: 'A',
    allergens: [],
    tags: ['Vegetarian', 'Low Calorie', 'High Micronutrients', 'Desi Staple'],
    swapSuggestion: 'Prepared with turmeric, cumin, and cold-pressed mustard oil. High in cancer-protective glucosinolates.'
  },
  {
    id: 'wf-ind-poha',
    name: 'Indori Kanda Batata Poha (Flattened Rice with Peanuts)',
    cuisine: 'south-asian',
    category: 'Breakfast / Snack',
    defaultServingGrams: 180,
    caloriesPer100g: 160,
    proteinPer100g: 3.5,
    carbsPer100g: 28.0,
    fatPer100g: 4.2,
    fiberPer100g: 2.1,
    sodiumMgPer100g: 280,
    nutriScore: 'A',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 52,
    ecoScore: 'A',
    allergens: ['Peanuts', 'Mustard Seeds'],
    tags: ['Vegetarian', 'Iron Rich', 'Probiotic Base', 'Desi Staple'],
    swapSuggestion: 'Squeeze fresh lemon juice to triple non-heme iron absorption; garnish with roasted peanuts instead of fried sev.'
  },
  {
    id: 'wf-ind-jalebi',
    name: 'Crispy Golden Saffron Jalebi (Sugar-Soaked Spirals)',
    cuisine: 'south-asian',
    category: 'Dessert / Mithai',
    defaultServingGrams: 90,
    caloriesPer100g: 380,
    proteinPer100g: 2.2,
    carbsPer100g: 68.5,
    fatPer100g: 11.8,
    fiberPer100g: 0.5,
    sodiumMgPer100g: 140,
    nutriScore: 'E',
    novaGroup: 3,
    glycemicIndex: 'High',
    giScore: 78,
    ecoScore: 'B',
    allergens: ['Gluten'],
    tags: ['Vegetarian', 'High Sugar', 'Festive Sweet', 'Desi Staple'],
    swapSuggestion: 'Enjoy mindful portion (2 spirals ~50g); pair with unsweetened warm milk or Greek yogurt to blunt glycemic surge.'
  },
  {
    id: 'wf-ind-kachori',
    name: 'Crispy Khasta Pyaaz / Moong Dal Kachori',
    cuisine: 'south-asian',
    category: 'Street Snack',
    defaultServingGrams: 110,
    caloriesPer100g: 340,
    proteinPer100g: 6.2,
    carbsPer100g: 38.0,
    fatPer100g: 18.5,
    fiberPer100g: 3.4,
    sodiumMgPer100g: 490,
    nutriScore: 'D',
    novaGroup: 3,
    glycemicIndex: 'High',
    giScore: 68,
    ecoScore: 'B',
    allergens: ['Gluten'],
    tags: ['Vegetarian', 'Fried', 'Spiced Moong Dal', 'Desi Staple'],
    swapSuggestion: 'Air-fry or bake at 190°C to cut 60% of deep-frying oil while preserving the flaky ajwain crust.'
  },

  // ==========================================
  // EAST ASIAN (JAPAN, CHINA, KOREA)
  // ==========================================
  {
    id: 'wf-ea-ramen',
    name: 'Rich Chashu Tonkotsu Ramen with Ajitama Egg',
    cuisine: 'east-asian',
    category: 'Noodle Soup',
    defaultServingGrams: 480,
    caloriesPer100g: 122,
    proteinPer100g: 6.5,
    carbsPer100g: 14.8,
    fatPer100g: 4.1,
    fiberPer100g: 1.1,
    sodiumMgPer100g: 540,
    nutriScore: 'C',
    novaGroup: 3,
    glycemicIndex: 'Medium',
    giScore: 60,
    ecoScore: 'C',
    allergens: ['Gluten', 'Eggs', 'Soy', 'Pork'],
    tags: ['High Protein', 'Comfort Food'],
    swapSuggestion: 'Drink half the broth to cut sodium intake by ~900mg, or ask for extra bamboo shoots (menma).'
  },
  {
    id: 'wf-ea-sushi-salmon',
    name: 'Fresh Atlantic Salmon Nigiri (2 pcs)',
    cuisine: 'east-asian',
    category: 'Seafood / Rice',
    defaultServingGrams: 70,
    caloriesPer100g: 182,
    proteinPer100g: 11.2,
    carbsPer100g: 22.4,
    fatPer100g: 5.1,
    fiberPer100g: 0.5,
    sodiumMgPer100g: 220,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Medium',
    giScore: 55,
    ecoScore: 'B',
    allergens: ['Fish'],
    tags: ['Omega-3 Rich', 'High Protein', 'Brain Health'],
    swapSuggestion: 'Dip fish-side down in soy sauce to prevent the seasoned rice from over-absorbing salt.'
  },
  {
    id: 'wf-ea-bibimbap',
    name: 'Korean Dolsot Bibimbap with Egg & Beef',
    cuisine: 'east-asian',
    category: 'Rice Bowl',
    defaultServingGrams: 380,
    caloriesPer100g: 145,
    proteinPer100g: 7.1,
    carbsPer100g: 20.2,
    fatPer100g: 3.9,
    fiberPer100g: 2.8,
    sodiumMgPer100g: 380,
    nutriScore: 'A',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 52,
    ecoScore: 'B',
    allergens: ['Sesame', 'Eggs', 'Soy'],
    tags: ['Fermented Foods', 'High Fiber', 'Balanced Plate'],
    swapSuggestion: 'Substitute half the steamed white rice with cauliflower rice or brown rice.'
  },
  {
    id: 'wf-ea-dimsum',
    name: 'Steamed Shrimp Har Gow Dim Sum (4 pcs)',
    cuisine: 'east-asian',
    category: 'Dumpling',
    defaultServingGrams: 120,
    caloriesPer100g: 160,
    proteinPer100g: 9.8,
    carbsPer100g: 21.5,
    fatPer100g: 3.4,
    fiberPer100g: 0.8,
    sodiumMgPer100g: 410,
    nutriScore: 'B',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 57,
    ecoScore: 'B',
    allergens: ['Crustaceans', 'Wheat'],
    tags: ['Steamed', 'Lean Protein'],
    swapSuggestion: 'Steamed dumplings are significantly healthier than deep-fried spring rolls!'
  },

  // ==========================================
  // SOUTHEAST ASIAN
  // ==========================================
  {
    id: 'wf-sea-pad-thai',
    name: 'Authentic Shrimp & Tofu Pad Thai',
    cuisine: 'southeast-asian',
    category: 'Noodle Stir-Fry',
    defaultServingGrams: 320,
    caloriesPer100g: 172,
    proteinPer100g: 7.4,
    carbsPer100g: 23.5,
    fatPer100g: 5.6,
    fiberPer100g: 1.7,
    sodiumMgPer100g: 480,
    nutriScore: 'B',
    novaGroup: 3,
    glycemicIndex: 'Medium',
    giScore: 59,
    ecoScore: 'B',
    allergens: ['Crustaceans', 'Peanuts', 'Soy', 'Eggs', 'Fish Sauce'],
    tags: ['Balanced', 'Street Food'],
    swapSuggestion: 'Ask for light tamarind palm sugar syrup to reduce refined carbohydrate density.'
  },
  {
    id: 'wf-sea-pho',
    name: 'Vietnamese Beef Pho (Pho Bo with Herbs)',
    cuisine: 'southeast-asian',
    category: 'Soup / Broth',
    defaultServingGrams: 500,
    caloriesPer100g: 92,
    proteinPer100g: 6.8,
    carbsPer100g: 11.4,
    fatPer100g: 2.1,
    fiberPer100g: 0.9,
    sodiumMgPer100g: 420,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 46,
    ecoScore: 'B',
    allergens: ['Fish Sauce'],
    tags: ['Hydrating', 'Lean Beef', 'Aromatic Herbs'],
    swapSuggestion: 'Load up on extra bean sprouts, thai basil, and lime to double the antioxidant and zinc intake.'
  },

  // ==========================================
  // MEDITERRANEAN & MIDDLE EASTERN
  // ==========================================
  {
    id: 'wf-med-hummus',
    name: 'Creamy Chickpea Hummus with Extra Virgin Olive Oil',
    cuisine: 'mediterranean',
    category: 'Dip / Spread',
    defaultServingGrams: 100,
    caloriesPer100g: 215,
    proteinPer100g: 7.9,
    carbsPer100g: 14.3,
    fatPer100g: 14.2,
    fiberPer100g: 6.0,
    sodiumMgPer100g: 360,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 24,
    ecoScore: 'A',
    allergens: ['Sesame (Tahini)'],
    tags: ['Vegan', 'Heart Healthy', 'High Fiber', 'Monounsaturated Fats'],
    swapSuggestion: 'Pair with crisp raw carrot and cucumber spears instead of processed pita crackers.'
  },
  {
    id: 'wf-med-shawarma',
    name: 'Spiced Chicken Shawarma Wrap with Garlic Toum',
    cuisine: 'mediterranean',
    category: 'Wrap / Sandwich',
    defaultServingGrams: 260,
    caloriesPer100g: 198,
    proteinPer100g: 12.8,
    carbsPer100g: 17.6,
    fatPer100g: 8.5,
    fiberPer100g: 1.8,
    sodiumMgPer100g: 490,
    nutriScore: 'B',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 50,
    ecoScore: 'B',
    allergens: ['Gluten', 'Sesame'],
    tags: ['High Protein', 'Lean Poultry'],
    swapSuggestion: 'Opt for a Shawarma Salad Bowl without the flatbread to save ~32g of fast carbohydrates.'
  },
  {
    id: 'wf-med-greek-salad',
    name: 'Horiatiki Greek Salad (Feta, Kalamata Olives, Tomato)',
    cuisine: 'mediterranean',
    category: 'Salad',
    defaultServingGrams: 220,
    caloriesPer100g: 110,
    proteinPer100g: 3.8,
    carbsPer100g: 4.2,
    fatPer100g: 8.9,
    fiberPer100g: 1.9,
    sodiumMgPer100g: 310,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 18,
    ecoScore: 'A',
    allergens: ['Dairy (Sheep Feta)'],
    tags: ['Vegetarian', 'Keto Friendly', 'Polyphenol Rich'],
    swapSuggestion: 'Add grilled chicken or wild salmon for a complete 35g protein clinical muscle-building meal.'
  },

  // ==========================================
  // EUROPEAN & ITALIAN
  // ==========================================
  {
    id: 'wf-eur-pizza-margherita',
    name: 'Neapolitan Pizza Margherita (San Marzano & Mozzarella)',
    cuisine: 'european',
    category: 'Pizza',
    defaultServingGrams: 280,
    caloriesPer100g: 242,
    proteinPer100g: 10.4,
    carbsPer100g: 32.1,
    fatPer100g: 7.8,
    fiberPer100g: 2.3,
    sodiumMgPer100g: 520,
    nutriScore: 'C',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 60,
    ecoScore: 'B',
    allergens: ['Gluten', 'Dairy'],
    tags: ['Vegetarian', 'Artisanal Fermented'],
    swapSuggestion: 'Pair 2 slices with a fresh arugula rocket salad with balsamic to attenuate glucose excursion.'
  },
  {
    id: 'wf-eur-spaghetti-bolognese',
    name: 'Classic Spaghetti Bolognese with Parmigiano',
    cuisine: 'european',
    category: 'Pasta',
    defaultServingGrams: 320,
    caloriesPer100g: 158,
    proteinPer100g: 8.9,
    carbsPer100g: 21.0,
    fatPer100g: 4.4,
    fiberPer100g: 1.8,
    sodiumMgPer100g: 390,
    nutriScore: 'B',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 48,
    ecoScore: 'C',
    allergens: ['Gluten', 'Dairy'],
    tags: ['High Protein', 'Iron Rich'],
    swapSuggestion: 'Use 100% durum whole wheat pasta or edamame noodles to triple dietary fiber to 6g.'
  },

  // ==========================================
  // AMERICAS & MODERN FITNESS NUTRITION
  // ==========================================
  {
    id: 'wf-am-protein-bowl',
    name: 'Grilled Herb Chicken, Tri-Color Quinoa & Steamed Broccoli',
    cuisine: 'americas',
    category: 'Performance Meal',
    defaultServingGrams: 340,
    caloriesPer100g: 135,
    proteinPer100g: 14.5,
    carbsPer100g: 12.2,
    fatPer100g: 2.9,
    fiberPer100g: 2.7,
    sodiumMgPer100g: 190,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 28,
    ecoScore: 'A',
    allergens: [],
    tags: ['Clean Eating', 'Hyper-Protein', 'Gluten Free', 'Pre-Workout'],
    swapSuggestion: 'Drizzle 1 tsp extra virgin olive oil or avocado oil for vital fat-soluble vitamin uptake (A, D, E, K).'
  },
  {
    id: 'wf-am-avocado-toast',
    name: 'Sourdough Avocado Toast with Pasture-Raised Poached Egg',
    cuisine: 'americas',
    category: 'Breakfast',
    defaultServingGrams: 190,
    caloriesPer100g: 192,
    proteinPer100g: 7.2,
    carbsPer100g: 18.4,
    fatPer100g: 10.2,
    fiberPer100g: 4.8,
    sodiumMgPer100g: 270,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 42,
    ecoScore: 'A',
    allergens: ['Gluten', 'Eggs'],
    tags: ['Heart Healthy', 'High Satiety', 'Vegetarian'],
    swapSuggestion: 'Sprinkle hemp hearts or chia seeds on top for additional omega-3 ALA and magnesium.'
  },
  {
    id: 'wf-am-overnight-oats',
    name: 'Whey Protein Overnight Rolled Oats with Blueberries & Chia',
    cuisine: 'americas',
    category: 'Breakfast / Snack',
    defaultServingGrams: 240,
    caloriesPer100g: 142,
    proteinPer100g: 11.8,
    carbsPer100g: 17.5,
    fatPer100g: 2.7,
    fiberPer100g: 4.2,
    sodiumMgPer100g: 110,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 35,
    ecoScore: 'A',
    allergens: ['Dairy'],
    tags: ['High Protein', 'Beta-Glucan Rich', 'Lipid Friendly'],
    swapSuggestion: 'Beta-glucan fibers actively reduce LDL cholesterol. Outstanding meal choice!'
  },

  // ==========================================
  // LATIN AMERICAN & CARIBBEAN
  // ==========================================
  {
    id: 'wf-lat-tacos',
    name: 'Carne Asada Street Tacos on White Corn Tortillas (3 pcs)',
    cuisine: 'latin-american',
    category: 'Taco / Street Food',
    defaultServingGrams: 210,
    caloriesPer100g: 188,
    proteinPer100g: 12.2,
    carbsPer100g: 16.5,
    fatPer100g: 7.8,
    fiberPer100g: 2.4,
    sodiumMgPer100g: 380,
    nutriScore: 'B',
    novaGroup: 2,
    glycemicIndex: 'Low',
    giScore: 44,
    ecoScore: 'C',
    allergens: [],
    tags: ['Gluten Free', 'High Protein', 'Iron Rich'],
    swapSuggestion: 'Add extra fresh cilantro, diced white onion, and fresh lime juice for Vitamin C.'
  },
  {
    id: 'wf-lat-guacamole',
    name: 'Fresh Crushed Hass Guacamole with Sea Salt & Lime',
    cuisine: 'latin-american',
    category: 'Dip / Side',
    defaultServingGrams: 90,
    caloriesPer100g: 168,
    proteinPer100g: 2.0,
    carbsPer100g: 8.5,
    fatPer100g: 15.2,
    fiberPer100g: 6.7,
    sodiumMgPer100g: 210,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 15,
    ecoScore: 'A',
    allergens: [],
    tags: ['Vegan', 'Keto Friendly', 'Potassium Champion'],
    swapSuggestion: 'Avocados have more potassium than bananas and virtually zero net active carbs.'
  },

  // ==========================================
  // AFRICAN TRADITIONAL
  // ==========================================
  {
    id: 'wf-afr-jollof',
    name: 'Nigerian Party Jollof Rice with Fried Plantains (Dodo)',
    cuisine: 'african',
    category: 'Rice Dish',
    defaultServingGrams: 300,
    caloriesPer100g: 175,
    proteinPer100g: 4.5,
    carbsPer100g: 28.5,
    fatPer100g: 5.1,
    fiberPer100g: 2.2,
    sodiumMgPer100g: 340,
    nutriScore: 'B',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 64,
    ecoScore: 'A',
    allergens: [],
    tags: ['Smoky Flavour', 'Vegetarian Base', 'Celebratory'],
    swapSuggestion: 'Pair with grilled Suya beef or roasted chicken drumsticks for complete essential amino acids.'
  },
  {
    id: 'wf-afr-tagine',
    name: 'Moroccan Tender Lamb & Apricot Tagine with Steamed Couscous',
    cuisine: 'african',
    category: 'Slow-Cooked Stew',
    defaultServingGrams: 320,
    caloriesPer100g: 162,
    proteinPer100g: 11.4,
    carbsPer100g: 15.8,
    fatPer100g: 5.6,
    fiberPer100g: 2.9,
    sodiumMgPer100g: 310,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 45,
    ecoScore: 'C',
    allergens: ['Gluten (Couscous)', 'Almonds'],
    tags: ['Slow Cooked', 'High Zinc', 'Rich Spice Blend'],
    swapSuggestion: 'Rich in anti-inflammatory turmeric, ginger, and saffron. Excellent clinical bio-availability!'
  }
];

/**
 * Multi-Dish Continental Plates for Instant Demonstrations
 */
export const CONTINENTAL_MEAL_SCENARIOS = [
  {
    id: 'scen-indian-thali',
    name: 'Royal Indian Protein Thali',
    cuisine: 'south-asian',
    mealType: 'Lunch & Dinner Thali',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
    description: 'Balanced Ayurvedic plate featuring whole wheat phulkas, slow-simmered yellow toor dal tadka, rich paneer butter masala, and cooling cucumber raita.',
    detectedFoods: [
      { foodId: 'wf-ind-roti', servingGrams: 90, confidence: 99 },
      { foodId: 'wf-ind-dal-tadka', servingGrams: 180, confidence: 97 },
      { foodId: 'wf-ind-paneer-butter', servingGrams: 140, confidence: 95 }
    ]
  },
  {
    id: 'scen-japanese-bento',
    name: 'Tokyo Athletic Bento Box',
    cuisine: 'east-asian',
    mealType: 'High-Protein Clean Lunch',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80',
    description: 'High-Omega-3 Japanese athletic bento: Norwegian salmon nigiri, steamed shrimp har gow dim sum, edamame beans, and fermented aged miso broth.',
    detectedFoods: [
      { foodId: 'wf-ea-sushi-salmon', servingGrams: 140, confidence: 98 },
      { foodId: 'wf-ea-dimsum', servingGrams: 120, confidence: 96 }
    ]
  },
  {
    id: 'scen-med-mezze',
    name: 'Santorini Mediterranean Mezze',
    cuisine: 'mediterranean',
    mealType: 'Anti-Inflammatory Feast',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'Clinical Mediterranean longevity diet: Extra-virgin olive oil chickpea hummus, Greek salad with sheep feta and olives, and lean spiced chicken shawarma.',
    detectedFoods: [
      { foodId: 'wf-med-hummus', servingGrams: 120, confidence: 98 },
      { foodId: 'wf-med-greek-salad', servingGrams: 180, confidence: 97 },
      { foodId: 'wf-med-shawarma', servingGrams: 150, confidence: 94 }
    ]
  },
  {
    id: 'scen-fitness-bowl',
    name: 'Athletic Macro Performance Bowl',
    cuisine: 'americas',
    mealType: 'Post-Workout Hypertrophy Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    description: 'Engineered macro perfection: Tender herb-grilled chicken breast, mineral-dense tri-color quinoa, steamed broccoli florets, and Haas guacamole.',
    detectedFoods: [
      { foodId: 'wf-am-protein-bowl', servingGrams: 320, confidence: 99 },
      { foodId: 'wf-lat-guacamole', servingGrams: 60, confidence: 96 }
    ]
  },
  {
    id: 'scen-roti-sabji-dal',
    name: 'Ghar Ka Khana: Phulka Roti & Aloo Gobi Sabji with Dal',
    cuisine: 'south-asian',
    mealType: 'Homestyle Daily Lunch',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
    description: 'The definitive daily Indian meal: Soft puffed whole wheat phulka rotis, freshly cooked seasonal aloo gobi vegetable sabji, and cumin-tempered yellow toor dal tadka.',
    detectedFoods: [
      { foodId: 'wf-ind-roti', servingGrams: 90, confidence: 99 },
      { foodId: 'wf-ind-sabji', servingGrams: 160, confidence: 98 },
      { foodId: 'wf-ind-dal-tadka', servingGrams: 180, confidence: 96 }
    ]
  },
  {
    id: 'scen-poha-jalebi',
    name: 'Indori Breakfast: Kanda Poha & Saffron Jalebi',
    cuisine: 'south-asian',
    mealType: 'Morning Breakfast & Sweet',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80',
    description: 'Iconic Central Indian breakfast: Steamed flattened rice with roasted peanuts, curry leaves, and mustard seeds, paired with hot crispy sugar-soaked saffron jalebi.',
    detectedFoods: [
      { foodId: 'wf-ind-poha', servingGrams: 180, confidence: 99 },
      { foodId: 'wf-ind-jalebi', servingGrams: 70, confidence: 97 }
    ]
  },
  {
    id: 'scen-kachori-samosa',
    name: 'Halwai Feast: Khasta Kachori & Samosa Combo',
    cuisine: 'south-asian',
    mealType: 'Indian Evening Street Chai Snack',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    description: 'Golden crispy khasta kachori with spiced moong dal stuffing and flaky aloo-pea samosa, accompanied by fresh mint chutney.',
    detectedFoods: [
      { foodId: 'wf-ind-kachori', servingGrams: 110, confidence: 98 },
      { foodId: 'wf-ind-samosa', servingGrams: 90, confidence: 97 }
    ]
  },
  {
    id: 'scen-street-snack',
    name: 'Delhi Street Chaat & Samosas',
    cuisine: 'south-asian',
    mealType: 'Afternoon Tea / Chai Snack',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    description: 'Golden-fried samosas stuffed with spiced potatoes and sweet peas, accompanied by whole roasted green chilies and cooling mint chutney.',
    detectedFoods: [
      { foodId: 'wf-ind-samosa', servingGrams: 180, confidence: 98 }
    ]
  }
];
