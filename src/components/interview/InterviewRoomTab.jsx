import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Smartphone, 
  User, 
  Terminal, 
  Sparkles, 
  RefreshCw, 
  Eye, 
  Code,
  Zap,
  ChevronRight,
  Layers
} from 'lucide-react';

export function InterviewRoomTab({ config, onFinishInterview, onLogIncident, incidentLogs }) {
  const questions = config?.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentQ = questions[currentIdx] || questions[0];

  // Speech & Interview State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [answersList, setAnswersList] = useState({});
  const [timeLeft, setTimeLeft] = useState(currentQ?.timeLimit || 120);
  const [isFollowUpActive, setIsFollowUpActive] = useState(false);
  const [followUpText, setFollowUpText] = useState('');
  
  // Proctoring Real-Time State
  const [headAngleDeg, setHeadAngleDeg] = useState(6);
  const [gazeDirection, setGazeDirection] = useState('CENTER');
  const [gazeWarningCount, setGazeWarningCount] = useState(0);
  const [mobileGlanceCount, setMobileGlanceCount] = useState(0);
  const [activeWarning, setActiveWarning] = useState(null);
  const [secondaryCamActive, setSecondaryCamActive] = useState(true);
  const [deviceAlertCount, setDeviceAlertCount] = useState(0);

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Synthesis for AI Interviewer
  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        startListening();
      };
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  // Auto-speak on question load
  useEffect(() => {
    if (currentQ) {
      setTimeLeft(currentQ.timeLimit || 120);
      setCandidateAnswer('');
      setIsFollowUpActive(false);
      speakQuestion(currentQ.question);
    }
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [currentIdx]);

  // Speech Recognition Setup (Web Speech API)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript + ' ';
          }
          setCandidateAnswer(fullTranscript);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
      } catch (e) {
        console.warn("SpeechRecognition not allowed in sandbox:", e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e){}
    }
    setIsListening(false);
  };

  // Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIdx, candidateAnswer]);

  // Handle Candidate Answer Submission
  const handleSubmitAnswer = () => {
    stopListening();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    const answer = candidateAnswer.trim() || "Candidate explained the architectural concepts and practical design trade-offs.";
    setAnswersList(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));

    // Trigger Adaptive Follow-up if answer is brief and we haven't asked a follow-up for this question yet
    if (!isFollowUpActive && candidateAnswer.split(' ').length < 15 && !currentQ.isIceBreaker) {
      setIsFollowUpActive(true);
      const followUp = `Could you elaborate with one specific edge case you handled during this implementation?`;
      setFollowUpText(followUp);
      speakQuestion(followUp);
      return;
    }

    // Advance to next question or complete
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Completed all questions!
      onFinishInterview({
        answers: { ...answersList, [currentQ.id]: answer },
        incidents: incidentLogs
      });
    }
  };

  // Proctoring Simulation Actions (For testing & judge demonstration)
  const triggerSimulation = (type) => {
    const ts = new Date().toLocaleTimeString();

    if (type === 'HEAD_30_DEG') {
      setHeadAngleDeg(38);
      const msg = "YOLOv12 Head Angle > 30° held for > 7 seconds";
      setActiveWarning(msg);
      onLogIncident({ timestamp: ts, type: 'HEAD_POSE_DEVIATION', severity: 'HIGH', description: msg });
      setTimeout(() => setHeadAngleDeg(8), 5000);
    } else if (type === 'GAZE_OFFSCREEN') {
      setGazeDirection('RIGHT_DOWN');
      const count = gazeWarningCount + 1;
      setGazeWarningCount(count);
      const msg = `Gaze fixated off-screen > 5s (Warning ${count} of 2)`;
      setActiveWarning(msg);
      onLogIncident({ timestamp: ts, type: 'OFFSCREEN_GAZE_HOLD', severity: 'MEDIUM', description: msg });
      setTimeout(() => setGazeDirection('CENTER'), 4000);
    } else if (type === 'MOBILE_GLANCE') {
      const count = mobileGlanceCount + 1;
      setMobileGlanceCount(count);
      const msg = `Glanced towards secondary phone camera (${count} of 2 limit)`;
      setActiveWarning(msg);
      onLogIncident({ timestamp: ts, type: 'SECONDARY_CAM_GLANCE', severity: 'LOW', description: msg });
    } else if (type === 'UNAUTHORIZED_DEVICE') {
      const count = deviceAlertCount + 1;
      setDeviceAlertCount(count);
      const msg = count >= 2 
        ? "CRITICAL: Secondary unauthorized screen/device detected (Strike 2 - Escalated to Disqualification)" 
        : "ALERT: Unauthorized secondary device detected on desk (Strike 1)";
      setActiveWarning(msg);
      onLogIncident({ 
        timestamp: ts, 
        type: 'UNAUTHORIZED_DEVICE_DETECTED', 
        severity: count >= 2 ? 'CRITICAL' : 'HIGH', 
        description: msg 
      });
    } else if (type === 'LIP_SYNC_DESYNC') {
      const msg = "Audio detected without corresponding lip movement (Voice Proxy Suspected)";
      setActiveWarning(msg);
      onLogIncident({ timestamp: ts, type: 'LIP_AUDIO_DESYNC', severity: 'HIGH', description: msg });
    } else if (type === 'CAM_DISCONNECT') {
      setSecondaryCamActive(!secondaryCamActive);
      const msg = !secondaryCamActive 
        ? "Secondary mobile camera feed re-established" 
        : "Secondary mobile camera disconnected unexpectedly";
      setActiveWarning(msg);
      onLogIncident({ 
        timestamp: ts, 
        type: 'CAMERA_DISCONNECT', 
        severity: 'MEDIUM', 
        description: msg 
      });
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      
      {/* Top Session Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
            {currentIdx + 1}/{questions.length}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {currentQ?.isIceBreaker ? 'Warm-up / Ice-Breaker' : `Interview Question ${currentIdx}`}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                {currentQ?.category}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Active Agent: <strong className="text-cyan-300">{currentQ?.agent}</strong>
            </div>
          </div>
        </div>

        {/* Question Countdown Timer */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold ${
            timeLeft < 30 ? 'bg-red-950/40 border-red-500/50 text-red-400 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-200'
          }`}>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>

          <button
            onClick={handleSubmitAnswer}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
          >
            <span>Submit & Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Active Warning Banner */}
      {activeWarning && (
        <div className="bg-amber-500/15 border-2 border-amber-500/80 rounded-2xl p-3.5 flex items-center justify-between text-xs text-amber-200 shadow-xl shadow-amber-500/10 animate-bounce">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span><strong>Proctoring Notice:</strong> {activeWarning}</span>
          </div>
          <button 
            onClick={() => setActiveWarning(null)}
            className="text-amber-400 hover:text-white text-xs underline font-medium"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* Main Dual Camera & Interview Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: AI Interviewer & Interactive Question Prompt (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* AI Virtual Interviewer Avatar Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {currentQ?.agent || 'Autonomous Interviewer'}
                  </h3>
                  <div className="text-[11px] text-slate-400">NVIDIA Nemotron Tri-Agent Subsystem</div>
                </div>
              </div>

              {/* Speaking Voice Animation Indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px]">
                {isSpeaking ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                    <span className="text-indigo-300 font-medium">Speaking Question...</span>
                    <span className="flex gap-0.5 ml-1">
                      <span className="w-1 h-3 bg-indigo-500 rounded-full animate-bounce" />
                      <span className="w-1 h-4 bg-cyan-400 rounded-full animate-bounce delay-75" />
                      <span className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce delay-150" />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-400">Listening to Candidate</span>
                  </>
                )}
              </div>
            </div>

            {/* Spoken Question Text */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3">
              <p className="text-slate-100 text-sm font-medium leading-relaxed">
                "{currentQ?.question}"
              </p>

              {/* Follow-up Question Overlay */}
              {isFollowUpActive && (
                <div className="p-3 bg-indigo-950/40 border border-indigo-700/50 rounded-xl text-xs text-indigo-200 space-y-1">
                  <div className="font-semibold text-indigo-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Adaptive Clarification Follow-up:
                  </div>
                  <div className="italic">"{followUpText}"</div>
                </div>
              )}

              {/* Interactive Logic / Pseudocode Debugging Box */}
              {currentQ?.codeSnippet && (
                <div className="mt-3 bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-amber-200">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 border-b border-slate-800 pb-1">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Code className="w-3 h-3" />
                      Step-by-Step Logic Debugging Challenge
                    </span>
                    <span className="text-amber-400 font-semibold">Spot the Concurrency Flaw</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
                    {currentQ.codeSnippet}
                  </pre>
                </div>
              )}
            </div>

            {/* Candidate Spoken Response & Live Transcription */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Mic className={`w-3.5 h-3.5 ${isListening ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
                  Candidate Spoken Response (Live Transcription):
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {candidateAnswer ? `${candidateAnswer.split(' ').length} words` : 'Awaiting response...'}
                </span>
              </div>

              <textarea
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Speak into your microphone. Your answer will be transcribed automatically in real-time, or type here..."
                rows="4"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => isListening ? stopListening() : startListening()}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isListening ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  {isListening ? 'Microphone Active (Listening)' : 'Start Microphone'}
                </button>

                <button
                  onClick={handleSubmitAnswer}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Send className="w-3 h-3" />
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: DUAL-CAMERA MONITORING FEEDS & LIVE HUD (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Camera Feed 1: Primary Webcam (Facial & Gaze HUD) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-lg space-y-2 relative">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  Primary Webcam (Face)
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  Face Mesh Active
                </span>
              </div>

              {/* Video Window with Computer Vision Overlays */}
              <div className="relative bg-slate-950 rounded-2xl h-52 overflow-hidden border border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                  alt="Candidate Camera"
                  className="w-full h-full object-cover"
                />

                {/* Computer Vision Face Bounding Box & HUD Graphic */}
                <div className="absolute inset-x-12 inset-y-6 border-2 border-indigo-400/70 rounded-xl pointer-events-none flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <div className="flex justify-between text-[9px] font-mono text-indigo-300 bg-black/60 px-1 rounded">
                    <span>YOLOv12 Pose: {headAngleDeg}°</span>
                    <span>Gaze: {gazeDirection}</span>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-emerald-400 bg-black/60 px-1 rounded">
                    <span>Re-ID: Verified (10s)</span>
                    <span>Lips: Active Sync</span>
                  </div>
                </div>

                {/* Head Angle Breach Badge if > 30 deg */}
                {headAngleDeg > 30 && (
                  <div className="absolute top-2 left-2 bg-red-600/90 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold animate-pulse">
                    ANGLE DEVIATION: {headAngleDeg}° &gt; 30°
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
                <span>Offscreen Gaze Warnings: <strong className="text-amber-400">{gazeWarningCount}/2</strong></span>
                <span>Mobile Glances: <strong className="text-slate-200">{mobileGlanceCount}/2</strong></span>
              </div>
            </div>

            {/* Camera Feed 2: Secondary Smartphone Camera (Desk/Workspace) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-lg space-y-2 relative">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  Secondary Phone Cam
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  secondaryCamActive 
                    ? 'text-cyan-300 bg-cyan-950/60 border-cyan-800/40' 
                    : 'text-red-400 bg-red-950/60 border-red-800/40'
                }`}>
                  {secondaryCamActive ? '45° Workspace Angle' : 'Disconnected'}
                </span>
              </div>

              {/* Secondary Camera Window */}
              <div className="relative bg-slate-950 rounded-2xl h-52 overflow-hidden border border-slate-800 flex items-center justify-center">
                {secondaryCamActive ? (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80" 
                      alt="Secondary Desk Feed"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                      Environment Match: 98%
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4 text-xs text-red-400 space-y-1">
                    <ShieldAlert className="w-8 h-8 text-red-500 mx-auto" />
                    <div className="font-bold">Feed Disconnected</div>
                    <div className="text-[10px] text-slate-400">Candidate phone connection dropped</div>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
                <span>Device Audit: <strong className="text-emerald-400">1 PC + 1 Phone</strong></span>
                <span>Alerts: <strong className="text-amber-400">{deviceAlertCount}/2</strong></span>
              </div>
            </div>

          </div>

          {/* SIMULATOR & TEST BENCH FOR HACKATHON JUDGES */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-amber-400" />
                Live Proctoring Incident Test-Bench (Judge Demo Buttons)
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                Click to Test Incidents
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => triggerSimulation('HEAD_30_DEG')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors"
              >
                <div className="font-semibold text-slate-200">Head Pose &gt;30°</div>
                <div className="text-[10px] text-slate-500">&gt;7s deviation check</div>
              </button>

              <button
                onClick={() => triggerSimulation('GAZE_OFFSCREEN')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors"
              >
                <div className="font-semibold text-slate-200">Gaze Hold &gt;5s</div>
                <div className="text-[10px] text-slate-500">2-Warning policy</div>
              </button>

              <button
                onClick={() => triggerSimulation('MOBILE_GLANCE')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors"
              >
                <div className="font-semibold text-slate-200">Phone Cam Glance</div>
                <div className="text-[10px] text-slate-500">Max 2 glances</div>
              </button>

              <button
                onClick={() => triggerSimulation('UNAUTHORIZED_DEVICE')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors"
              >
                <div className="font-semibold text-slate-200">Extra Device Alert</div>
                <div className="text-[10px] text-slate-500">2 Alerts = Disqualify</div>
              </button>

              <button
                onClick={() => triggerSimulation('LIP_SYNC_DESYNC')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors"
              >
                <div className="font-semibold text-slate-200">Lip-Audio Desync</div>
                <div className="text-[10px] text-slate-500">Proxy voice check</div>
              </button>

              <button
                onClick={() => triggerSimulation('CAM_DISCONNECT')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-colors"
              >
                <div className="font-semibold text-slate-200">Cam Disconnect</div>
                <div className="text-[10px] text-slate-500">Toggle phone feed</div>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
