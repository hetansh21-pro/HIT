import React from 'react';
import { X, MessageSquare, Calendar, ChevronRight, Building2, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAudit: () => void;
  onSelectQuestion: (index: number) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAudit,
  onSelectQuestion,
}) => {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    sound.playClick();
    const msg = encodeURIComponent("Hi HIT team, I'd like to discuss automating our business processes.");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#FF1E42] font-display">HiT</span>
              <span className="text-[10px] font-mono font-bold bg-red-50 text-[#FF1E42] px-2 py-0.5 rounded">
                AI SYSTEMS
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-6 space-y-1.5">
            <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider block mb-2">
              Navigation & Exploration
            </span>

            {[
              { title: 'What does HIT do?', idx: 0 },
              { title: 'Which services do you provide?', idx: 1 },
              { title: 'How does automation help?', idx: 2 },
              { title: 'Can you create custom solutions?', idx: 3 },
              { title: 'How much does it cost?', idx: 4 },
              { title: 'How can I get started?', idx: 5 },
            ].map((item) => (
              <button
                key={item.idx}
                onClick={() => {
                  sound.playClick();
                  onClose();
                  onSelectQuestion(item.idx);
                }}
                className="w-full text-left px-3.5 py-3 rounded-xl hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#FF1E42] flex items-center justify-between transition-colors"
              >
                <span>{item.title}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons in Drawer */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenAudit();
            }}
            className="w-full bg-[#FF1E42] hover:bg-[#E01536] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book 1-Day AI Audit</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>

          <p className="text-[11px] text-center text-slate-400 pt-2">
            “We make work feel automated.”
          </p>
        </div>
      </div>
    </div>
  );
};
