import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Mic, 
  QrCode, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Smartphone, 
  Monitor, 
  ArrowRight,
  Sparkles,
  Volume2
} from 'lucide-react';

export function CandidateOnboardingModal({ config, onStartInterview, onClose }) {
  const [step, setStep] = useState(1); // 1: Permissions, 2: Mobile QR, 3: Agreement
  const [camAllowed, setCamAllowed] = useState(false);
  const [micAllowed, setMicAllowed] = useState(false);
  const [micLevel, setMicLevel] = useState(42);
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [mobilePaired, setMobilePaired] = useState(false);
  const videoRef = useRef(null);

  // Request actual camera stream if available, or simulate realistic webcam
  useEffect(() => {
    let stream = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setCamAllowed(true);
          setMicAllowed(true);
        })
        .catch(err => {
          console.warn("Using simulated webcam feed for browser sandbox/demo:", err);
          setCamAllowed(true);
          setMicAllowed(true);
        });
    } else {
      setCamAllowed(true);
      setMicAllowed(true);
    }

    // Audio level meter oscillation
    const interval = setInterval(() => {
      setMicLevel(Math.floor(30 + Math.random() * 45));
    }, 200);

    return () => {
      clearInterval(interval);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden text-slate-200">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Steps Progress Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-400" />
              Candidate Pre-Flight Calibration & Verification
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Candidate: <strong>{config?.candidate?.name || 'Alex Rivera'}</strong> • Role: <strong>{config?.role?.title || 'Senior Engineer'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className={`px-2 py-0.5 rounded-full ${step === 1 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>1. A/V</span>
            <span className={`px-2 py-0.5 rounded-full ${step === 2 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>2. Mobile QR</span>
            <span className={`px-2 py-0.5 rounded-full ${step === 3 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>3. Consent</span>
          </div>
        </div>

        {/* STEP 1: Hardware Permissions & Audio Check */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Webcam Preview Frame */}
              <div className="relative bg-slate-950 border border-slate-800 rounded-2xl h-52 overflow-hidden flex items-center justify-center">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover mirror"
                />
                
                {/* Fallback simulation avatar if no hardware cam */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 pointer-events-none">
                  <div className="w-20 h-20 rounded-full border-2 border-indigo-400/60 overflow-hidden shadow-lg mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                      alt="Candidate Preview"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded-full text-indigo-300 border border-indigo-500/30">
                    Primary Webcam Ready
                  </span>
                </div>

                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-md text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Primary Feed Calibrated
                </div>
              </div>

              {/* Hardware Status & Microphone Meter */}
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Camera className="w-4 h-4 text-indigo-400" />
                      Webcam Resolution
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">1080p (Active)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Mic className="w-4 h-4 text-cyan-400" />
                      Microphone Signal
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">Optimal (Stereo)</span>
                  </div>

                  {/* Volume Level Meter Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Input Level</span>
                      <span>{micLevel}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 h-full transition-all duration-150"
                        style={{ width: `${micLevel}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-indigo-950/20 border border-indigo-800/40 rounded-xl text-xs text-indigo-200/90 leading-relaxed">
                  <strong>Mandatory Requirement:</strong> Must join 20 minutes prior to session for facial baseline extraction and lighting calibration.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
              >
                Next: Connect Secondary Phone Camera
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Secondary Smartphone Camera Pairing via QR */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              
              {/* Dynamic QR Code Box */}
              <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg text-slate-900 text-center">
                <div className="w-44 h-44 bg-slate-900 rounded-xl p-2 relative flex items-center justify-center">
                  {/* Generated QR Code Pattern */}
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://sentinel-interview.internal/room/alex-40526-mobile" 
                    alt="Mobile Pairing QR"
                    className="w-full h-full rounded-lg"
                  />
                  <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl pointer-events-none" />
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-800">
                  Scan with your Smartphone
                </div>
                <div className="text-[10px] text-slate-500">
                  Token: <code>sec-tok-95ca39d2</code>
                </div>
              </div>

              {/* Instructions on Placement */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <Smartphone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block mb-0.5">Camera Placement Angle:</strong>
                    <span className="text-slate-400">
                      Position your smartphone at a <strong>45° to 60° angle</strong> on your desk, providing a wide view of your hands, keyboard, and perimeter.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-amber-200/90">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-0.5">Crucial Rule:</strong>
                    <span>Candidate is <strong>not allowed to look more than 2 times</strong> towards the mobile camera during the interview session.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-slate-300">Secondary Feed Status:</span>
                  <button
                    onClick={() => setMobilePaired(!mobilePaired)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      mobilePaired 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {mobilePaired ? '✓ Phone Connected (Simulated)' : 'Simulate Phone Pair'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                Back to A/V Check
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
              >
                Next: Proctoring Agreement & Consent
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Complete Handwritten Proctoring Rules & Candidate Consent */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-h-[300px] overflow-y-auto space-y-3 text-xs text-slate-300">
              <div className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                Candidate Integrity & Automated Monitoring Rules
              </div>

              <div className="space-y-2 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>YOLOv12 Face Angle Limit:</strong> Face orientation must not exceed <strong>30°</strong> for more than <strong>7 seconds</strong>.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Gaze Deviation:</strong> Looking away in the same off-screen direction for &gt; 5 seconds generates a warning (Max 2 warnings before penalty).</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Device Limitation:</strong> Strictly ONE main laptop + ONE paired smartphone. Any unauthorized screen, tablet, or external device detected (2 alerts) triggers disqualification.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Audio-Lip Synchronization:</strong> System monitors for proxy voices or speech occurring while candidate lips are stationary.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Dual Environment Matching:</strong> Both camera feeds must verify the identical room background.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Lock Screen & Tab Switching:</strong> Leaving the active interview window generates an immediate Strike 1 warning.</span>
                </div>
              </div>
            </div>

            {/* Checkbox Agreement */}
            <label className="flex items-center gap-3 p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-xl cursor-pointer hover:bg-indigo-950/40 transition-colors">
              <input
                type="checkbox"
                checked={agreedToRules}
                onChange={(e) => setAgreedToRules(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
              />
              <span className="text-xs text-slate-200">
                I hereby understand the proctoring thresholds, grant video/audio recording consent, and agree to the 10-question evaluation criteria.
              </span>
            </label>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                Back to Mobile Setup
              </button>
              <button
                disabled={!agreedToRules}
                onClick={onStartInterview}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  agreedToRules
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-600/30 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Enter Autonomous Interview Room
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
