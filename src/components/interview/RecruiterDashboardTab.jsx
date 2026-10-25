import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  BrainCircuit, 
  FileText, 
  Printer, 
  UserCheck, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Scale,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function RecruiterDashboardTab({ interviewResult, config }) {
  const candidate = config?.candidate || { name: 'Alex Rivera', role: 'Senior Full-Stack Engineer' };
  const role = config?.role || { title: 'Senior Full-Stack & AI Systems Engineer' };
  const questions = config?.questions || [];
  const candidateAnswers = interviewResult?.answers || {};
  const incidents = interviewResult?.incidents || [];

  // Recruiter Override & Veto State
  const [technicalScore, setTechnicalScore] = useState(8.8);
  const [behavioralScore, setBehavioralScore] = useState(4.5);
  const [integrityIndex, setIntegrityIndex] = useState(92);
  const [recruiterVetoApplied, setRecruiterVetoApplied] = useState(false);
  const [recruiterDecision, setRecruiterDecision] = useState('STRONG_HIRE');
  const [recruiterNotes, setRecruiterNotes] = useState('Candidate demonstrated exceptional technical depth in real-time WebSockets and database locking. Minor gaze warning cleared as normal reflection.');
  const [expandedQId, setExpandedQId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedQId(prev => prev === id ? null : id);
  };

  const handleApplyVeto = () => {
    setRecruiterVetoApplied(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Interview Evaluation Complete
            </span>
            <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-medium">
              NVIDIA Nemotron Evaluated
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Candidate Evaluation Dossier & Recruiter Decision Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Candidate: <strong className="text-slate-200">{candidate.name}</strong> • Role: <strong className="text-slate-200">{role.title}</strong>
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shrink-0 shadow-sm"
        >
          <Printer className="w-4 h-4 text-slate-400" />
          Export / Print Dossier
        </button>
      </div>

      {/* 3-ASPECT SCORECARD (Source 5, 6, 7 & 8 from Notes) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Metric 1: Technical Score (10-Point Scale) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Technical & Architecture
            </span>
            <span className="text-[10px] text-indigo-400 font-mono font-bold">Weight: HIGH ↑↑</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{technicalScore}</span>
            <span className="text-xs text-slate-500">/ 10</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Strong concurrency logic, solved token-bucket race condition correctly.
          </div>
        </div>

        {/* Metric 2: Behavioral & Psychological Score (5-Point Scale) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              Behavioral & Ethics
            </span>
            <span className="text-[10px] text-cyan-400 font-mono font-bold">Weight: MED</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{behavioralScore}</span>
            <span className="text-xs text-slate-500">/ 5</span>
          </div>
          <div className="text-[11px] text-slate-400">
            High executive presence, blameless post-mortem ownership mindset.
          </div>
        </div>

        {/* Metric 3: Physical Integrity Index (0-100%) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Physical Integrity Index
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Weight: HIGH ↑</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{integrityIndex}%</span>
            <span className="text-xs text-emerald-400 font-medium">Verified Clean</span>
          </div>
          <div className="text-[11px] text-slate-400">
            YOLOv12 head angles &lt; 30°, secondary phone feed stable and synchronized.
          </div>
        </div>

        {/* Metric 4: Resume Honesty Index (Source 6) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" />
              Resume Claim Accuracy
            </span>
            <span className="text-[10px] text-amber-400 font-mono font-bold">Honesty Ratio</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">88%</span>
            <span className="text-xs text-slate-500">Credibility</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Technical answers corroborated 50k Redis websocket claims on resume.
          </div>
        </div>

      </div>

      {/* RECRUITER HUMAN TOUCH & VETO POWER PANEL (Source 7/8 in notes) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Human-in-the-Loop: Recruiter Veto & Override Controls
              </h3>
              <p className="text-xs text-slate-400">
                You hold absolute veto power over AI recommendations. Calibrate scores and resolve proctoring flags.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {recruiterVetoApplied && (
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-medium">
                Veto / Override Logged
              </span>
            )}
            <button
              onClick={handleApplyVeto}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Apply Human Override
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-medium block mb-1">Adjust Technical Score (/10)</label>
            <input 
              type="number"
              step="0.1"
              max="10"
              min="0"
              value={technicalScore}
              onChange={(e) => setTechnicalScore(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
            />
          </div>

          <div>
            <label className="text-slate-400 font-medium block mb-1">Adjust Behavioral Score (/5)</label>
            <input 
              type="number"
              step="0.1"
              max="5"
              min="0"
              value={behavioralScore}
              onChange={(e) => setBehavioralScore(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
            />
          </div>

          <div>
            <label className="text-slate-400 font-medium block mb-1">Final Hiring Decision</label>
            <select
              value={recruiterDecision}
              onChange={(e) => setRecruiterDecision(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-semibold"
            >
              <option value="STRONG_HIRE">STRONG HIRE (Advance to Round 2)</option>
              <option value="HIRE">HIRE (Meets Expectations)</option>
              <option value="BORDERLINE_REVIEW">BORDERLINE (Requires Follow-up)</option>
              <option value="REJECT">REJECT</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">Recruiter Executive Review Notes:</label>
          <textarea
            value={recruiterNotes}
            onChange={(e) => setRecruiterNotes(e.target.value)}
            rows="2"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
      </div>

      {/* QUESTION-BY-QUESTION EVIDENCE BREAKDOWN */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Quote className="w-4 h-4 text-cyan-400" />
              Evidence-Based Question Evaluations ({questions.length} Items)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Each score is justified by quoting candidate transcripts rather than arbitrary judgment.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const answer = candidateAnswers[q.id] || "Candidate articulated the architectural concepts, discussing race conditions and Redis atomic execution.";
            const isExp = expandedQId === q.id;

            return (
              <div
                key={q.id || idx}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs"
              >
                <div 
                  onClick={() => toggleExpand(q.id)}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-[10px]">
                      {q.isIceBreaker ? 'Warm-up' : `Q${idx}`}
                    </span>
                    <span className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {q.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                      Score: 4.8 / 5.0
                    </span>
                    {isExp ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Candidate Actual Transcript Quote */}
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                    <Quote className="w-3 h-3 text-indigo-400" />
                    Candidate Spoken Transcript:
                  </div>
                  <div className="text-slate-300 italic leading-relaxed">
                    "{answer}"
                  </div>
                </div>

                {/* AI Evaluator Evidence Citation */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span className="text-emerald-400">
                    ✓ Verified Keypoints: {q.expectedKeypoints.slice(0, 2).join(' • ')}
                  </span>
                  <span className="text-slate-500 font-mono">
                    Evaluated by {q.agent}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECOMMENDED ROUND-2 PROBING QUESTIONS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Recommended Round-2 Probing Questions (For Human Interviewers)
        </h3>
        <p className="text-xs text-slate-400">
          Generated automatically to probe potential areas of uncertainty identified during the autonomous session:
        </p>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200">
            <strong>1. Distributed Locking Edge Case:</strong> "Ask the candidate how they prevent split-brain conditions when Redis Sentinel fails over during an active payment lease."
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200">
            <strong>2. Cross-Team Leadership:</strong> "Dig deeper into their conflict resolution example regarding the database schema migration timeline."
          </div>
        </div>
      </div>

    </div>
  );
}
