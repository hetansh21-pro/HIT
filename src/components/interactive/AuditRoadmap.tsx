import React, { useState } from 'react';
import { Calendar, FileCheck, Search, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface AuditRoadmapProps {
  onOpenAuditModal?: () => void;
}

export const AuditRoadmap: React.FC<AuditRoadmapProps> = ({ onOpenAuditModal }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      time: 'Phase 1 • 1-Day Shadowing',
      title: '“Show us how your business runs for one day”',
      subtitle: 'Zero technical jargon, zero disruption to your daily operations',
      description: 'We sit with your billing person, sales coordinator, and dispatch team (in person or over screen-share). We watch how orders arrive on WhatsApp, how stock is checked in Excel, and where hours are wasted.',
      checklist: [
        'How quotations are currently prepared & sent',
        'Where dealer inquiries get lost or delayed',
        'How many hours staff spends re-typing bills into Tally',
        'Current WhatsApp groups & Excel registers used',
      ],
      icon: Users,
    },
    {
      time: 'Phase 2 • Bottleneck & Waste Analysis',
      title: 'Quantifying the Exact Loss in Hours & Rupees',
      subtitle: 'Translating daily operational headaches into hard numbers',
      description: 'We do not sell generic tech promises. We calculate the exact cost: e.g. "Your team spends 26 hours/week manually typing quotations and misses ~15 dealer follow-ups every month."',
      checklist: [
        'Staff hourly cost vs manual repetitive tasks',
        'Lead response time measurement (average 45 mins ➔ target < 1 min)',
        'Inventory mismatch and pricing error risk assessment',
        'Identification of the single highest ROI workflow to automate first',
      ],
      icon: Search,
    },
    {
      time: 'Phase 3 • AI Opportunity Report',
      title: 'Executive Deliverable on Your Desk',
      subtitle: 'A clear, numbered report built specifically for the business owner',
      description: 'You receive a complete, non-technical blueprint outlining: 1. Exactly what to automate, 2. The exact AI workflow architecture, 3. Fixed implementation price, and 4. Projected monthly hours saved.',
      checklist: [
        '10–15 page structured AI Opportunity Report',
        'Before vs After workflow architecture diagrams',
        'Fixed-scope implementation quote (No surprises or scope-creep)',
        'Clear decision roadmap: proceed only if the math makes sense',
      ],
      icon: FileCheck,
    },
  ];

  const current = steps[activeStep];
  const IconComp = current.icon;

  return (
    <div className="w-full bg-[#0E1424]/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Low-Risk First Step
            </span>
            <span className="text-xs text-slate-400">Diagnosis Before Prescription</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white">
            What Happens in the AI Business Audit?
          </h4>
        </div>

        {onOpenAuditModal && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenAuditModal();
            }}
            className="bg-[#FF1E42] hover:bg-[#E01536] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule 1-Day Audit</span>
          </button>
        )}
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setActiveStep(idx);
              }}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isActive
                  ? 'bg-[#151E33] border-[#FF1E42] shadow-md shadow-red-950/40'
                  : 'bg-[#0B101D] border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 block mb-1">
                Step 0{idx + 1}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {idx === 0 ? 'Process Shadowing' : idx === 1 ? 'Quantify Waste' : 'Opportunity Report'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail Showcase */}
      <div className="bg-[#0B101D] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shrink-0">
            <IconComp className="w-6 h-6 text-[#DFFF00]" />
          </div>
          <div>
            <span className="text-xs font-mono text-[#DFFF00] font-semibold">{current.time}</span>
            <h3 className="text-base sm:text-lg font-bold text-white">{current.title}</h3>
            <p className="text-xs text-slate-400">{current.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
          {current.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {current.checklist.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 bg-[#121B2F]/60 border border-slate-800/80 p-3 rounded-xl"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-xs text-slate-300">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero software installation required for the audit.</span>
          </div>
          <span className="font-mono text-slate-300">Turnaround: 48 Hours to Report</span>
        </div>
      </div>
    </div>
  );
};
