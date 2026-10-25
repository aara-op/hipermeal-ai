import React, { useState } from 'react';
import { 
  Utensils, 
  Camera, 
  Sliders, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Cloud, 
  Search, 
  Zap, 
  Layers,
  Heart,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { OPEN_FOOD_FACTS_DATABASE, SAMPLE_MEAL_SCENARIOS } from '../../data/openFoodFactsData';

export function HiperMealTab() {
  const [activeScenario, setActiveScenario] = useState(SAMPLE_MEAL_SCENARIOS[0]);
  const [mealItems, setMealItems] = useState(SAMPLE_MEAL_SCENARIOS[0].detectedItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [customPhotoUrl, setCustomPhotoUrl] = useState(null);
  const [loggedMeals, setLoggedMeals] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // When switching sample meals
  const handleSelectScenario = (scenario) => {
    setIsAnalyzing(true);
    setActiveScenario(scenario);
    setCustomPhotoUrl(null);
    setTimeout(() => {
      setMealItems(scenario.detectedItems);
      setIsAnalyzing(false);
    }, 400);
  };

  // Adjust portion size in grams
  const handleGramsChange = (foodId, newGrams) => {
    setMealItems(prev => prev.map(item => 
      item.foodId === foodId ? { ...item, servingGrams: Math.max(10, parseInt(newGrams) || 10) } : item
    ));
  };

  // Remove an item
  const handleRemoveItem = (foodId) => {
    setMealItems(prev => prev.filter(item => item.foodId !== foodId));
  };

  // Add item from Open Food Facts catalog
  const handleAddFood = (food) => {
    if (!mealItems.some(i => i.foodId === food.id)) {
      setMealItems(prev => [
        ...prev, 
        { foodId: food.id, servingGrams: food.defaultServingGrams, confidence: 100 }
      ]);
    }
    setSearchQuery('');
  };

  // Log meal to daily tracker
  const handleLogMeal = () => {
    const record = {
      id: Date.now(),
      name: activeScenario.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    };
    setLoggedMeals(prev => [record, ...prev]);
  };

  // Calculate live dynamic totals
  const calculatedItems = mealItems.map(item => {
    const food = OPEN_FOOD_FACTS_DATABASE.find(f => f.id === item.foodId) || OPEN_FOOD_FACTS_DATABASE[0];
    const multiplier = item.servingGrams / 100;
    return {
      ...item,
      food,
      cals: Math.round(food.caloriesPer100g * multiplier),
      protein: parseFloat((food.proteinPer100g * multiplier).toFixed(1)),
      carbs: parseFloat((food.carbsPer100g * multiplier).toFixed(1)),
      fat: parseFloat((food.fatPer100g * multiplier).toFixed(1)),
      fiber: parseFloat((food.fiberPer100g * multiplier).toFixed(1))
    };
  });

  const totalCalories = calculatedItems.reduce((acc, i) => acc + i.cals, 0);
  const totalProtein = calculatedItems.reduce((acc, i) => acc + i.protein, 0).toFixed(1);
  const totalCarbs = calculatedItems.reduce((acc, i) => acc + i.carbs, 0).toFixed(1);
  const totalFat = calculatedItems.reduce((acc, i) => acc + i.fat, 0).toFixed(1);
  const totalFiber = calculatedItems.reduce((acc, i) => acc + i.fiber, 0).toFixed(1);

  // Search filtered results
  const filteredCatalog = searchQuery.trim() 
    ? OPEN_FOOD_FACTS_DATABASE.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-800/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                HiperMeal — Visual Nutrition Diary
              </span>
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-medium flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-indigo-400" />
                DigitalOcean Deployed
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-medium">
                Gemma 4 & Open Food Facts Grounded
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              AI Visual Nutrition Diary & Macro Decomposition
            </h1>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl">
              Turn meal photographs into accurate nutrition logs without tedious manual typing. Powered by multimodal vision models, Open Food Facts dataset standards, and editable portion controls.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-center shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Meal Energy</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">{totalCalories} <span className="text-xs text-slate-400 font-normal">kcal</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Scenario Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {SAMPLE_MEAL_SCENARIOS.map(sc => (
          <button
            key={sc.id}
            onClick={() => handleSelectScenario(sc)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 border ${
              activeScenario.id === sc.id && !customPhotoUrl
                ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/30'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{sc.name}</span>
            <span className="text-[10px] opacity-80 font-mono">({sc.mealType})</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Photo + Detection on Left, Nutrition & Portion Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Meal Photo & Detection Overlay (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                Meal Image & Vision Bounding
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                {isAnalyzing ? 'Analyzing...' : 'Detected 4 Food Items'}
              </span>
            </div>

            {/* Photo Viewport */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={customPhotoUrl || activeScenario.imageUrl}
                alt="Meal"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isAnalyzing ? 'opacity-40' : 'opacity-100'}`}
              />

              {/* Simulated Multimodal Bounding Tags */}
              <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {calculatedItems.map(item => (
                    <span 
                      key={item.foodId}
                      className="px-2 py-0.5 bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/40 rounded-md text-[10px] font-mono font-semibold shadow-md"
                    >
                      {item.food.name} ({item.servingGrams}g)
                    </span>
                  ))}
                </div>

                <div className="bg-black/70 backdrop-blur-md p-2 rounded-xl text-[10px] text-slate-300 border border-slate-700/80">
                  <span className="font-semibold text-amber-400">Gemma 4 Vision Context:</span> {activeScenario.gemmaDescription}
                </div>
              </div>
            </div>

            {/* Regulatory Compliance Notice */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-[11px] text-slate-400 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                Portion Size & Ingredient Transparency
              </div>
              <p>
                A single photograph cannot deterministically calculate volumetric density or hidden fats. Adjust serving grams using the controls on the right. No medical or clinical dietary claims are made.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Ingredients & Nutrition Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Macronutrient Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Protein</span>
              <div className="text-xl font-bold text-indigo-400 font-mono mt-0.5">{totalProtein}g</div>
              <div className="text-[10px] text-slate-500">Muscle recovery</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Carbohydrates</span>
              <div className="text-xl font-bold text-cyan-400 font-mono mt-0.5">{totalCarbs}g</div>
              <div className="text-[10px] text-slate-500">Energy & glycogen</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Healthy Fats</span>
              <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">{totalFat}g</div>
              <div className="text-[10px] text-slate-500">Lipid balance</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Dietary Fiber</span>
              <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{totalFiber}g</div>
              <div className="text-[10px] text-slate-500">Digestive health</div>
            </div>
          </div>

          {/* Editable Detected Ingredients List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Editable Portion Weights & Item Verification ({calculatedItems.length} Items)
                </h3>
              </div>

              <button
                onClick={handleLogMeal}
                className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Save to Daily Diary
              </button>
            </div>

            {/* List of items */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {calculatedItems.map(item => (
                <div
                  key={item.foodId}
                  className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{item.food.name}</span>
                      <span className="px-1.5 py-0.2 text-[9px] rounded bg-slate-800 text-slate-400 font-mono">
                        Nutri-Score {item.food.nutriScore}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.cals} kcal • P: {item.protein}g • C: {item.carbs}g • F: {item.fat}g • Fiber: {item.fiber}g
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {item.food.source}
                    </div>
                  </div>

                  {/* Portion Slider Control */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5">
                      <input
                        type="number"
                        min="10"
                        max="500"
                        step="5"
                        value={item.servingGrams}
                        onChange={(e) => handleGramsChange(item.foodId, e.target.value)}
                        className="w-14 bg-transparent text-right font-mono font-bold text-amber-300 text-xs focus:outline-none"
                      />
                      <span className="text-[11px] text-slate-400">g</span>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.foodId)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Open Food Facts Live Catalog Search */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                Add Missing Food from Open Food Facts Database:
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search food item (e.g. Sourdough, Tofu, Broccoli, Lentils, Salmon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />

                {filteredCatalog.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 max-h-48 overflow-y-auto">
                    {filteredCatalog.map(food => (
                      <div
                        key={food.id}
                        onClick={() => handleAddFood(food)}
                        className="p-2.5 hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs border-b border-slate-800/60 last:border-0"
                      >
                        <div>
                          <div className="font-semibold text-slate-200">{food.name}</div>
                          <div className="text-[10px] text-slate-400">{food.caloriesPer100g} kcal / 100g • {food.category}</div>
                        </div>
                        <Plus className="w-4 h-4 text-cyan-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Daily Log History Cards (if any logged) */}
          {loggedMeals.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Today's Visual Food Diary ({loggedMeals.length} Meals Logged)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Daily Target: 2,200 kcal
                </span>
              </div>

              <div className="space-y-2">
                {loggedMeals.map(lm => (
                  <div key={lm.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-200">{lm.name}</span>
                      <span className="text-[10px] text-slate-500 ml-2">Logged at {lm.time}</span>
                    </div>
                    <div className="font-mono text-amber-400 font-bold">
                      {lm.totalCalories} kcal
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
