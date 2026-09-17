import React, { useState, useEffect } from 'react';
import { QuestionItem, QUICK_QUESTIONS } from '../data/servicesData';
import { HitLogo } from './HitLogo';
import { WhatsAppQuoteSimulator } from './interactive/WhatsAppQuoteSimulator';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Cog,
  Zap,
  Brain,
  Clock,
  Rocket,
  MessageSquare,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  XCircle,
  TrendingUp,
  Coins,
  FileText,
  Layers,
  Search,
  Bot,
  Check,
  Timer,
  ChevronDown,
} from 'lucide-react';
import { BrandGeometricAccents } from './BrandGeometricAccents';
import { HandArrowDown, HandUnderline, HandCircle, HandArrowLeft, HandArrowRight } from './HandDrawnElements';
import { sound } from '../utils/sound';

interface Screen3AnswerPageProps {
  question: QuestionItem;
  onBackToQuestions: () => void;
  onBackToHome?: () => void;
  onSelectQuestion: (q: QuestionItem) => void;
  onOpenAudit: () => void;
}

export const Screen3AnswerPage: React.FC<Screen3AnswerPageProps> = ({
  question,
  onBackToQuestions,
  onBackToHome,
  onSelectQuestion,
  onOpenAudit,
}) => {
  const currentIndex = QUICK_QUESTIONS.findIndex((q) => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? QUICK_QUESTIONS[currentIndex - 1] : null;
  const nextQuestion = currentIndex < QUICK_QUESTIONS.length - 1 ? QUICK_QUESTIONS[currentIndex + 1] : null;

  // Keyboard arrow keys navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs or textareas
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
        return;
      }

      if (e.key === 'ArrowRight') {
        if (nextQuestion) {
          e.preventDefault();
          sound.playClick();
          onSelectQuestion(nextQuestion);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowLeft') {
        if (prevQuestion) {
          e.preventDefault();
          sound.playClick();
          onSelectQuestion(prevQuestion);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // If on question 1, go back to questions list
          e.preventDefault();
          sound.playClick();
          onBackToQuestions();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, prevQuestion, nextQuestion, onSelectQuestion, onBackToQuestions]);

  const handleWhatsApp = () => {
    sound.playClick();
    const msg = encodeURIComponent(`Hello HIT team, regarding "${question.question}": I would like more details for my business.`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  // Dynamic visibility for footer action buttons:
  // If a button is already present in the main content of the current page, do NOT duplicate it in the footer.
  // If it is NOT in the main content of the current page, show it in the footer.
  const [isStage1AuditVisible, setIsStage1AuditVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsStage1AuditVisible(true);
  }, [question.id]);

  const contentHasWhatsApp =
    question.componentType === 'what_hit_does' ||
    question.componentType === 'how_to_start';

  const contentHasAudit =
    question.componentType === 'what_hit_does' ||
    question.componentType === 'custom_solutions' ||
    question.componentType === 'how_to_start' ||
    (question.componentType === 'services_provided' && isStage1AuditVisible);

  const showWhatsAppInFooter = !contentHasWhatsApp;
  const showAuditInFooter = !contentHasAudit;

  const getQuestionIcon = (iconName: string) => {
    const cls = "w-7 h-7 text-[#FF1E42]";
    switch (iconName) {
      case 'building':
        return <Building2 className={cls} />;
      case 'gear':
        return <Cog className={cls} />;
      case 'lightning':
        return <Zap className={cls} />;
      case 'brain':
        return <Brain className={cls} />;
      case 'clock':
        return <Clock className={cls} />;
      case 'rocket':
        return <Rocket className={cls} />;
      default:
        return <Zap className={cls} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-x-hidden selection:bg-[#FF1E42] selection:text-white">
      {/* Exact Brand Shapes from User's Reference Images */}
      <BrandGeometricAccents />

      {/* Header */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-5 sm:px-6 pt-5 sm:pt-8 flex items-center justify-between">
        {/* Back to Questions Button */}
        <button
          onClick={() => {
            sound.playClick();
            onBackToQuestions();
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#FF1E42] bg-slate-50 hover:bg-red-50 border border-slate-200 p-2 sm:px-3.5 sm:py-2 rounded-xl transition-all cursor-pointer group shadow-2xs shrink-0"
          title="Back to Questions"
          aria-label="Back to Questions"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF1E42] group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back to Questions</span>
        </button>

        {/* Center: HiT Logo (navigates to Home / Screen 1) */}
        <button
          onClick={() => {
            sound.playClick();
            if (onBackToHome) {
              onBackToHome();
            } else {
              onBackToQuestions();
            }
          }}
          className="flex items-center gap-1 cursor-pointer group"
          title="Back to Home / Logo"
        >
          <HitLogo size="sm" />
        </button>

        {/* Question Counter (Desktop Only - on mobile, navigation is at the bottom) */}
        <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-slate-400 select-none">
          {prevQuestion ? (
            <button
              onClick={() => {
                sound.playClick();
                onSelectQuestion(prevQuestion);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-1 hover:text-slate-800 transition-colors cursor-pointer"
              title="Previous Question"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onBackToQuestions();
              }}
              className="p-1 hover:text-slate-800 transition-colors cursor-pointer"
              title="Back to Questions"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <span className="tracking-wider px-0.5">
            0{question.number} / 06
          </span>

          {nextQuestion ? (
            <button
              onClick={() => {
                sound.playClick();
                onSelectQuestion(nextQuestion);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-1 hover:text-slate-800 transition-colors cursor-pointer"
              title="Next Question"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="w-4 h-4 inline-block"></span>
          )}
        </div>

        {/* Mobile Header Right Balance Spacer */}
        <div className="w-[34px] sm:hidden pointer-events-none" aria-hidden="true" />
      </header>

      {/* Main Page Content - Smoothly animates on question change */}
      <main key={question.id} className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12 flex-1 animate-content-slide">
        {/* Title Section */}
        <div className="mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400">
              Question 0{question.number} • {question.subtitle}
            </span>
          </div>

          <div className="flex items-start gap-4 mt-3">
            <div className="p-3 bg-red-50 rounded-2xl border border-red-100 shrink-0">
              {getQuestionIcon(question.icon)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {question.question}
              </h1>
              <div className="mt-1">
                <HandUnderline className="w-36 h-3 text-[#FF1E42]" />
              </div>
            </div>
          </div>

          {/* Hand-drawn guidance note - Dynamic for each question page */}
          <div className="flex items-center gap-2.5 text-slate-600 font-hand text-2xl sm:text-3xl font-semibold mt-3">
            <span>{question.handwrittenNote || 'Here is how HIT works for your business'}</span>
            <HandArrowDown className="w-6 h-6 text-[#FF1E42] shrink-0" />
          </div>
        </div>

        {/* Dynamic Interactive Body */}
        <div className="space-y-6 sm:space-y-8">
          {question.componentType === 'what_hit_does' && (
            <WhatHitDoesPage onOpenAudit={onOpenAudit} onWhatsApp={handleWhatsApp} />
          )}

          {question.componentType === 'services_provided' && (
            <ServicesProvidedPage
              onOpenAudit={onOpenAudit}
              onAuditVisibleChange={setIsStage1AuditVisible}
            />
          )}

          {question.componentType === 'how_automation_helps' && (
            <HowAutomationHelpsPage onOpenAudit={onOpenAudit} />
          )}

          {question.componentType === 'custom_solutions' && (
            <CustomSolutionsPage onOpenAudit={onOpenAudit} />
          )}

          {question.componentType === 'pricing_cost' && (
            <PricingCostPage onOpenAudit={onOpenAudit} />
          )}

          {question.componentType === 'how_to_start' && (
            <HowToStartPage onOpenAudit={onOpenAudit} onWhatsApp={handleWhatsApp} />
          )}
        </div>
      </main>

      {/* Footer Navigation Bar */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-24 sm:pb-8 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            onClick={() => {
              sound.playClick();
              onBackToQuestions();
            }}
            className="group flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#FF1E42] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF1E42] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Questions</span>
          </button>

          {(showWhatsAppInFooter || showAuditInFooter) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              {showWhatsAppInFooter && (
                <button
                  onClick={handleWhatsApp}
                  className="px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </button>
              )}

              {showAuditInFooter && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenAudit();
                  }}
                  className="px-5 py-3 rounded-xl bg-[#FF1E42] hover:bg-[#E01536] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book 1-Day Audit</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-5 mt-5 border-t border-slate-100">
          <span className="text-[11px] sm:text-xs">HiT | Smart Automation for a Better Tomorrow.</span>
          <div className="w-7 h-1.5 rounded-full bg-[#DFFF00]"></div>
        </div>
      </footer>

      {/* Floating Bottom Question Switcher (Mobile Only for easy thumb access) */}
      <aside
        aria-label="Mobile question navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 sm:hidden flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border-2 border-slate-200 shadow-xl shadow-slate-900/15 text-slate-800">
          {prevQuestion ? (
            <button
              onClick={() => {
                sound.playClick();
                onSelectQuestion(prevQuestion);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title={`Previous: 0${prevQuestion.number} - ${prevQuestion.subtitle}`}
              aria-label="Previous Question"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onBackToQuestions();
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Back to All Questions"
              aria-label="Back to All Questions"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1 font-mono select-none px-1 text-xs">
            <span className="font-extrabold text-slate-900 tracking-wider">
              0{question.number}
            </span>
            <span className="text-slate-300 font-light">/</span>
            <span className="font-semibold text-slate-400 tracking-wider">
              06
            </span>
          </div>

          {nextQuestion ? (
            <button
              onClick={() => {
                sound.playClick();
                onSelectQuestion(nextQuestion);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-8 h-8 rounded-full bg-[#FF1E42] hover:bg-[#E01536] active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-red-500/25"
              title={`Next: 0${nextQuestion.number} - ${nextQuestion.subtitle}`}
              aria-label="Next Question"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center cursor-not-allowed opacity-50"
              title="No more questions"
              aria-label="No more questions"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

/* =========================================================================
   1. WHAT DOES HIT DO PAGE
   ========================================================================= */
const WhatHitDoesPage: React.FC<{ onOpenAudit: () => void; onWhatsApp: () => void }> = ({ onOpenAudit, onWhatsApp }) => {
  return (
    <div className="space-y-6">
      {/* 1. Core Statement Card with Brand Accent */}
      <div className="relative overflow-hidden bg-white border-2 border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xs">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FE1743] via-[#EEFF41] to-[#FE1743]" />

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#EEFF41] text-slate-900 border border-black/10 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-[#FE1743] fill-current" />
            OUR CORE ONE-LINE POSITIONING
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">• Real Businesses, Real Revenue</span>
        </div>

        <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
          “We don’t sell generic AI. We find{' '}
          <span className="text-[#FF1E42]">
            one expensive, repetitive bottleneck
          </span>{' '}
          in your business and replace it with a{' '}
          <span className="text-emerald-600">
            custom AI-powered system
          </span>.”
        </p>
      </div>

      {/* 2. High-Contrast Side-by-Side Matrix: Pain vs Deliverable */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: What We Do NOT Say */}
        <div className="bg-red-50 border-2 border-red-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="text-xs font-mono font-black text-red-600 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                WHAT WE NEVER DO
              </span>
              <span className="w-fit text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold whitespace-nowrap shrink-0">
                Zero Fluff
              </span>
            </div>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">✕</span>
                <span>
                  <strong className="text-red-950 block sm:inline">“We build generic websites & apps”</strong>
                  <span className="text-slate-500 block text-[11px] sm:text-xs">We don’t build digital brochures. We build systems that directly eliminate daily manual labor.</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">✕</span>
                <span>
                  <strong className="text-red-950 block sm:inline">“We sell buzzword AI solutions”</strong>
                  <span className="text-slate-500 block text-[11px] sm:text-xs">No confusing ChatGPT wrappers, crypto jargon, or theoretical tech demonstrations.</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">✕</span>
                <span>
                  <strong className="text-red-950 block sm:inline">“We do theoretical consulting decks”</strong>
                  <span className="text-slate-500 block text-[11px] sm:text-xs">No 60-slide PowerPoint presentations that gather dust. We deploy working software.</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: What We Actually Deliver */}
        <div className="bg-emerald-50 border-2 border-emerald-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="text-xs font-mono font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                WHAT WE ACTUALLY DELIVER
              </span>
              <span className="w-fit text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold whitespace-nowrap shrink-0">
                Proven ROI
              </span>
            </div>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">✓</span>
                <span>
                  <span className="font-bold text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded-md mr-1">1-Day Deep Audit:</span>
                  <span className="font-medium text-slate-800">We shadow your daily billing & stock operations for 1 full day to find your biggest time leak.</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">✓</span>
                <span>
                  <span className="font-bold text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded-md mr-1">Direct Automation:</span>
                  <span className="font-medium text-slate-800">We automate WhatsApp inquiries, Excel inventory lookups, and Tally invoice processing.</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">✓</span>
                <span>
                  <span className="font-mono font-black text-slate-950 bg-[#EEFF41] px-2.5 py-0.5 rounded-md mr-1 shadow-2xs">3–5 Staff Hours Saved:</span>
                  <span className="font-bold text-emerald-950">Given back to your team every single day with zero disruptions to ongoing sales.</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Who Is This Built For? Targeted Industry Match */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              TARGET AUDIENCE
            </span>
            <span className="text-xs font-bold text-[#FF1E42]">10–30 Year Old Established Businesses</span>
          </div>
          <h4 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">
            Built for traditional businesses running on real daily operations.
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            If your daily business depends on these tools, HIT was designed specifically for your team:
          </p>

          {/* Familiar Tool Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              💬 WhatsApp Groups
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              📊 Excel Spreadsheets
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              📒 Paper Registers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
              💼 Tally ERP & Busy
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
              📞 Phone Order Calls
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={onOpenAudit}
            className="bg-[#FF1E42] hover:bg-[#E01536] text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book 1-Day Audit</span>
          </button>
          <button
            onClick={onWhatsApp}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-2xl font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. WHICH SERVICES DO YOU PROVIDE PAGE
   ========================================================================= */
const ServicesProvidedPage: React.FC<{
  onOpenAudit: () => void;
  onAuditVisibleChange?: (visible: boolean) => void;
}> = ({ onOpenAudit, onAuditVisibleChange }) => {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  useEffect(() => {
    onAuditVisibleChange?.(activeTab === 0);
  }, [activeTab, onAuditVisibleChange]);

  const pillars = [
    {
      step: '01',
      title: 'AI Business Audit',
      role: 'DIAGNOSIS',
      icon: Search,
      tagline: '1-Day Walkthrough • Diagnosis Before Prescription',
      accentColor: '#FF1E42',
      badgeBg: 'bg-red-50 text-red-600 border-red-200',
      activeTabStyle: 'border-[#FF1E42] bg-red-50/70 shadow-md ring-2 ring-red-100',
      desc: 'We spend 1 full day mapping every manual task, Excel spreadsheet bottleneck, and dropped WhatsApp inquiry in your business. You get an executive AI Opportunity Report.',
      cards: [
        {
          title: '1-Day Process Walkthrough',
          badge: 'Zero Disruption',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          desc: 'Remote or on-site shadowing with your sales, billing, or warehouse staff while daily sales proceed as normal.',
        },
        {
          title: 'Staff Waste Calculation',
          badge: 'ROI Metric',
          badgeColor: 'bg-blue-100 text-blue-800',
          desc: 'Concrete mathematical audit of repetitive staff hours vs monthly wage loss to quantify your exact cost leak.',
        },
        {
          title: 'AI Opportunity Report',
          badge: 'Executive Blueprint',
          badgeColor: 'bg-purple-100 text-purple-800',
          desc: 'Clear, plain-English roadmap showing which workflows to automate first, expected time savings, and fixed pricing.',
        },
        {
          title: 'No-Obligation Guarantee',
          badge: 'Low-Risk',
          badgeColor: 'bg-[#EEFF41] text-slate-900',
          desc: 'You only proceed to build if the numbers make undeniable financial sense. 100% credited toward implementation.',
        },
      ],
    },
    {
      step: '02',
      title: 'AI Business OS',
      role: 'FOUNDATION',
      icon: Layers,
      tagline: 'Custom Central Engine • Built Around Your Habits',
      accentColor: '#2563EB',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      activeTabStyle: 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-100',
      desc: 'A tailored central operating system replacing messy Excel sheets and scattered WhatsApp chats: CRM, inventory tracking, order management, and executive mobile views.',
      cards: [
        {
          title: 'Tailored Order & Inventory Dashboard',
          badge: 'Custom Built',
          badgeColor: 'bg-blue-100 text-blue-800',
          desc: 'Designed around your exact product SKUs, distributor tiers, minimum order quantities, and pricing rules.',
        },
        {
          title: 'WhatsApp Business API Integration',
          badge: 'Auto Logging',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          desc: 'Incoming dealer orders and price requests are automatically logged into your database without manual re-entry.',
        },
        {
          title: 'Tally & Excel Zero-Typing Sync',
          badge: 'Zero Errors',
          badgeColor: 'bg-amber-100 text-amber-900',
          desc: 'Connects your chat inquiries directly with Tally ERP, ensuring stock levels and tax numbers match in real-time.',
        },
        {
          title: 'Owner Smartphone Dashboard',
          badge: '24/7 Mobile',
          badgeColor: 'bg-purple-100 text-purple-800',
          desc: 'Get an instant live view of daily billings, dispatches, outstanding balances, and pending approvals anywhere.',
        },
      ],
    },
    {
      step: '03',
      title: 'AI Workers',
      role: 'ONGOING VALUE',
      icon: Bot,
      tagline: 'Autonomous Agents • Plugs Into Daily Operations',
      accentColor: '#059669',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeTabStyle: 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-100',
      desc: 'Dedicated, narrow autonomous agents that do the heavy lifting: instant quotations, automatic sales follow-ups, invoice data extraction, and 24/7 dealer rate assistance.',
      cards: [
        {
          title: 'AI Quotation Agent',
          badge: '30 Sec on WhatsApp',
          badgeColor: 'bg-[#EEFF41] text-slate-950 font-mono shadow-2xs',
          desc: 'Extracts messy WhatsApp order messages, calculates GST and rates, and formats official PDF quotes in 30 seconds.',
        },
        {
          title: 'AI Sales Lead Follower',
          badge: 'Zero Lost Leads',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          desc: 'Follows up automatically on pending quotes and inquiries with polite, context-aware reminders on WhatsApp.',
        },
        {
          title: 'AI Document Extractor',
          badge: '15 Sec Tally Scan',
          badgeColor: 'bg-amber-100 text-amber-900 font-mono',
          desc: 'Reads supplier invoices, paper LR bills, and purchase orders from photos and inputs them directly into your books.',
        },
        {
          title: '24/7 Dealer Support Agent',
          badge: 'Always Online',
          badgeColor: 'bg-cyan-100 text-cyan-800',
          desc: 'Answers dealer inquiries about stock availability, current price lists, and dispatch transport details instantly.',
        },
      ],
    },
  ];

  const desktopActive = activeTab === null ? 0 : activeTab;
  const current = pillars[desktopActive];

  return (
    <div className="space-y-6">
      {/* Mobile Accordion View (< sm): Expand in-place on click */}
      <div className="sm:hidden space-y-3">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          const isExpanded = activeTab === idx;
          return (
            <div
              key={p.step}
              className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? `${p.activeTabStyle} bg-white shadow-md`
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Accordion Header Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab(isExpanded ? null : idx);
                }}
                className="w-full p-4 text-left flex items-center justify-between cursor-pointer select-none transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className="text-xs font-mono font-black tracking-wider"
                      style={{ color: p.accentColor }}
                    >
                      STAGE {p.step}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${p.badgeBg}`}>
                      {p.role}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 leading-snug">
                    {p.title}
                  </h4>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isExpanded
                      ? 'bg-slate-900 text-white rotate-180 shadow-xs'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </div>
              </button>

              {/* Accordion Expandable Body (Smooth Grid Animation) */}
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 pt-2 border-t border-slate-100/90 space-y-4">
                    {/* Tagline & Description */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        {p.tagline}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    {/* Book Audit Button if Stage 01 */}
                    {idx === 0 && (
                      <button
                        onClick={onOpenAudit}
                        className="w-full bg-[#FF1E42] hover:bg-[#E01536] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book 1-Day Audit Form</span>
                      </button>
                    )}

                    {/* 4 Feature Points with Rich Badges */}
                    <div className="space-y-2.5 pt-1">
                      {p.cards.map((c, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 border border-slate-200/90 p-3.5 rounded-2xl shadow-2xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5 gap-2">
                              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                {c.title}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${c.badgeColor}`}>
                                {c.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed pl-5.5">
                              {c.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Tabs View (>= sm) */}
      <div className="hidden sm:block space-y-6">
        {/* 3 Step Tabs */}
        <div className="grid grid-cols-3 gap-3">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isActive = desktopActive === idx;
            return (
              <button
                key={p.step}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(idx);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                  isActive
                    ? p.activeTabStyle
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-mono font-black"
                      style={{ color: p.accentColor }}
                    >
                      STAGE {p.step}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${p.badgeBg}`}>
                    {p.role}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-black text-slate-900 leading-tight">{p.title}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Card */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-slate-100 mb-5 sm:mb-6 gap-3 sm:gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono font-black uppercase tracking-wider"
                  style={{ color: current.accentColor }}
                >
                  STAGE {current.step} • {current.role}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  | {current.tagline}
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900">
                {current.title}
              </h3>
            </div>

            {desktopActive === 0 && (
              <button
                onClick={onOpenAudit}
                className="bg-[#FF1E42] hover:bg-[#E01536] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 transition-all cursor-pointer self-start sm:self-auto flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1-Day Audit</span>
              </button>
            )}
          </div>

          <p className="text-xs sm:text-base text-slate-700 leading-relaxed mb-5 sm:mb-6 max-w-3xl">
            {current.desc}
          </p>

          {/* 4 Feature Points with Rich Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {current.cards.map((c, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200/90 hover:border-slate-300 p-3.5 sm:p-4.5 rounded-2xl transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      {c.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed pl-6">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. HOW AUTOMATION HELPS PAGE
   ========================================================================= */
const HowAutomationHelpsPage: React.FC<{ onOpenAudit?: () => void }> = () => {
  return (
    <div className="space-y-6">
      {/* Visual Contrast: Before HIT vs With HIT Automation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: The Manual Drag */}
        <div className="bg-red-50 border-2 border-red-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3">
              <span className="text-xs font-mono font-black text-red-600 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <Timer className="w-4 h-4 text-red-500 shrink-0" />
                THE OLD MANUAL WAY
              </span>
              <span className="w-fit text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold whitespace-nowrap shrink-0">
                3–4 Hrs Drained Daily
              </span>
            </div>

            <h4 className="font-black text-slate-900 text-base sm:text-lg tracking-tight mb-2">
              Endless manual lookups & slow quotations.
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>Employees spend hours cross-referencing messy Excel sheets & paper price lists.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>Calculating dealer slabs & GST manually leads to expensive billing errors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>Dealers wait hours for a reply — eager buyers look for another distributor.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: The HIT Automated Flow */}
        <div className="bg-emerald-50 border-2 border-emerald-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3">
              <span className="text-xs font-mono font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <Zap className="w-4 h-4 text-emerald-600 fill-current shrink-0" />
                THE HIT AUTOMATED FLOW
              </span>
              <span className="w-fit text-[10px] font-mono uppercase bg-[#EEFF41] text-slate-950 px-2 py-0.5 rounded font-black shadow-2xs whitespace-nowrap shrink-0">
                Under 30 Seconds
              </span>
            </div>

            <h4 className="font-black text-slate-900 text-base sm:text-lg tracking-tight mb-2">
              From WhatsApp chat to official PDF quote.
            </h4>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white border border-emerald-200 p-2 rounded-xl">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span className="text-slate-800 font-medium">Dealer sends informal WhatsApp order message</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-emerald-200 p-2 rounded-xl">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span className="text-slate-800 font-medium">HIT AI checks rates, calculates GST & formats PDF in <strong className="text-emerald-700 font-mono">28 sec</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-emerald-200 p-2 rounded-xl">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span className="text-slate-800 font-medium">Owner taps <strong className="text-[#FF1E42]">1-click Approve</strong> on phone — sent!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator */}
      <WhatsAppQuoteSimulator />
    </div>
  );
};

/* =========================================================================
   4. CUSTOM SOLUTIONS PAGE (Simple, Short & Clear: How We Build For You)
   ========================================================================= */
const CustomSolutionsPage: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const steps = [
    {
      stepNumber: '01',
      badge: 'Step 1 • Ground Reality',
      title: 'We Shadow Your Day',
      tagline: '“Show us how you work for 1 day”',
      descriptionNode: (
        <span>
          We sit with your billing, sales, or godown staff (in person or screen-share) to observe order intake, stock verification, and communication bottlenecks.{' '}
          <strong className="text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block mt-1">
            Zero disruption to your business.
          </strong>
        </span>
      ),
      deliverable: 'We find your single biggest time bottleneck',
      deliverableStyle: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    },
    {
      stepNumber: '02',
      badge: 'Step 2 • 1-Page Blueprint',
      title: 'Fixed Price & Exact Plan',
      tagline: '“No surprises, no monthly traps”',
      descriptionNode: (
        <span>
          We deliver a plain-English 1-page report showing exactly what AI will automate, the exact hours saved each week, and a{' '}
          <strong className="text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-1">
            fixed one-time build price.
          </strong>
        </span>
      ),
      deliverable: 'You only build if the ROI is undeniable',
      deliverableStyle: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      stepNumber: '03',
      badge: 'Step 3 • Live in 7–14 Days',
      title: 'Built Around Your Habits',
      tagline: '“Runs directly inside your WhatsApp & Excel”',
      descriptionNode: (
        <span>
          We build custom AI workers connected to your existing WhatsApp and registers. Your staff doesn’t learn new software.{' '}
          <strong className="text-[#FF1E42] bg-red-50 px-1.5 py-0.5 rounded border border-red-200 inline-block mt-1">
            Owner retains 1-tap approval.
          </strong>
        </span>
      ),
      deliverable: 'Live & operational in under 2 weeks',
      deliverableStyle: 'bg-[#EEFF41] text-slate-950 font-black border-yellow-300 font-mono shadow-2xs',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Core Direct Promise Banner with Distinct Brand Colors */}
      <div className="relative overflow-hidden bg-white border-2 border-slate-200 hover:border-red-200 rounded-3xl p-5 sm:p-8 shadow-xs transition-all">
        {/* Top Brand Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FE1743] via-[#EEFF41] to-[#FE1743]" />

        {/* Neon Brand Tag */}
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#EEFF41] text-slate-900 border border-black/10 shadow-2xs mb-3">
          <Zap className="w-3.5 h-3.5 text-[#FE1743] fill-current" />
          YES, 100% CUSTOM BUILT
        </span>

        {/* High-Contrast Main Headline */}
        <h3 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3">
          <span className="text-slate-900">You never adapt to software.</span>{' '}
          <span className="text-[#FE1743] relative inline-block">
            We build AI that adapts to you.
            <HandUnderline className="w-full h-3 -bottom-1 left-0 absolute pointer-events-none" color="#FE1743" />
          </span>
        </h3>

        {/* Channel Tags Subtext */}
        <p className="text-xs sm:text-base text-slate-700 font-medium leading-relaxed max-w-3xl">
          Traditional businesses don’t need complicated SaaS software. Whether your daily operations run on{' '}
          <span className="inline-block bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-lg border border-emerald-200 text-xs sm:text-sm">
            WhatsApp
          </span>
          ,{' '}
          <span className="inline-block bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded-lg border border-blue-200 text-xs sm:text-sm">
            Excel Sheets
          </span>
          , or{' '}
          <span className="inline-block bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-lg border border-amber-200 text-xs sm:text-sm">
            Paper Registers
          </span>
          {' '}— here is how we build your custom solution:
        </p>
      </div>

      {/* 2. Simple 3-Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#FF1E42]/60 hover:shadow-md transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-red-50 text-[#FE1743] font-mono text-sm sm:text-base font-black flex items-center justify-center border border-red-100 shadow-2xs">
                  {s.stepNumber}
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  {s.badge}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                {s.title}
              </h4>

              {/* Bold, Highly Visible Red Handwritten Tagline */}
              <p className="font-hand font-bold text-xl sm:text-2xl text-[#FE1743] leading-snug my-1.5 block tracking-wide">
                {s.tagline}
              </p>

              <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed mt-2">
                {s.descriptionNode}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-3.5 sm:p-5 rounded-b-3xl">
              <span className={`text-xs sm:text-sm font-bold flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${s.deliverableStyle}`}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{s.deliverable}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Action Callout Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 mb-2">
            <span className="w-fit text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#EEFF41] text-slate-900 whitespace-nowrap shrink-0">
              LOW-RISK FIRST STEP
            </span>
            <span className="text-xs text-slate-400 font-mono whitespace-nowrap">Diagnosis Before Prescription</span>
          </div>
          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
            See exactly what AI can automate in your business
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-xl">
            Schedule a 1-Day AI Business Audit. We examine your daily manual operations and deliver an executive Opportunity Report with fixed-scope pricing.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenAudit();
          }}
          className="shrink-0 w-full sm:w-auto bg-[#FF1E42] hover:bg-[#E01536] text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book 1-Day Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   5. PRICING & COST PAGE
   ========================================================================= */
const PricingCostPage: React.FC<{ onOpenAudit: () => void }> = () => {
  const [staff, setStaff] = useState(3);
  const [hours, setHours] = useState(3);

  const monthlyHoursLost = staff * hours * 25;
  const rupeeLoss = monthlyHoursLost * 180;

  return (
    <div className="space-y-6">
      {/* Transparent 3-Stage Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stage 01 */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 text-center shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
              STAGE 01 • LOW-RISK ENTRY
            </span>
            <h4 className="text-base sm:text-lg font-black text-slate-900 mt-2">AI Business Audit</h4>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 my-2 font-mono">₹4,999 – ₹9,999</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              1-Day on-site or remote process audit. We map every bottleneck and give you an executive Opportunity Report.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 inline-block">
              ✔ 100% Credited toward build
            </span>
          </div>
        </div>

        {/* Stage 02 - Featured */}
        <div className="bg-red-50 border-2 border-[#FF1E42] rounded-3xl p-5 sm:p-6 text-center shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-[#FF1E42]" />
          <div>
            <span className="text-[10px] font-mono font-black uppercase bg-[#FF1E42] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
              STAGE 02 • POPULAR BUILD
            </span>
            <h4 className="text-base sm:text-lg font-black text-slate-900 mt-2">Workflow Implementation</h4>
            <p className="text-2xl sm:text-3xl font-black text-[#FF1E42] my-2 font-mono">₹25,000 – ₹1,00,000+</p>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Fixed-price build of the exact AI workflow identified in the audit. Connected to your WhatsApp & Tally.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-red-200">
            <span className="text-xs font-black text-slate-950 bg-[#EEFF41] px-2 py-1 rounded-lg border border-yellow-300 inline-block font-mono shadow-2xs">
              ⚡ Live in 7–14 Days • 30-Day Warranty
            </span>
          </div>
        </div>

        {/* Stage 03 */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 text-center shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
              STAGE 03 • OPTIONAL RETAINER
            </span>
            <h4 className="text-base sm:text-lg font-black text-slate-900 mt-2">AI Maintenance</h4>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 my-2 font-mono">
              ₹5,000 – ₹25,000<span className="text-xs font-normal text-slate-500">/mo</span>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous monitoring, prompt tuning, catalog adjustments, and bug fixes as your business expands.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 inline-block">
              ✔ Cancel anytime • No contracts
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Wage Loss Calculator - Matched to Light Clean Theme */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-5 h-5 text-[#FF1E42]" />
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                Interactive Wage Loss Calculator
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              See the real financial cost of employees doing repetitive manual tasks.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-700 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
            Live Math • ₹180/hr Blended Cost
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 my-4">
          <div className="bg-slate-50 p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="text-slate-700 font-bold">Staff handling manual chores:</span>
              <span className="bg-red-50 text-[#FF1E42] px-2.5 py-1 rounded-lg font-mono font-black text-sm border border-red-100">
                {staff} employees
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={staff}
              onChange={(e) => setStaff(Number(e.target.value))}
              className="w-full accent-[#FF1E42] cursor-pointer mt-1"
            />
          </div>

          <div className="bg-slate-50 p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="text-slate-700 font-bold">Hours spent per day per staff:</span>
              <span className="bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg font-mono font-black text-sm border border-amber-200">
                {hours} hours / day
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-[#FF1E42] cursor-pointer mt-1"
            />
          </div>
        </div>

        {/* Calculation Result */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Total manual time wasted:</span>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200 text-xs">
                {monthlyHoursLost} staff hours / month
              </span>
            </div>
            <span className="text-xs text-slate-500 block">
              Estimated direct monthly wage loss:
            </span>
          </div>

          <div className="text-left md:text-right">
            <span className="text-3xl sm:text-4xl font-black text-[#FF1E42] font-mono tracking-tight block">
              ~₹{rupeeLoss.toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-normal">/ month</span>
            </span>
          </div>
        </div>

        {/* The HIT Payoff Note */}
        <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 shadow-2xs">
          <span>
            <strong className="text-emerald-950">The HIT Payoff:</strong> Automating this workflow typically reclaims 70%–80% of these lost hours starting Month 1, paying for the implementation in weeks.
          </span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   6. HOW TO START PAGE
   ========================================================================= */
const HowToStartPage: React.FC<{ onOpenAudit: () => void; onWhatsApp: () => void }> = ({ onOpenAudit, onWhatsApp }) => {
  return (
    <div className="space-y-6">
      {/* Hero Audit Card */}
      <div className="relative overflow-hidden bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-8 text-center shadow-xs">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FE1743] via-[#EEFF41] to-[#FE1743]" />

        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-[#EEFF41] text-slate-900 border border-black/10 shadow-2xs mb-4">
          <Zap className="w-3.5 h-3.5 text-[#FE1743] fill-current" />
          LOW-RISK FIRST STEP
        </span>

        <h3 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
          Start With a <span className="text-[#FF1E42]">1-Day AI Business Audit</span>
        </h3>

        <p className="text-xs sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
          “Show us how your business runs for one day. We map your bottlenecks and deliver an executive AI Opportunity Report with exact hours saved, fixed costs, and clear ROI.”
        </p>

        {/* 4 Reassurance Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-7">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            1-Day Commitment
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            Zero Disruption to Daily Sales
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
            <Check className="w-3.5 h-3.5 text-purple-600" />
            Executive Opportunity Report
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
            <Check className="w-3.5 h-3.5 text-amber-600" />
            Fixed-Scope Build Quote
          </span>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onOpenAudit}
            className="w-full sm:w-auto bg-[#FF1E42] hover:bg-[#E01536] text-white px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Open 1-Day Audit Booking Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onWhatsApp}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-100" />
            <span>Chat Directly on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* 3 Step Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-3xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-black text-xs text-[#FF1E42]">STEP 01</span>
              <span className="text-[10px] font-bold uppercase bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100">
                1 Day Only
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-base mb-1">1-Day Shadowing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We observe your actual daily billing, Excel tracking, and WhatsApp quotes to map your biggest bottleneck.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-3xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-black text-xs text-blue-600">STEP 02</span>
              <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                Fixed Price
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-base mb-1">Opportunity Report</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive a plain-English 1-page report detailing exact hours saved, solution design, and a fixed one-time price.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-3xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-black text-xs text-emerald-600">STEP 03</span>
              <span className="text-[10px] font-mono font-black uppercase bg-[#EEFF41] text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                Live in 7–14 Days
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-base mb-1">1-Workflow Build</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Custom AI live in your business within 14 days, built directly inside your WhatsApp & Excel with zero staff friction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
