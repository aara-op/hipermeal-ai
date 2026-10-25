import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Eye, 
  Camera, 
  Smartphone, 
  Mic, 
  UserCheck, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Monitor,
  Flame
} from 'lucide-react';

export function ProctorSentinelTab({ incidentLogs = [] }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                Live Proctor Sentinel
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-medium">
                Dual Stream Continuous Audit
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Real-Time Anti-Cheating & Integrity Sentinel
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-2xl">
              Automated computer vision and acoustic integrity monitoring. Enforces strict angle, gaze, lip-sync, and dual-camera workspace constraints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-center">
              <div className="text-xs text-slate-400">Total Flagged Incidents</div>
              <div className="text-xl font-bold text-amber-400 font-mono">{incidentLogs.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rules & Telemetry HUD Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Metric Card 1: Head Pose (YOLOv12 30°) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              YOLOv12 Head Pose Angle
            </span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
              Limit: 30° / 7s
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Threshold:</span>
              <span className="text-slate-200">&le; 30 degrees deviation</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Duration Rule:</span>
              <span className="text-slate-200">Flags if held &gt; 7 seconds</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Current Status:</span>
              <span className="text-emerald-400 font-semibold">Active & Measuring</span>
            </div>
          </div>
        </div>

        {/* Metric Card 2: Gaze & Fixation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              Offscreen Gaze Tracker
            </span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">
              2 Warnings Policy
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Hold Limit:</span>
              <span className="text-slate-200">&gt; 5 seconds offscreen</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Repeated Darting:</span>
              <span className="text-slate-200">&gt; 3 times in 2 min</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Escalation:</span>
              <span className="text-amber-400 font-semibold">Flag for Human Review</span>
            </div>
          </div>
        </div>

        {/* Metric Card 3: Dual-Camera Device & Glances */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              Device & Phone Constraints
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
              Strict 1 PC + 1 Mobile
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Glance towards Phone:</span>
              <span className="text-slate-200">Max 2 times allowed</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Touch Laptop/Phone:</span>
              <span className="text-slate-200">Prohibited during question</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Extra Hardware:</span>
              <span className="text-red-400 font-semibold">2 Alerts = Disqualify</span>
            </div>
          </div>
        </div>

      </div>

      {/* Live Incident Stream Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Chronological Incident Timeline ({incidentLogs.length} Recorded Events)
          </h3>
          <span className="text-xs text-slate-400">
            Real-time feed from primary webcam & secondary phone cam
          </span>
        </div>

        {incidentLogs.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500/60 mx-auto" />
            <div className="text-sm font-medium text-slate-300">Clean Session So Far</div>
            <div className="text-xs text-slate-500">
              No anomalies detected. Candidate posture and workspace remain compliant with proctoring rules.
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {incidentLogs.map((inc, i) => (
              <div 
                key={i}
                className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 text-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    inc.severity === 'CRITICAL' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                      : inc.severity === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{inc.type}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inc.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' :
                        inc.severity === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {inc.severity}
                      </span>
                    </div>
                    <div className="text-slate-400 mt-0.5">{inc.description}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-slate-300 font-semibold">{inc.timestamp}</div>
                  <div className="text-[10px] text-slate-500">Dual-Stream Logged</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
