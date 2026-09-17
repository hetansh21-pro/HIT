import React, { useState, useEffect } from 'react';
import { Screen1Logo } from './components/Screen1Logo';
import { Screen2Questions } from './components/Screen2Questions';
import { Screen3AnswerPage } from './components/Screen3AnswerPage';
import { QUICK_QUESTIONS, QuestionItem } from './data/servicesData';
import { AuditModal } from './components/AuditModal';
import { MenuDrawer } from './components/MenuDrawer';
import { sound } from './utils/sound';

export const App: React.FC = () => {
  // Screen state:
  // 'screen1' = Dedicated Fullscreen HIT Name
  // 'screen2' = Dedicated Quick Questions Grid
  // 'screen3' = Dedicated Full-Page Answer View (NO popup!)
  const [activeScreen, setActiveScreen] = useState<'screen1' | 'screen2' | 'screen3'>('screen1');
  const [activeQuestion, setActiveQuestion] = useState<QuestionItem>(QUICK_QUESTIONS[0]);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync state with browser back/forward history for true "one by one page back"
  useEffect(() => {
    // Always open Screen 1 cleanly on fresh page visit / refresh
    // and remove any stale hash left over from previous browsing sessions
    if (window.location.hash) {
      window.history.replaceState({ screen: 'screen1' }, '', window.location.pathname);
    }
    setActiveScreen('screen1');

    // Handle browser Back / Forward buttons (popstate)
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#q-')) {
        const qId = hash.replace('#q-', '');
        const found = QUICK_QUESTIONS.find((q) => q.id === qId);
        if (found) {
          setActiveQuestion(found);
          setActiveScreen('screen3');
          return;
        }
      }
      if (hash === '#questions') {
        setActiveScreen('screen2');
        return;
      }
      // Default to screen1
      setActiveScreen('screen1');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard Escape key to go back one by one
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAuditModalOpen) {
          setIsAuditModalOpen(false);
          return;
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
          return;
        }
        // One by one back
        if (activeScreen === 'screen3') {
          handleBackToQuestions();
          return;
        }
        if (activeScreen === 'screen2') {
          handleBackToScreen1();
          return;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScreen, isAuditModalOpen, isMenuOpen]);

  const handleToggleSound = () => {
    const state = sound.toggleSound();
    setSoundEnabled(state);
  };

  // Navigating forward to Screen 2
  const handleEnterScreen2 = () => {
    sound.playReveal();
    setActiveScreen('screen2');
    window.history.pushState({ screen: 'screen2' }, '', '#questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigating forward to Screen 3 (Question Answer)
  const handleSelectQuestion = (q: QuestionItem) => {
    sound.playClick();
    setActiveQuestion(q);
    setActiveScreen('screen3');
    window.history.pushState({ screen: 'screen3', qId: q.id }, '', `#q-${q.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Going back one step from Screen 3 to Screen 2
  const handleBackToQuestions = () => {
    sound.playClick();
    setActiveScreen('screen2');
    window.history.pushState({ screen: 'screen2' }, '', '#questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Going back one step from Screen 2 or Screen 3 to Screen 1 (Clean URL, no hash)
  const handleBackToScreen1 = () => {
    sound.playClick();
    setActiveScreen('screen1');
    window.history.pushState({ screen: 'screen1' }, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans selection:bg-[#FF1E42] selection:text-white">
      {/* SCREEN 1: Fullscreen HIT Logo Page */}
      {activeScreen === 'screen1' && (
        <div key="screen1" className="relative min-h-screen overflow-hidden">
          <Screen1Logo
            onEnterScreen2={handleEnterScreen2}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        </div>
      )}

      {/* SCREEN 2: Quick Questions Page */}
      {activeScreen === 'screen2' && (
        <div key="screen2" className="animate-screen-enter">
          <Screen2Questions
            onBackToScreen1={handleBackToScreen1}
            onSelectQuestion={handleSelectQuestion}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        </div>
      )}

      {/* SCREEN 3: Dedicated Full-Page Answer Screen (NO POPUP!) */}
      {activeScreen === 'screen3' && activeQuestion && (
        <div key="screen3" className="animate-fade-in">
          <Screen3AnswerPage
            question={activeQuestion}
            onBackToQuestions={handleBackToQuestions}
            onBackToHome={handleBackToScreen1}
            onSelectQuestion={(q) => {
              handleSelectQuestion(q);
            }}
            onOpenAudit={() => setIsAuditModalOpen(true)}
          />
        </div>
      )}

      {/* 1-Minute Diagnostic Audit Form */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* Slide-out Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenAudit={() => {
          setIsMenuOpen(false);
          setIsAuditModalOpen(true);
        }}
        onSelectQuestion={(idx) => {
          setIsMenuOpen(false);
          handleSelectQuestion(QUICK_QUESTIONS[idx]);
        }}
      />
    </div>
  );
};

export default App;
