import React, { useState, useEffect } from 'react';
import { CLIENT_QUESTIONS, QuestionItem } from '../data/servicesData';
import { ServicesPillars } from './interactive/ServicesPillars';
import { WhatsAppQuoteSimulator } from './interactive/WhatsAppQuoteSimulator';
import { ExcelToCatalogVisualizer } from './interactive/ExcelToCatalogVisualizer';
import { AiWorkersGrid } from './interactive/AiWorkersGrid';
import { AuditRoadmap } from './interactive/AuditRoadmap';
import { QuickActionModule } from './interactive/QuickActionModule';
import { Zap, HelpCircle, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface QuestionsHubProps {
  onOpenAuditModal: () => void;
}

export const QuestionsHub: React.FC<QuestionsHubProps> = ({ onOpenAuditModal }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem>(CLIENT_QUESTIONS[0]);

  const handleSelectQuestion = (q: QuestionItem) => {
    sound.playClick();
    setSelectedQuestion(q);
  };

  // Render the unique interactive view based on active question
  const renderInteractiveAnswer = () => {
    switch (selectedQuestion.componentType) {
      case 'services_pillars':
        return <ServicesPillars onSelectAudit={onOpenAuditModal} />;
      case 'whatsapp_simulator':
        return <WhatsAppQuoteSimulator />;
      case 'excel_visualizer':
        return <ExcelToCatalogVisualizer />;
      case 'ai_workers':
        return <AiWorkersGrid />;
      case 'audit_roadmap':
        return <AuditRoadmap onOpenAuditModal={onOpenAuditModal} />;
      case 'quick_action':
        return <QuickActionModule onOpenAuditModal={onOpenAuditModal} />;
      default:
        return <ServicesPillars onSelectAudit={onOpenAuditModal} />;
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Headline Section */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#FF1E42]/10 border border-[#FF1E42]/30 px-3.5 py-1.5 rounded-full mb-4">
          <Zap className="w-4 h-4 text-[#DFFF00]" />
          <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
            STOP HIRING PEOPLE FOR REPETITIVE WORK
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          We turn your manual business processes into{' '}
          <span className="text-[#FF1E42]">AI-powered systems</span>.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Explore the exact questions business owners ask when automating their WhatsApp, Excel, quotations, and staff workflows.
        </p>

        {/* Value Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <span className="bg-[#0E1424] border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
            Excel ➔ AI
          </span>
          <span className="text-slate-600">|</span>
          <span className="bg-[#0E1424] border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
            WhatsApp ➔ Automation
          </span>
          <span className="text-slate-600">|</span>
          <span className="bg-[#0E1424] border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
            Manual Work ➔ Software
          </span>
          <span className="text-slate-600">|</span>
          <span className="bg-[#0E1424] border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
            Data ➔ Decisions
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ready-Made Client Questions List (Sticky on desktop) */}
        <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-24">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#DFFF00]" />
              Client Questions ({CLIENT_QUESTIONS.length})
            </span>
            <span className="text-[11px] text-slate-400">Tap to see answer</span>
          </div>

          <div className="space-y-2.5">
            {CLIENT_QUESTIONS.map((item, index) => {
              const isSelected = item.id === selectedQuestion.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectQuestion(item)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#151D33] border-[#FF1E42] shadow-xl shadow-red-950/40 translate-x-1'
                      : 'bg-[#0B101D]/90 border-slate-800 hover:border-slate-700 hover:bg-[#0F1629]'
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF1E42]"></div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      0{index + 1} • {item.tag}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#FF1E42]/20 text-[#FF5E78]'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                      }`}
                    >
                      {item.highlight}
                    </span>
                  </div>

                  <h4
                    className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${
                      isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {item.question}
                  </h4>

                  <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.shortSummary}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 group-hover:text-slate-300 flex items-center gap-1">
                      {isSelected ? 'Viewing Interactive Answer' : 'Click to inspect'}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-[#FF1E42] translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Unique Interactive Answer Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DFFF00] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Interactive Answer Experience
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Live Demo Mode
            </span>
          </div>

          {/* Active Question Banner */}
          <div className="bg-[#121B2F] border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#FF5E78] uppercase font-bold">
                Active Question
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                {selectedQuestion.question}
              </h3>
            </div>
            <div className="shrink-0 hidden sm:block">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300">
                {selectedQuestion.tag}
              </span>
            </div>
          </div>

          {/* The Unique Answer Component */}
          <div className="transition-all duration-300">
            {renderInteractiveAnswer()}
          </div>
        </div>
      </div>
    </section>
  );
};
