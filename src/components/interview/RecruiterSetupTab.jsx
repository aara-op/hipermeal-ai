import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Layers, 
  BrainCircuit, 
  UploadCloud, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { SAMPLE_JOB_ROLES, SAMPLE_CANDIDATE_RESUMES, DEFAULT_INTERVIEW_QUESTIONS } from '../../data/interviewData';

export function RecruiterSetupTab({ onConfigureComplete }) {
  const [selectedRole, setSelectedRole] = useState(SAMPLE_JOB_ROLES[0]);
  const [selectedResume, setSelectedResume] = useState(SAMPLE_CANDIDATE_RESUMES[0]);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('Senior');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [customQuestionInput, setCustomQuestionInput] = useState('');
  const [customQuestions, setCustomQuestions] = useState([
    "Can you describe how you architect secure role-based access control (RBAC) in a multi-tenant application?"
  ]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [generatedQuestionsList, setGeneratedQuestionsList] = useState(DEFAULT_INTERVIEW_QUESTIONS);

  const handleAddCustomQuestion = () => {
    if (!customQuestionInput.trim()) return;
    setCustomQuestions(prev => [...prev, customQuestionInput.trim()]);
    setCustomQuestionInput('');
  };

  const handleRemoveCustomQuestion = (index) => {
    setCustomQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleRegenerateQuestions = () => {
    setIsGeneratingQuestions(true);
    setTimeout(() => {
      // Dynamic generation matching chosen count (default 10)
      const count = questionCount || 10;
      const core = DEFAULT_INTERVIEW_QUESTIONS.filter(q => !q.isIceBreaker).slice(0, count - 1);
      const ice = DEFAULT_INTERVIEW_QUESTIONS.find(q => q.isIceBreaker);
      
      const combined = [
        ice,
        ...core,
        ...customQuestions.map((cq, idx) => ({
          id: `custom-${idx}`,
          category: 'Recruiter Custom Question',
          agent: 'Lead Technical Architect',
          isIceBreaker: false,
          question: cq,
          expectedKeypoints: ['Custom criteria evaluated by AI'],
          timeLimit: 120
        }))
      ];
      setGeneratedQuestionsList(combined);
      setIsGeneratingQuestions(false);
    }, 800);
  };

  const handleProceedToInterview = () => {
    onConfigureComplete({
      role: selectedRole,
      candidate: selectedResume,
      questionCount: questionCount || 10,
      difficulty,
      durationMinutes,
      questions: generatedQuestionsList
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                NVIDIA Nemotron & Tri-Agent Orchestration
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-medium">
                Dual-Cam Proctoring Enabled
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Interview Configuration & Skill-Matching Hub
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Configure job parameters, upload candidate resumes, and dynamically generate 10 tailored technical & behavioral questions with real-time proctoring safeguards.
            </p>
          </div>

          <button
            onClick={handleProceedToInterview}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm shrink-0"
          >
            Launch Interview Session
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Job Role & Resume Ingestion (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: Job Role Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-slate-100 font-semibold border-b border-slate-800/80 pb-3">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <span>1. Target Job Role & Skills</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">Select Job Profile</label>
              <select
                value={selectedRole.id}
                onChange={(e) => {
                  const r = SAMPLE_JOB_ROLES.find(x => x.id === e.target.value);
                  setSelectedRole(r);
                }}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {SAMPLE_JOB_ROLES.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.title} ({role.experienceLevel})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-950/70 rounded-xl p-3.5 border border-slate-800/70 space-y-2 text-xs">
              <div className="text-slate-400 font-medium">Required Core Competencies:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedRole.requiredSkills.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 rounded-md font-mono text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Resume Ingestion & Extraction */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5 text-slate-100 font-semibold">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>2. Candidate Resume Extraction</span>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Parsed & Verified
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">Selected Candidate Profile</label>
              <select
                value={selectedResume.id}
                onChange={(e) => {
                  const res = SAMPLE_CANDIDATE_RESUMES.find(x => x.id === e.target.value);
                  setSelectedResume(res);
                }}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {SAMPLE_CANDIDATE_RESUMES.map(res => (
                  <option key={res.id} value={res.id}>
                    {res.name} — {res.role} ({res.experienceYears} yrs)
                  </option>
                ))}
              </select>
            </div>

            {/* Extracted Details Box */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">{selectedResume.name}</span>
                <span className="text-slate-400">{selectedResume.experienceYears} Years Exp.</span>
              </div>
              <div className="text-slate-400 line-clamp-2 leading-relaxed">
                {selectedResume.summary}
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block mb-1">Extracted Skillset:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedResume.extractedSkills.map(sk => (
                    <span key={sk} className="px-2 py-0.5 bg-slate-800 text-cyan-300 border border-slate-700 rounded text-[11px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Drag & Drop Zone */}
            <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-3.5 text-center cursor-pointer transition-colors group">
              <UploadCloud className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 mx-auto mb-1 transition-colors" />
              <div className="text-xs text-slate-300 font-medium">Upload Candidate Resume (PDF / DOCX)</div>
              <div className="text-[11px] text-slate-500">Auto-extracts skills, projects, certifications & work history</div>
            </div>
          </div>

          {/* Card 3: Interview Rules & Duration */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-slate-100 font-semibold border-b border-slate-800/80 pb-3">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>3. Parameters & Thresholds</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Question Count</label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="20"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                  <span className="absolute right-2.5 top-2 text-[10px] text-slate-500 font-mono">
                    (Default 10)
                  </span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="Junior">Junior (Foundation)</option>
                  <option value="Mid-Level">Mid-Level (Practical)</option>
                  <option value="Senior">Senior (Architecture/STAR)</option>
                  <option value="Lead">Lead / Architect (High-Stakes)</option>
                </select>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3 text-xs text-amber-300/90 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Proctoring Safeguards Active:</strong> YOLOv12 30° head pose monitor, 5s offscreen gaze tracking (2 warnings max), and dual-camera environmental matching.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Generated Questions & Custom Additions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Structured Question Manifest ({generatedQuestionsList.length} Questions)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dynamically generated via NVIDIA Nemotron based on resume claims vs. job role requirements.
                </p>
              </div>

              <button
                onClick={handleRegenerateQuestions}
                disabled={isGeneratingQuestions}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingQuestions ? 'animate-spin' : ''}`} />
                {isGeneratingQuestions ? 'Regenerating...' : 'Regenerate Questions'}
              </button>
            </div>

            {/* Recruiter Custom Question Input */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-400" />
                Add Recruiter-Specific Custom Question
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. How would you handle a critical database dead-lock in production?"
                  value={customQuestionInput}
                  onChange={(e) => setCustomQuestionInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomQuestion()}
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-400"
                />
                <button
                  onClick={handleAddCustomQuestion}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium shrink-0 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Questions Scroll List */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {generatedQuestionsList.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className={`p-4 rounded-xl border transition-all text-xs ${
                    q.isIceBreaker
                      ? 'bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-700/60'
                      : q.category.includes('Debugging')
                      ? 'bg-amber-950/20 border-amber-800/40 hover:border-amber-700/60'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        q.isIceBreaker 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {q.isIceBreaker ? 'Warm-up / Ice-Breaker' : `Question ${idx}`}
                      </span>

                      <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                        <Layers className="w-3 h-3 text-slate-500" />
                        {q.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                        Agent: <strong className="text-slate-200">{q.agent}</strong>
                      </span>
                      {q.id.startsWith('custom-') && (
                        <button
                          onClick={() => handleRemoveCustomQuestion(parseInt(q.id.replace('custom-', '')))}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-200 text-xs font-medium leading-relaxed">
                    {q.question}
                  </p>

                  {q.codeSnippet && (
                    <div className="mt-2.5 p-2.5 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[11px] text-amber-200/90 overflow-x-auto">
                      <div className="text-[10px] text-slate-500 mb-1">// Interactive Step-by-Step Logic Debugging Challenge</div>
                      <pre>{q.codeSnippet}</pre>
                    </div>
                  )}

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/60 pt-2">
                    <span className="truncate max-w-[320px]">
                      Expected: {q.expectedKeypoints.join(', ')}
                    </span>
                    <span className="font-mono text-slate-400">Time Limit: {q.timeLimit}s</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Proceed Action */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready to initiate candidate on-screen onboarding & device checks
              </span>
              <button
                onClick={handleProceedToInterview}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20"
              >
                Proceed to Calibration & A/V Checks
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
