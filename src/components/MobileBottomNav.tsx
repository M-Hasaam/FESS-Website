import { motion, useReducedMotion } from 'motion/react';
import { CalendarDays, Home, Mail, Ticket, Users } from 'lucide-react';
import type { CompetitionName, PageId } from '../data/fessData';
import { FESS_EASE } from './MotionPrimitives';

interface MobileBottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPasses: (event?: CompetitionName) => void;
  registrationCount: number;
}

const MOBILE_TABS: {
  id: 'home' | 'events' | 'teams' | 'connect';
  label: string;
  icon: typeof Home;
}[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'connect', label: 'Connect', icon: Mail },
];

export function MobileBottomNav({
  currentPage,
  onNavigate,
  onOpenPasses,
  registrationCount,
}: MobileBottomNavProps) {
  const shouldReduce = useReducedMotion();

  return (
    <nav
      aria-label="Mobile Quick Navigation"
      data-testid="mobile-bottom-nav"
      className="md:hidden fixed bottom-3 inset-x-3 z-40"
    >
      <div className="bg-[#141923]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-[0_18px_40px_-10px_rgba(15,23,42,0.55)] flex items-center justify-around gap-1">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentPage === tab.id ||
            (tab.id === 'teams' && currentPage.startsWith('teams/'));

          return (
            <motion.button
              key={tab.id}
              type="button"
              whileTap={shouldReduce ? undefined : { scale: 0.93 }}
              onClick={() => onNavigate(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex-1 min-h-[48px] py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="mobileBottomTab"
                  transition={{ duration: 0.25, ease: FESS_EASE }}
                  className="absolute inset-0 rounded-xl bg-[#991B1B] shadow-md"
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 leading-none">{tab.label}</span>
            </motion.button>
          );
        })}

        {registrationCount > 0 && (
          <motion.button
            type="button"
            whileTap={shouldReduce ? undefined : { scale: 0.93 }}
            onClick={() => onOpenPasses('Pitch Arena')}
            aria-label={`Open My Passes (${registrationCount})`}
            className="relative min-h-[48px] px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-300/30 text-amber-200 flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold shrink-0"
          >
            <Ticket className="w-4 h-4" />
            <span className="leading-none">{registrationCount}</span>
          </motion.button>
        )}
      </div>
    </nav>
  );
}
