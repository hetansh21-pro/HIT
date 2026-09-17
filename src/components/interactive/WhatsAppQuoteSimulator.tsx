import React, { useState } from 'react';
import { Check, CheckCheck, Send, Zap, Bot, FileText, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { HandArrowRight, HandCircle } from '../HandDrawnElements';
import { sound } from '../../utils/sound';

export const WhatsAppQuoteSimulator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [customText, setCustomText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const defaultMessage = "Namaste sir, please send urgent price quotation for 40 sheets of 18mm BWP Marine Ply and 25 sheets 12mm Commercial Ply. Delivery at Surat godown.";

  const handleSimulate = () => {
    sound.playClick();
    setIsProcessing(true);
    setStep(2);

    setTimeout(() => {
      sound.playReveal();
      setIsProcessing(false);
      setStep(3);
    }, 1300);
  };

  const handleApprove = () => {
    sound.playSuccess();
    setStep(4);
  };

  const handleReset = () => {
    sound.playClick();
    setStep(1);
    setCustomText('');
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-50 text-[#FF1E42] border border-red-100">
              Interactive WhatsApp Simulator
            </span>
            <span className="text-xs text-slate-500">Live Client Scenario</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-slate-900">
            Unstructured WhatsApp Message ➔ Official PDF Quotation
          </h4>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: WhatsApp Phone UI in Crisp Light Theme */}
        <div className="lg:col-span-6 bg-[#EFEAE2] rounded-2xl border-2 border-slate-200 overflow-hidden shadow-md flex flex-col">
          {/* WhatsApp Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white text-[#008069] flex items-center justify-center font-bold text-sm shadow-sm">
                ST
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Shreeji Traders (Dealer)</p>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
                  online via WhatsApp
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-900/40 text-white px-2 py-0.5 rounded font-bold">
              HIT AI Active
            </span>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 min-h-[260px] flex flex-col justify-end">
            {/* Dealer Incoming Message */}
            <div className="max-w-[88%] bg-white text-slate-800 text-xs sm:text-sm p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
              <p className="text-[11px] font-bold text-[#008069] mb-1">Shreeji Traders</p>
              <p className="leading-relaxed">{customText || defaultMessage}</p>
              <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                <span>10:42 AM</span>
              </div>
            </div>

            {/* AI Parsing status */}
            {isProcessing && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-[#FF1E42] text-xs px-3.5 py-2.5 rounded-xl animate-pulse font-medium">
                <RefreshCw className="w-4 h-4 animate-spin text-[#FF1E42]" />
                <span>HIT AI parsing plywood specs, checking rates & calculating GST...</span>
              </div>
            )}

            {/* AI Response in Chat */}
            {step >= 3 && (
              <div className="max-w-[92%] bg-[#D9FDD3] text-slate-900 text-xs sm:text-sm p-3.5 rounded-2xl rounded-tr-none self-end shadow-sm border border-emerald-200">
                <div className="flex items-center gap-1.5 text-[#008069] font-bold mb-1 text-[11px]">
                  <Zap className="w-3.5 h-3.5 text-[#008069]" />
                  <span>HIT Quotation Agent</span>
                </div>
                <p className="text-xs text-slate-700">
                  Quotation <strong className="font-mono text-slate-900">#HIT-QT-8491</strong> prepared!
                </p>
                <div className="mt-2 bg-white p-2.5 rounded-xl border border-emerald-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#FF1E42]" />
                    <div>
                      <p className="font-bold text-[11px] text-slate-900">Quotation_Shreeji_Traders.pdf</p>
                      <p className="text-[10px] text-slate-500">Auto-calculated • ₹74,340 (incl. GST)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    READY
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] text-emerald-800">
                  <span>10:42 AM</span>
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            )}

            {/* Final Sent Status */}
            {step === 4 && (
              <div className="self-center bg-white border border-emerald-300 text-emerald-800 text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Approved by Owner & Sent on WhatsApp in 28 seconds!</span>
              </div>
            )}
          </div>

          {/* Action Footer on WhatsApp */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Or test custom order: e.g. 50 boxes 18mm ply..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF1E42]"
            />
            {step === 1 ? (
              <button
                onClick={handleSimulate}
                className="bg-[#FF1E42] hover:bg-[#E01536] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Run AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Right: AI Output & Owner Approval Deck */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-4 h-4 text-[#FF1E42] shrink-0" />
                <span>Human-in-the-Loop Safeguard</span>
              </span>
              <span className="w-fit text-[11px] font-mono font-bold px-2.5 py-0.5 bg-red-100 text-[#FF1E42] rounded whitespace-nowrap shrink-0">
                Zero Risk
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              AI does 100% of the repetitive math, SKU lookups, and PDF formatting. But the quote is only dispatched to the client after the owner or manager taps <strong className="text-slate-900">Approve</strong>.
            </p>

            {/* Generated Quote Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2 shadow-xs">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800">Parsed Products & Rates</span>
                <span className="text-emerald-700 font-bold text-[11px]">✔ Catalog Verified</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>18mm BWP Marine Plywood (40 sheets @ ₹1,120)</span>
                  <span className="font-mono font-semibold text-slate-900">₹44,800</span>
                </div>
                <div className="flex justify-between">
                  <span>12mm Commercial Plywood (25 sheets @ ₹728)</span>
                  <span className="font-mono font-semibold text-slate-900">₹18,200</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                  <span>Subtotal + 18% GST</span>
                  <span className="font-mono">₹63,000 + ₹11,340</span>
                </div>
                <div className="flex justify-between text-[#FF1E42] font-black pt-1.5 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="font-mono text-sm">₹74,340</span>
                </div>
              </div>
            </div>

            {/* Hand-drawn note - Enlarged */}
            <div className="flex items-center gap-2.5 mt-3 text-slate-700 font-hand text-xl sm:text-2xl font-semibold">
              <span>Owner reviews and taps once ✍️</span>
              <HandArrowRight className="w-6 h-6 text-[#FF1E42]" />
            </div>

            {/* Actions */}
            <div className="mt-2 pt-2 border-t border-slate-200">
              {step < 3 ? (
                <button
                  onClick={handleSimulate}
                  disabled={isProcessing}
                  className="w-full bg-[#FF1E42] hover:bg-[#E01536] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#EEFF41]" />
                  <span>Click to Run Quotation Agent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : step === 3 ? (
                <button
                  onClick={handleApprove}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>1-Tap Approve & Send to Customer</span>
                </button>
              ) : (
                <div className="w-full bg-emerald-50 border border-emerald-300 text-emerald-800 py-2.5 px-3 rounded-xl text-xs font-bold text-center">
                  ✅ Quote sent on WhatsApp in 28 seconds!
                </div>
              )}
            </div>
          </div>

          {/* Time Saved Metric */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-600">Before HIT AI</span>
                <p className="text-base font-black text-slate-900 mt-1">3 to 4 Hours / Day</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">Staff typing in Excel & calling godowns</p>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-300/80 rounded-2xl p-3.5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="relative inline-block my-0.5 ml-1">
                  <span className="relative z-10 text-xs font-bold text-emerald-800">
                    With HIT AI Worker
                  </span>
                  <HandCircle color="#FE1743" />
                </div>
                <p className="text-base font-black text-emerald-900 mt-2">&lt; 30 Seconds</p>
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-1">Zero errors, 1-tap WhatsApp approval</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
