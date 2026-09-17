import React, { useState } from 'react';
import { X, Building2, Briefcase, Clock, Phone, Send, CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HitLogo } from './HitLogo';
import { HandUnderline } from './HandDrawnElements';
import { sound } from '../utils/sound';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [manualBottleneck, setManualBottleneck] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FE1743', '#EEFF41', '#0F172A'],
      });
    } catch {
      // ignore
    }

    setSubmitted(true);

    const message = encodeURIComponent(
      `Hello HIT Systems,\n\nI want to schedule a 1-Day AI Business Audit for my business:\n- Business: ${businessName || 'My Business'}\n- Industry/Type: ${industry || 'Not specified'}\n- Biggest Bottleneck: ${manualBottleneck || 'WhatsApp quotations and Excel tracking'}\n- Phone: ${phone || 'N/A'}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/?text=${message}`, '_blank');
    }, 1200);
  };

  const handleClose = () => {
    sound.playClick();
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-modal-backdrop">
      <div className="relative w-full max-w-lg max-h-[94dvh] bg-white border border-slate-200/80 rounded-3xl shadow-2xl text-slate-900 flex flex-col overflow-hidden animate-modal-content">
        {/* Brand Theme Top Geometric Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FE1743] via-[#EEFF41] to-[#FE1743] shrink-0" />

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 pt-3.5 pb-3 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <HitLogo size="xs" />
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-black px-2.5 py-0.5 rounded-full bg-[#EEFF41] text-slate-900 border border-black/10 shadow-2xs">
              <Zap className="w-3 h-3 text-[#FE1743] fill-current" />
              1-DAY AUDIT
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-[#FE1743] flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content (Zero visible scrollbar across all devices) */}
        <div className="overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-1 px-5 sm:px-7 py-3.5 sm:py-5">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-14 h-14 bg-red-50 border-2 border-[#FE1743] text-[#FE1743] rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-red-500/10">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Audit Request Ready!</h3>
              <p className="text-sm text-slate-700 max-w-sm mx-auto leading-relaxed">
                Opening WhatsApp to connect directly with the HIT implementation desk...
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Title & Subtitle */}
              <div className="mb-3">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 leading-tight">
                  Book 1-Day AI Business{' '}
                  <span className="relative inline-block text-[#FE1743]">
                    Audit
                    <HandUnderline className="w-full h-2.5 -bottom-0.5 left-0 absolute pointer-events-none" color="#FE1743" />
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  Direct diagnosis of your manual operations & Opportunity Report
                </p>
              </div>

              {/* "The Rule" Callout */}
              <div className="relative bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3 sm:p-3.5 mb-3.5 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#FE1743] text-white flex items-center justify-center shrink-0 font-mono text-xs font-black shadow-xs mt-0.5">
                    !
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-black uppercase tracking-wider text-[#FE1743]">
                        THE 1-DAY RULE
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-amber-200/60">
                        Fixed Scope
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-900 font-bold italic mt-1 leading-snug">
                      “Show us how your business works for one day. We’ll show you what AI can replace.”
                    </p>
                  </div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-['Caveat'] text-[#FE1743] font-bold text-sm sm:text-base">
                    Ground reality, zero technical jargon ✍️
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Field 1: Business / Company Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[#FE1743]" />
                    <span>Business / Company Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Hardware / Shreeji Timber"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-[#FE1743] focus:ring-3 focus:ring-[#FE1743]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                  />
                </div>

                {/* Field 2: Industry / Business Type */}
                <div>
                  <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#FE1743]" />
                      <span>Industry / Business Type</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#FE1743] bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-bold">
                      Type your industry
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plywood trading, Ceramic tiles, Textiles, Auto parts, FMCG..."
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-[#FE1743] focus:ring-3 focus:ring-[#FE1743]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                  />
                </div>

                {/* Field 3: Biggest Manual Bottleneck */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#FE1743]" />
                    <span>What single process takes the most manual time?</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quotation typing on WhatsApp, Excel stock search, paper bills..."
                    value={manualBottleneck}
                    onChange={(e) => setManualBottleneck(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-[#FE1743] focus:ring-3 focus:ring-[#FE1743]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                  />
                </div>

                {/* Field 4: WhatsApp / Phone Number */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    <Phone className="w-3.5 h-3.5 text-[#FE1743]" />
                    <span>WhatsApp / Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-[#FE1743] focus:ring-3 focus:ring-[#FE1743]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="group w-full rounded-xl bg-[#FE1743] hover:bg-[#E01536] text-white py-3 px-5 font-bold shadow-md shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide"
                  >
                    <span>Submit & Connect on WhatsApp</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Trust Subtext - Stacked line by line (up & down) */}
                <div className="flex flex-col items-center justify-center gap-1 pt-1.5 pb-0.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 font-semibold">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>Direct Founder Review</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>No spam · Zero obligation · 15-min WhatsApp reply</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
