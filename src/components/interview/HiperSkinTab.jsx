import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  AlertCircle, 
  Lock, 
  Cloud, 
  Eye, 
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { HIPERSKIN_SAMPLE_CASES } from '../../data/interviewData';

export function HiperSkinTab() {
  const [selectedCase, setSelectedCase] = useState(HIPERSKIN_SAMPLE_CASES[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showDifferenceMask, setShowDifferenceMask] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCaseChange = (caseItem) => {
    setIsProcessing(true);
    setSelectedCase(caseItem);
    setSliderPosition(50);
    setTimeout(() => setIsProcessing(false), 300);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Top Banner & Sponsor Tech Tagging */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-800/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Problem Statement 2: HiperSkin
              </span>
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-medium flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-indigo-400" />
                DigitalOcean App Platform
              </span>
              <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-medium">
                Gemma 4 Language Engine
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              HiperSkin — Private Skin Change Tracker & Visual Difference Engine
            </h1>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl">
              Track visible variations in appearance, size, and pigmentation across photographs over time. Powered by automated image registration, computer vision difference masks, and Gemma plain-language summaries.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero-Trace Privacy: Images processed in ephemeral RAM</span>
          </div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {HIPERSKIN_SAMPLE_CASES.map(c => (
          <button
            key={c.id}
            onClick={() => handleCaseChange(c)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 border ${
              selectedCase.id === c.id
                ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-600/25'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{c.title}</span>
            <span className="text-[10px] opacity-80 font-mono">({c.timeframe})</span>
          </button>
        ))}
      </div>

      {/* Main Comparison Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Before/After Split-Screen Slider (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-bold text-white">
                  Interactive Split-Screen Comparison
                </span>
              </div>

              {/* Difference Mask Toggle */}
              <button
                onClick={() => setShowDifferenceMask(!showDifferenceMask)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  showDifferenceMask
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                {showDifferenceMask ? 'Hide Difference Mask' : 'Show Difference Mask'}
              </button>
            </div>

            {/* Slider Viewport Container */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden select-none border border-slate-800 bg-slate-950">
              
              {/* After Image (Background layer) */}
              <img
                src={selectedCase.imageAfter}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold text-teal-300 border border-teal-500/40">
                Current Photo (T2)
              </div>

              {/* Before Image (Foreground layer clipped by slider) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={selectedCase.imageBefore}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold text-slate-300 border border-slate-700">
                  Baseline Photo (T1)
                </div>
              </div>

              {/* Computer Vision Difference Overlay Mask (Simulated) */}
              {showDifferenceMask && (
                <div 
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full border-4 border-amber-400 bg-amber-500/25 animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.5)] flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold bg-black/80 px-2 py-0.5 rounded text-amber-300">
                      Δ Area: {selectedCase.metrics.areaChangePercent}
                    </span>
                  </div>
                </div>
              )}

              {/* Vertical Slider Divider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg text-xs font-bold font-mono">
                  ⇄
                </div>
              </div>

              {/* Invisible Range Input for Dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>← Drag slider left to inspect baseline</span>
              <span>Drag slider right to inspect current →</span>
            </div>
          </div>
        </div>

        {/* Right Column: Gemma 4 Plain Language Report & Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quantitative Metrics Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Computer Vision Extracted Metrics
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-slate-400 text-[11px]">Surface Area Delta:</span>
                <div className="text-base font-bold text-amber-400 font-mono">
                  {selectedCase.metrics.areaChangePercent}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-slate-400 text-[11px]">Color Delta (ΔE):</span>
                <div className="text-base font-bold text-teal-400 font-mono">
                  {selectedCase.metrics.colorDeltaE}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-slate-400 text-[11px]">Border Asymmetry:</span>
                <div className="text-slate-200 font-semibold font-mono">
                  {selectedCase.metrics.borderAsymmetryScore}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-slate-400 text-[11px]">Axial Diameter:</span>
                <div className="text-slate-200 font-semibold font-mono">
                  {selectedCase.metrics.diameterMmBefore} → {selectedCase.metrics.diameterMmAfter}
                </div>
              </div>
            </div>
          </div>

          {/* Gemma 4 Plain-Language Analysis Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Gemma 4 Plain-Language Description
              </h3>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                Non-Diagnostic
              </span>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {selectedCase.gemmaObservation}
            </div>
          </div>

          {/* Mandatory Healthcare Compliance Disclaimer */}
          <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-2xl text-xs text-amber-200/90 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-semibold">Strict Regulatory & Ethical Compliance:</strong>
              <p className="text-[11px] leading-relaxed text-amber-300/80">
                HiperSkin does not provide clinical diagnoses, detect skin cancers, or replace professional dermatological evaluation. It is an objective visual tracking companion designed to document photographic changes over time.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
