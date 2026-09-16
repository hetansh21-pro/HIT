import React, { useState } from 'react';
import { AI_PILLARS } from '../../data/servicesData';
import { CheckCircle2, ArrowRight, Shield, Layers, Bot, Search } from 'lucide-react';
import { sound } from '../../utils/sound';

interface ServicesPillarsProps {
  onSelectAudit?: () => void;
}

export const ServicesPillars: React.FC<ServicesPillarsProps> = ({ onSelectAudit }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Search className="w-5 h-5 text-blue-400" />;
      case 1:
        return <Layers className="w-5 h-5 text-[#FF1E42]" />;
      case 2:
        return <Bot className="w-5 h-5 text-[#DFFF00]" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full bg-[#0E1424]/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl">
      <div className="mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#FF1E42]/20 text-[#FF5E78] border border-[#FF1E42]/30">
            3-Stage Implementation Framework
          </span>
          <span className="text-xs text-slate-400">From Diagnosis to Autonomous Scalability</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white">
          We don’t sell generic AI. We replace your single most expensive manual bottleneck.
        </h4>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {AI_PILLARS.map((pillar, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={pillar.step}
              onClick={() => {
                sound.playClick();
                setActiveTab(idx);
              }}
              className={`text-left p-3 sm:p-4 rounded-2xl transition-all border ${
                isActive
                  ? 'bg-[#151D33] border-[#FF1E42] shadow-lg shadow-red-950/30'
                  : 'bg-[#0B101D]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0F1629]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-slate-400">{pillar.step}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#FF1E42]/20 text-[#FF5E78]'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {pillar.type}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                {pillar.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Card for Active Pillar */}
      {(() => {
        const pillar = AI_PILLARS[activeTab];
        return (
          <div className="bg-[#0B101D] border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                  {getIcon(activeTab)}
                </div>
                <div>
                  <span className="text-xs font-mono text-[#DFFF00] font-semibold uppercase">
                    Stage {pillar.step} — {pillar.type}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {pillar.name}
                  </h3>
                </div>
              </div>

              {activeTab === 0 && onSelectAudit && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectAudit();
                  }}
                  className="inline-flex items-center gap-2 bg-[#FF1E42] hover:bg-[#E01536] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-red-900/30 self-start sm:self-auto cursor-pointer"
                >
                  <span>Book 1-Day Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed my-4">
              {pillar.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {pillar.points.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 bg-[#121B2F]/60 border border-slate-800/80 p-3 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300">{pt}</span>
                </div>
              ))}
            </div>

            {/* Practical takeaway */}
            <div className="mt-5 p-3.5 rounded-xl bg-[#080D1A] border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                <strong className="text-white">Why it works:</strong> No open-ended consulting or tech buzzwords. We solve one quantified bottleneck at a time.
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
