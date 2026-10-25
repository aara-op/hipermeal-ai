import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Camera, 
  UploadCloud, 
  Sliders, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  TrendingUp, 
  RefreshCw,
  Edit3,
  BookmarkCheck,
  X,
  FileText,
  Globe,
  Award,
  ArrowRightLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FloatingFoodHero } from '../ui/hero-section-7';
import { OPEN_FOOD_FACTS_DATABASE, SAMPLE_MEAL_SCENARIOS } from '../../data/openFoodFactsData';
import { WORLD_CUISINES } from '../../data/worldFoodDatabase';
import { classifyMealImage } from '../../services/visionClassifier';
import { searchOpenFoodFactsLive, fetchProductByBarcode } from '../../services/openFoodFactsService';

export const ICONIC_DESI_STAPLES = [
  {
    id: 'desi-roti-sabji',
    label: '🫓 Roti & Sabji Thali',
    badge: 'Daily Ayurvedic Staple',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
    scenario: {
      id: 'staple-roti-sabji',
      name: 'Ghar Ka Khana: Phulka Roti & Aloo Gobi Sabji with Dal',
      mealType: 'Homestyle Daily Lunch',
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
      gemmaDescription: 'Ayurvedic homestyle balanced lunch: Fresh puffed whole wheat rotis, mildly spiced aloo gobi vegetable sabji cooked in cold-pressed mustard oil, and cumin-tempered yellow toor dal tadka.',
      cuisine: 'south-asian',
      detectedItems: [
        { foodId: 'wf-ind-roti', servingGrams: 90, confidence: 99 },
        { foodId: 'wf-ind-sabji', servingGrams: 160, confidence: 98 },
        { foodId: 'wf-ind-dal-tadka', servingGrams: 180, confidence: 96 }
      ]
    }
  },
  {
    id: 'desi-poha',
    label: '🥣 Indori Kanda Poha',
    badge: 'Gut-Friendly Iron Champion',
    color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300',
    scenario: {
      id: 'staple-poha',
      name: 'Indori Kanda Batata Poha with Peanuts',
      mealType: 'Morning Breakfast & Pre-Workout',
      imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80',
      gemmaDescription: 'Wholesome Central Indian breakfast: Steamed flattened rice tempered with black mustard seeds, turmeric, curry leaves, crunchy roasted peanuts, and finished with fresh lemon and coriander.',
      cuisine: 'south-asian',
      detectedItems: [
        { foodId: 'wf-ind-poha', servingGrams: 180, confidence: 99 }
      ]
    }
  },
  {
    id: 'desi-jalebi',
    label: '🥨 Crispy Saffron Jalebi',
    badge: 'Festive High-Energy Mithai',
    color: 'from-orange-500/20 to-amber-600/20 border-orange-500/40 text-orange-300',
    scenario: {
      id: 'staple-jalebi',
      name: 'Crispy Golden Saffron Jalebi (Sugar-Soaked)',
      mealType: 'Dessert & Sweet Treat',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
      gemmaDescription: 'Concentric crispy fermented batter spirals fried to amber perfection and steeped in saffron and cardamom sugar syrup. Best enjoyed with portion mindfulness or unsweetened rabdi.',
      cuisine: 'south-asian',
      detectedItems: [
        { foodId: 'wf-ind-jalebi', servingGrams: 90, confidence: 99 }
      ]
    }
  },
  {
    id: 'desi-samosa',
    label: '🥟 Crispy Aloo Samosa',
    badge: 'Street Food Classic',
    color: 'from-amber-600/20 to-red-500/20 border-amber-600/40 text-amber-200',
    scenario: {
      id: 'staple-samosa',
      name: 'Crispy Indian Samosas with Green Chilies & Chutney',
      mealType: 'Afternoon Chai Snack',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
      gemmaDescription: 'Golden flaky pastry shells stuffed with spiced potatoes, green peas, roasted cumin, and garam masala. Served with whole salted green chilies and cooling mint chutney.',
      cuisine: 'south-asian',
      detectedItems: [
        { foodId: 'wf-ind-samosa', servingGrams: 140, confidence: 98 },
        { foodId: 'off-mint-coriander-chutney', servingGrams: 30, confidence: 95 }
      ]
    }
  },
  {
    id: 'desi-kachori',
    label: '🥮 Khasta Moong Dal Kachori',
    badge: 'Flaky Ajwain Pastry',
    color: 'from-yellow-600/20 to-orange-600/20 border-yellow-600/40 text-yellow-200',
    scenario: {
      id: 'staple-kachori',
      name: 'Crispy Khasta Pyaaz / Moong Dal Kachori',
      mealType: 'Halwai Special Snack',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
      gemmaDescription: 'Deeply flaky ajwain crust pastry filled with coarse spiced moong dal, hing (asafoetida), and roasted spices, accompanied by fresh coriander chutney.',
      cuisine: 'south-asian',
      detectedItems: [
        { foodId: 'wf-ind-kachori', servingGrams: 110, confidence: 98 },
        { foodId: 'off-mint-coriander-chutney', servingGrams: 30, confidence: 95 }
      ]
    }
  },
  {
    id: 'desi-all-in-one',
    label: '👑 All-In-One Desi Feast',
    badge: '1-Lakh Catalog Showcase',
    color: 'from-amber-500/30 via-orange-500/30 to-red-500/30 border-amber-400 text-amber-200 font-bold',
    scenario: {
      id: 'staple-grand-feast',
      name: 'Grand Indian Desi Feast (Roti, Sabji, Poha, Jalebi, Samosa, Kachori)',
      mealType: 'Complete 1-Lakh Culinary Showcase',
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
      gemmaDescription: 'Comprehensive Indian culinary showcase: Whole wheat phulka roti, homestyle aloo gobi sabji, steamed indori poha, crispy aloo samosa, khasta kachori, and golden saffron jalebi with clinical grounding.',
      cuisine: 'south-asian',
      detectedItems: [
        { foodId: 'wf-ind-roti', servingGrams: 45, confidence: 99 },
        { foodId: 'wf-ind-sabji', servingGrams: 120, confidence: 98 },
        { foodId: 'wf-ind-poha', servingGrams: 90, confidence: 97 },
        { foodId: 'wf-ind-samosa', servingGrams: 70, confidence: 96 },
        { foodId: 'wf-ind-kachori', servingGrams: 60, confidence: 95 },
        { foodId: 'wf-ind-jalebi', servingGrams: 45, confidence: 94 }
      ]
    }
  }
];

