import React, { useState } from 'react';
import { X, Building2, Briefcase, Clock, Phone, Send, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-md animate-modal-backdrop">
      <div className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-900 animate-modal-content">
        {/* Brand Theme Top Geometric Accent Bar */}
        <div className="sticky top-0 -mt-5 sm:-mt-8 -mx-5 sm:-mx-8 h-1.5 bg-gradient-to-r from-[#FE1743] via-[#EEFF41] to-[#FE1743] z-10" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3.5 pt-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <HitLogo size="xs" />
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest font-black px-2.5 py-1 rounded-full bg-[#EEFF41] text-slate-900 border border-black/10 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-[#FE1743] fill-current" />
              1-DAY AUDIT
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-[#FE1743] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-red-50 border-2 border-[#FE1743] text-[#FE1743] rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-red-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Audit Request Ready!</h3>
            <p className="text-base text-slate-700 max-w-sm mx-auto leading-relaxed">
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
          <div className="pt-3">
            {/* Title & Subtitle with high readability */}
            <div className="mb-4">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 leading-tight">
                Book 1-Day AI Business{' '}
                <span className="relative inline-block text-[#FE1743]">
                  Audit
                  <HandUnderline className="w-full h-3 -bottom-1 left-0 absolute pointer-events-none" color="#FE1743" />
                </span>
              </h3>
              <p className="text-sm text-slate-600 font-medium mt-1.5">
                Direct diagnosis of your manual operations & Opportunity Report
              </p>
            </div>

            {/* "The Rule" Callout - Clear, readable text */}
            <div className="relative bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 mb-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#FE1743] text-white flex items-center justify-center shrink-0 font-mono text-xs font-black shadow-xs">
                  !
                </div>
                <div className="flex-1">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-[#FE1743] block">
                    THE 1-DAY RULE
                  </span>
                  <p className="text-sm sm:text-base text-slate-900 font-bold italic mt-1 leading-snug">
                    “Show us how your business works for one day. We’ll show you what AI can replace.”
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-yellow-200 flex items-center justify-between text-xs text-slate-700">
                <span className="font-['Caveat'] text-[#FE1743] font-bold text-base">
                  Ground reality, zero technical jargon ✍️
                </span>
                <span className="text-xs font-mono font-semibold uppercase text-slate-600">
                  Fixed Scope
                </span>
              </div>
            </div>

            {/* Form with large, clear, readable fields */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Field 1: Business / Company Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1.5">
                  <Building2 className="w-4 h-4 text-[#FE1743]" />
                  <span>Business / Company Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Hardware / Shreeji Timber"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-2 border-slate-300 focus:border-[#FE1743] focus:ring-4 focus:ring-[#FE1743]/10 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                />
              </div>

              {/* Field 2: Industry / Business Type (MANUAL TYPING) */}
              <div>
                <label className="flex items-center justify-between text-sm font-bold text-slate-900 mb-1.5">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#FE1743]" />
                    <span>Industry / Business Type</span>
                  </span>
                  <span className="text-xs font-mono text-[#FE1743] bg-red-50 border border-red-200 px-2 py-0.5 rounded-md font-bold">
                    Type your industry
                  </span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plywood trading, Ceramic tiles, Textiles, Auto parts, FMCG..."
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-2 border-slate-300 focus:border-[#FE1743] focus:ring-4 focus:ring-[#FE1743]/10 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                />
              </div>

              {/* Field 3: Biggest Manual Bottleneck */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1.5">
                  <Clock className="w-4 h-4 text-[#FE1743]" />
                  <span>What single process takes the most manual time?</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quotation typing on WhatsApp, Excel stock search, paper bills..."
                  value={manualBottleneck}
                  onChange={(e) => setManualBottleneck(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-2 border-slate-300 focus:border-[#FE1743] focus:ring-4 focus:ring-[#FE1743]/10 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                />
              </div>

              {/* Field 4: WhatsApp / Phone Number */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1.5">
                  <Phone className="w-4 h-4 text-[#FE1743]" />
                  <span>WhatsApp / Phone Number</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-2 border-slate-300 focus:border-[#FE1743] focus:ring-4 focus:ring-[#FE1743]/10 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-950 placeholder-slate-400 font-medium transition-all outline-none"
                />
              </div>

              {/* Submit Button (Star icon removed, crisp legible text) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group w-full rounded-2xl bg-[#FE1743] hover:bg-[#E01536] text-white py-3.5 px-6 font-bold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2.5 text-sm sm:text-base tracking-wide"
                >
                  <span>Submit & Connect on WhatsApp</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-600 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Direct Founder Review</span>
                <span>•</span>
                <span className="font-['Caveat'] text-[#FE1743] font-bold text-base">Zero obligation · 15-min WhatsApp reply</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
