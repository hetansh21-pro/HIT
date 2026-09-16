import React, { useState } from 'react';
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
      <header className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Back to Questions Button */}
        <button
          onClick={() => {
            sound.playClick();
            onBackToQuestions();
          }}
          className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-[#FF1E42] bg-slate-50 hover:bg-red-50 border border-slate-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer group shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF1E42] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Questions</span>
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

        {/* Question Counter */}
        <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono text-slate-400 opacity-60 hover:opacity-100 transition-opacity select-none">
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
      </header>

      {/* Main Page Content - Smoothly animates on question change */}
      <main key={question.id} className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12 flex-1 animate-content-slide">
        {/* Title Section */}
        <div className="mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1E42] bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
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

          {/* Hand-drawn guidance note - Enlarged for readability */}
          <div className="flex items-center gap-2.5 text-slate-600 font-hand text-2xl sm:text-3xl font-semibold mt-3">
            <span>Here is how HIT works for your business</span>
            <HandArrowDown className="w-6 h-6 text-[#FF1E42]" />
          </div>
        </div>

        {/* Dynamic Interactive Body */}
        <div className="space-y-8">
          {question.componentType === 'what_hit_does' && (
            <WhatHitDoesPage onOpenAudit={onOpenAudit} onWhatsApp={handleWhatsApp} />
          )}

          {question.componentType === 'services_provided' && (
            <ServicesProvidedPage onOpenAudit={onOpenAudit} />
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
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              sound.playClick();
              onBackToQuestions();
            }}
            className="group flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-[#FF1E42] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF1E42] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Questions</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenAudit();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#FF1E42] hover:bg-[#E01536] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 1-Day Audit</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-6 mt-6 border-t border-slate-100">
          <span>HiT | Smart Automation for a Better Tomorrow.</span>
          <div className="w-7 h-1.5 rounded-full bg-[#DFFF00]"></div>
        </div>
      </footer>
    </div>
  );
};

/* =========================================================================
   1. WHAT DOES HIT DO PAGE
   ========================================================================= */
