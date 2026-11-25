import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Ticket, X } from 'lucide-react';
import type { CompetitionName, PageId } from '../data/fessData';
import { FESS_EASE } from './MotionPrimitives';
import emblemDark from '../assets/logo/fess-emblem.png';
import emblemLight from '../assets/logo/fess-emblem-light.png';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPasses: (event?: CompetitionName) => void;
  registrationCount: number;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'events', label: 'Flagship Event' },
  { id: 'teams', label: 'Our Teams' },
  { id: 'connect', label: 'Connect' },
];

export function Navbar({
  currentPage,
  onNavigate,
  onOpenPasses,
  registrationCount,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Home sits on the dark hero, so the bar goes dark there to avoid a hard seam.
  const dark = currentPage === 'home';

  const handleNavClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        dark
          ? scrolled
            ? 'bg-[#141923]/92 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-[#141923] border-b border-white/[0.06]'
          : scrolled
            ? 'bg-[#FAF6F0]/92 backdrop-blur-xl border-b border-[#991B1B]/12 shadow-sm'
            : 'bg-[#FAF6F0]/85 backdrop-blur-lg border-b border-[#991B1B]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16 sm:h-[72px]">
          {/* Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#991B1B] rounded-lg"
            aria-label="FESS Home"
          >
            <img
              src={dark ? emblemLight : emblemDark}
              alt=""
              className="h-11 w-auto group-hover:scale-105 transition-transform duration-150"
            />
            <span
              className={`font-extrabold text-xl tracking-tight ${
                dark ? 'text-white' : 'text-[#991B1B]'
              }`}
            >
              FESS
            </span>
          </button>

          {/* Navigation Links with Animated Indicator */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'teams' && currentPage.startsWith('teams/'));
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#991B1B] rounded ${
                    isActive
                      ? dark
                        ? 'text-amber-300'
                        : 'text-[#991B1B]'
                      : dark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-700 hover:text-[#991B1B]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      transition={{ duration: 0.28, ease: FESS_EASE }}
                      className={`absolute left-0 right-0 -bottom-0.5 h-[2.5px] rounded-full ${
                        dark ? 'bg-amber-300' : 'bg-[#991B1B]'
                      }`}
                    />
                  )}
                </button>
              );
            })}

            {registrationCount > 0 && (
              <button
                type="button"
                onClick={() => onOpenPasses('Pitch Arena')}
                className={`inline-flex items-center gap-1.5 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  dark ? 'text-amber-300 hover:text-amber-200' : 'text-[#991B1B] hover:text-[#7F1D1D]'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>My Passes ({registrationCount})</span>
              </button>
            )}
          </nav>

          {/* Mobile Drawer Toggle */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`w-11 h-11 inline-flex items-center justify-center rounded-xl border transition-colors ${
                dark
                  ? 'bg-white/5 border-white/15 text-white hover:text-amber-300'
                  : 'bg-white border-[#991B1B]/15 text-slate-800 hover:text-[#991B1B]'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: FESS_EASE }}
            className="md:hidden bg-white border-t border-[#991B1B]/10 px-4 pt-3 pb-5 space-y-1.5 shadow-xl"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'teams' && currentPage.startsWith('teams/'));
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#991B1B]/8 text-[#991B1B]'
                      : 'text-slate-700 hover:bg-[#FAF6F0]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-mono text-[#991B1B]">Active</span>
                  )}
                </button>
              );
            })}

            {registrationCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenPasses('Pitch Arena');
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-[#991B1B] bg-[#FAF6F0] flex items-center justify-between"
              >
                <span className="inline-flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  <span>My Passes ({registrationCount})</span>
                </span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
