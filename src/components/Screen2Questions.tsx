import React from 'react';
import { HitLogo } from './HitLogo';
import { BrandGeometricAccents } from './BrandGeometricAccents';
import { QUICK_QUESTIONS, QuestionItem } from '../data/servicesData';
import {
  Building2,
  Cog,
  Zap,
  Brain,
  Clock,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface Screen2QuestionsProps {
  onBackToScreen1: () => void;
  onSelectQuestion: (q: QuestionItem) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Screen2Questions: React.FC<Screen2QuestionsProps> = ({
  onBackToScreen1,
  onSelectQuestion,
  soundEnabled,
  onToggleSound,
}) => {
  const getQuestionIcon = (iconName: string) => {
    const cls = "w-5 h-5 text-[#FF1E42]";
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
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-x-hidden animate-fade-in">
      {/* Exact Brand Shapes from User's Reference Images */}
      <BrandGeometricAccents />

      {/* Header */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Left: HiT Logo + Back to Screen 1 button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToScreen1();
            }}
            className="flex items-center gap-1 cursor-pointer group"
            title="Click to view fullscreen HIT logo"
          >
            <HitLogo size="sm" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onBackToScreen1();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#FF1E42] bg-slate-50 hover:bg-red-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs group"
            title="Go back to full logo screen"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF1E42] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Logo</span>
          </button>
        </div>

        {/* Right: Controls & Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSound}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#FF1E42]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#FF1E42] animate-pulse"></span>
            <span>AI Automation</span>
          </div>
        </div>
      </header>

      {/* Main Questions Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-16 my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs sm:text-sm font-medium text-slate-400 block mb-1">
              Quick Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Find <span className="text-[#FF1E42]">what you need.</span>
            </h2>
          </div>

          {/* Handwritten Annotation & Curved Arrow - Enlarged for readability */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto text-slate-600 font-hand text-xl sm:text-2xl font-semibold select-none">
            <div className="text-right leading-tight">
              <span>Tap on a question</span>
              <br />
              <span>to get the answer</span>
            </div>
            {/* Thin Curved Arrow */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-8 h-8 text-[#FF1E42] stroke-current -rotate-12 translate-y-1"
            >
              <path
                d="M 6 4 C 18 6, 24 16, 20 26 M 15 22 L 20 26 L 25 21"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* The 6 Question Cards (2-column layout matching the mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                sound.playClick();
                onSelectQuestion(q);
              }}
              style={{ animationDelay: `${idx * 40}ms` }}
              className="animate-card-stagger group bg-white border border-slate-200/80 hover:border-slate-400/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] hit-card-shadow cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-1 rounded-lg">
                  {getQuestionIcon(q.icon)}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#FF1E42] transition-colors">
                  {q.question}
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF1E42] group-hover:translate-x-1.5 transition-transform duration-300 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-8">
        {/* Divider with Centered Category Text */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative bg-white px-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            AI &nbsp;/&nbsp; AUTOMATION &nbsp;/&nbsp; SOLUTIONS
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FF1E42]">HiT</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">
              Smart Automation for a Better Tomorrow.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onBackToScreen1();
              }}
              className="text-xs text-slate-500 hover:text-[#FF1E42] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Logo Screen</span>
            </button>
            {/* Small Neon-Yellow Bar Accent */}
            <div className="w-7 h-1.5 rounded-full bg-[#DFFF00]"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};
