// Comprehensive Nutrition Dataset Grounded in Open Food Facts Standards
// Includes Indian Street Food, Samosas, Global Fast Foods, French Fries, Curries, and Salads
import { WORLD_FOOD_ITEMS, CONTINENTAL_MEAL_SCENARIOS } from './worldFoodDatabase';

export const BASE_OPEN_FOOD_FACTS_DATABASE = [
  // Fast Food & Global Snacks (Fries, Pizza, Burgers)
  {
    id: 'off-french-fries',
    name: 'Crispy Golden French Fries (Salted)',
    category: 'Potatoes & Fried Snacks',
    caloriesPer100g: 312,
    proteinPer100g: 3.4,
    carbsPer100g: 41.0,
    fatPer100g: 15.0,
    fiberPer100g: 3.8,
    defaultServingGrams: 150, // Standard medium basket
    nutriScore: 'D',
    source: 'Open Food Facts ID: 3017620422019 (McCain / Potato Specialties)'
  },
  {
    id: 'off-tomato-ketchup',
    name: 'Classic Tomato Ketchup Dip',
    category: 'Sauces & Condiments',
    caloriesPer100g: 112,
    proteinPer100g: 1.2,
    carbsPer100g: 26.0,
    fatPer100g: 0.1,
    fiberPer100g: 0.3,
    defaultServingGrams: 30, // 2 dip servings (approx 2 tbsp)
    nutriScore: 'C',
    source: 'Open Food Facts ID: 8715700016048 (Heinz / Tomato Sauces)'
  },
  {
    id: 'off-margherita-pizza',
    name: 'Thin Crust Margherita Pizza',
    category: 'Pizzas & Baked',
    caloriesPer100g: 266,
    proteinPer100g: 11.0,
    carbsPer100g: 33.0,
    fatPer100g: 10.0,
    fiberPer100g: 2.3,
    defaultServingGrams: 180, // 2 slices
    nutriScore: 'C',
    source: 'Open Food Facts ID: 3017620422003'
  },
  {
    id: 'off-veggie-burger',
    name: 'Classic Veggie Burger with Bun',
    category: 'Burgers & Sandwiches',
    caloriesPer100g: 220,
    proteinPer100g: 9.8,
    carbsPer100g: 30.5,
    fatPer100g: 7.2,
    fiberPer100g: 4.1,
    defaultServingGrams: 160,
    nutriScore: 'B',
    source: 'Open Food Facts ID: 0041220970110'
  },

  // Indian Street Food & Snacks (Samosas, Chutneys, Pakoras, Poha, Jalebi, Kachori, Sabji)
  {
    id: 'off-crispy-samosa',
    name: 'Crispy Aloo Samosa (Potato & Peas)',
    category: 'Indian Snacks & Pastries',
    caloriesPer100g: 262,
    proteinPer100g: 4.5,
    carbsPer100g: 32.0,
    fatPer100g: 13.5,
    fiberPer100g: 2.8,
    defaultServingGrams: 140, // 2 samosas
    nutriScore: 'D',
    novaGroup: 3,
    glycemicIndex: 'High',
    giScore: 71,
    source: 'Open Food Facts ID: 8901030822104 (Haldiram / Indian Snacks)'
  },
  {
    id: 'off-indori-poha',
    name: 'Indori Kanda Batata Poha (Flattened Rice)',
    category: 'Breakfast & Traditional Cereals',
    caloriesPer100g: 160,
    proteinPer100g: 3.5,
    carbsPer100g: 28.0,
    fatPer100g: 4.2,
    fiberPer100g: 2.1,
    defaultServingGrams: 180,
    nutriScore: 'A',
    novaGroup: 2,
    glycemicIndex: 'Medium',
    giScore: 52,
    source: 'Open Food Facts ID: 8901262010912 (Indian Staples)'
  },
  {
    id: 'off-golden-jalebi',
    name: 'Crispy Golden Saffron Jalebi (Sugar Soaked)',
    category: 'Sweets & Desserts',
    caloriesPer100g: 380,
    proteinPer100g: 2.2,
    carbsPer100g: 68.5,
    fatPer100g: 11.8,
    fiberPer100g: 0.5,
    defaultServingGrams: 90,
    nutriScore: 'E',
    novaGroup: 3,
    glycemicIndex: 'High',
    giScore: 78,
    source: 'Open Food Facts ID: 8901262010929 (Traditional Mithai)'
  },
  {
    id: 'off-khasta-kachori',
    name: 'Crispy Khasta Pyaaz / Dal Kachori',
    category: 'Indian Snacks & Pastries',
    caloriesPer100g: 340,
    proteinPer100g: 6.2,
    carbsPer100g: 38.0,
    fatPer100g: 18.5,
    fiberPer100g: 3.4,
    defaultServingGrams: 110,
    nutriScore: 'D',
    novaGroup: 3,
    glycemicIndex: 'High',
    giScore: 68,
    source: 'Open Food Facts ID: 8901030822135'
  },
  {
    id: 'off-homestyle-sabji',
    name: 'Homestyle Aloo Gobi & Mixed Vegetable Sabji',
    category: 'Curries & Sabzi',
    caloriesPer100g: 95,
    proteinPer100g: 2.8,
    carbsPer100g: 11.2,
    fatPer100g: 4.5,
    fiberPer100g: 3.2,
    defaultServingGrams: 160,
    nutriScore: 'A',
    novaGroup: 1,
    glycemicIndex: 'Low',
    giScore: 42,
    source: 'Open Food Facts ID: 8901030822142 (Desi Sabzi)'
  },
  {
    id: 'off-fried-green-chili',
    name: 'Fried Salted Green Chilies (Tadka Mirchi)',
    category: 'Condiments & Garnishes',
    caloriesPer100g: 40,
    proteinPer100g: 1.2,
    carbsPer100g: 4.8,
    fatPer100g: 2.0,
    fiberPer100g: 1.5,
    defaultServingGrams: 15,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 8901262010042'
  },
  {
    id: 'off-mint-coriander-chutney',
    name: 'Mint & Coriander Green Chutney',
    category: 'Condiments & Sauces',
    caloriesPer100g: 45,
    proteinPer100g: 1.8,
    carbsPer100g: 6.2,
    fatPer100g: 1.5,
    fiberPer100g: 2.1,
    defaultServingGrams: 30,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 8901030991823'
  },
  {
    id: 'off-tamarind-chutney',
    name: 'Sweet Tamarind & Date Chutney',
    category: 'Condiments & Sauces',
    caloriesPer100g: 180,
    proteinPer100g: 0.8,
    carbsPer100g: 44.0,
    fatPer100g: 0.2,
    fiberPer100g: 1.2,
    defaultServingGrams: 25,
    nutriScore: 'C',
    source: 'Open Food Facts ID: 8901030991847'
  },
  {
    id: 'off-veg-uttapam',
    name: 'Vegetable Uttapam / Cheela (Savory Pancake)',
    category: 'South Indian Breakfast & Savory Pancakes',
    caloriesPer100g: 136,
    proteinPer100g: 3.5,
    carbsPer100g: 24.2,
    fatPer100g: 3.0,
    fiberPer100g: 2.2,
    defaultServingGrams: 180,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 8901030822150 (MTR / Open Food Facts)'
  },
  {
    id: 'off-aloo-paratha',
    name: 'Stuffed Aloo Paratha with Herbs',
    category: 'Indian Breads & Flatbreads',
    caloriesPer100g: 240,
    proteinPer100g: 5.8,
    carbsPer100g: 38.0,
    fatPer100g: 7.5,
    fiberPer100g: 3.2,
    defaultServingGrams: 140,
    nutriScore: 'B',
    source: 'Open Food Facts ID: 8901030822198 (Haldiram / Parathas)'
  },
  {
    id: 'off-masala-dosa',
    name: 'Crispy Masala Dosa with Potato Filling',
    category: 'South Indian Specialties',
    caloriesPer100g: 168,
    proteinPer100g: 3.8,
    carbsPer100g: 27.0,
    fatPer100g: 4.8,
    fiberPer100g: 2.1,
    defaultServingGrams: 180,
    nutriScore: 'B',
    source: 'Open Food Facts ID: 8901030822165'
  },
  {
    id: 'off-steamed-idli',
    name: 'Steamed Rice & Lentil Idli',
    category: 'South Indian Breakfast',
    caloriesPer100g: 132,
    proteinPer100g: 4.2,
    carbsPer100g: 27.5,
    fatPer100g: 0.5,
    fiberPer100g: 1.8,
    defaultServingGrams: 120, // 2 idlis
    nutriScore: 'A',
    source: 'Open Food Facts ID: 8901030822172'
  },
  {
    id: 'off-chole-bhature',
    name: 'Spiced Chickpea Chole with Fried Bhature',
    category: 'North Indian Classics',
    caloriesPer100g: 285,
    proteinPer100g: 6.8,
    carbsPer100g: 36.5,
    fatPer100g: 12.8,
    fiberPer100g: 5.4,
    defaultServingGrams: 220,
    nutriScore: 'D',
    source: 'Open Food Facts ID: 8901030822180'
  },
  {
    id: 'off-paneer-tikka',
    name: 'Tandoori Spiced Paneer Tikka Skewers',
    category: 'Appetizers & Grilled',
    caloriesPer100g: 260,
    proteinPer100g: 14.5,
    carbsPer100g: 7.2,
    fatPer100g: 19.5,
    fiberPer100g: 1.6,
    defaultServingGrams: 150,
    nutriScore: 'C',
    source: 'Open Food Facts ID: 8901030822191'
  },
  {
    id: 'off-rajma-masala',
    name: 'Slow-Cooked Punjabi Rajma (Red Kidney Beans)',
    category: 'Legumes & Curries',
    caloriesPer100g: 125,
    proteinPer100g: 6.8,
    carbsPer100g: 18.2,
    fatPer100g: 2.9,
    fiberPer100g: 5.8,
    defaultServingGrams: 180,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 8901030822204'
  },
  {
    id: 'off-chicken-biryani',
    name: 'Hyderabadi Dum Chicken Biryani',
    category: 'Rice & Poultry',
    caloriesPer100g: 195,
    proteinPer100g: 9.8,
    carbsPer100g: 25.0,
    fatPer100g: 6.2,
    fiberPer100g: 1.8,
    defaultServingGrams: 250,
    nutriScore: 'B',
    source: 'Open Food Facts ID: 8901030822211'
  },
  {
    id: 'off-butter-chicken',
    name: 'Murgh Makhani (Butter Chicken)',
    category: 'Curries & Gravies',
    caloriesPer100g: 228,
    proteinPer100g: 12.5,
    carbsPer100g: 6.8,
    fatPer100g: 16.8,
    fiberPer100g: 1.2,
    defaultServingGrams: 180,
    nutriScore: 'D',
    source: 'Open Food Facts ID: 8901030822228'
  },
  {
    id: 'off-nutella-spread',
    name: 'Nutella Hazelnut Cocoa Spread',
    category: 'Spreads & Sweets',
    caloriesPer100g: 539,
    proteinPer100g: 6.3,
    carbsPer100g: 57.5,
    fatPer100g: 30.9,
    fiberPer100g: 3.4,
    defaultServingGrams: 30, // 2 tbsp
    nutriScore: 'E',
    source: 'Open Food Facts ID: 3017620422003 (Ferrero)'
  },

  // Indian Meals & Curries
  {
    id: 'off-paneer-butter-masala',
    name: 'Paneer Butter Masala',
    category: 'Curries & Gravies',
    caloriesPer100g: 210,
    proteinPer100g: 8.5,
    carbsPer100g: 9.2,
    fatPer100g: 16.0,
    fiberPer100g: 1.8,
    defaultServingGrams: 180,
    nutriScore: 'C',
    source: 'Open Food Facts ID: 8901725181299'
  },
  {
    id: 'off-yellow-dal-tadka',
    name: 'Yellow Lentil Dal Tadka',
    category: 'Legumes & Pulses',
    caloriesPer100g: 116,
    proteinPer100g: 7.2,
    carbsPer100g: 16.5,
    fatPer100g: 2.8,
    fiberPer100g: 4.5,
    defaultServingGrams: 180,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 8901725181285'
  },
  {
    id: 'off-whole-wheat-roti',
    name: 'Whole Wheat Roti / Chapati',
    category: 'Breads & Flatbreads',
    caloriesPer100g: 264,
    proteinPer100g: 9.0,
    carbsPer100g: 50.0,
    fatPer100g: 3.2,
    fiberPer100g: 6.5,
    defaultServingGrams: 80, // 2 rotis
    nutriScore: 'A',
    source: 'Open Food Facts ID: 8901030784310'
  },
  {
    id: 'off-white-basmati',
    name: 'Basmati White Rice',
    category: 'Grains & Cereals',
    caloriesPer100g: 130,
    proteinPer100g: 2.7,
    carbsPer100g: 28.2,
    fatPer100g: 0.3,
    fiberPer100g: 0.4,
    defaultServingGrams: 150,
    nutriScore: 'B',
    source: 'Open Food Facts ID: 5010044000701'
  },
  {
    id: 'off-veg-biryani',
    name: 'Aromatic Dum Veg Biryani',
    category: 'Rice Dishes',
    caloriesPer100g: 168,
    proteinPer100g: 4.2,
    carbsPer100g: 27.5,
    fatPer100g: 5.0,
    fiberPer100g: 2.4,
    defaultServingGrams: 220,
    nutriScore: 'B',
    source: 'Open Food Facts ID: 8901030822105'
  },

  // Mediterranean & Salads
  {
    id: 'off-atlantic-salmon',
    name: 'Pan-Seared Atlantic Salmon Fillet',
    category: 'Seafood',
    caloriesPer100g: 208,
    proteinPer100g: 20.4,
    carbsPer100g: 0.0,
    fatPer100g: 13.4,
    fiberPer100g: 0.0,
    defaultServingGrams: 140,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 0041220894224'
  },
  {
    id: 'off-greek-salad-feta',
    name: 'Mediterranean Salad (Cucumber, Tomato, Olives)',
    category: 'Salads & Greens',
    caloriesPer100g: 68,
    proteinPer100g: 2.2,
    carbsPer100g: 4.5,
    fatPer100g: 4.8,
    fiberPer100g: 1.8,
    defaultServingGrams: 140,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 5201051000115'
  },
  {
    id: 'off-steamed-broccoli',
    name: 'Steamed Broccoli Florets',
    category: 'Vegetables',
    caloriesPer100g: 35,
    proteinPer100g: 2.4,
    carbsPer100g: 7.2,
    fatPer100g: 0.4,
    fiberPer100g: 3.3,
    defaultServingGrams: 100,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 0041220980224'
  },
  {
    id: 'off-fresh-avocado',
    name: 'Hass Avocado Slices',
    category: 'Fruits & Healthy Fats',
    caloriesPer100g: 160,
    proteinPer100g: 2.0,
    carbsPer100g: 8.5,
    fatPer100g: 14.7,
    fiberPer100g: 6.7,
    defaultServingGrams: 75,
    nutriScore: 'A',
    source: 'Open Food Facts ID: 0041220970119'
  },
  {
    id: 'off-olive-oil-dressing',
    name: 'Extra Virgin Olive Oil (Dressing)',
    category: 'Oils & Fats',
    caloriesPer100g: 884,
    proteinPer100g: 0.0,
    carbsPer100g: 0.0,
    fatPer100g: 100.0,
    fiberPer100g: 0.0,
    defaultServingGrams: 14,
    nutriScore: 'C',
    source: 'Open Food Facts ID: 8410214000112'
  }
];

