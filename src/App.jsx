import React, { useState } from 'react';
import { 
  Utensils, 
  Sparkles, 
  Layers, 
  Flame, 
  Camera, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Video, 
  Activity, 
  Award,
  FileText
} from 'lucide-react';
import { HiperMealStudio } from './components/meal/HiperMealStudio';
import { RecruiterSetupTab } from './components/interview/RecruiterSetupTab';
import { CandidateOnboardingModal } from './components/interview/CandidateOnboardingModal';
import { InterviewRoomTab } from './components/interview/InterviewRoomTab';
import { ProctorSentinelTab } from './components/interview/ProctorSentinelTab';
import { RecruiterDashboardTab } from './components/interview/RecruiterDashboardTab';
import { HiperSkinTab } from './components/interview/HiperSkinTab';
import { PlasmaBackground } from './components/ui/PlasmaBackground';
import { SAMPLE_JOB_ROLES, SAMPLE_CANDIDATE_RESUMES, DEFAULT_INTERVIEW_QUESTIONS } from './data/interviewData';

export function App() {
  const [activeTab, setActiveTab] = useState('hipermeal'); // HiperMeal is primary!
  const [showOtherTracks, setShowOtherTracks] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  
  // Interview configuration state (for PS 1 if toggled)
  const [sessionConfig, setSessionConfig] = useState({
    role: SAMPLE_JOB_ROLES[0],
    candidate: SAMPLE_CANDIDATE_RESUMES[0],
    questionCount: 10,
    difficulty: 'Senior',
    durationMinutes: 30,
    questions: DEFAULT_INTERVIEW_QUESTIONS
  });

  const [incidentLogs, setIncidentLogs] = useState([
    {
      timestamp: '00:03:12',
      type: 'CALIBRATION_BASELINE',
      severity: 'LOW',
      description: 'Primary webcam and secondary QR-paired mobile feed verified identical environment.'
    }
  ]);

  const [interviewResult, setInterviewResult] = useState({
    answers: {},
    incidents: []
  });

  return (
    <div className="min-h-screen bg-stone-950/85 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950 relative overflow-x-hidden">
      {/* Animated WebGL1 Plasma Shader Background */}
      <PlasmaBackground />
      
      {/* Clean Aesthetic Modern Food Header (No dirty blue panels!) */}
      <header className="sticky top-0 z-40 bg-stone-900/80 backdrop-blur-xl border-b border-stone-800/80 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo: Clean Warm Amber/Orange Food Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20 font-bold">
              <Utensils className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-tight text-lg text-white">HiperMeal</span>
                <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono px-2 py-0.5 rounded-full font-semibold">
                  NVIDIA NIM Vision + Open Food Facts
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                AI Visual Nutrition Diary & Instant Macro Decomposition
              </p>
            </div>
          </div>

          {/* Quick Track & Navigation Actions */}
          <div className="flex items-center gap-3">
            
            {/* Primary App Button */}
            <button
              onClick={() => setActiveTab('hipermeal')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === 'hipermeal'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-amber-500/20'
                  : 'text-stone-300 hover:text-white bg-stone-900 border border-stone-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Meal Studio
            </button>

            {/* Dropdown Toggle to Access Other Hackathon Problem Statements */}
            <button
              onClick={() => setShowOtherTracks(!showOtherTracks)}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-stone-400" />
              <span>Other Problem Statements</span>
              {showOtherTracks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

        {/* Secondary Navigation Tray (Only if user opens Other Tracks) */}
        {showOtherTracks && (
          <div className="max-w-7xl mx-auto pt-3 mt-3 border-t border-stone-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-500 text-[11px] font-mono mr-1">Switch Track:</span>
            
            <button
              onClick={() => { setActiveTab('recruiter'); setShowOtherTracks(false); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                activeTab === 'recruiter' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              PS 1: AI Interviewer (Recruiter Hub)
            </button>

            <button
              onClick={() => { setActiveTab('interview'); setShowOtherTracks(false); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                activeTab === 'interview' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              PS 1: Live Interview Room (Dual-Cam)
            </button>

            <button
              onClick={() => { setActiveTab('sentinel'); setShowOtherTracks(false); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                activeTab === 'sentinel' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              PS 1: Proctor Sentinel
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); setShowOtherTracks(false); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                activeTab === 'dashboard' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              PS 1: Recruiter Dossier
            </button>

            <button
              onClick={() => { setActiveTab('hiperskin'); setShowOtherTracks(false); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                activeTab === 'hiperskin' ? 'bg-teal-600 text-white border-teal-500' : 'bg-stone-900 border-stone-800 text-teal-400 hover:text-teal-300'
              }`}
            >
              PS 2: HiperSkin Tracker
            </button>
          </div>
        )}
      </header>

      {/* Main Dynamic Viewport */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'hipermeal' && (
          <HiperMealStudio />
        )}

        {activeTab === 'recruiter' && (
          <RecruiterSetupTab 
            onConfigureComplete={(cfg) => { setSessionConfig(cfg); setShowOnboardingModal(true); }} 
          />
        )}

        {activeTab === 'interview' && (
          <InterviewRoomTab 
            config={sessionConfig}
            onFinishInterview={(res) => { setInterviewResult(res); setActiveTab('dashboard'); }}
            onLogIncident={(inc) => setIncidentLogs(prev => [inc, ...prev])}
            incidentLogs={incidentLogs}
          />
        )}

        {activeTab === 'sentinel' && (
          <ProctorSentinelTab 
            incidentLogs={incidentLogs} 
          />
        )}

        {activeTab === 'dashboard' && (
          <RecruiterDashboardTab 
            interviewResult={interviewResult}
            config={sessionConfig}
          />
        )}

        {activeTab === 'hiperskin' && (
          <HiperSkinTab />
        )}
      </main>

      {/* Candidate Onboarding & Pre-Flight Modal (For PS 1 if launched) */}
      {showOnboardingModal && (
        <CandidateOnboardingModal
          config={sessionConfig}
          onStartInterview={() => { setShowOnboardingModal(false); setActiveTab('interview'); }}
          onClose={() => setShowOnboardingModal(false)}
        />
      )}

      {/* Minimalist Aesthetic Footer */}
      <footer className="border-t border-stone-900 bg-stone-950/80 py-4 px-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            HiperMeal &copy; 2026 • NVIDIA Multimodal NIM & Open Food Facts Grounded
          </span>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span>Real-time Image Ingestion</span>
            <span>•</span>
            <span>Editable Portion Weights</span>
            <span>•</span>
            <span>Macro Decomposition</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
