import React, { useState } from 'react';
import { QuestionItem } from '../data/servicesData';
import { WhatsAppQuoteSimulator } from './interactive/WhatsAppQuoteSimulator';
import { X, CheckCircle2, ArrowRight, Calculator, Building2, Cog, Zap, Brain, Clock, Rocket, MessageSquare, Calendar, ShieldCheck, Database, FileSpreadsheet } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface AnswerModalProps {
  question: QuestionItem | null;
  onClose: () => void;
  onOpenAudit: () => void;
}

export const AnswerModal: React.FC<AnswerModalProps> = ({ question, onClose, onOpenAudit }) => {
  if (!question) return null;

  const handleWhatsApp = () => {
    sound.playClick();
    const msg = encodeURIComponent(`Hi HIT team, I am interested in: "${question.question}". Please share details.`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xl my-auto text-slate-900 max-h-[92vh] overflow-y-auto">
        {/* Header bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#FF1E42] shrink-0">
              {question.icon === 'building' && <Building2 className="w-6 h-6" />}
              {question.icon === 'gear' && <Cog className="w-6 h-6" />}
              {question.icon === 'lightning' && <Zap className="w-6 h-6" />}
              {question.icon === 'brain' && <Brain className="w-6 h-6" />}
              {question.icon === 'clock' && <Clock className="w-6 h-6" />}
              {question.icon === 'rocket' && <Rocket className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400">
                Question 0{question.number} • {question.subtitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {question.question}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Answer Body Based on Question */}
        <div className="space-y-6">
          {question.componentType === 'what_hit_does' && (
            <WhatHitDoesView onOpenAudit={onOpenAudit} onWhatsApp={handleWhatsApp} />
          )}

          {question.componentType === 'services_provided' && (
            <ServicesProvidedView onOpenAudit={onOpenAudit} />
          )}

          {question.componentType === 'how_automation_helps' && (
            <HowAutomationHelpsView />
          )}

          {question.componentType === 'custom_solutions' && (
            <CustomSolutionsView onOpenAudit={onOpenAudit} />
          )}

          {question.componentType === 'pricing_cost' && (
            <PricingCostView onOpenAudit={onOpenAudit} />
          )}

          {question.componentType === 'how_to_start' && (
            <HowToStartView onOpenAudit={onOpenAudit} onWhatsApp={handleWhatsApp} />
          )}
        </div>

        {/* Footer CTA in Modal */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Zero disruption to your ongoing operations.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onOpenAudit();
              }}
              className="px-4 py-2 rounded-xl bg-[#FF1E42] text-white font-semibold hover:bg-[#E01536] transition-all flex items-center gap-1.5 shadow-md shadow-red-500/20 cursor-pointer"
            >
              <span>Book 1-Day Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 1. What Does HIT Do View --- */
const WhatHitDoesView: React.FC<{ onOpenAudit: () => void; onWhatsApp: () => void }> = ({ onOpenAudit }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
        <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
          “We don’t sell generic AI. We find <span className="text-[#FF1E42] font-bold">one expensive, repetitive process</span> in your business and replace it with an AI-powered system.”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-2">
            What We Do NOT Say
          </span>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2">❌ “We build websites and mobile apps”</li>
            <li className="flex items-center gap-2">❌ “We provide generic AI hype solutions”</li>
            <li className="flex items-center gap-2">❌ “We do theoretical digital transformation”</li>
          </ul>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">
            What We Do Instead
          </span>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-center gap-2">✔ Audit your manual daily workflow for 1 day</li>
            <li className="flex items-center gap-2">✔ Automate quotations, dealer chats & stock sync</li>
            <li className="flex items-center gap-2">✔ Save 3–5 staff hours every single day</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-5">
        <h4 className="font-bold text-sm text-[#DFFF00] mb-1">Our Target Focus</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          10–30 year old traditional businesses running on Excel, WhatsApp, paper registers, phone calls, and Tally. Real businesses with real revenue that want simple, reliable automation.
        </p>
      </div>
    </div>
  );
};

/* --- 2. Which Services Do You Provide View --- */
const ServicesProvidedView: React.FC<{ onOpenAudit: () => void }> = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      step: '01',
      title: 'AI Business Audit',
      role: 'Diagnosis',
      desc: 'We spend 1 day mapping every manual process, Excel bottleneck, and WhatsApp leakage. You get a concrete, executive AI Opportunity Report.',
      deliverables: ['1-Day process shadowing', 'Repetitive task time/cost analysis', '10-15 page Opportunity Report', 'Fixed implementation scope'],
    },
    {
      step: '02',
      title: 'AI Business OS',
      role: 'Foundation',
      desc: 'A customized operational system tailored to your industry: centralized CRM, inventory tracking, order management, and WhatsApp automation.',
      deliverables: ['Custom order & inventory dashboard', 'WhatsApp Business API integration', 'Tally & Excel data synchronizer', 'Live owner mobile view'],
    },
    {
      step: '03',
      title: 'AI Workers',
      role: 'Autonomous Scalability',
      desc: 'Narrow, dedicated AI agents: AI Quotation Agent, AI Sales Lead Follow-up Agent, AI Document/Invoice Agent, and AI Support Agent.',
      deliverables: ['Quotation Agent (<30 sec quotes)', 'Sales Follow-up Agent (Zero lost leads)', 'Document Agent (Bill extraction)', 'Support Agent (24/7 WhatsApp)'],
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {services.map((s, idx) => (
          <button
            key={s.step}
            onClick={() => {
              sound.playClick();
              setActiveTab(idx);
            }}
            className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
              activeTab === idx
                ? 'bg-red-50 border-[#FF1E42] shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="text-[10px] font-mono font-bold text-[#FF1E42] block">{s.step}</span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{s.title}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-[#FF1E42] uppercase">
            {services[activeTab].role}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
            Stage {services[activeTab].step}
          </span>
        </div>
        <h4 className="text-lg font-bold text-slate-900">{services[activeTab].title}</h4>
        <p className="text-xs text-slate-600 my-3 leading-relaxed">
          {services[activeTab].desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {services[activeTab].deliverables.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white border border-slate-200/80 p-2.5 rounded-xl text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- 3. How Automation Helps View (With Live Simulator) --- */
const HowAutomationHelpsView: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Real Client Problem:</strong> “My employees spend 4 hours a day preparing quotations and checking stock in Excel.”
          <br />
          <strong>HIT AI Automation:</strong> Dealer sends an unformatted WhatsApp message ➔ AI parses items & prices ➔ Generates official PDF ➔ Owner approves with 1 tap.
        </p>
      </div>

      {/* Embedded WhatsApp Simulator */}
      <WhatsAppQuoteSimulator />
    </div>
  );
};

/* --- 4. Custom Solutions View --- */
const CustomSolutionsView: React.FC<{ onOpenAudit: () => void }> = () => {
  const industries = [
    {
      name: 'Plywood & Building Materials',
      problem: 'Manual costing, rate lists to 100+ dealers, order tracking on WhatsApp',
      solution: 'AI Quotation Agent + Searchable SKU Catalog + Dealer WhatsApp Bot',
    },
    {
      name: 'Hardware & Auto Parts',
      problem: '5,000+ SKUs in Excel, no searchable catalog, constant stock mismatches',
      solution: 'Excel to AI Searchable Database + Instant Stock Confirmation on WhatsApp',
    },
    {
      name: 'Textile & Garment Traders',
      problem: 'Sample-to-order tracking, size/color/stock matrix maintained manually',
      solution: 'Visual Order Tracker + Auto dispatch notifications to buyers',
    },
    {
      name: 'Chemical & Industrial Supplies',
      problem: 'Compliance paperwork, repeat-order reminders done on phone calls',
      solution: 'Automated repeat order reminders + OCR invoice extraction into Tally',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs sm:text-sm text-slate-600">
        We configure the AI system around your exact industry terminology and current habits:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {industries.map((ind, i) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#FF1E42] block mb-1">{ind.name}</span>
              <p className="text-xs text-slate-500 mb-2">
                <strong className="text-slate-700">Pain Point:</strong> {ind.problem}
              </p>
            </div>
            <div className="bg-white border border-emerald-200 p-2.5 rounded-xl text-[11px] text-emerald-800 font-semibold flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{ind.solution}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- 5. Pricing & Cost View --- */
const PricingCostView: React.FC<{ onOpenAudit: () => void }> = () => {
  const [employees, setEmployees] = useState(3);
  const [hours, setHours] = useState(3);

  const monthlyHoursLost = employees * hours * 25;
  const rupeeLoss = monthlyHoursLost * 180;

  return (
    <div className="space-y-6">
      {/* 3-Stage Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">Stage 1</span>
          <h4 className="text-base font-bold text-slate-900 mt-1">AI Business Audit</h4>
          <p className="text-lg font-black text-[#FF1E42] my-2 font-mono">₹4,999 – ₹9,999</p>
          <p className="text-[11px] text-slate-500">1-Day on-site/remote process mapping & Opportunity Report</p>
        </div>

        <div className="bg-red-50/50 border border-[#FF1E42]/40 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-bold font-mono text-[#FF1E42] uppercase">Stage 2</span>
          <h4 className="text-base font-bold text-slate-900 mt-1">Implementation</h4>
          <p className="text-lg font-black text-slate-900 my-2 font-mono">₹25,000 – ₹1,00,000+</p>
          <p className="text-[11px] text-slate-500">Fixed-scope build of identified AI workflows. No hidden charges.</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">Stage 3</span>
          <h4 className="text-base font-bold text-slate-900 mt-1">AI Maintenance</h4>
          <p className="text-lg font-black text-slate-900 my-2 font-mono">₹5,000 – ₹25,000<span className="text-xs font-normal">/mo</span></p>
          <p className="text-[11px] text-slate-500">Continuous monitoring, bug fixes, updates, and prompt tuning.</p>
        </div>
      </div>

      {/* Wage Loss Calculator */}
      <div className="bg-slate-900 text-white rounded-2xl p-5">
        <h4 className="text-sm font-bold text-[#DFFF00] mb-3 flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Interactive Repetitive Wage Loss Calculator
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-300">Employees doing manual tasks:</span>
              <span className="font-bold text-white font-mono">{employees}</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full accent-[#FF1E42]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-300">Hours spent per person/day:</span>
              <span className="font-bold text-white font-mono">{hours} hrs</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-[#FF1E42]"
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Current money wasted on manual work:</span>
          <span className="text-base font-black text-[#FF5E78] font-mono">
            ~₹{rupeeLoss.toLocaleString('en-IN')} / month
          </span>
        </div>
      </div>
    </div>
  );
};

/* --- 6. How To Start View --- */
const HowToStartView: React.FC<{ onOpenAudit: () => void; onWhatsApp: () => void }> = ({ onOpenAudit, onWhatsApp }) => {
  return (
    <div className="space-y-5">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
        <h4 className="text-lg font-bold text-slate-900 mb-2">
          Start With a 1-Day AI Business Audit
        </h4>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed mb-4">
          “Show us how your business runs for one day. We will deliver a complete AI Opportunity Report showing what to automate first, exact cost, and projected savings.”
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenAudit();
            }}
            className="w-full sm:w-auto bg-[#FF1E42] hover:bg-[#E01536] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book 1-Day Audit Form</span>
          </button>
          <button
            onClick={onWhatsApp}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <span className="font-bold text-slate-800 block">Step 1</span>
          1-Day Shadowing
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <span className="font-bold text-slate-800 block">Step 2</span>
          Opportunity Report
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <span className="font-bold text-slate-800 block">Step 3</span>
          1-Workflow Build
        </div>
      </div>
    </div>
  );
};