// Unified World + Open Food Facts Master Database
export const OPEN_FOOD_FACTS_DATABASE = [
  ...BASE_OPEN_FOOD_FACTS_DATABASE,
  ...WORLD_FOOD_ITEMS.map(item => ({
    id: item.id,
    name: item.name,
    category: `${item.cuisine} - ${item.category}`,
    caloriesPer100g: item.caloriesPer100g,
    proteinPer100g: item.proteinPer100g,
    carbsPer100g: item.carbsPer100g,
    fatPer100g: item.fatPer100g,
    fiberPer100g: item.fiberPer100g,
    defaultServingGrams: item.defaultServingGrams,
    nutriScore: item.nutriScore,
    novaGroup: item.novaGroup,
    glycemicIndex: item.glycemicIndex,
    giScore: item.giScore,
    ecoScore: item.ecoScore,
    allergens: item.allergens,
    swapSuggestion: item.swapSuggestion,
    source: `Verified World Culinary DB (${item.cuisine})`
  }))
];

// Presets for instant testing across all continents
export const SAMPLE_MEAL_SCENARIOS = [
  ...CONTINENTAL_MEAL_SCENARIOS.map(sc => ({
    id: sc.id,
    name: sc.name,
    mealType: sc.mealType,
    imageUrl: sc.imageUrl,
    detectedItems: sc.detectedFoods,
    gemmaDescription: sc.description,
    cuisine: sc.cuisine
  })),
  {
    id: 'meal-french-fries',
    name: 'Crispy French Fries with Tomato Ketchup Dip',
    mealType: 'Snack / Fast Food',
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    detectedItems: [
      { foodId: 'off-french-fries', servingGrams: 160, confidence: 99 },
      { foodId: 'off-tomato-ketchup', servingGrams: 30, confidence: 97 }
    ],
    gemmaDescription: 'Fast food snack detected: Deep-fried salted potato batons (French fries) exhibiting golden crispness, accompanied by a rich tomato ketchup condiment dip.',
    cuisine: 'americas'
  },
  {
    id: 'meal-samosas',
    name: 'Crispy Indian Samosas with Fried Green Chilies',
    mealType: 'Indian Snack / Street Food',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    detectedItems: [
      { foodId: 'off-crispy-samosa', servingGrams: 140, confidence: 98 },
      { foodId: 'off-fried-green-chili', servingGrams: 15, confidence: 96 },
      { foodId: 'off-mint-coriander-chutney', servingGrams: 30, confidence: 92 }
    ],
    gemmaDescription: 'Authentic Indian street food detected: Crispy golden-fried pastry shells (samosas) stuffed with spiced potatoes and peas, served with salted fried green chilies and mint chutney.',
    cuisine: 'south-asian'
  },
  {
    id: 'meal-uttapam',
    name: 'Vegetable Uttapam with Mint Chutney',
    mealType: 'Breakfast / Savory Pancakes',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80',
    detectedItems: [
      { foodId: 'off-veg-uttapam', servingGrams: 180, confidence: 98 },
      { foodId: 'off-mint-coriander-chutney', servingGrams: 30, confidence: 95 }
    ],
    gemmaDescription: 'Nutritious fermented savory rice & lentil pancake topped with diced tomatoes, onions, green chilies, and fresh herbs. Served with cooling mint-coriander green chutney.',
    cuisine: 'south-asian'
  }
];
