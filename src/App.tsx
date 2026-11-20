import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import type { CompetitionName, PageId } from './data/fessData';
import {
  getTeamIdFromPage,
  parsePageFromHash,
  type RegistrationRecord,
} from './utils/fessLogic';
import { FESS_EASE, ScrollProgressBar } from './components/MotionPrimitives';
import { PageTransitionCurtain } from './components/PageTransitionCurtain';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { FlagshipEventPage } from './components/FlagshipEventPage';
import { TeamsPage } from './components/TeamsPage';
import { TeamDetailPage } from './components/TeamDetailPage';
import { ConnectPage } from './components/ConnectPage';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

const STORAGE_KEY = 'fess_registrations_v1';

const PAGE_LABELS: Record<PageId, string> = {
  home: 'FESS Home',
  events: 'Flagship Event',
  teams: 'Meet Our Teams',
  'teams/executive': 'Executive Council',
  'teams/tech': 'FESS Tech Team',
  connect: 'Connect With FESS',
};

interface ToastItem {
  id: number;
  message: string;
}

function loadSavedRegistrations(): RegistrationRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? parsePageFromHash(window.location.hash) : 'home'
  );
  const [curtainVisible, setCurtainVisible] = useState(false);
  const [curtainLabel, setCurtainLabel] = useState('FESS');
  const navTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);

  const [regModalOpen, setRegModalOpen] = useState(false);
  const [regInitialEvent, setRegInitialEvent] =
    useState<CompetitionName>('Pitch Arena');
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() =>
    typeof window !== 'undefined' ? loadSavedRegistrations() : []
  );
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3400);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = parsePageFromHash(window.location.hash);
      setCurrentPage(next);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
    };
  }, []);

  const navigateTo = useCallback(
    (page: PageId) => {
      if (page === currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);

      setCurtainLabel(PAGE_LABELS[page] || 'FESS');
      setCurtainVisible(true);

      navTimerRef.current = window.setTimeout(() => {
        setCurrentPage(page);
        const nextHash = page === 'home' ? '#home' : `#${page}`;
        if (window.location.hash !== nextHash) {
          window.history.pushState(null, '', nextHash);
        }
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

        exitTimerRef.current = window.setTimeout(() => {
          setCurtainVisible(false);
        }, 140);
      }, 380);
    },
    [currentPage]
  );

  const handleOpenRegister = useCallback((eventName: CompetitionName = 'Pitch Arena') => {
    setRegInitialEvent(eventName);
    setRegModalOpen(true);
  }, []);

  const handleRegisterSuccess = useCallback(
    (record: RegistrationRecord) => {
      setRegistrations((prev) => {
        const updated = [record, ...prev];
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore storage quota errors
        }
        return updated;
      });
      showToast(`Pass ${record.id} confirmed for ${record.fullName} — ${record.event}`);
    },
    [showToast]
  );

  const activeTeamId = getTeamIdFromPage(currentPage);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#1E2430]">
        <ScrollProgressBar />
        <PageTransitionCurtain isVisible={curtainVisible} label={curtainLabel} />

        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenPasses={handleOpenRegister}
          registrationCount={registrations.length}
        />

        <main className="flex-1 pt-16 sm:pt-[72px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: FESS_EASE }}
            >
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={navigateTo}
                  onOpenRegister={handleOpenRegister}
                />
              )}
              {currentPage === 'events' && (
                <FlagshipEventPage onOpenRegister={handleOpenRegister} />
              )}
              {currentPage === 'teams' && (
                <TeamsPage
                  onSelectTeam={(team) => navigateTo(`teams/${team}`)}
                />
              )}
              {activeTeamId && (
                <TeamDetailPage teamId={activeTeamId} onNavigate={navigateTo} />
              )}
              {currentPage === 'connect' && <ConnectPage onShowToast={showToast} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigateTo} onSocialToast={showToast} />

        <RegistrationModal
          isOpen={regModalOpen}
          initialEvent={regInitialEvent}
          registrations={registrations}
          onClose={() => setRegModalOpen(false)}
          onRegisterSuccess={handleRegisterSuccess}
        />

        {/* Toast Stack */}
        <div
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-2.5rem)]"
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: FESS_EASE }}
                role="status"
                className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141923] text-white text-xs sm:text-sm font-medium shadow-2xl border border-[#991B1B]/60"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>{toast.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