const WhatHitDoesPage: React.FC<{ onOpenAudit: () => void; onWhatsApp: () => void }> = ({ onOpenAudit }) => {
  return (
    <div className="space-y-6">
      {/* Core Statement */}
      <div className="bg-slate-50 border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1E42] block mb-2">
          The One-Line Positioning
        </span>
        <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
          “We don’t sell generic AI. We find{' '}
          <span className="text-[#FF1E42] relative inline-block">
            one expensive, repetitive process
          </span>{' '}
          in your business and replace it with an AI-powered system.”
        </p>
      </div>

      {/* Contrast Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50/70 border border-red-200 rounded-3xl p-6">
          <span className="text-xs font-black text-red-600 uppercase tracking-wider block mb-3">
            What We Do NOT Say
          </span>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center gap-2.5">
              <span className="text-red-500 font-bold">✘</span>
              <span>“We build generic websites and apps”</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-red-500 font-bold">✘</span>
              <span>“We sell buzzword AI solutions”</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-red-500 font-bold">✘</span>
              <span>“We do theoretical consulting decks”</span>
            </li>
          </ul>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6">
          <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block mb-3">
            What We Actually Deliver
          </span>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-600 font-bold">✔</span>
              <span>We audit your operations for 1 full day</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-600 font-bold">✔</span>
              <span>We automate WhatsApp quotes, Excel stock, & lead follow-up</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-600 font-bold">✔</span>
              <span>We give back 3–5 staff hours every single day</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Target Focus */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Who Is This Built For?</h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            10–30 year old businesses running on Excel, WhatsApp, paper registers, phone calls, and Tally. Real businesses with real revenue that need practical, no-nonsense automation.
          </p>
        </div>
        <button
          onClick={onOpenAudit}
          className="bg-[#FF1E42] hover:bg-[#E01536] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 cursor-pointer shadow-sm"
        >
          Book 1-Day Audit
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   2. WHICH SERVICES DO YOU PROVIDE PAGE
   ========================================================================= */
const ServicesProvidedPage: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      step: '01',
      title: 'AI Business Audit',
      role: 'DIAGNOSIS',
      desc: 'We spend 1 day mapping every manual task, Excel spreadsheet bottleneck, and dropped WhatsApp inquiry. You get an executive AI Opportunity Report.',
      points: [
        '1-Day remote or on-site process walkthrough',
        'Staff hourly cost vs. manual repetitive waste calculation',
        'Concrete AI Opportunity Report with ROI projection',
        'Zero disruption to ongoing daily sales',
      ],
    },
    {
      step: '02',
      title: 'AI Business OS',
      role: 'FOUNDATION',
      desc: 'A customized central system replacing Excel sheets and scattered WhatsApp chats: CRM, inventory tracking, order management, and executive mobile dashboards.',
      points: [
        'Custom order & inventory dashboard tailored to your industry',
        'WhatsApp Business API integration for automatic order logging',
        'Tally & Excel data sync with zero manual re-typing',
        'Owner mobile view of daily sales, dispatches, & stock',
      ],
    },
    {
      step: '03',
      title: 'AI Workers',
      role: 'ONGOING VALUE',
      desc: 'Dedicated, narrow autonomous agents that plug into your business: Quotation Agent, Sales Lead Qualifier, Document & Invoice Extractor, and 24/7 Dealer Support Agent.',
      points: [
        'AI Quotation Agent (Quotes in 30 sec on WhatsApp)',
        'AI Sales Agent (Automated follow-ups, zero lost leads)',
        'AI Document Agent (Scans paper bills into Tally in 15 sec)',
        'AI Support Agent (Instant dealer rates & dispatch status)',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* 3 Step Tabs */}
      <div className="grid grid-cols-3 gap-3">
        {pillars.map((p, idx) => (
          <button
            key={p.step}
            onClick={() => {
              sound.playClick();
              setActiveTab(idx);
            }}
            className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
              activeTab === idx
                ? 'bg-red-50 border-[#FF1E42] shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-[#FF1E42]">{p.step}</span>
              <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                {p.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{p.title}</p>
          </button>
        ))}
      </div>

      {/* Selected Pillar Card */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF1E42] uppercase tracking-wider">
              Stage {pillars[activeTab].step} — {pillars[activeTab].role}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {pillars[activeTab].title}
            </h3>
          </div>
          {activeTab === 0 && (
            <button
              onClick={onOpenAudit}
              className="bg-[#FF1E42] hover:bg-[#E01536] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              Book 1-Day Audit
            </button>
          )}
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
          {pillars[activeTab].desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pillars[activeTab].points.map((pt, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-800 font-medium">{pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. HOW AUTOMATION HELPS PAGE
   ========================================================================= */
const HowAutomationHelpsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5">
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900">The Problem:</strong> Employees spend 3–4 hours a day manually checking Excel sheets, doing pricing math, and typing PDF quotations.
          <br />
          <strong className="text-[#FF1E42]">The HIT Fix:</strong> Dealer sends a WhatsApp message ➔ AI parses quantities & rates ➔ Formats official PDF quote ➔ Owner clicks 1-tap Approve!
        </p>
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
      description:
        'We sit with your billing, sales, or godown staff (in person or screen-share) to watch how orders arrive, how stock is checked, and where hours are lost. Zero disruption to your business.',
      deliverable: 'We find your single biggest time-wasting bottleneck.',
    },
    {
      stepNumber: '02',
      badge: 'Step 2 • 1-Page Blueprint',
      title: 'Fixed Price & Exact Plan',
      tagline: '“No surprises, no monthly traps”',
      description:
        'We deliver a plain-English 1-page report showing exactly what AI will automate, the exact hours saved each week, and a fixed one-time build price.',
      deliverable: 'You only proceed if the numbers make clear financial sense.',
    },
    {
      stepNumber: '03',
      badge: 'Step 3 • Live in 7–14 Days',
      title: 'Built Around Your Habits',
      tagline: '“Runs directly inside your WhatsApp & Excel”',
      description:
        'We build custom AI workers connected to your existing WhatsApp and registers. Your staff doesn’t learn new software. You retain 1-tap approval on all quotes.',
      deliverable: 'Tested, deployed, and live in under 2 weeks.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Core Direct Promise Banner with Distinct Brand Colors */}
      <div className="relative overflow-hidden bg-white border-2 border-slate-200 hover:border-red-200 rounded-3xl p-6 sm:p-8 shadow-md transition-all">
        {/* Top Brand Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#FE1743] via-[#EEFF41] to-[#FE1743]" />

        {/* Neon Brand Tag */}
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#EEFF41] text-slate-900 border border-black/10 shadow-2xs mb-3">
          <Zap className="w-3.5 h-3.5 text-[#FE1743] fill-current" />
          YES, 100% CUSTOM BUILT
        </span>

        {/* High-Contrast Main Headline */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3">
          <span className="text-slate-900">You never adapt to software.</span>{' '}
          <span className="text-[#FE1743] relative inline-block">
            We build AI that adapts to you.
            <HandUnderline className="w-full h-3 -bottom-1 left-0 absolute pointer-events-none" color="#FE1743" />
          </span>
        </h3>

        {/* Channel Tags Subtext */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-3xl">
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
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#FF1E42]/60 hover:shadow-md transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="w-10 h-10 rounded-2xl bg-red-50 text-[#FE1743] font-mono text-base font-black flex items-center justify-center border border-red-100 shadow-2xs">
                  {s.stepNumber}
                </span>
                <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
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

              <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal mt-2">
                {s.description}
              </p>
            </div>

            <div className="pt-3.5 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-4 sm:p-5 rounded-b-3xl">
              <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{s.deliverable}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Action Callout Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EEFF41] text-slate-900">
              LOW-RISK FIRST STEP
            </span>
            <span className="text-xs text-slate-400 font-mono">Diagnosis Before Prescription</span>
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
          className="shrink-0 bg-[#FF1E42] hover:bg-[#E01536] text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer self-start sm:self-center"
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
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 text-center">
          <span className="text-[10px] font-bold font-mono text-slate-500 uppercase">Stage 01</span>
          <h4 className="text-base font-bold text-slate-900 mt-1">AI Business Audit</h4>
          <p className="text-2xl font-black text-[#FF1E42] my-2 font-mono">₹4,999 – ₹9,999</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            1-Day process mapping + executive AI Opportunity Report. Low risk entry.
          </p>
        </div>

        <div className="bg-red-50/70 border-2 border-[#FF1E42]/50 rounded-3xl p-5 text-center shadow-xs">
          <span className="text-[10px] font-mono font-bold text-[#FF1E42] uppercase">Stage 02</span>
          <h4 className="text-base font-bold text-slate-900 mt-1">Implementation</h4>
          <p className="text-2xl font-black text-slate-900 my-2 font-mono">₹25,000 – ₹1,00,000+</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fixed-price build of the exact AI workflow identified in the audit.
          </p>
        </div>

        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 text-center">
          <span className="text-[10px] font-bold font-mono text-slate-500 uppercase">Stage 03</span>
          <h4 className="text-base font-bold text-slate-900 mt-1">AI Maintenance</h4>
          <p className="text-2xl font-black text-slate-900 my-2 font-mono">₹5,000 – ₹25,000<span className="text-xs font-normal">/mo</span></p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Monthly retainer: monitoring, bug fixes, updates, and prompt enhancements.
          </p>
        </div>
      </div>

      {/* Interactive Wage Loss Calculator in Light Theme */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#DFFF00]" />
            Interactive Wage Loss Calculator
          </h4>
          <span className="text-xs font-mono text-[#DFFF00] font-bold bg-white/10 px-2.5 py-1 rounded-full">
            Live Math
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>Staff handling repetitive manual tasks:</span>
              <span className="font-bold text-white font-mono">{staff} employees</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={staff}
              onChange={(e) => setStaff(Number(e.target.value))}
              className="w-full accent-[#FF1E42] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>Hours spent per day per staff:</span>
              <span className="font-bold text-white font-mono">{hours} hours / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-[#FF1E42] cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-slate-400">
            Current money drained on repetitive work:
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#FF5E78] font-mono">
            ~₹{rupeeLoss.toLocaleString('en-IN')} / month
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
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 text-center">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
          Start With a 1-Day AI Business Audit
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-6">
          “Show us how your business runs for one day. We will map your bottlenecks and deliver an executive AI Opportunity Report with exact costs and ROI.”
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenAudit}
            className="w-full sm:w-auto bg-[#FF1E42] hover:bg-[#E01536] text-white px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Open 1-Day Audit Booking Form</span>
          </button>
          <button
            onClick={onWhatsApp}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl">
          <span className="font-bold text-[#FF1E42] block mb-1">Step 01</span>
          1-Day Shadowing
        </div>
        <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl">
          <span className="font-bold text-[#FF1E42] block mb-1">Step 02</span>
          Opportunity Report
        </div>
        <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl">
          <span className="font-bold text-[#FF1E42] block mb-1">Step 03</span>
          1-Workflow Build
        </div>
      </div>
    </div>
  );
};
