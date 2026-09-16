import React, { useState } from 'react';
import { AI_WORKERS_LIST } from '../../data/servicesData';
import { FileText, TrendingUp, ScanLine, Headphones, Check, Clock, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/sound';

export const AiWorkersGrid: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(AI_WORKERS_LIST[0].id);

  const getIcon = (name: string, active: boolean) => {
    const cls = `w-5 h-5 ${active ? 'text-[#DFFF00]' : 'text-slate-400'}`;
    switch (name) {
      case 'FileText':
        return <FileText className={cls} />;
      case 'TrendingUp':
        return <TrendingUp className={cls} />;
      case 'ScanLine':
        return <ScanLine className={cls} />;
      case 'Headphones':
        return <Headphones className={cls} />;
      default:
        return <Zap className={cls} />;
    }
  };

  const currentWorker = AI_WORKERS_LIST.find((w) => w.id === selectedId) || AI_WORKERS_LIST[0];

  return (
    <div className="w-full bg-[#0E1424]/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl">
      <div className="mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#DFFF00]/20 text-[#DFFF00] border border-[#DFFF00]/30">
            Digital Specialized Workforce
          </span>
          <span className="text-xs text-slate-400">Plug & Play Autonomous Agents</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white">
          Dedicated AI Workers that never sleep, forget leads, or make calculation mistakes.
        </h4>
      </div>

      {/* Grid of 4 Workers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {AI_WORKERS_LIST.map((worker) => {
          const isActive = worker.id === selectedId;
          return (
            <button
              key={worker.id}
              onClick={() => {
                sound.playClick();
                setSelectedId(worker.id);
              }}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                isActive
                  ? 'bg-[#18233C] border-[#FF1E42] shadow-lg shadow-red-950/40'
                  : 'bg-[#0B101D] border-slate-800 hover:border-slate-700 hover:bg-[#10172A]'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-2.5">
                {getIcon(worker.iconName, isActive)}
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                {worker.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                {worker.speed}
              </p>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Card */}
      <div className="bg-[#0B101D] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-[#DFFF00] uppercase tracking-wider">
              {currentWorker.role}
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">{currentWorker.name}</h3>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              {currentWorker.speed}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Human Review Guard
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-[#121B2F]/70 border border-red-500/20 rounded-xl p-4">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-1">
              What This Replaces
            </span>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              {currentWorker.replaces}
            </p>
          </div>

          <div className="bg-[#121B2F]/70 border border-emerald-500/20 rounded-xl p-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Accuracy & Verification
            </span>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              {currentWorker.accuracy}
            </p>
          </div>
        </div>

        {/* Workflow Pipeline */}
        <div className="bg-[#070B14] rounded-xl p-4 border border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
            Execution Flow
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
            <div className="flex-1 bg-[#10172A] p-3 rounded-lg border border-slate-700/60 w-full sm:w-auto">
              <span className="text-slate-400 text-[10px] block">1. INPUT</span>
              <span className="text-white font-medium">{currentWorker.inputMethod}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#FF1E42] hidden sm:block shrink-0" />
            <div className="flex-1 bg-[#10172A] p-3 rounded-lg border border-slate-700/60 w-full sm:w-auto">
              <span className="text-[#DFFF00] text-[10px] block">2. AI TRANSFORMATION</span>
              <span className="text-white font-medium">Extraction, calculation, catalog lookup</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#FF1E42] hidden sm:block shrink-0" />
            <div className="flex-1 bg-[#10172A] p-3 rounded-lg border border-slate-700/60 w-full sm:w-auto">
              <span className="text-emerald-400 text-[10px] block">3. OUTPUT</span>
              <span className="text-white font-medium">{currentWorker.output}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