export function HiperMealStudio() {
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [activeScenario, setActiveScenario] = useState(SAMPLE_MEAL_SCENARIOS[0]);
  const [mealItems, setMealItems] = useState(SAMPLE_MEAL_SCENARIOS[0].detectedItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveResults, setLiveResults] = useState([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [barcodeLoading, setBarcodeLoading] = useState(false);
  const [barcodeError, setBarcodeError] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Daily Nutrition Tracker State
  const [dailyLog, setDailyLog] = useState([
    {
      id: 1,
      name: 'High-Protein Breakfast Oatmeal',
      time: '08:15 AM',
      cals: 360,
      protein: 22,
      carbs: 48,
      fat: 7
    }
  ]);

  // Floating 3D Food Assets for Hero Section
  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=320&auto=format&fit=crop&q=80',
      alt: 'Nutritious Bowl',
      className: 'w-24 sm:w-36 md:w-48 rounded-3xl border-2 border-amber-500/40 top-4 left-3 sm:left-10 md:top-8 md:left-16 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&auto=format&fit=crop&q=80',
      alt: 'Avocado Sourdough',
      className: 'w-24 sm:w-36 md:w-44 rounded-3xl border-2 border-emerald-500/40 top-6 right-3 sm:right-10 md:top-10 md:right-16 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=320&auto=format&fit=crop&q=80',
      alt: 'Indian Thali Plate',
      className: 'w-28 sm:w-40 md:w-48 rounded-3xl border-2 border-orange-500/40 bottom-4 right-4 sm:right-12 md:bottom-8 md:right-20 animate-float',
    },
    {
      src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=320&auto=format&fit=crop&q=80',
      alt: 'Fresh Greens Salad',
      className: 'w-20 sm:w-32 rounded-3xl border border-teal-500/40 bottom-6 left-4 sm:left-12 md:bottom-10 md:left-20 animate-float',
    }
  ];

  // Filter benchmark scenarios by continental cuisine
  const filteredScenarios = useMemo(() => {
    if (selectedCuisine === 'all') return SAMPLE_MEAL_SCENARIOS;
    return SAMPLE_MEAL_SCENARIOS.filter(s => s.cuisine === selectedCuisine);
  }, [selectedCuisine]);

  // Real Photo Upload Handler with Multimodal Vision Classifier
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const src = event.target?.result;
      setUploadedImageSrc(src);

      try {
        const result = await classifyMealImage(src, file.name);
        setMealItems(result.detectedFoods);
        setActiveScenario({
          id: 'custom-upload',
          name: result.plateName,
          mealType: 'AI Vision Classified Plate',
          imageUrl: src,
          detectedItems: result.detectedFoods,
          gemmaDescription: result.description,
          cuisine: 'all'
        });
      } catch (err) {
        console.error("Vision classification error:", err);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Live Camera Snapshot
  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera access denied or unavailable, using simulated capture:", err);
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        stopCamera();
        setUploadedImageSrc(dataUrl);
        setIsAnalyzing(true);

        classifyMealImage(dataUrl, 'camera_capture').then(result => {
          setMealItems(result.detectedFoods);
          setActiveScenario({
            id: 'snapped-camera',
            name: result.plateName,
            mealType: 'Live Photo Capture',
            imageUrl: dataUrl,
            detectedItems: result.detectedFoods,
            gemmaDescription: result.description,
            cuisine: 'all'
          });
          setIsAnalyzing(false);
        }).catch(() => setIsAnalyzing(false));
      } else {
        stopCamera();
      }
    } else {
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  // Portion Adjustments
  const handleGramsChange = (foodId, newGrams) => {
    setMealItems(prev => prev.map(item => 
      item.foodId === foodId ? { ...item, servingGrams: Math.max(10, parseInt(newGrams, 10) || 10) } : item
    ));
  };

  const handleQuickPortionScale = (foodId, scale) => {
    setMealItems(prev => prev.map(item => 
      item.foodId === foodId ? { ...item, servingGrams: Math.round(item.servingGrams * scale) } : item
    ));
  };

  const handleRemoveItem = (foodId) => {
    setMealItems(prev => prev.filter(item => item.foodId !== foodId));
  };

  const handleAddFood = (food) => {
    if (!OPEN_FOOD_FACTS_DATABASE.some(f => f.id === food.id)) {
      OPEN_FOOD_FACTS_DATABASE.push(food);
    }
    if (!mealItems.some(i => i.foodId === food.id)) {
      setMealItems(prev => [
        ...prev, 
        { foodId: food.id, servingGrams: food.defaultServingGrams || 100, confidence: 99 }
      ]);
    }
    setSearchQuery('');
    setLiveResults([]);
  };

  const handleSearchLive = async () => {
    if (!searchQuery.trim()) return;
    setIsSearchingLive(true);
    try {
      const results = await searchOpenFoodFactsLive(searchQuery);
      setLiveResults(results);
    } catch (e) {
      console.error('Open Food Facts live query error:', e);
    } finally {
      setIsSearchingLive(false);
    }
  };

  const handleLookupBarcode = async (codeToLookup) => {
    const code = (codeToLookup || barcodeInput).trim();
    if (!code) return;
    setBarcodeLoading(true);
    setBarcodeError('');
    try {
      const product = await fetchProductByBarcode(code);
      if (product) {
        if (!OPEN_FOOD_FACTS_DATABASE.some(f => f.id === product.id)) {
          OPEN_FOOD_FACTS_DATABASE.push(product);
        }
        setMealItems(prev => [
          ...prev,
          { foodId: product.id, servingGrams: product.defaultServingGrams || 100, confidence: 99 }
        ]);
        setBarcodeInput('');
      } else {
        setBarcodeError(`Barcode ${code} not found in Open Food Facts database.`);
      }
    } catch {
      setBarcodeError('Failed to connect to Open Food Facts API.');
    } finally {
      setBarcodeLoading(false);
    }
  };

  // Re-Analyze Plate with Custom Notes
  const handleReanalyzeWithNotes = () => {
    if (!userNotes.trim()) return;
    setIsReanalyzing(true);
    setTimeout(() => {
      const lower = userNotes.toLowerCase();
      let updated = mealItems.map(item => {
        if (lower.includes('large') || lower.includes('double') || lower.includes('extra')) {
          return { ...item, servingGrams: Math.round(item.servingGrams * 1.4) };
        }
        if (lower.includes('small') || lower.includes('half')) {
          return { ...item, servingGrams: Math.round(item.servingGrams * 0.6) };
        }
        return item;
      });

      if (lower.includes('oil') || lower.includes('butter') || lower.includes('dressing')) {
        const oil = OPEN_FOOD_FACTS_DATABASE.find(f => f.id === 'off-olive-oil-dressing');
        if (oil && !updated.some(u => u.foodId === oil.id)) {
          updated.push({ foodId: oil.id, servingGrams: 15, confidence: 99 });
        }
      }

      setMealItems(updated);
      setIsReanalyzing(false);
      setUserNotes('');
    }, 400);
  };

  // Compute Live Macro Totals
  const calculatedItems = useMemo(() => {
    return mealItems.map(item => {
      const food = OPEN_FOOD_FACTS_DATABASE.find(f => f.id === item.foodId) || OPEN_FOOD_FACTS_DATABASE[0];
      const mult = item.servingGrams / 100;
      return {
        ...item,
        food,
        cals: Math.round(food.caloriesPer100g * mult),
        protein: parseFloat((food.proteinPer100g * mult).toFixed(1)),
        carbs: parseFloat((food.carbsPer100g * mult).toFixed(1)),
        fat: parseFloat((food.fatPer100g * mult).toFixed(1)),
        fiber: parseFloat((food.fiberPer100g * mult).toFixed(1))
      };
    });
  }, [mealItems]);

  const totalCalories = calculatedItems.reduce((acc, i) => acc + i.cals, 0);
  const totalProtein = calculatedItems.reduce((acc, i) => acc + i.protein, 0).toFixed(1);
  const totalCarbs = calculatedItems.reduce((acc, i) => acc + i.carbs, 0).toFixed(1);
  const totalFat = calculatedItems.reduce((acc, i) => acc + i.fat, 0).toFixed(1);
  const totalFiber = calculatedItems.reduce((acc, i) => acc + i.fiber, 0).toFixed(1);

  // Overall Plate Metabolic & Quality Metrics
  const plateScores = useMemo(() => {
    const scores = calculatedItems.map(i => i.food.nutriScore || 'C');
    let overall = 'B';
    if (scores.includes('E')) overall = 'D';
    else if (scores.includes('A') && !scores.includes('D')) overall = 'A';

    const proteinCalories = parseFloat(totalProtein) * 4;
    const proteinRatio = totalCalories > 0 ? Math.round((proteinCalories / totalCalories) * 100) : 0;

    const avgGI = calculatedItems.reduce((acc, i) => acc + (i.food.giScore || 50), 0) / Math.max(1, calculatedItems.length);
    const giLabel = avgGI < 45 ? 'Low (Steady Energy)' : avgGI < 65 ? 'Moderate' : 'High Glycemic Spike';

    const maxNova = Math.max(...calculatedItems.map(i => i.food.novaGroup || 2), 1);

    return { overall, proteinRatio, avgGI: Math.round(avgGI), giLabel, maxNova };
  }, [calculatedItems, totalCalories, totalProtein]);

  // Log Meal with Confetti
  const handleLogMeal = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 }
    });

    const newRecord = {
      id: Date.now(),
      name: activeScenario.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cals: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    };
    setDailyLog(prev => [newRecord, ...prev]);
  };

  // Smart Healthy Swap Applicator
  const applySmartSwap = (foodIdToReplace, newFoodId, newServing) => {
    setMealItems(prev => prev.map(it => {
      if (it.foodId === foodIdToReplace) {
        return { foodId: newFoodId, servingGrams: newServing, confidence: 99 };
      }
      return it;
    }));
  };

  const filteredCatalog = searchQuery.trim()
    ? OPEN_FOOD_FACTS_DATABASE.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-24 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* 3D FLOATING FOOD HERO */}
      <FloatingFoodHero
        title="HiperMeal — Global Multimodal Nutrition Diary"
        description="Vision-Language Model plate decomposition + Open Food Facts global grounding. Automatically decomposes every meal into authentic ingredients, portion estimates, and clinical metabolic metrics."
        images={heroImages}
        badge={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Multimodal VLM + Port 8005 Engine
            </span>
            <span className="px-3 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              4.8M+ Open Food Facts Live Catalog
            </span>
            <span className="px-3 py-1 bg-orange-500/15 text-orange-300 border border-orange-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              7 World Continents Cuisines
            </span>
          </div>
        }
        actions={
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold rounded-2xl shadow-xl shadow-amber-500/20 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer"
            >
              <UploadCloud className="w-5 h-5 text-stone-950" />
              Upload Meal Photo
            </button>

            <button
              onClick={startCamera}
              className="px-5 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-2xl font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              Live Camera Snapshot
            </button>

            <button
              onClick={() => setShowDossierModal(true)}
              className="px-4 py-3.5 bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 rounded-2xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Dietitian Audit Dossier
            </button>
          </div>
        }
      />

      {/* LIVE CAMERA MODAL */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                Live Camera Meal Capture
              </span>
              <button 
                onClick={stopCamera} 
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-stone-800">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-8 border-2 border-dashed border-amber-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[10px] bg-black/60 text-amber-300 px-2 py-0.5 rounded font-mono">
                  Align plate inside frame
                </span>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={captureCameraPhoto}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold rounded-2xl shadow-lg shadow-amber-500/30 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
              >
                <Camera className="w-5 h-5" />
                Capture & Analyze Meal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1-LAKH FOOD CATALOG: ICONIC DESI STAPLES 1-TAP SHOWCASE */}
      <div className="bg-gradient-to-r from-stone-900/90 via-amber-950/30 to-stone-900/90 border border-amber-500/30 rounded-3xl p-5 shadow-2xl backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              1-Lakh Food Catalog Spotlight: Iconic Desi Staples
            </span>
            <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
              Roti • Sabji • Poha • Jalebi • Samosa • Kachori
            </span>
          </div>
          <span className="text-[11px] text-stone-400">
            1-tap instant macro decomposition & clinical portion calibration
          </span>
        </div>

        {/* 1-Tap Desi Staple Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          {ICONIC_DESI_STAPLES.map(st => {
            const isActive = activeScenario.id === st.scenario.id && !uploadedImageSrc;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setUploadedImageSrc(null);
                  setActiveScenario(st.scenario);
                  setMealItems(st.scenario.detectedItems);
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isActive
                    ? 'bg-amber-500/25 border-amber-400 text-white shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-stone-950/80 hover:bg-stone-900 border-stone-800 hover:border-amber-500/50 text-stone-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold truncate group-hover:text-amber-300 transition-colors">
                    {st.label}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1 line-clamp-1">
                    {st.badge}
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    1-Tap Load
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTINENTAL WORLD CUISINE SELECTOR TRAY */}
      <div className="bg-stone-900/70 border border-stone-800/80 rounded-3xl p-5 shadow-xl backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Explore Global Dietary Traditions & Benchmark Plates:
            </span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">
            {filteredScenarios.length} benchmark plates in active cuisine
          </span>
        </div>

        {/* Continental Cuisine Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {WORLD_CUISINES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCuisine(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border flex items-center gap-1.5 ${
                selectedCuisine === c.id
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Benchmark Plates in Selected Cuisine */}
        <div className="flex gap-2.5 overflow-x-auto pt-1">
          {filteredScenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                setUploadedImageSrc(null);
                setActiveScenario(sc);
                setMealItems(sc.detectedItems);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all shrink-0 border flex items-center gap-2 ${
                activeScenario.id === sc.id && !uploadedImageSrc
                  ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 text-amber-300 border-amber-500/60 shadow-md'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{sc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN WORKSPACE: Visual Viewport (5 cols) + Macro & Portion Calibration (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Photo Viewport & Multimodal Recognition */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-xl space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                Active Plate Visualizer
              </span>
              <span className="text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                {isAnalyzing ? 'VLM Ingesting Image...' : `${calculatedItems.length} Ingredients Grounded`}
              </span>
            </div>

            {/* Photo Viewport with Multimodal Overlays */}
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-inner group">
              <img
                src={uploadedImageSrc || activeScenario.imageUrl}
                alt="Active Meal"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isAnalyzing ? 'opacity-30' : 'opacity-100'}`}
              />

              <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
                {/* Detected Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {calculatedItems.map(item => (
                    <span 
                      key={item.foodId}
                      className="px-2.5 py-1 bg-black/85 backdrop-blur-md text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-mono font-bold shadow-lg flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {item.food.name} • {item.servingGrams}g ({item.confidence}%)
                    </span>
                  ))}
                </div>

                {/* AI Context Description */}
                <div className="bg-stone-950/90 backdrop-blur-md p-3 rounded-xl text-[11px] text-stone-300 border border-stone-800 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Multimodal Vision Context:
                  </div>
                  <div className="text-stone-300 leading-relaxed italic">
                    "{activeScenario.gemmaDescription}"
                  </div>
                </div>
              </div>
            </div>

            {/* Quick 1-Tap Identification Overrides */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-3.5 space-y-2">
              <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
                Quick Plate Identification Overrides (1-Tap):
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    const uttapam = [
                      { foodId: 'off-veg-uttapam', servingGrams: 180, confidence: 99 },
                      { foodId: 'off-mint-coriander-chutney', servingGrams: 30, confidence: 97 }
                    ];
                    setMealItems(uttapam);
                    setActiveScenario(prev => ({
                      ...prev,
                      name: 'Vegetable Uttapam with Mint Chutney',
                      gemmaDescription: 'Nutritious fermented savory rice & lentil pancake topped with diced tomatoes, onions, green chilies, and herbs. Served with homemade mint-coriander green chutney.'
                    }));
                  }}
                  className="px-2.5 py-1.5 bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-300 border border-yellow-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  🥞 Veg Uttapam
                </button>

                <button
                  onClick={() => {
                    const samosas = [
                      { foodId: 'off-crispy-samosa', servingGrams: 140, confidence: 98 },
                      { foodId: 'off-fried-green-chili', servingGrams: 15, confidence: 96 },
                      { foodId: 'off-mint-coriander-chutney', servingGrams: 30, confidence: 92 }
                    ];
                    setMealItems(samosas);
                    setActiveScenario(prev => ({
                      ...prev,
                      name: 'Crispy Indian Samosas with Fried Green Chilies',
                      gemmaDescription: 'Golden-fried triangular pastries stuffed with spiced potatoes and peas, served with salted green chilies and mint chutney.'
                    }));
                  }}
                  className="px-2.5 py-1.5 bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 border border-orange-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  🥟 Samosas
                </button>

                <button
                  onClick={() => {
                    const sushi = [
                      { foodId: 'wf-ea-sushi-salmon', servingGrams: 140, confidence: 98 },
                      { foodId: 'wf-ea-dimsum', servingGrams: 100, confidence: 95 }
                    ];
                    setMealItems(sushi);
                    setActiveScenario(prev => ({
                      ...prev,
                      name: 'Tokyo Atlantic Salmon Nigiri & Dim Sum',
                      gemmaDescription: 'Fresh sashimi salmon nigiri and delicate steamed shrimp dumplings with wasabi and soy.'
                    }));
                  }}
                  className="px-2.5 py-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  🍣 Salmon Sushi
                </button>

                <button
                  onClick={() => {
                    const mezze = [
                      { foodId: 'wf-med-hummus', servingGrams: 120, confidence: 98 },
                      { foodId: 'wf-med-greek-salad', servingGrams: 180, confidence: 97 },
                      { foodId: 'wf-med-shawarma', servingGrams: 140, confidence: 95 }
                    ];
                    setMealItems(mezze);
                    setActiveScenario(prev => ({
                      ...prev,
                      name: 'Santorini Mediterranean Mezze',
                      gemmaDescription: 'Chickpea hummus with virgin olive oil, Greek salad with sheep feta, and grilled chicken shawarma.'
                    }));
                  }}
                  className="px-2.5 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  🫒 Mezze & Hummus
                </button>

                <button
                  onClick={() => {
                    const tacos = [
                      { foodId: 'wf-lat-tacos', servingGrams: 210, confidence: 98 },
                      { foodId: 'wf-lat-guacamole', servingGrams: 80, confidence: 96 }
                    ];
                    setMealItems(tacos);
                    setActiveScenario(prev => ({
                      ...prev,
                      name: 'Carne Asada Street Tacos & Guacamole',
                      gemmaDescription: 'Nixtamalized white corn tacos with charred flank steak, white onion, cilantro, and fresh avocado guacamole.'
                    }));
                  }}
                  className="px-2.5 py-1.5 bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  🌮 Street Tacos
                </button>
              </div>
            </div>

            {/* Prompt Guidance Refine Notes */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-2">
              <label className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                Refine with Prompt Guidance:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Added extra olive oil dressing, or large double portion..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleReanalyzeWithNotes()}
                  className="flex-1 bg-stone-900 border border-stone-700/80 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleReanalyzeWithNotes}
                  disabled={isReanalyzing || !userNotes.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  {isReanalyzing ? 'Recalculating...' : 'Update'}
                </button>
              </div>
            </div>

            {/* Clinical Transparency Notice */}
            <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Portion Transparency Notice:</strong> A photograph cannot establish hidden cooking oils or sodium. Adjust gram sliders on the right. Grounded in Open Food Facts clinical reference tables.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Nutrition Calibration Dashboard */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Macronutrient Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 text-center shadow-md backdrop-blur-md">
              <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Total Energy</div>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">{totalCalories}</div>
              <div className="text-[10px] text-stone-500">kcal (Calories)</div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 text-center shadow-md backdrop-blur-md">
              <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Protein</div>
              <div className="text-2xl font-black text-orange-400 font-mono mt-1">{totalProtein}g</div>
              <div className="text-[10px] text-stone-500">{plateScores.proteinRatio}% of energy</div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 text-center shadow-md backdrop-blur-md">
              <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Net Carbs</div>
              <div className="text-2xl font-black text-amber-300 font-mono mt-1">{totalCarbs}g</div>
              <div className="text-[10px] text-stone-500">Fiber: {totalFiber}g</div>
            </div>

            <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 text-center shadow-md backdrop-blur-md">
              <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Healthy Fats</div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{totalFat}g</div>
              <div className="text-[10px] text-stone-500">Lipid profile</div>
            </div>
          </div>

          {/* INNOVATIVE METABOLIC QUALITY & DIETITIAN RADAR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-stone-900/70 border border-stone-800 rounded-3xl p-4 backdrop-blur-md">
            
            {/* Nutri-Score Card */}
            <div className="p-3 bg-stone-950/80 rounded-2xl border border-stone-800/80 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl font-black flex items-center justify-center text-sm shadow-md ${
                plateScores.overall === 'A' ? 'bg-emerald-500 text-stone-950' :
                plateScores.overall === 'B' ? 'bg-teal-500 text-stone-950' :
                plateScores.overall === 'C' ? 'bg-amber-500 text-stone-950' :
                'bg-orange-500 text-stone-950'
              }`}>
                {plateScores.overall}
              </div>
              <div>
                <div className="text-[10px] text-stone-400 uppercase font-bold">Nutri-Score Rating</div>
                <div className="text-xs font-bold text-white">Grade {plateScores.overall} Quality</div>
                <div className="text-[9px] text-stone-500">Open Food Facts Benchmark</div>
              </div>
            </div>

            {/* Glycemic Impact Card */}
            <div className="p-3 bg-stone-950/80 rounded-2xl border border-stone-800/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xs font-mono font-bold">
                GI {plateScores.avgGI}
              </div>
              <div>
                <div className="text-[10px] text-stone-400 uppercase font-bold">Insulin Stability</div>
                <div className="text-xs font-bold text-stone-200">{plateScores.giLabel}</div>
                <div className="text-[9px] text-stone-500">Glycemic response</div>
              </div>
            </div>

            {/* NOVA Group Card */}
            <div className="p-3 bg-stone-950/80 rounded-2xl border border-stone-800/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center text-xs font-mono font-bold">
                NOVA {plateScores.maxNova}
              </div>
              <div>
                <div className="text-[10px] text-stone-400 uppercase font-bold">Processing Level</div>
                <div className="text-xs font-bold text-stone-200">
                  {plateScores.maxNova === 1 ? 'Fresh Whole Food' : plateScores.maxNova <= 3 ? 'Culinary Cooked' : 'Ultra-Processed'}
                </div>
                <div className="text-[9px] text-stone-500">E.U. Food Standard</div>
              </div>
            </div>

          </div>

          {/* EDITABLE INGREDIENT BREAKDOWN & PORTION SLIDERS */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-xl space-y-4 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Editable Ingredient Breakdown & Portion Sliders ({calculatedItems.length} Items)
                </h3>
                <p className="text-[11px] text-stone-400">
                  Slide or enter gram weights to calibrate meal accuracy in real-time.
                </p>
              </div>

              <button
                onClick={handleLogMeal}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <BookmarkCheck className="w-4 h-4" />
                Log to Daily Diary
              </button>
            </div>

            {/* List of Detected Food Items */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {calculatedItems.map(item => (
                <div
                  key={item.foodId}
                  className="p-3.5 bg-stone-950 border border-stone-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-stone-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-stone-100 text-sm">{item.food.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                        Score {item.food.nutriScore}
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded font-mono">
                        {item.confidence}% Match
                      </span>
                      {item.food.glycemicIndex && (
                        <span className="text-[9px] text-stone-400 bg-stone-900 px-1.5 py-0.5 rounded font-mono">
                          GI: {item.food.glycemicIndex}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-stone-400">
                      <strong className="text-amber-400 font-mono">{item.cals} kcal</strong> • P: {item.protein}g • C: {item.carbs}g • F: {item.fat}g • Fib: {item.fiber}g
                    </div>

                    <div className="text-[10px] text-stone-500 font-mono">
                      {item.food.source}
                    </div>

                    {/* Quick Portion Chips */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => handleQuickPortionScale(item.foodId, 0.5)}
                        className="px-2 py-0.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 rounded text-[10px] font-mono border border-stone-800"
                      >
                        0.5x (Snack)
                      </button>
                      <button
                        onClick={() => handleQuickPortionScale(item.foodId, 1.0)}
                        className="px-2 py-0.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded text-[10px] font-mono border border-stone-800"
                      >
                        1.0x (Normal)
                      </button>
                      <button
                        onClick={() => handleQuickPortionScale(item.foodId, 1.5)}
                        className="px-2 py-0.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 rounded text-[10px] font-mono border border-stone-800"
                      >
                        1.5x (Large)
                      </button>
                    </div>

                    {/* Smart Swap Suggestion if available */}
                    {item.food.swapSuggestion && (
                      <div className="pt-1 text-[10px] text-emerald-300/90 flex flex-wrap items-center justify-between gap-1 bg-emerald-950/20 px-2.5 py-1 rounded-lg border border-emerald-800/30">
                        <div className="flex items-center gap-1.5">
                          <ArrowRightLeft className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{item.food.swapSuggestion}</span>
                        </div>
                        {item.food.id === 'off-white-basmati' && (
                          <button
                            onClick={() => applySmartSwap(item.foodId, 'wf-am-protein-bowl', 150)}
                            className="px-2 py-0.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold rounded text-[9px] border border-emerald-500/40 cursor-pointer"
                          >
                            Apply Quinoa Swap
                          </button>
                        )}
                        {item.food.id === 'off-french-fries' && (
                          <button
                            onClick={() => applySmartSwap(item.foodId, 'wf-lat-guacamole', 80)}
                            className="px-2 py-0.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold rounded text-[9px] border border-emerald-500/40 cursor-pointer"
                          >
                            Apply Avocado Swap
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Interactive Portion Slider & Number Input */}
                  <div className="flex items-center gap-3 shrink-0">
                    <input
                      type="range"
                      min="15"
                      max="400"
                      step="5"
                      value={item.servingGrams}
                      onChange={(e) => handleGramsChange(item.foodId, e.target.value)}
                      className="w-24 sm:w-28 accent-amber-500 cursor-pointer"
                    />

                    <div className="flex items-center gap-1 bg-stone-900 border border-stone-700 rounded-xl px-2.5 py-1">
                      <input
                        type="number"
                        min="10"
                        max="600"
                        value={item.servingGrams}
                        onChange={(e) => handleGramsChange(item.foodId, e.target.value)}
                        className="w-12 bg-transparent text-right font-mono font-bold text-amber-300 text-xs focus:outline-none"
                      />
                      <span className="text-[11px] text-stone-400 font-mono">g</span>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.foodId)}
                      className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-stone-900 rounded-lg transition-colors cursor-pointer"
                      title="Remove item from plate"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Open Food Facts Database Search & Barcode Lookup */}
            <div className="pt-3 border-t border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  Search Global Food Catalog or Open Food Facts Live API:
                </label>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  4,800,000+ Products Database
                </span>
              </div>

              {/* Text Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search any world food (e.g. Biryani, Ramen, Sushi, Samosa, Tacos, Hummus, Nutella)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchLive()}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400 transition-colors"
                  />

                  {filteredCatalog.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-30 max-h-48 overflow-y-auto">
                      {filteredCatalog.map(food => (
                        <div
                          key={food.id}
                          onClick={() => handleAddFood(food)}
                          className="p-2.5 hover:bg-stone-800 cursor-pointer flex items-center justify-between text-xs border-b border-stone-800/60 last:border-0"
                        >
                          <div>
                            <div className="font-semibold text-stone-200">{food.name}</div>
                            <div className="text-[10px] text-stone-400">{food.caloriesPer100g} kcal/100g • {food.category}</div>
                          </div>
                          <Plus className="w-4 h-4 text-amber-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSearchLive}
                  disabled={isSearchingLive || !searchQuery.trim()}
                  className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-50 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {isSearchingLive ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  Query Live API
                </button>
              </div>

              {/* Live Open Food Facts API Search Results */}
              {liveResults.length > 0 && (
                <div className="bg-stone-950 border border-amber-500/30 rounded-2xl p-3 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Live Open Food Facts API Search Results ({liveResults.length}):
                  </span>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {liveResults.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => handleAddFood(prod)}
                        className="p-2 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 flex items-center justify-between text-xs cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-stone-100 flex items-center gap-1.5">
                            {prod.name}
                            <span className="text-[9px] px-1.5 py-0.2 bg-emerald-950 text-emerald-300 rounded font-mono">
                              Score {prod.nutriScore}
                            </span>
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {prod.caloriesPer100g} kcal/100g • {prod.brand} • {prod.source}
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Barcode Lookup */}
              <div className="pt-2 border-t border-stone-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-[10px] font-mono text-stone-400 whitespace-nowrap">Barcode (EAN-13):</span>
                  <input
                    type="text"
                    placeholder="Enter barcode (e.g. 3017620422003)"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLookupBarcode()}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-1 text-xs text-stone-200 font-mono focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleLookupBarcode()}
                    disabled={barcodeLoading || !barcodeInput.trim()}
                    className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-stone-200 rounded-xl text-xs font-mono shrink-0 cursor-pointer"
                  >
                    {barcodeLoading ? 'Fetching...' : 'Lookup'}
                  </button>
                </div>

                <div className="flex items-center gap-1 shrink-0 overflow-x-auto text-[10px] font-mono">
                  <span className="text-stone-500">Quick Test:</span>
                  <button
                    onClick={() => handleLookupBarcode('3017620422003')}
                    className="px-2 py-0.5 bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 rounded cursor-pointer"
                  >
                    Nutella
                  </button>
                  <button
                    onClick={() => handleLookupBarcode('8715700016048')}
                    className="px-2 py-0.5 bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 rounded cursor-pointer"
                  >
                    Heinz Ketchup
                  </button>
                </div>
              </div>

              {barcodeError && (
                <div className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {barcodeError}
                </div>
              )}
            </div>

          </div>

          {/* DAILY FOOD DIARY & LOGGED MEALS */}
          {dailyLog.length > 0 && (
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-sm space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Today's Cumulative Visual Food Diary ({dailyLog.length} Meals)
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  Daily Calorie Budget: 2,200 kcal
                </span>
              </div>

              <div className="space-y-2">
                {dailyLog.map(m => (
                  <div key={m.id} className="p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-stone-200">{m.name}</span>
                      <span className="text-[10px] text-stone-500 ml-2 font-mono">{m.time}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-amber-400 font-bold">{m.cals} kcal</span>
                      <div className="text-[10px] text-stone-400">P: {m.protein}g • C: {m.carbs}g • F: {m.fat}g</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* DIETITIAN AUDIT DOSSIER MODAL */}
      {showDossierModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">
                  Clinical Dietitian Audit Dossier
                </h3>
              </div>
              <button 
                onClick={() => setShowDossierModal(false)} 
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3 font-mono text-xs text-stone-300">
              <div className="text-amber-400 font-bold">
                === HIPERMEAL CLINICAL NUTRITION ASSESSMENT ===
              </div>
              <div>
                <strong>Meal Title:</strong> {activeScenario.name}
              </div>
              <div>
                <strong>Total Caloric Density:</strong> {totalCalories} kcal
              </div>
              <div>
                <strong>Macronutrient Distribution:</strong>
                <br />• Protein: {totalProtein}g ({plateScores.proteinRatio}% of energy)
                <br />• Carbohydrates: {totalCarbs}g (Fiber: {totalFiber}g)
                <br />• Total Lipids: {totalFat}g
              </div>
              <div>
                <strong>Metabolic Indicators:</strong>
                <br />• Nutri-Score Composite: Grade {plateScores.overall}
                <br />• Glycemic Impact: {plateScores.giLabel} (Score: {plateScores.avgGI})
                <br />• Maximum NOVA Group: Level {plateScores.maxNova}
              </div>
              <div>
                <strong>Decomposed Ingredients ({calculatedItems.length}):</strong>
                {calculatedItems.map(i => (
                  <div key={i.foodId} className="pl-2">
                    - {i.food.name}: {i.servingGrams}g ({i.cals} kcal, P:{i.protein}g, C:{i.carbs}g, F:{i.fat}g)
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  const summaryText = `HiperMeal Nutrition Audit: ${activeScenario.name}\nCalories: ${totalCalories} kcal | Protein: ${totalProtein}g | Carbs: ${totalCarbs}g | Fat: ${totalFat}g\nNutri-Score: ${plateScores.overall} | Glycemic Impact: ${plateScores.giLabel}\nDecomposed: ${calculatedItems.map(i => `${i.food.name} (${i.servingGrams}g)`).join(', ')}`;
                  navigator.clipboard.writeText(summaryText);
                  setCopiedDossier(true);
                  setTimeout(() => setCopiedDossier(false), 2000);
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                {copiedDossier ? '✓ Copied to Clipboard!' : 'Copy Summary Report'}
              </button>

              <button
                onClick={() => setShowDossierModal(false)}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default HiperMealStudio;
