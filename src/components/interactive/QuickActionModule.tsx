import React, { useState } from 'react';
import { Calendar, MessageSquare, ArrowRight, Calculator, CheckCircle2, TrendingUp } from 'lucide-react';
import { sound } from '../../utils/sound';

interface QuickActionModuleProps {
  onOpenAuditModal: () => void;
}

export const QuickActionModule: React.FC<QuickActionModuleProps> = ({ onOpenAuditModal }) => {
  const [employees, setEmployees] = useState<number>(4);
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);

  // Approximate math:
  // (employees * hoursPerDay * 25 working days) = hours lost per month
  const totalMonthlyHours = employees * hoursPerDay * 25;
  // Assuming average staff hourly cost ₹150 - ₹200
  const estimatedRupeeLoss = totalMonthlyHours * 180;

  const handleWhatsAppChat = () => {
    sound.playClick();
    const message = encodeURIComponent(
      "Hello HIT team, I run a business and want to know how you can automate our manual WhatsApp/Excel processes."
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="w-full bg-[#0E1424]/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl">
      <div className="mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#FF1E42]/20 text-[#FF5E78] border border-[#FF1E42]/30">
            Immediate Next Steps
          </span>
          <span className="text-xs text-slate-400">Zero Risk • 48-Hour Turnaround</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white">
          Ready to Stop Paying for Repetitive Manual Work?
        </h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="bg-[#0B101D] border border-slate-800 rounded-2xl p-5">
            <h5 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF1E42]" />
              Schedule a 1-Day AI Business Audit
            </h5>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              We shadow your manual processes for a single day, pinpoint where time & money are leaking, and deliver a formal AI Opportunity Report.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onOpenAuditModal();
              }}
              className="w-full bg-[#FF1E42] hover:bg-[#E01536] text-white py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer"
            >
              <span>Book Your AI Business Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-[#0B101D] border border-emerald-500/20 rounded-2xl p-5">
            <h5 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Direct WhatsApp Implementation Desk
            </h5>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Prefer talking directly? Tell us what your employees do manually in a short WhatsApp message or voice note.
            </p>
            <button
              onClick={handleWhatsAppChat}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Right: Interactive Rupee Waste Calculator */}
        <div className="lg:col-span-6 bg-[#0B101D] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#DFFF00]" />
                Interactive Time & Cost Calculator
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                Live Estimates
              </span>
            </div>

            {/* Slider 1: Employees */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Staff handling repetitive tasks:</span>
                <span className="font-bold text-white font-mono">{employees} employees</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={employees}
                onChange={(e) => {
                  sound.playClick();
                  setEmployees(Number(e.target.value));
                }}
                className="w-full accent-[#FF1E42] cursor-pointer"
              />
            </div>

            {/* Slider 2: Hours per day */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Hours per day per staff on Excel/WhatsApp:</span>
                <span className="font-bold text-white font-mono">{hoursPerDay} hours / day</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={hoursPerDay}
                onChange={(e) => {
                  sound.playClick();
                  setHoursPerDay(Number(e.target.value));
                }}
                className="w-full accent-[#FF1E42] cursor-pointer"
              />
            </div>

            {/* Result Box */}
            <div className="bg-[#121B2F] rounded-xl p-4 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Total repetitive time lost:</span>
                <span className="font-mono text-white font-bold text-sm">
                  {totalMonthlyHours.toLocaleString('en-IN')} hours / month
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700">
                <span className="text-slate-300">Estimated wage drain:</span>
                <span className="font-mono text-[#FF5E78] font-bold text-lg">
                  ~₹{estimatedRupeeLoss.toLocaleString('en-IN')} / month
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>HIT replaces this with 1 automated AI worker or Business OS workflow.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
